const Schema = require('mongoose').Schema;
const PlayerSchema = require('./Player');
const CoachSchema = require('./Coach');
const ManagerSchema = require('./Manager');

module.exports = new Schema({
    username: {
        type: String,
        default: 'New User'
    },
    password: {
        type: String,
        default: 'password'
    },
    firstName: {
        type: String,
        default: 'first'
    },
    lastName:  {
        type: String,
        default: 'last'
    },
    fitbitToken: String,
    fitbitId: String,
    userType: {
        type: String,
        enum: [
            'PLAYER',
            'COACH',
            'MANAGER',
            'ADMIN'
        ]
    },

    player: {
        type: PlayerSchema,
        default: PlayerSchema
    },
    coach: {
        type: CoachSchema,
        default: CoachSchema
    },
    manager: {
        type: ManagerSchema,
        default: ManagerSchema
    },
}, {collection: 'user'});
