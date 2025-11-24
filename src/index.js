const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CreateAccount = require('./Routes/POST/CreateAccount.js');
const CreateToken = require('./Routes/POST/CreateToken.js');
const ResetPassword = require('./Routes/POST/ResetPassword.js');
const Login = require('./Routes/POST/Login.js');
const app = express();
const PORT = 4000;

/* 
    this is where i left off, i need to finish using the promise based method of performing queries to the database
    more specifically, on the ResetPassword component, then i need to test out the forgot-reset feature
*/

app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(CreateAccount);
app.use(CreateToken);
app.use(Login);
app.use(ResetPassword);


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