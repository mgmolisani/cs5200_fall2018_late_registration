var router = require('express').Router();
var userDao = require('../../daos/userDao');
var teamDao = require('../../daos/teamDao');
var gameDao = require('../../daos/gameDao');
var postDao = require('../../daos/postDao');

router.get('/', function (req, res, next) {
    res.send('Welcome to the user router.');
});

router.get('/getAllUsers', function (req, res, next) {
    return userDao.findAllUsers()
        .then(function (result) {
            const new_arr = result.map(user => flattenUser(user));
            res.send(new_arr);
            return new_arr;
        })
        .catch(next);
});

router.get('/getUserById/:id', function (req, res, next) {
    return userDao.findUserById(req.params.id)
        .then(result => {
            let flatUser = flattenUser(result);
            res.send(flatUser);
            return flatUser;
        })
        .catch(next);
});

router.post('/createUser', function (req, res, next) {
    let user = req.body;
    return userDao.createUser(user)
        .then(result => {
            let flatUser = flattenUser(result);
            res.send(flatUser);
            return flatUser;
        })
        .catch(next);
});

router.post('/getUserByCredentials', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    return userDao.findUserByCredentials(username, password)
        .then(result => {
            let flatUser = flattenUser(result);
            res.send(flatUser);
            return flatUser;
        })
        .catch(next);
});

router.put('/updateUser/:id', function (req, res, next) {
    let id = req.params.id;
    let user = req.body;
    return userDao.updateUser(id, unflattenUser(user))
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/endorsePlayer/:playerEndorsingId/:playerBeingEndorsedId', function (req, res, next) {
    let playerEndorsingId = req.params.playerEndorsingId;
    let playerBeingEndorsedId = req.params.playerBeingEndorsedId;
    return userDao.endorsePlayer(playerEndorsingId, playerBeingEndorsedId)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/unendorsePlayer/:playerEndorsingId/:playerBeingEndorsedId', function (req, res, next) {
    let playerEndorsingId = req.params.playerEndorsingId;
    let playerBeingEndorsedId = req.params.playerBeingEndorsedId;
    return userDao.unendorsePlayer(playerEndorsingId, playerBeingEndorsedId)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/addCoachRating/:coachId/:rating', function (req, res, next) {
    let coachId = req.params.coachId;
    let rating = req.params.rating;
    return userDao.addCoachRating(coachId, rating)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/updateYearsExperience/:coachId/:yearsExperience', function (req, res, next) {
    let coachId = req.params.coachId;
    let yearsExperience = req.params.yearsExperience;
    return userDao.updateYearsExperience(coachId, yearsExperience)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/updateFitbitToken/:userId/:fitbitToken', function (req, res, next) {
    let fitbitToken = req.params.fitbitToken;
    let userId = req.params.userId;
    return userDao.updateFitbitToken(userId, fitbitToken)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.put('/updateFitbitId/:userId/:fitbitId', function (req, res, next) {
    let fitbitId = req.params.fitbitId;
    let userId = req.params.userId;
    return userDao.updateFitbitId(userId, fitbitId)
        .then(result => {
            res.send(result);
            return result;

        })
        .catch(next);
});

router.delete('/deleteUserById/:id', function (req, res, next) {
    let id = req.params.id;
    let deletedUser = null;
    return userDao.deleteUser(id)
        .then(result => {
            return userDao.findAllUsers()
        })
        .then(users => {
            return Promise.all(
                users.map(userId => userDao.unendorsePlayer(id, userId))
            );
        })
        .then(() => {
            return teamDao.findAllTeamsForPlayer(id);
        })
        .then(teams => {
            return Promise.all(
                teams.map(team => teamDao.removePlayerFromTeam(team._id, id))
            );
        })
        .then(() => {
            return teamDao.findAllTeams();
        })
        .then(teams => {
            return Promise.all(
                teams.map(team => team.coach === null ? teamDao.deleteTeam(team._id) : null)
            );
        })
        .then(() => {
            return gameDao.findAllGames();
        })
        .then(games => {
            return Promise.all(
                games.map(game => game.manager === null ? gameDao.deleteGame(game._id) : null)
            );
        })
        .then(() => {
            return teamDao.findAllTeams();
        })
        .then(teams => {
            return Promise.all(
                teams.map(team => Promise.all(
                    team.posts.map(post => {
                        return post.postedBy === null ? teamDao.removePostFromTeam(team.id, post._id) : null
                    })
                ))
            )
        })
        .then(() => {
            return postDao.findAllPostsForPlayer(id);
        })
        .then(posts => {
            return Promise.all(
                posts.map(post => post.postedBy === id ? postDao.deletePost(post._id) : null)
            );
        })
        .then(result => {
            res.send(result);
            return result;
        })
        .catch(next);
});

const unflattenUser = (user) => {

    let newUser = {
        ...user,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        coach: {
            yearsExperience: user.yearsExperience
        },
        manager: {
            hiredOn: user.hiredOn
        }
    };

    return newUser;
};

const flattenUser = (user) => {

    let newUser = JSON.parse(JSON.stringify(user));

    if (user === null) {
        return;
    }

    switch (user.userType) {
        case "PLAYER":
            newUser.teams = user.player.teams;
            newUser.endorsedBy = user.player.endorsedBy;
            delete newUser.player;
            break;
        case "MANAGER":
            newUser.hiredOn = user.manager.hiredOn;
            delete newUser.manager;
            break;
        case "COACH":
            newUser.ratings = user.coach.ratings;
            newUser.yearsExperience = user.coach.yearsExperience;
            delete newUser.coach;
            break;
    }

    return newUser;
};

module.exports = router;