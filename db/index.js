module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/blogdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
