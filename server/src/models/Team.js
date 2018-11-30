const model = require('mongoose').model;
const TeamSchema = require('../schemas/Team');

module.exports = model('Team', TeamSchema);