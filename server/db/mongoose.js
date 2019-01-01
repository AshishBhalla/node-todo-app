var mongoose = require('mongoose');

//Telling mongoose to use inbuilt Promise library
mongoose.Promise = global.Promise;

//Creating a db connection using mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};