const mongoose = require('mongoose')
// import mongoose from mongoose ES6 module

// connect to mongoose
function connectDatabase(url) {
  mongoose
    .connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Cannot connect: ' + err))
}

module.exports = connectDatabase
