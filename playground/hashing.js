const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
    id : 10
}

//jwt.sign takes the data and signs it with secret key and creates a hash and return the token value
var token = jwt.sign(data, '123abc');
console.log(token);
//jst.verify takes the token and secret Key and ake sure that data was not altered
var decoded = jwt.verify(token,'123abc');
console.log(decoded);

//**Hashing using cypto-js */

// var msg = "I am user number 1";

// var hash = SHA256(msg).toString();


// console.log(`Message: ${msg}`)

// console.log(`Message: ${hash}`)

// var data = {
//     id: 4
// };

// //secretKey is salting the hash
// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) +'secretKey').toString()
// }

// data.id = 5;    

// var resultHash = SHA256(JSON.stringify(token.data) + 'secretKey').toString();



// if (resultHash === token.hash){
//     console.log('Data was not changed');
// }
// else{
//     console.log('Dta was changed, don\'t trust');
// }