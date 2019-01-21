/****************** library imports*******************************/
const _ = require('lodash');
var express    = require('express');
//body-parser is gonna let us send json to a server, it basically 
//takes a body and convert it into JS object
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
/****************** library imports end***************************/


/****************** local imports********************************/
var {mongoose} = require('./db/mongoose')
var {Todo}     = require('./models/todo')
var {User}     = require('./models/user')
/****************** local imports end****************************/


var app = express();
//Remeber middleware will be called first and this middleware will convert the request coming(which we are assuming is a JSON)\
// to a JS object
app.use(bodyParser.json());

app.post('/todos', (req,res) =>{
    var todo = new Todo({
        text: req.body.text
    });
    //remember doc is returned by mongoose if save is successful
    todo.save().then((doc) =>{
        res.send(doc);
    },(e) =>{
        res.status(400).send(e); 
    })

});


app.get('/todos',(req,res) =>{
    Todo.find().then((todos) =>{
        res.send({
            todos: todos})
    }, (e) =>{
        res.status(400).send(e);
    });
});

//:id is a host variable
app.get('/todos/:id',(req,res) =>{
    var id = req.params.id;
    //validate ID
    if (!ObjectID.isValid(id)){
        //if id is not valid, send 404 and an empty body
        return res.sendStatus(404).send();
    }
    Todo.findById(id).then((todos) =>{
        if (!todos){
            //if todos not found send 404 and an empty body
            res.sendStatus(404).send();
        }
        res.send({
            todos : todos})
    });
});


//DELETE ROUTE
app.delete('/todos/:id', (req,res) =>{
    var id = req.params.id;
    //validate ID
    if (!ObjectID.isValid(id)) {
        //if id is not valid, send 404 and an empty body
        return res.sendStatus(404).send();
    };
    Todo.findByIdAndRemove(id).then((todos) => {
        if (!todos) {
            //if todos not found send 404 and an empty body
            res.sendStatus(404).send();
        }
        res.send({
            todos: todos
        })
    }).catch((e) =>{
        res.sendStatus(400).send();
    }); 
});

//UPDATE route

app.patch('/todos/:id',(req,res) =>{
    var id = req.params.id;
    //_.pick will take the request body and will return the properties specified from the body
    // which will be then a part of the assigned variable i.e. body variable here
    var body = _.pick(req.body,['text','completed']);
    if (!ObjectID.isValid(id)) {
        //if id is not valid, send 404 and an empty body
        return res.sendStatus(404).send();
    };
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {
        $set: body
    },{
        new : true
    }).then((todo) =>{
        if (!todo){
            return res.sendStatus(404).send();
        }
        res.send(todo);
    }).catch((err) =>{
        return res.sendStatus(400).send();
    })
});

app.post('/users',(req,res) =>{
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body);
    // user.save().then((user) =>{
        //removing user from passed parameters
    user.save().then(() => {
        //calling the instance method of the user model
        //in broader sense, we are first saving the user emailid and password and then generating a token for it
        //and then save it via(user model) and then return the entire user back
        return user.generateAuthToken();
        // res.send(user);
        //this is what was returned from the method
    }).then((token) => {
        //add ing x- means we are creating a custom header and not the one used by http request
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.listen(3000, () =>{
    console.log('App strated on port 3000');
})

module.exports = {app};



























/*Below is for infromation*/
// //initializing the model Constructor
// var newTodo = new Todo({
//     text : 'Cook Dinner'
// });

// newTodo.save().then((doc) =>{
//     console.log('Saved todo', doc);
//     //result obtained after insert
//     //Saved todo { __v: 0, text: 'Cook Dinner', _id: 5c2728484abfc6642623d87a }
//     // __v is the version

// },(e) => {
//     console.log("Unable to save todo");
// });

// var newTodo = new Todo({
//     text: '   Eat food   '
// //     completed: false,
// //     completedAt: new Date().getTime()
// })

// newTodo.save((err,doc) =>{
//     if(err) {
//         return console.log("Error saving todo", err);
//     }
//     console.log("todo saved",doc)
// })


// var newUser = new User({
//     email : '    '
// });

// newUser.save().then(() =>{
//     console.log("User added successfully!")
// },(err) =>{
//     console.log('error creating new user!',err)
// })
