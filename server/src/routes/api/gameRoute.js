var router = require('express').Router();
var gameDao = require('../../daos/gameDao');

router.get('/', function (req, res, next) {
  res.send('Welcome to the game router.')
});

router.get('/getAllGames', function (req, res, next) {
  return gameDao.findAllGames()
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.get('/getGameById/:id', function (req, res, next) {
  return gameDao.findGameById(req.params.id)
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.post('/createGame', function (req, res, next) {
  let game = req.body;
  return gameDao.createGame(game)
  .then(result => {
    res.send('Game added successfully')
    return result;
  })
  .catch(next);
});

router.put('/updateGame/:id', function (req, res, next) {
  let id = req.params.id;
  let game = req.body;
  return gameDao.updateGame(id, game)
  .then(result => {
    res.send('Game updated successfully')
    return result
  })
  .catch(next);
});

router.delete('/deleteGameById/:id', function (req, res, next) {
  let id = req.params.id;
  return gameDao.deleteGame(id)
  .then( result => {
    res.send('Game deleted successfully')
    return result;

  })
  .catch(next);
});

module.exports = router;