module.exports = require('mongoose').connect('mongodb://localhost/blogdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
