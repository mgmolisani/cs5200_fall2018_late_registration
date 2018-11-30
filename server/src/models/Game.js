const model = require('mongoose').model;
const GameSchema = require('../schemas/Game');

module.exports = model('Game', GameSchema);