const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})

schema.virtual('everything').get(function () {
  return `${this.text} ${this.author}`
})

const model = mongoose.model('Card', schema)

module.exports = model
