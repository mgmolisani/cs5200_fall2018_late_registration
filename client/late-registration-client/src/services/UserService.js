//const USER_API_URL = 'https://late-registration-server.herokuapp.com/user/';
const USER_API_URL = 'http://localhost:5000/user';

export const UserService = {
    findAllUsers: () => {
        return fetch(USER_API_URL + '/getAllUsers')
            .then(function (response) {
                return response.json();
            });
    },
    findUserByCredentials: (credentials) => {
        return fetch(USER_API_URL + '/getUserByCredentials', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    createUser: user => {
        return fetch(USER_API_URL + '/createUser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    deleteUser: userId => {
        return fetch(USER_API_URL + '/deleteUserById/' + userId, {
            method: 'DELETE'
        });
    },
    updateUser: (userId, user) => {
        return fetch(USER_API_URL + '/updateUser/' + userId, {
            method: 'DELETE',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    }
};