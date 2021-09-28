const express = require('express')
const router = express.Router()

let cards = [
  {
    id: 0,
    name: 'Template Card',
    description: 'This is a template card',
    image: 'https://picsum.photos/200/300/?random',
    likes: 0,
  },
  {
    id: 1,
    name: 'Card 1',
    description: 'This is card 1',
    image: 'https://picsum.photos/200/300/?random',
    likes: 0,
  },
  {
    id: 2,
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
  const card = cards.find(card => card.id == id)
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
  const newCard = { ...cards[0], ...req.body, id: cards.at(-1).id + 1 }
  cards = [...cards, newCard]
  res.send(newCard)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newCard = { ...cards[0], ...req.body, id }
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
