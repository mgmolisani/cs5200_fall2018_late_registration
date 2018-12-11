var router = require('express').Router();
var userDao = require('../../daos/userDao');


router.get('/', function (req, res, next) {
    res.send('Welcome to the user router.')
});

router.get('/getAllUsers', function (req, res, next) {
    return userDao.findAllUsers()
        .then( result => {
            res.send(result);
        })
        .catch(next);
});

router.get('/getUserById/:id', function(req,res,next){
    // res.send('Welcome to the User router.')
    return userDao.findUserById(req.params.id)
        .then( () => {
            res.send('User added successfully')

        })
        .catch(next);
});

router.post('/createUser', function(req,res,next){
    let user = req.body;
    return userDao.createUser(user)
        .then( () => {
            res.send("User added successfully")
        })
        .catch(next);
});

router.delete('/updateUser/:id', function(req,res,next){
    let id = req.params.id;
    let user = req.body;
    return userDao.updateUser(id, user)
        .then( () => {
            res.send('User updated successfully')

        })
        .catch(next);
});

router.delete('/deleteUserById/:id', function(req,res,next){
    let id = req.params.id;
    return userDao.deleteUser(id)
        .then( () => {
            res.send('User deleted successfully')

        })
        .catch(next);
});


module.exports = router;