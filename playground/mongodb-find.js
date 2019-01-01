//Boilerplate code to  make MongoDB connetion

// var {MongoClient} = require('mongodb');

// MongoClient.connect("mongodb://localhost:12707/TodoApp",(err,client) =>{
//     if (err){
//         console.log("Error connecting to DB!")
//     }
//     console.log("Connection established!")
//     var db = client.db(TodoApp);



//     client.close();
// })

var { MongoClient, ObjectID } = require('mongodb');

// MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
//     if (err) {
//         console.log("Error connecting to DB!");
//     };
//     console.log("Connection established!");
//     var db = client.db('TodoApp');
//     //find returns a mongoDB cursor
//     //toArray returns array of the documents from the cursor. It returns a promise
//     // db.collection('Todos').find().toArray().then((docs) =>{
//         //filter out the results as below by passing required property in find, this can be considered equivalent of where in sql
//     // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
//         //selecting ID, this is not a string so require different method
//        db.collection('Todos').find({
//            _id: new ObjectID('5c1fd0939c4f90d51dacd113')
//         }).toArray().then((docs) => {
//         console.log('ToDos')
//         console.log(JSON.stringify(docs,undefined,2));
//     },(err) =>{
//         console.log('Erro fetching documents',err);
//     });

    //instead of using promise we can also use call back as we did for other codes as below-

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c1fd0939c4f90d51dacd113')
    // }).toArray((MongoError, docs) => {
    //     console.log('ToDos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (MongoError) => {
    //     console.log('Erro fetching documents', MongoError);
    // });

//To find the count

    //     var db = client.db('TodoApp');
    //    db.collection('Todos').find().count().then((count) => {
    //     console.log(`ToDos count: ${count}`);
    // },(err) =>{
    //     console.log('Erro fetching documents',err);
    // });


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("Error connecting to DB!");
    };
    console.log("Connection established!");
    var db = client.db('TodoApp');
    //find returns a mongoDB cursor
    //toArray returns array of the documents from the cursor. It returns a promise
    // db.collection('Todos').find().toArray().then((docs) =>{
    //filter out the results as below by passing required property in find, this can be considered equivalent of where in sql
    // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    //selecting ID, this is not a string so require different method
    db.collection('Users').find({
        name : 'Manav'
    }).toArray().then((docs) => {
        console.log('ToDos')
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Erro fetching documents', err);
    });
    client.close();
});