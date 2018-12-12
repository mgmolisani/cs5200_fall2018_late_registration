var router = require('express').Router();
var userDao = require('../../daos/userDao');
var teamDao = require('../../daos/teamDao');

router.get('/', function (req, res, next) {
  res.send('Welcome to the user router.')
});

router.get('/getAllUsers', function (req, res, next) {
  return userDao.findAllUsers()
  .then(function(result) {
    const new_arr = result.map(user => flattenUser(user));
    res.send(new_arr);
    return new_arr
  })
  .catch(next);
});

router.get('/getUserById/:id', function (req, res, next) {
  return userDao.findUserById(req.params.id)
  .then(result => {
    let flatUser = flattenUser(result);
    res.send(flatUser)
    return flatUser;
  })
  .catch(next);
});

router.post('/createUser', function (req, res, next) {
  let user = req.body;
  return userDao.createUser(user)
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.post('/getUserByCredentials', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  return userDao.findUserByCredentials(username, password)
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.put('/updateUser/:id', function (req, res, next) {
  let id = req.params.id;
  let user = req.body;
  return userDao.updateUser(id, user)
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

router.delete('/deleteUserById/:id', function (req, res, next) {
  let id = req.params.id;
  return userDao.deleteUser(id)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});


const unflattenUser = (user) => {

  let newUser = {
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

    if (user === null ) {
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