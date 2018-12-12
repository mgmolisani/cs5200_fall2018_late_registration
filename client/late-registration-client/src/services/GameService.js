//const USER_API_URL = 'https://late-registration-server.herokuapp.com/user/';
const GAME_API_URL = 'http://localhost:5000/game';

export const GameService = {
    findAllGames: () => {
        return fetch(GAME_API_URL + '/getAllGames')
            .then(function (response) {
                return response.json();
            });
    },
    findUserByCredentials: (credentials) => {
        return fetch(GAME_API_URL + '/getUserByCredentials', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
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
    }
};