const model = require('mongoose').model;
const PostSchema = require('../schemas/Post');

module.exports = model('Post', PostSchema);