const express = require('express')
const connectDatabase = require('./setupDatabase')
const app = express()
const port = 3000

connectDatabase('mongodb://localhost:27017/lean-coffee-board-21-5')

app.use(express.json())

app.get('/name', (req, res) => {
  res.send('Your name is lukas.')
})

app.use('/api/cards', require('./routes/cards'))

app.listen(port, () => {
  console.log('server lisstening on port ' + port)
})
