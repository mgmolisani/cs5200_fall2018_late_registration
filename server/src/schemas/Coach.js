const Schema = require('mongoose').Schema;

module.exports = new Schema({
    ratings: [{
        type: Number,
        min: 1,
        max: 5
    }],
    yearsExperience: Number
});