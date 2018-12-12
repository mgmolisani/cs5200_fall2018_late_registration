const gameModel = require('../models/Game');

const createGame = game => {
  return gameModel.create(game);
};

const updateGame = (id, game) => {
  return gameModel.findByIdAndUpdate(id, game).exec();
};

const deleteGame = id => {
  return gameModel.findByIdAndDelete(id).exec();
};

const findAllGames = () => {
  return gameModel.find()
      .populate('manager')
      .populate('teams.team')
      .exec();
};

const findAllGamesByType = gameType => {
  return gameModel.find({gameType}).exec();
};

const findGameById = id => {
  return gameModel.findById(id).exec();
};

const addTeamToGame = (gameId, teamId) => {
  return gameModel.findByIdAndUpdate(
      gameId,
      {
        $addToSet: {
          teams: {
            team: teamId
          }
        }
      },
      {new: true}
  ).exec();
};

const removeTeamFromGame = (gameId, teamId) => {
  return gameModel.findByIdAndUpdate(
      gameId,
      {
        $pull: {
          teams: {
            team: teamId
          }
        }
      },
      {new: true}
  ).exec();
};

const updateTeamScore = (gameId, teamId, score) => {
  return gameModel.findOneAndUpdate(
      {
        _id: gameId,
        'teams.team': teamId
      },
      {
        $set: {
          'teams.$.score': score
        }
      },
      {new: true}
  ).exec();
};

const endGame = gameId => {
  return gameModel.findByIdAndUpdate(
      gameId,
      {
        $set: {
          isOver: true
        }
      },
      {new: true}
  ).exec();
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  findAllGames,
  findAllGamesByType,
  findGameById,
  addTeamToGame,
  removeTeamFromGame,
  updateTeamScore,
  endGame
};