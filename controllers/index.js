const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovie, getOneMovie } = require('./movieC');

module.exports = {
    postLogin,
    getMovie,
    getOneMovie,
    postSignup
}