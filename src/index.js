const express = require('express');
const app = express();
const PORT = 4000;

/* 
    this is where i left off, i need to continue designing how the database will be organized in mysql
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