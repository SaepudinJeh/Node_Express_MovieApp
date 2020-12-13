const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovie, getOneMovie } = require('./movieC');
const { postComment, putComment, deleteComment } = require('./commentC');

module.exports = {
    postLogin,
    getMovie,
    getOneMovie,
    postSignup,
    postComment,
    putComment,
    deleteComment
}