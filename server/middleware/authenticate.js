var {User} = require('./../models/user')

var authenticate = (req, res, next) => {
    //fetching the header
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            //we can either do this
            // res.status(401).send();
            //or we can use the catch block below and return the Promise so that cathc block will get executed
            // this will make sure that DRY is applicable
            return Promise.reject();
        }
        //modify the request i.e. the user has been authenticated
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    })
}

module.exports = {authenticate};