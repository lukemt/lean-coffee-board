const express = require('express')
const connectDatabase = require('./setupDatabase')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { PORT, MONGODB_URI } = process.env

connectDatabase(MONGODB_URI)

app.use(express.json())

app.get('/name', (req, res) => {
  res.send('Your name is lukas.')
})

app.use('/api/cards', require('./routes/cards'))

app.listen(PORT, () => {
  console.log('server lisstening on port ' + port)
})
