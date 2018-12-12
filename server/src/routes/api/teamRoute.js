var router = require('express').Router();
var teamDao = require('../../daos/teamDao');

router.get('/', function (req, res, next) {
  res.send('Welcome to the team router.')
});

router.get('/getAllTeams', function (req, res, next) {
  return teamDao.findAllTeams()
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.get('/getTeamById/:id', function (req, res, next) {
  // res.send('Welcome to the Team router.')
  return teamDao.findTeamById(req.params.id)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});


router.get('/getTeamByName/:name', function (req, res, next) {
  // res.send('Welcome to the Team router.')
  return teamDao.getTeamByName(req.params.name)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.post('/createTeam', function (req, res, next) {
  let team = req.body;
  return teamDao.createTeam(team)
  .then( result => {
    res.send(result);
    return result;

  })
  .catch(next);
});

router.put('/updateTeam/:id', function (req, res, next) {
  let id = req.params.id;
  let team = req.body;
  return teamDao.updateTeam(id, team)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.put('/addPlayerToTeam/:teamId/:playerId', function (req, res, next) {
  let teamId = req.params.teamId;
  let playerId = req.params.playerId;
  return teamDao.addPlayerToTeam(teamId, playerId)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.put('/removePlayerFromTeam/:teamId/:playerId', function (req, res, next) {
  let teamId = req.params.teamId;
  let playerId = req.params.playerId;
  return teamDao.removePlayerFromTeam(teamId, playerId)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.put('/addPostToTeam/:teamId/:postId', function (req, res, next) {
  let teamId = req.params.teamId;
  let postId = req.params.postId;
  return teamDao.addPostToTeam(teamId, postId)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.put('/removePostFromTeam/:teamId/:postId', function (req, res, next) {
  let teamId = req.params.teamId;
  let postId = req.params.postId;
  return teamDao.removePostFromTeam(teamId, postId)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.delete('/deleteTeamById/:id', function (req, res, next) {
  let id = req.params.id;
  return teamDao.deleteTeam(id)
  .then( result => {
    res.send(result);
    return result;

  })
  .catch(next);
});

module.exports = router;