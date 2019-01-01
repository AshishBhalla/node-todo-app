var {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if (err){
        return console,log('Error connecting to DB!')
    }
    console.log('Successfully connected to DB!')
    db = client.db('TodoApp');

    // //deleteMany- it deletes all the documents which falls under the criterion
    // db.collection('Todos').deleteMany({completed: true},(err, resut) =>{
    //     if (err){
    //         console.log('Error deleting document(s)!',err);
    //     }
    //     else{
    //         console.log('Deletion successful!');
    //     }
    // })
    // //deletOne- it deletes only first document that fits the criterion and stops
    // db.collection('Todos').deleteOne({ completed: false }, (err, resut) => {
    //     if (err) {
    //         console.log('Error deleting document!', err);
    //     }
    //     else {
    //         console.log('Deletion successful!');
    //     }
    // })

    //findOneAndDelete=- It deletes the first document that falls in criterion and return it, result here is actually the document that was just deleted
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
        console.log(result);
    })

    client.close();
})