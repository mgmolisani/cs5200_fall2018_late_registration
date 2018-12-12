const TEAM_API_URL = (process.env ? 'https://late-registration-server.herokuapp.com' : 'http://localhost:5000') + '/team';

export const TeamService = {
    findAllTeams: () => {
        return fetch(TEAM_API_URL + '/getAllTeams')
            .then(function (response) {
                return response.json();
            });
    },
    findTeamByName: (name) => {
        return fetch(TEAM_API_URL + '/getUserByCredentials', {
            method: 'POST',
            body: JSON.stringify(name),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    createTeam: team => {
        return fetch(TEAM_API_URL + '/createTeam', {
            method: 'POST',
            body: JSON.stringify(team),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    deleteTeam: teamId => {
        return fetch(TEAM_API_URL + '/deleteTeamById/' + teamId, {
            method: 'DELETE'
        });
    },
    updateTeam: (userId, team) => {
        return fetch(TEAM_API_URL + '/updateTeam/' + userId, {
            method: 'PUT',
            body: JSON.stringify(team),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    },
    addPlayerToTeam: (teamId, userId) => {
        return fetch(TEAM_API_URL + '/addPlayerToTeam/' + teamId + '/' + userId, {
            method: 'PUT'
        });
    },
    removePlayerFromTeam: (teamId, userId) => {
        return fetch(TEAM_API_URL + '/removePlayerFromTeam/' + teamId + '/' + userId, {
            method: 'PUT'
        });
    },
    addPostToTeam: (teamId, postId) => {
        return fetch(TEAM_API_URL + '/addPostToTeam/' + teamId + '/' + postId, {
            method: 'PUT'
        });
    },
    removePostFromTeam: (teamId, postId) => {
        return fetch(TEAM_API_URL + '/removePostFromTeam/' + teamId + '/' + postId, {
            method: 'PUT'
        });
    }
};