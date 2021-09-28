const express = require('express')
const { nanoid } = require('nanoid')
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
  res.status(205)
  res.send(cards)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const card = cards.find(card => card.id === id)
  if (card) {
    res.status(200)
    res.send(card)
  } else {
    res.status(404)
    res.send({
      error: 'Card not found',
    })
  }
  res.send()
})

router.post('/', (req, res) => {
  const newCard = { ...cardTemplate, ...req.body, id: nanoid() }
  cards = [...cards, newCard]
  res.send(newCard)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newCard = { ...cardTemplate, ...req.body, id }
  cards = cards.map(card => (card.id === id ? newCard : card))
  res.send(newCard)
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  cards = cards.map(card => (card.id === id ? { ...card, ...req.body } : card))
  res.send(cards.find(card => card.id === id))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const deletedCard = cards.find(card => card.id === id)
  cards = cards.filter(card => card.id !== id)
  res.send(deletedCard)
})

module.exports = router
