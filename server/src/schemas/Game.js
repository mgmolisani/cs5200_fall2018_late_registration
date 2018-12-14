const Schema = require('mongoose').Schema;
const TeamModel = require('../models/Team');
const UserModel = require('../models/User');

module.exports = new Schema({
    start: {
        type: Date,
        default: new Date()
    },
    location: {
        type: String,
        default: 'Location 1'
    },
    gameType: {
        type: String,
        default: 'Game Type 1'
    },
    teams: [
        {
            _id: false,
            team: {
                type: Schema.Types.ObjectId,
                ref: TeamModel
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ],
    manager: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    isOver: {
        type: Boolean,
        default: false
    }
}, {collection: 'game'});