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
      let temp = flattenUser(result[i]);
      new_arr.push(temp);
    }
    res.send(new_arr);
    return new_arr
  })
  .catch(next);
});

router.get('/getUserById/:id', function (req, res, next) {
  // res.send('Welcome to the User router.')
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
    res.send("User added successfully")
    return result;
  })
  .catch(next);
});

router.put('/updateUser/:id', function (req, res, next) {
  let id = req.params.id;
  let user = req.body;
  return userDao.updateUser(id, user)
  .then(result => {
    res.send('User updated successfully')
    return result;

  })
  .catch(next);
});

router.delete('/deleteUserById/:id', function (req, res, next) {
  let id = req.params.id;
  return userDao.deleteUser(id)
  .then( result => {
    res.send('User deleted successfully')
    return result;
  })
  .catch(next);
});

const flattenUser = (user) => {

  let newUser = JSON.parse(JSON.stringify(user));
  if (user.player !== undefined) {
    newUser.teams = user.player.teams;
    newUser.endorsedBy = user.player.endorsedBy;
    delete newUser.player;
  }

  if (user.manager !== undefined) {
    newUser.hiredOn = user.manager.hiredOn;
    delete newUser.manager;
  }

  if (user.coach !== undefined) {
    newUser.ratings = user.coach.ratings;
    newUser.yearsExperience = user.coach.yearsExperience;
    delete newUser.coach;
  }

  console.log(newUser)
  return newUser;
};

module.exports = router;