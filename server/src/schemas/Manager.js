const Schema = require('mongoose').Schema;

module.exports = new Schema({
    hiredOn: {
        type: Date,
        default: new Date()
    }
});