const PostModel = require('../models/Post');

const createPost = post => {
    return PostModel.create(post);
};

const updatePost = (id, post) => {
    return PostModel.findByIdAndUpdate(id, post).exec();
};

const deletePost = id => {
    return PostModel.findByIdAndDelete(id).exec();
};

const findAllPosts = () => {
    return PostModel.find().exec();
};


const findPostById = id => {
    return PostModel.findById(id).exec();
};



module.exports = {
    createPost,
    updatePost,
    deletePost,
    findAllPosts,
    findPostById
};