const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const validator = require('validator');

const _ = require('lodash');
const bcrypt = require('bcryptjs');

//creating a mongoose schema for User so that mongoose knows how to store the data
//its like defining the table structure

var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            // to make id unique
            unique: true,
            //mongoose custom validator
            validate: {
                //creating a custom function as described in doc
                // validator : (value) =>{
                //     //using validator library
                //     validator.isEmail(value);
                // },
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
            password: {
                type: String,
                required: true,
                minlength: 6
            },
            tokens: [{
                access: {
                    type: String,
                    required: true
                },
                token: {
                    type: String,
                    required: true
                }
            }]
        })

    //defining instance methods on the schema, it has access to all the objects defined in schema
    //note we are using function and not arrow function as arro function doesn't bind this variable
UserSchema.methods.generateAuthToken = function() {
    //instance methods are called on the individual document hence "user"(which is a document)
    var user = this;
    var access = 'auth';
    //jwt.sign({object},secretKey)
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
        
        //puttng the access and the toke just generated in the user schema defined above
        //user.tokens is a regular array hence concat can be used as it can be used on arrays(push doesn't work correctly hence used concat)
        user.tokens = user.tokens.concat([{access, token}]);

        //above is actually updating the local user model, below actually saves it on the DB
        //returning the user.save().then() so that it can be used in server.js as a promise, remember 
        //mostly the call backs are returned but here we are returning a property i.e. token
        //so to use it as a prmise we are returning the complete then call to be sued a promise
    return user.save().then(() =>{
        return token;
    });
};

//creating a model method
UserSchema.statics.findByToken = function(token){
    //model methods are called upon the model hence "User"(which is a model)
    var User = this
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123');
    }
    catch(e){
        // either use this
        // return new Promise((resolve, reject) =>{
        //     reject();
        // })
        //or use this
        return Promise.reject();
    }

    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
};

UserSchema.statics.findByCredentials = function(email,password) {
    var User = this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            //rejecting by giving a reject promise
            return Promise.reject();
        }
        //bcrypt uses callbacks and not the promises, thus we are adhocally returning a promise
        //for bcrypt
        return new Promise((resolve,reject) =>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if (res){
                    resolve(user);
                }
                else{
                    reject();
                }
            })
        })
    })
}

//overriding the toJSON() method to send only the required properties in the JSON
UserSchema.methods.toJSON = function(){
    var user = this;
    //toObject() converts a mongoose model into a JS object
    var userObject = user.toObject();

    return _.pick(userObject, ['_id','email'])
}



//below is a mongoose middleware to hash the password
UserSchema.pre('save', function(next){
    var user = this;
    //to only hash the password if it was modified i.e. to stop the rehashing a hashed password
    if (user.isModified('password')){
        // to salt the password 2 args
        // 1: rounds-to increase the complexity 2. a call back function
        bcrypt.genSalt(10,(err, salt) =>{
            bcrypt.hash(user.password,salt,(err,hash) =>{
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

//creating the model using Schema
var User = mongoose.model('User',UserSchema);

module.exports = {User};   