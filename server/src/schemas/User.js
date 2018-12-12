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