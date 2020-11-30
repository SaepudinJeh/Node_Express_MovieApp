const logger = require('../../configuration/logger');

module.exports.getLogin = (req, res, next) => {
    logger.info('Hello');
    res.send('Welcome to the login page!');
}