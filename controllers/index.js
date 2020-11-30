const { getLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovie, getOneMovie } = require('./movieC');

module.exports = {
    getLogin,
    getMovie,
    getOneMovie,
    postSignup
}