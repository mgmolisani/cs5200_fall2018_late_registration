const GAME_API_URL = (process.env.HOST ? 'https://late-registration-server.herokuapp.com' : 'http://localhost:5000') + '/game';

export const GameService = {
    findAllGames: () => {
        return fetch(GAME_API_URL + '/getAllGames')
            .then(function (response) {
                return response.json();
            });
    },
    createGame: game => {
        return fetch(GAME_API_URL + '/createGame', {
            method: 'POST',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    deleteGame: gameId => {
        return fetch(GAME_API_URL + '/deleteGameById/' + gameId, {
            method: 'DELETE'
        });
    },
    updateGame: (gameId, game) => {
        return fetch(GAME_API_URL + '/updateGame/' + gameId, {
            method: 'PUT',
            body: JSON.stringify(game),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    addTeamToGameByTeamName: (gameId, teamName) => {
        return fetch(GAME_API_URL + '/addTeamToGameByTeamName/' + gameId + '/' + teamName, {
            method: 'PUT'
        });
    },
    removeTeamFromGame: (gameId, teamId) => {
        return fetch(GAME_API_URL + '/removeTeamFromGame/' + gameId + '/' + teamId, {
            method: 'PUT'
        });
    },
    updateScore: (gameId, teamId, score) => {
        return fetch(GAME_API_URL + '/updateScore/' + gameId + '/' + teamId + '/' + score, {
            method: 'PUT'
        });
    },
    endGame: (gameId) => {
        return fetch(GAME_API_URL + '/endGame/' + gameId, {
            method: 'PUT'
        });
    }
};