var mongoose = require('mongoose')

//creating a mongoose model for Todo so that mongoose knows how to store the data
//its like defining the table structure

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        //below are the validators
        required: true,
        minlength: 1,
        //trim to tackel white leading and trailing spaces
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null

    }
});

module.exports = {Todo}