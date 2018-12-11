const userModel = require('../models/User');

const createUser = user => {
    return userModel.create(user);
};

const updateUser = (id, user) => {
    return userModel.findByIdAndUpdate(id, user).exec();
};

const deleteUser = id => {
    return userModel.findByIdAndDelete(id).exec();
};

const findAllUsers = () => {
    return userModel.find().exec();
};


const findUserById = id => {
    return userModel.findById(id).exec();
}

const getTeamsForUser = id => {
  return findUserById(id)
  .then( user => {
      if (user.teams !== undefined) {
          return user.teams;
      } else {
          return null;
      }
  })
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    findAllUsers,
    findUserById
};