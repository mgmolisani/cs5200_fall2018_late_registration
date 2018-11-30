const mongoose = require('mongoose');
const GameModel = require('../models/Game');
const TeamModel = require('../models/Team');

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

const findGameById = id => {
    return GameModel.findById(id).exec();
};

const addTeamToGame = (gameId, teamId) => {
    return Promise.all([
        GameModel.findById(gameId).exec(),
        TeamModel.findById(teamId).exec()
    ])
        .then(([game, team]) => {
            console.log(game.gameType + ' ' + team.name);
            return GameModel.findByIdAndUpdate(
                gameId,
                {
                    $addToSet: {
                        teams: {
                            team: teamId
                        }
                    }
                });
        });
};

// const removeTeamFromGame = (gameId, teamId) => {
//     return Promise.all([
//         GameModel.findById(gameId).exec(),
//         TeamModel.findById(teamId).exec()
//     ])
//         .then(([game, team]) => {
//             console.log(game.gameType + ' ' + team.name);
//             return GameModel.Update(
//                 {_id: gameId,
//                 $in}
//                 , {
//                     $pull: {
//                         team: teamId
//                     }
//                 });
//         });
// };

module.exports = {
    createGame,
    updateGame,
    deleteGame,
    findAllGames,
    findGameById,
    addTeamToGame,
    //removeTeamFromGame,
    //TODO: Add the remaining methods
};