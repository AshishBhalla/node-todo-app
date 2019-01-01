var {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp').then((client) =>{
    console.log('Connection estblished!')
    db = client.db('TodoApp');
    //findOneAndUpdate- Takes follwoing args 1. Filter criterion(to select the record to update)
    //2. an update operator-check documentation for anumber of update operators, most common is $set
    //3.{returnOriginal: true/false}- true means it returns pre-update document, flase means post update document
    db.collection('Users').findOneAndUpdate({name: 'Ashish'},{
        $set :{
            name: 'Ashish Bhalla'
        }
    },
        { returnOriginal: false }).then((docs) =>{
            console.log(JSON.stringify(docs,undefined,2))
        },(err) =>{
            console.log(err);
        })
    client.close();
},err =>{
    console.log('Error connecting to DB!',err)
})


