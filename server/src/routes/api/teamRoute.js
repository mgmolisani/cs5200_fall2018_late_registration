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