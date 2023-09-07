const express = require('express')
const app = express()


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
    name: "Dan Abramov",
    number: "04053745369"
  },
  {
    id: 4,
    name: "Riku Nummi",
    number: "040048329589"
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})