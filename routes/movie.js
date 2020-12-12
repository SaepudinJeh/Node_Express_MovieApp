const { Router } = require('express');
const { getMovie, getOneMovie } = require('../controllers');

const router = Router();
const { auth } = require('../middlewares');

router
    .get('/movies/:page', auth, getMovie)
    .get('/movie/:id', getOneMovie)

module.exports = router;