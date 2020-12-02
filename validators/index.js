const { required } = require('joi')

const { schema, logSchema } = require('./userValidator');

module.exports = {
    userValidator: schema,
    logSchema
}