const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var {ObjectID} = require('mongodb');

//Todo.remove({})- removing all the items but doesn't remove anything

// Todo.remove({}).then((res) =>{
//     console.log(res);
// })

//remove only one document and returns the same as well
// Todo.findOneAndRemove({ _id: '5c2d98b44977b8ddbb4b6cd3'}).then((todo) =>{
//     console.log(todo);
// })

//remove document by using ID and return the document
Todo.findByIdAndRemove('5c2d98b44977b8ddbb4b6cd3').then((todo) =>{
    console.log(todo);
})