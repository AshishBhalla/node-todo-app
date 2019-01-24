const {ObjectID} = require('mongodb');

const {Todo} = require('./../../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'Test to do text'
},
{
    _id: new ObjectID(),
    text: 'Second test todo'
}]


const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    })
};


module.exports = {
    todos,
    populateTodos
}