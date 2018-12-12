const Schema = require('mongoose').Schema;
const UserModel = require('../models/User');
const TeamModel = require('../models/Team');

module.exports = new Schema({
    content: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    }
}, {collection: 'post'});