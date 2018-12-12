const Schema = require('mongoose').Schema;
const TeamModel = require('../models/Team');
const UserModel = require('../models/User');

module.exports = new Schema({
    endorsedBy: [{
        type: Schema.Types.ObjectId,
        ref: UserModel
    }]
});