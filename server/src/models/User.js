const model = require('mongoose').model;
const UserSchema = require('../schemas/User');

module.exports = model('User', UserSchema);