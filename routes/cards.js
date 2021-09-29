const express = require('express')
const { nanoid } = require('nanoid')
const Card = require('../models/Card')

const router = express.Router()

const cardTemplate = {
  name: '',
  description: '',
  image: '',
  likes: 0,
}

let cards = [
  {
    id: 'FIRST_CARD',
    name: 'Card 1',
    description: 'This is card 1',
    image: 'https://picsum.photos/200/300/?random',
    likes: 0,
  },
  {
    id: 'SECOND_CARD',
    name: 'Card 2',
    description: 'This is card 2',
    image: 'https://picsum.photos/200/300/?random',
    likes: 0,
  },
]

router.get('/', (req, res) => {
  Card.find({})
    .then(cards => {
      res.json(cards)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong...' })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ error: 'Bad Request' })
  }
  Card.findById(id)
    .then(card => {
      if (card === null) {
        res.status(404).json({ error: `Card with id '${id}' not found` })
      } else {
        res.status(200).json(card)
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error: ' + error })
    })
})

router.post('/', (req, res) => {
  if (!req.body.text || !req.body.author) {
    return res.status(400).json({ error: 'Bad Request' })
  }
  // or Card.create(req.body)
  new Card(req.body)
    .save()
    .then(card => {
      res.status(201).json(card)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ error: 'Could not be saved...' })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ error: 'Bad Request' })
  }
  Card.findOneAndReplace({ _id: id }, req.body, { new: true })
    .then(card => {
      if (!card) {
        return res.status(404).json({ error: `Card with id '${id}' not found` })
      }
      return res.json(card)
    })
    .catch(error => {
      res.json({ error: 'Internal Server Error: ' + error })
    })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ error: 'Bad request' })
  }
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then(card => {
      res.status(200).json(card)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong...' + error })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).send('Bad request')
  }
  const deletedCard = cards.find(card => card.id === id)
  if (!deletedCard) {
    return res.status(404).send('Not found')
  }
  cards = cards.filter(card => card.id !== id)
  res.send(deletedCard)
})

module.exports = router
