var express = require('express')
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
var ReadLine = require('readline');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const { execFile } = require('child_process');
const { fork } = require('child_process');
const crypto = require('crypto');
const url = require('url');
const os = require('os');
const { error } = require('console');
const Joi = require('joi');
const multer = require('multer');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');




//http Module testing

// const app = express()
// const port = 3000

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/about', (req,res)=>{
//     res.send('This is about Page');
// });

// app.post('/data', (req, res) => {
//     const data = req.body;
//     console.log(data); 
//     res.send(`Received data: ${JSON.stringify(data)}`);
//   });

// app.post('/submit-form', (req, res) => {
//     const formData = req.body;
//     console.log('Form data received:', formData);

//     res.redirect('/thankyou');
// });

// app.get('/thankyou', (req, res) => {
//     res.send('Thank you for submitting the form!');
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));


//fs module testing 

// fs.readFile('test.txt', (err, data) => {
//     if (err){
//         return console.error(err);
//     }
//     console.log("Async Data: "+ data.toString());
// });


// const data = fs.readFileSync('test.txt');
// console.log("Sync Data: "+ data.toString());

// const buf = new Buffer(1024);
// fs.open("test.txt", "r+", (err, data)=>{
//     if(err){
//         return console.error(err);
//     }
//     console.log("File Open Successfully");
//     fs.read(data, buf, 0, buf.length, 0, function (err, bytes) {
//         if (err) {
//             console.log(err);
//         }
//         console.log(bytes + " bytes read");

//         // Print only read bytes to avoid junk.
//         if (bytes > 0) {
//             console.log(buf.slice(0, bytes).toString());
//         }
//     });
// });


// console.log("writing into existing file");
// let data="This is new edit in file";
// fs.writeFile("input.txt", data, function (err) {
//     if (err) {
//         return console.error(err);
//     }

//     console.log("Data written successfully! \n"+ data);
//     console.log("Let's read newly written data");

//     fs.readFile("input.txt", function (err, data) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log("Asynchronous read: " + data.toString());
//     });
// });

// let data = "this is append into data";

// fs.appendFile("test.txt", data, "utf-8", function (err) {
//     if (err) throw err;
//     console.log("Data is appended to file successfully.");


// });



// let fd = 0;
// fs.close(fd, function (err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("File closed successfully.");
// });



// console.log("deleting an existing file");
// fs.unlink("input.txt", function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("File deleted successfully!");
// });



//path module testing 

// var pt = path.join('Users', 'Refsnes', 'demo_path.js');
// console.log(pt);
// const absolutePath = path.resolve('folder', 'test.txt');
// console.log(absolutePath);
// const filename = path.basename('/path/to/file.txt');
// console.log(filename);
// const dirname = path.dirname('/path/to/file.txt'); 
// const extension = path.extname('/path/to/file.txt');
// const normalizedPath = path.normalize('/path/to/../file.txt');
// const isAbsolute = path.isAbsolute('/path/to/file.txt');



//Event Module

//first method
// class MyEvent extends EventEmitter{}
// const MyEventNew = new MyEvent();

// MyEventNew.on('evente',(msg)=>{
//     console.log(msg);
// });

// MyEventNew.emit('evente', "First Event");



//second methods
// var eventEmmiter = new EventEmitter();
// var fun1 = (msg) =>{
//     console.log("Messagage from fun1:" + msg);
// }
// var fun2 = (msg) =>{
//     console.log("Messagage from fun2:" + msg);
// }

// eventEmmiter.on("myevent", fun1);
// eventEmmiter.on("myevent", fun1);
// eventEmmiter.on("myevent", fun2);

// eventEmmiter.removeListener('myevent', fun1);

// eventEmmiter.emit("myevent", "event occured");

// eventEmmiter.removeAllListeners("myevent");

// eventEmmiter.emit("myevent", "event occured");



//Read Line

// const rl = ReadLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What is your name\n', (answer)=>{
// console.log(`hello, ${answer}!`)
// rl.close();
// });


//child process 


// const child =
//     spawn(
//         'dir', ['C:\\Users\\Suraj\\Documents\\Nodejs'],
//         { shell: true }
//     );
// child.stdout.on('data',
//     (data) => {
//         console.log(`stdout: ${data}`);
//     });

// child.stderr.on('data',
//     (data) => {
//         console.error(`stderr: ${data}`);
//     });

// child.on('close',
//     (code) => {
//         console.log(
//             `child process exited with code ${code}`
//         );
//     });




// exec(`ls -lh`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`Stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Stdout: ${stdout}`);
// });




// execFile('node', ['-v'], (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`Stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Node.js version: ${stdout}`);
// });




// const child = fork('child.js');

// child.on('message', (message) => {
//   console.log(`Received from child: ${message}`);
// });

// child.send('Hello from parent');



// const app = express();
// const port = 3000;

// app.get('/run-command', (req, res) => {
//   exec('ls -lh', (error, stdout, stderr) => {
//     if (error) {
//       return res.status(500).send(`Error: ${error.message}`);
//     }
//     if (stderr) {
//       return res.status(500).send(`Stderr: ${stderr}`);
//     }
//     res.send(`<pre>${stdout}</pre>`);
//   });
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));



//Crypto Module

// const hash = crypto.createHash('sha256')
//                    .update('myPassword')
//                    .digest('hex');

// console.log(hash); 




// const secret = 'mySecretKey';
// const hmac = crypto.createHmac('sha256', secret)
//                    .update('myMessage')
//                    .digest('hex');

// console.log(hmac);


// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// function encrypt(text) {
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// function decrypt(encrypted) {
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// const rl = ReadLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What is your Password\n', (answer)=>{
// const encrypted = encrypt(answer);
// console.log(`Thankyou your Password accepted -_- \nYour Encrypted Password:`,encrypted)
// const decrypted = decrypt(encrypted);
// console.log('Your Decrypted Password:', decrypted);
// rl.close();
// });



// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/singup', (req, res) => {
//   const { username, password } = req.body;

//   const hash = crypto.createHash('sha256').update(password).digest('hex');

//   console.log(`Storing user ${username} with password hash ${hash}`);

//   res.send('User signed up successfully!');
// });

// app.listen(port, () => console.log(`App listening on port ${port}`));







// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   // Hash the password before storing
//   const hash = require('crypto').createHash('sha256').update(password).digest('hex');

//   // Check if the file exists
//   let users = [];
//   if (fs.existsSync('users.json')) {
//     users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
//   }

//   // Add the new user
//   users.push({ username, passwordHash: hash });

//   // Save the updated users back to the JSON file
//   fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

//   res.send('User signed up successfully and stored in a JSON file!');
// });

// app.listen(port, () => console.log(`App listening on port ${port}`));




//Url Module

// const parsedUrl = url.parse('https://www.example.com/path?query=123');
// console.log(parsedUrl);


//Buffer Module
// const buffer = Buffer.from('Hello, World!', 'utf-8');
// console.log(buffer.toString('utf-8'));


//os Module

// console.log(`OS Type: ${os.type()}`);
// console.log(`Free Memory: ${os.freemem()} bytes`);


//Buffer 


// // Different Method to create Buffer
// const buffer1 = Buffer.alloc(100);
// const buffer2 = new Buffer('SK');
// const buffer3 = Buffer.from([1, 2, 3, 4]);

// // Writing data to Buffer
// buffer1.write("Happy");

// // Reading data from Buffer
// const a = buffer1.toString('utf-8');
// console.log(a);

// // Check object is buffer or not
// console.log(Buffer.isBuffer(buffer1));

// // Check length of Buffer
// console.log(buffer1.length);

// // Copy buffer
// const bufferSrc = new Buffer('ABC');
// const bufferDest = Buffer.alloc(3);
// bufferSrc.copy(bufferDest);

// const Data = bufferDest.toString('utf-8');
// console.log(Data);

// // Slicing data
// const bufferOld = new Buffer('techahead');
// const bufferNew = bufferOld.slice(0, 4);
// console.log(bufferNew.toString());

// // concatenate two buffer
// const bufferOne = new Buffer('Happy ');
// const bufferTwo = new Buffer('With Techahead');
// const bufferThree = Buffer.concat([bufferOne, bufferTwo]);
// console.log(bufferThree.toString());



const { authenticateToken, registerEmployee, loginEmployee } = require('./auth');
const { refreshAccessToken, logoutEmployee } = require('./auth');
const db = require('./db');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Ensure the 'uploads' directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Set up storage configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = Date.now() + ext; // Filename with timestamp to avoid conflicts
        cb(null, filename);
    }
});

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and PDF files are allowed.'), false);
    }
};

// Multer configuration with limits and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: fileFilter
});

// Joi schema for validating employee data
const employeeSchema = Joi.object({
    first_name: Joi.string().trim(),
    last_name: Joi.string().trim(),
    email: Joi.string().email().trim().required(),
    phone_number: Joi.string().trim().optional(),
    date_of_birth: Joi.date().iso().optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    address: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    zip_code: Joi.string().trim().optional(),
    department: Joi.string().trim().optional(),
    job_title: Joi.string().trim().optional(),
    salary: Joi.number().min(0).optional(),
    hire_date: Joi.date().iso().optional(),
    profile_picture: Joi.string().optional(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

// Joi schema for partially updating employee data
const employeePatchSchema = Joi.object({
    first_name: Joi.string().trim().optional(),
    last_name: Joi.string().trim().optional(),
    email: Joi.string().email().trim().optional(),
    phone_number: Joi.string().trim().optional(),
    date_of_birth: Joi.date().iso().optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    address: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string().trim().optional(),
    country: Joi.string().trim().optional(),
    zip_code: Joi.string().trim().optional(),
    department: Joi.string().trim().optional(),
    job_title: Joi.string().trim().optional(),
    salary: Joi.number().min(0).optional(),
    hire_date: Joi.date().iso().optional(),
    profile_picture: Joi.string().optional(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

// Middleware to validate request data using Joi
const validateEmployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

const validateEmployeePatch = (req, res, next) => {
    const { error } = employeePatchSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};


// Route to register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    registerEmployee(username, password, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Route to login and get a JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    loginEmployee(username, password, (err, token) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ token });
    });
});

// Route to refresh access token using refresh token
app.post('/refresh-token', refreshAccessToken);

// Route to log out and invalidate the refresh token
app.post('/logout', logoutEmployee);


// Route to handle adding a new employee with file upload
app.post('/employees', upload.single('profile_picture'), authenticateToken, validateEmployee, (req, res) => {
    const {
        first_name, last_name, email, phone_number, date_of_birth, gender,
        address, city, state, country, zip_code, department, job_title,
        salary, hire_date
    } = req.body;

    const profilePicture = req.file ? req.file.filename : null;

    const sql = `INSERT INTO Employee 
      (first_name, last_name, email, phone_number, date_of_birth, gender,
       address, city, state, country, zip_code, department, job_title, salary, hire_date, profile_picture) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [first_name, last_name, email, phone_number, date_of_birth, gender,
        address, city, state, country, zip_code, department, job_title, salary, hire_date, profilePicture],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: result.insertId, ...req.body, profile_picture: profilePicture });
        });
});

// Route to handle updating an employee with file upload
app.put('/employees/:id', upload.single('profile_picture'), authenticateToken, validateEmployee, (req, res) => {
    const { id } = req.params;
    const {
        first_name, last_name, email, phone_number, date_of_birth, gender,
        address, city, state, country, zip_code, department, job_title,
        salary, hire_date
    } = req.body;

    const profilePicture = req.file ? req.file.filename : null;

    const sql = `UPDATE Employee SET 
      first_name = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, gender = ?,
      address = ?, city = ?, state = ?, country = ?, zip_code = ?, department = ?, job_title = ?, salary = ?, hire_date = ?,
      profile_picture = COALESCE(?, profile_picture) 
      WHERE id = ?`;

    db.query(sql, [first_name, last_name, email, phone_number, date_of_birth, gender,
        address, city, state, country, zip_code, department, job_title, salary, hire_date, profilePicture, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json({ message: 'Employee updated successfully' });
        });
});

// Route to handle partially updating an employee's data
app.patch('/employees/:id', upload.single('profile_picture'), authenticateToken, validateEmployeePatch, (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    let sql = 'UPDATE Employee SET ';
    const updateValues = [];

    // Add fields from req.body to the update query
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            sql += `${key} = ?, `;
            updateValues.push(updates[key]);
        }
    }

    // If a profile picture is uploaded, add it to the update query
    if (req.file) {
        sql += `profile_picture = ?, `;
        updateValues.push(req.file.filename);
    }

    // If there are no fields to update, return an error
    if (updateValues.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' });
    }

    // Remove the trailing comma and space
    sql = sql.slice(0, -2);
    sql += ' WHERE id = ?';
    updateValues.push(id);

    db.query(sql, updateValues, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    });
});

// Route to delete an employee by ID
app.delete('/employees/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Employee WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Route to fetch employee details by ID
app.get('/employees/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Employee WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(result[0]);
    });
});

// Route to fetch employee details by ID
app.get("/employees", (req, res) => {
    const { id } = req.params;
  
    const sql = "SELECT * FROM Employee";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(result[0]);
    });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});