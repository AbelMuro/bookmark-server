const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CreateAccount = require('./Routes/POST/CreateAccount.js');
const CreateToken = require('./Routes/POST/CreateToken.js');
const ResetPassword = require('./Routes/POST/ResetPassword.js');
const Login = require('./Routes/POST/Login.js');
const Logout = require('./Routes/DELETE/Logout.js');
const addBookmark = require('./Routes/POST/AddBookmark.js');
const getBookmarks = require('./Routes/GET/GetBookmarks.js');
const editBookmark = require('./Routes/PUT/EditBookmark.js');
const updateBookmark = require('./Routes/PUT/UpdateBookmark.js');
const archiveBookmark = require('./Routes/PUT/ArchiveBookmark.js');
const pinBookmark = require('./Routes/PUT/PinBookmark.js');
const getTags = require('./Routes/GET/GetTags.js');
const deleteBookmark = require('./Routes/DELETE/DeleteBookmark.js');
const app = express();
const PORT = 4000;


app.use(cookieParser());
app.use(cors({
    origin: 'https://bookmark-manager-app-front-end.netlify.app/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
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
app.use(getBookmarks);
app.use(editBookmark);
app.use(updateBookmark);
app.use(archiveBookmark);
app.use(pinBookmark);
app.use(getTags);
app.use(deleteBookmark);

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

module.exports = app;