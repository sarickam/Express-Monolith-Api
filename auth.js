const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const secretKey = 'tokenexpress';
const refreshTokenSecretKey = 'refreshexpress';
const refreshTokens = new Map(); // This should be a database or persistent storage in a production app

// Register a new user (unchanged)
const registerEmployee = (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO Employee (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], callback);
};

// Login and generate tokens
const loginEmployee = (username, password, callback) => {
    const sql = `SELECT * FROM Employee WHERE username = ?`;
    db.query(sql, [username], (err, results) => {
        if (err || results.length === 0) {
            return callback(err || new Error('User not found'));
        }
        const employee = results[0];
        const isValidPassword = bcrypt.compareSync(password, employee.password);
        if (!isValidPassword) {
            return callback(new Error('Invalid password'));
        }
        const token = generateAccessToken(employee);
        const refreshToken = generateRefreshToken(employee);
        refreshTokens.set(refreshToken, employee.id); // Store refresh token
        callback(null, { token, refreshToken });
    });
};

// Generate an access token
const generateAccessToken = (employee) => {
    return jwt.sign({ id: employee.id, username: employee.username }, secretKey, { expiresIn: '5m' }); // 5 minutes
};

const generateRefreshToken = (employee) => {
    return jwt.sign({ id: employee.id, username: employee.username }, refreshTokenSecretKey, { expiresIn: '1h' }); // 7 days
};


// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please refresh your token or log in again.' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};


// Endpoint to refresh the access token
const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        return res.status(403).json({ message: 'Refresh token not found or invalid' });
    }
    jwt.verify(refreshToken, refreshTokenSecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const newAccessToken = generateAccessToken(user);
        res.json({ token: newAccessToken });
    });
};

// Logout by invalidating the refresh token
const logoutEmployee = (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens.delete(refreshToken);
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    refreshAccessToken,
    registerEmployee,
    loginEmployee,
    authenticateToken,
    refreshAccessToken,
    logoutEmployee
};
