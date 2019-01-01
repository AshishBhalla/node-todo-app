const {mongoose} = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var { ObjectID } = require('mongodb');

// var id = '5c28ef628ad9085c2ee3b7de';

// if (!ObjectID.isValid(id)){
//     console.log('ID is not valid');
// }

// //selecting id and there is no need to make an object to get id, mongoose will itself take care of it
// // .find returns an array
// Todo.find({
//     _id : id
// }).then((todos) =>{
//     console.log('Todos: ',todos);
// });

// // to find only one document
// Todo.findOne({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// //specifically to find document by id
// Todo.findById(id).then((todos) => {
//     //findById doesn't return any error so we have to handle the scenario as below
//     if(!todos){
//         return console.log('Id not found');
//     }
//     console.log('Todos: ', todos);
// });

//challange

var id = '5c274e23f829b2302de1a91a';
User.findById(id).then((users) =>{
    if (!users){
        return console.log('user not found')
    }
    console.log('user found')
}).catch(e => console.log(e));

