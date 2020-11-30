const { Router } = require('express');
const { getMovie, getOneMovie } = require('../controllers');

const router = Router();

router
    .get('/movies/:page', getMovie)
    .get('/movie/:id', getOneMovie)

module.exports = router;