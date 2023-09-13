const express = require('express')
const app = express()

const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

app.use(express.json())

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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
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
const generateId = () => {
  const min = 4
  const max = 1000000
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min
  
  return randomId
  }

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(req.body)

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  const uniqueCheck = persons.some((person) => person.name === body.name)

  if (uniqueCheck) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
