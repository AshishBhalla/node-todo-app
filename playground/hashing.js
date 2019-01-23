const bcrypt = require('bcryptjs');
var password = '123abc!';   
// to salt the password 2 args
// 1: rounds-to increase the complexity 2. a call back function
bcrypt.genSalt(10, (err,salt) =>{
    //to hash the password
    //takes 3 args
    //1. the actual password 2. the salt generated above 3. a call back
    bcrypt.hash(password,salt,(err,hash) =>{
        console.log(hash);
    })
});

var hashedPwd = '$2a$10$TPitrJsuuXzcDuX7PNC4eO2EY6LUlI/eyQhNeO4oknKG3o/O6br02'

// to compare the jhashed password with the original password
//takes 3 args
//1. the string password 2. the hashed password 3. a call back
//res-true if password matches else false
bcrypt.compare(password,hashedPwd,(err,res) =>{
    console.log(res);
})

// const {SHA256} = require('crypto-js');

// const jwt = require('jsonwebtoken');

// var data = {
//     id : 10
// }

// //jwt.sign takes the data and signs it with secret key and creates a hash and return the token value
// var token = jwt.sign(data, '123abc');
// console.log(token);
// //jst.verify takes the token and secret Key and ake sure that data was not altered
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);

// //**Hashing using cypto-js */

// // var msg = "I am user number 1";

// // var hash = SHA256(msg).toString();


// // console.log(`Message: ${msg}`)

// // console.log(`Message: ${hash}`)

// // var data = {
// //     id: 4
// // };

// // //secretKey is salting the hash
// // var token = {
// //     data,
// //     hash : SHA256(JSON.stringify(data) +'secretKey').toString()
// // }

// // data.id = 5;    

// // var resultHash = SHA256(JSON.stringify(token.data) + 'secretKey').toString();



// // if (resultHash === token.hash){
// //     console.log('Data was not changed');
// // }
// // else{
// //     console.log('Dta was changed, don\'t trust');
// // }