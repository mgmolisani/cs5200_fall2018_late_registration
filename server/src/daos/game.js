const GameModel = require('../models/Game');

const createGame = game => {
    return GameModel.create(game);
};

const updateGame = (id, game) => {
    return GameModel.findByIdAndUpdate(gameId, game).exec();
};

const deleteGame = id => {
    return GameModel.findByIdAndDelete(id).exec();
};

const findAllGames = () => {
    return GameModel.find().exec();
};

const findAllGamesByType = gameType => {
    return GameModel.find({gameType}).exec();
};

const findGameById = id => {
    return GameModel.findById(id).exec();
};

const addTeamToGame = (gameId, teamId) => {
    return GameModel.findByIdAndUpdate(
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
    return GameModel.findByIdAndUpdate(
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
    return GameModel.findOneAndUpdate(
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
    return GameModel.findByIdAndUpdate(
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