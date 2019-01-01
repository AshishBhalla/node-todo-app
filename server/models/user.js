var mongoose = require('mongoose')

//creating a mongoose model for User so that mongoose knows how to store the data
//its like defining the table structure

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};