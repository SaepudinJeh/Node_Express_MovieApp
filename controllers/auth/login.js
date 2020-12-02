const createError = require('http-errors');

const { User } = require('../../models');

const postLogin = (req,res,next) => {
    User.login(req.body)
    .then(result => {

        if (result instanceof Error) {
            return next(result);
        }

        res.send(result);

    })
    .catch(err => {
        next(createError(500))
    })
}

module.exports = {
    postLogin
}