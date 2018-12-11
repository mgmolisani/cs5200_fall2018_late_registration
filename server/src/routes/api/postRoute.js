var router = require('express').Router();
var postDao = require('../../daos/postDao');

router.get('/', function (req, res, next) {
  res.send('Welcome to the post router.')
});

router.get('/getAllPosts', function (req, res, next) {
  return postDao.findAllPosts()
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.get('/getPostById/:id', function (req, res, next) {
  // res.send('Welcome to the game router.')
  return postDao.findPostById(req.params.id)
  .then(result => {
    res.send(result);
    return result;
  })
  .catch(next);
});

router.post('/createPost', function (req, res, next) {
  let post = req.body;
  return postDao.createPost(post)
  .then( result => {
    res.send('Post added successfully')
    return result;

  })
  .catch(next);
});

router.put('/updatePost/:id', function (req, res, next) {
  let id = req.params.id;
  let post = req.body;
  return postDao.updatePost(id, post)
  .then( result => {
    res.send('Post updated successfully')
    return result;

  })
  .catch(next);
});
router.delete('/deletePostById/:id', function (req, res, next) {
  let id = req.params.id;
  return postDao.deletePost(id)
  .then( result => {
    res.send('Post deleted successfully')
    return result;
  })
  .catch(next);
});

module.exports = router;