const Schema = require('mongoose').Schema;
const PlayerSchema = require('./Player');
const CoachSchema = require('./Coach');
const ManagerSchema = require('./Manager');

module.exports = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    userType: {
        type: String,
        enum: [
            'PLAYER',
            'COACH',
            'MANAGER',
            'ADMIN'
        ]
    },
    player: PlayerSchema,
    coach: CoachSchema,
    manager: ManagerSchema
}, {collection: 'user'});