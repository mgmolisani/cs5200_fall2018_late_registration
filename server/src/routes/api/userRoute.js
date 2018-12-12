var router = require('express').Router();
var userDao = require('../../daos/userDao');

router.get('/', function (req, res, next) {
  res.send('Welcome to the user router.')
});

router.get('/getAllUsers', function (req, res, next) {
  return userDao.findAllUsers()
  .then(result => {
    var new_arr = [];
    for (let i in result) {
      // var temp = {};
      let temp = userDao.flattenUser(result[i]);
      new_arr.push(temp);
    }
    res.send(new_arr);
    return new_arr
  })
  .catch(next);
});

router.get('/getUserById/:id', function (req, res, next) {
  return userDao.findUserById(req.params.id)
  .then(result => {
    let flatUser = userDao.flattenUser(result);
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

router.delete('/deleteUserById/:id', function (req, res, next) {
  let id = req.params.id;
  return userDao.deleteUser(id)
  .then( result => {
    res.send(result);
    return result;
  })
  .catch(next);
});


module.exports = router;