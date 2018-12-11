import User from '../pages/User';

const USER_API_URL = 'https://late-registration-server.herokuapp.com/user/';

export const UserService = {
    findAllUsers: () => {
        return fetch(USER_API_URL + 'getAllUsers')
            .then(function (response) {
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
        });
    },
    deleteUser: userId => {
        return fetch(USER_API_URL + '/deleteUserById/' + userId, {
            method: 'DELETE'
        })
    },
    updateUser: (userId, user) => {
        return fetch(USER_API_URL + '/updateUser/' + userId, {
            method: 'DELETE',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};