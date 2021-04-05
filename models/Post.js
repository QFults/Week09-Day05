const { model, Schema } = require('mongoose')

const Post = new Schema({
  title: String,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Post', Post)
