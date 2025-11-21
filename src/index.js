const express = require('express');
const cors = require('cors');
const CreateAccount = require('./Routes/POST/CreateAccount.js');
const app = express();
const PORT = 4000;

/* 
    this is where i left off, i finished designing how data will be organized in the database.
    now i need to create the routes on the back-end that will communicate with the database
*/

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(CreateAccount);


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