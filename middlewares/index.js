const morgan = require('morgan')
const express = require('express')

const { logger } = require('../configuration')

module.exports = (app) => {
    app.use(morgan('combined', { stream: logger.stream }));
    app.use(express.json());
}