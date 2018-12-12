const teamModel = require('../models/Team');
const userModel = require('../models/User');

const createTeam = team => {
  return teamModel.create(team);
};

const updateTeam = (id, team) => {
  return teamModel.findByIdAndUpdate(id, team).exec();
};

const getTeamByName = (teamName) => {
  return teamModel.findOne({name: teamName}).exec();

};


const updateCoach = (teamId, coachId) => {
  return findTeamById(teamId)
  .then(result => {
    let clone = JSON.parse(JSON.stringify(result));
    clone.coach = coachId;
    return teamModel.findByIdAndUpdate(teamId, clone)
  })
};

const deleteTeam = id => {
  return teamModel.findByIdAndDelete(id).exec();
};


const addPlayerToTeam = (teamId, playerId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        $addToSet: {
          players: playerId
        }
      },
      {new: true}
  ).exec();
};

const removePlayerFromTeam = (teamId, playerId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        $pull: {
          players: playerId
        }
      },
      {new: true}
  ).exec();
};

const addPostToTeam = (teamId, postId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        $push: {
          posts: postId
        }
      },
      {new: true}
  ).exec();
};

const removePostFromTeam = (teamId, postId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        pull: {
          posts: postId
        }
      },
      {new: true}
  ).exec();
};

const findAllTeams = () => {
  return teamModel.find()
      .populate({
          path: 'posts',
          populate: {
              path: 'postedBy',
              model: userModel
          }
      })
      .populate('players')
      .populate('coach')
      .exec();
};

const findTeamById = id => {
  return teamModel.findById(id).exec();
};

// const findAllTeamsForPlayer = (playerId) => {
//   teamModel.
//   return userModel.findOne({username: username, password: password}).exec();
// }
module.exports = {
  createTeam,
  updateTeam,
  deleteTeam,
  findAllTeams,
  findTeamById,
  addPlayerToTeam,
  removePlayerFromTeam,
  updateCoach,
  getTeamByName,
  addPostToTeam,
  removePostFromTeam
};