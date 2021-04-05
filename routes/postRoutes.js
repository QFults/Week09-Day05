const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  const { title, body } = req.body

  Post.create({
    title,
    body,
    author: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => res.json(post))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/posts/bulk', passport.authenticate('jwt'), (req, res) => {
  Post.create(req.body.posts.map(post => ({
    ...post,
    author: req.user._id
  })))
    .then(posts => {
      User.findById(req.user._id)
        .then(user => {
          const newPosts = [...user.posts, ...posts.map(post => post._id)]
          User.findByIdAndUpdate(req.user._id, { posts: newPosts })
            .then(() => res.sendStatus(200))
        })
    })
})

module.exports = router
