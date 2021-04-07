const Posts = require('../posts/posts-model.js');
const Users = require('../users/users-model.js');

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  console.log(req.method, req.url, Date.now());
  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if(!user) {
      res.status(404).json({message: 'user not found'});
    } else {
      req.user = user;
      next();
    }
  } catch(err) {
    res.status(500).json(err.message);
  }
};

const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body || !req.body.name) {
    res.status(400).json({message: 'missing required name field'});
  } else {
    next()
  }
};

const validatePost = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body || !req.body.text) {
    res.status(400).json({message: 'missing required text field'});
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}