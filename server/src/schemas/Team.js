const Schema = require('mongoose').Schema;
const UserModel = require('../models/User');

module.exports = new Schema({
    name: String,
    mascot: String,
    hometown: String,
    coach: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: UserModel
    }]
}, {collection: 'team'});