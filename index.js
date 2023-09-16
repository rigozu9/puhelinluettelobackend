require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "04003745356"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "04053745356"
  },
  {
    id: 3,
    name: "Dani Abrahamovitsi",
    number: "04053745369"
  },
  {
    id: 4,
    name: "Mary Poppins",
    number: "13453295843958943"
  }
]

app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', (req, res) => {
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
      return response.status(400).json({ error: 'number missing' })
    }

    const uniqueCheck = persons.some((person) => person.name === body.name)
    if (uniqueCheck) {return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
