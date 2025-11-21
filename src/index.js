const express = require('express');
const cors = require('cors');
const CreateAccount = require('./Routes/POST/CreateAccount.js');
const app = express();
const PORT = 4000;

/* 
    this is where i left off, i finished creating a route that communicates with the mysql database
    now i need to create additional routes for the other webpages on the front end 
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