const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovie, getOneMovie } = require('./movieC');
const { postComment } = require('./commentC');

module.exports = {
    postLogin,
    getMovie,
    getOneMovie,
    postSignup,
    postComment
}