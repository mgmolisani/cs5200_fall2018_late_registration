const Schema = require('mongoose').Schema;
const UserModel = require('../models/User');

module.exports = new Schema({
    content: String,
    created: {
        type: Date,
        default: new Date()
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    }
}, {collection: 'post'});