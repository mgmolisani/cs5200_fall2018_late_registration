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

const findUserByCredentials = (username, password) => {
  return userModel.findOne({username: username, password: password}).exec();
}

const getTeamsForUser = id => {
  return findUserById(id)
  .then(user => {
    if (user.teams !== undefined) {
      return user.teams;
    } else {
      return null;
    }
  })
}

const flattenUser = (user) => {

  let newUser = JSON.parse(JSON.stringify(user));

  switch (user.userType) {
    case "Player":
      newUser.teams = user.player.teams;
      newUser.endorsedBy = user.player.endorsedBy;
      delete newUser.player;
      break;
    case "MANAGER":
      newUser.hiredOn = user.manager.hiredOn;
      delete newUser.manager;
      break;
    case "COACH":
      newUser.ratings = user.coach.ratings;
      newUser.yearsExperience = user.coach.yearsExperience;
      delete newUser.coach;
      break;
  }

  return newUser;
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByCredentials,
  getTeamsForUser,
  flattenUser
};