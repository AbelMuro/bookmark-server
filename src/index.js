const express = require('express');
const app = express();
const PORT = 4000;

/* 
    this is where i left off, i finished designing how data will be organized in the database.
    now i need to create the routes on the back-end that will communicate with the database
*/

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