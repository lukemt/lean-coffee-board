console.log('Hello World')

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/name', (req, res) => {
  res.send('Your name is lukas.')
})

app.use('/', require('./routes/cards'))

app.listen(port, () => {
  console.log('server lisstening on port ' + port)
})
