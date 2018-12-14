const Schema = require('mongoose').Schema;
const UserModel = require('../models/User');
const PostModel = require('../models/Post');

module.exports = new Schema({
    name: {
        type: String,
        default: 'New Team'
    },
    logo: String,
    mascot: String,
    hometown: String,
    coach: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: UserModel
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: PostModel
    }]
}, {collection: 'team'});