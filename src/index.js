const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CreateAccount = require('./Routes/POST/CreateAccount.js');
const CreateToken = require('./Routes/POST/CreateToken.js');
const ResetPassword = require('./Routes/POST/ResetPassword.js');
const Login = require('./Routes/POST/Login.js');
const Logout = require('./Routes/DELETE/Logout.js');
const addBookmark = require('./Routes/POST/AddBookmark.js');
const app = express();
const PORT = 4000;


app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', ''],
    credentials: true,
}));
app.use(express.json());
app.use(CreateAccount);
app.use(CreateToken);
app.use(Login);
app.use(ResetPassword);
app.use(Logout);
app.use(addBookmark);


app.get('/', (req, res) => {
    res.send('Hello world')
});


app.listen(PORT, (error) => {
    if(error){
        console.log(error, 'error occurred');
        return;
    }
    console.log(`Server is running on port ${PORT}`);
})