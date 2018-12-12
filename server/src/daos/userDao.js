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
};

const findUserByCredentials = (username, password) => {
    return userModel.findOne({username: username, password: password}).exec();
};

const getTeamsForUser = id => {
    return findUserById(id)
        .then(user => {
            if (user.teams !== undefined) {
                return user.teams;
            } else {
                return null;
            }
        });
};

const addCoachRating = (userId, rating) => {
    return userModel.findByIdAndUpdate(
        userId,
        {
            $push: {
                "coach.ratings": rating
            }
        },
        {new: true}
    ).exec();
};

const updateYearsExperience = (userId, yearsExperience) => {
    return userModel.findByIdAndUpdate(
        userId,
        {
            $set: {
                coach: {
                    yearsExperience: yearsExperience
                }
            }
        },
        {new: true}
    ).exec();
};

const endorsePlayer = (playerEndorsingId, playerBeingEndorsedId) => {
    return userModel.findByIdAndUpdate(
        playerBeingEndorsedId,
        {
            $push: {
                'player.endorsedBy': playerEndorsingId
            }
        },
        {new: true}
    ).exec();
};

const unendorsePlayer = (playerEndorsingId, playerBeingEndorsedId) => {
    return userModel.findByIdAndUpdate(
        playerBeingEndorsedId,
        {
            $pull: {
                'player.endorsedBy': playerEndorsingId
            }
        },
        {new: true}
    ).exec();
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    findAllUsers,
    findUserById,
    findUserByCredentials,
    getTeamsForUser,
    addCoachRating,
    updateYearsExperience,
    endorsePlayer,
    unendorsePlayer
};