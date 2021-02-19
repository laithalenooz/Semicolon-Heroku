const express = require('express');
const connectDB = require('./config/db');
const {check} = require("express-validator");
const path = require('path');

const app = express();

//connect to db
connectDB();

// Init Middleware
app.use(express.json({extended: false}));


// Defining Routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/posts', require('./routes/API/posts'));

// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));