const express = require('express')
const router = express.Router()

router.get('/api/cards/:id', (req, res) => {
  const id = req.params.id
  res.send(`Card with id ${id}`)
})

router.post('/api/cards/', (req, res) => {
  const card = req.body
  res.send(card)
})

router.put('/api/cards/:id', (req, res) => {
  const answer = { ...req.params, ...req.body }
  console.log(req.body)
  res.send(answer)
})

router.patch('/api/cards/:id', (req, res) => {
  const answer = { ...req.params, ...req.body }
  console.log(req.body)
  res.send(answer)
})

router.delete('/api/cards/:id', (req, res) => {})

module.exports = router
