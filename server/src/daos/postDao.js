const postModel = require('../models/Post');

const createPost = post => {
  return postModel.create(post);
};

const updatePost = (id, post) => {
  return postModel.findByIdAndUpdate(id, post).exec();
};

const deletePost = id => {
  return postModel.findByIdAndDelete(id).exec();
};

const findAllPosts = () => {
  return postModel.find().exec();
};

const findPostById = id => {
  return postModel.findById(id).exec();
};

const findAllPostsForPlayer = (playerId) => {
  return postModel.find({postedBy: playerId}).exec();
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  findAllPosts,
  findPostById,
  findAllPostsForPlayer
};