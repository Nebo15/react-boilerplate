
import express from 'express';
let router = express.Router();

const posts = [
  {
    id: '0',
    title: 'post 1',
    description: 'post 1 description'
  },
  {
    id: '1',
    title: 'post 2',
    description: 'post 2 description'
  }
];

router.get('/posts', function (req, res, next) {
  return res.json(posts);
});

router.get('/posts/:id', function (req, res, next) {

  const {id} = req.params;
  var entity = posts.filter((item) => item.id == id)[0];
  if (!entity) return next({status: 404, message: 'posts not found'});
  return res.json(entity);
});

router.use(function (req, res, next) {
  return res.status(404).json({
    status: 404,
    message: 'Route not found'
  })
});

router.use(function (error, req, res, next) {
  if (error) {
    return res.status(error.status || 500).json(error)
  }
  next();
});

export default router;


