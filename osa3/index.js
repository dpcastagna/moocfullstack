const express = require('express')
const morgan = require('morgan')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
//app.use(requestLogger)
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23.6423122"
    }
]

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${Date()}</p>`)
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  person.id = Math.floor(Math.random() * 1000000000000000)
  //console.log(person)
  if (person.name === "") {
    return response.status(403).json({ 
      error: 'name missing' 
    })
  } else if (person.number === "") {
    return response.status(403).json({ 
      error: 'number missing' 
    })
  } else if(persons.filter(p => p.name === person.name).length > 0) {
    //console.log(persons.filter(p => p.name === person.name).length)
    return response.status(403).json({ 
      error: 'name must be unique' 
    })
  }
  persons = persons.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    //console.log(Math.floor(Math.random() * 1000000000000000))
})
