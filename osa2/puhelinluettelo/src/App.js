import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  //console.log(props)

  return(
    <div>
    filter shown with <input 
                  value={props.filter}
                  onChange={props.handleFilter}
                />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <form onSubmit={props.submit}>
        <div>
          name: <input 
                  value={props.name}
                  onChange={props.handleName}
                />
        </div>
        <div>
          number: <input 
                  value={props.number}
                  onChange={props.handleNumber}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return(
    <div>
      {props.persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    let found = false

    event.preventDefault()
    console.log('button clicked', event.target)
    
    persons.forEach(person => {
      if (person.name === newName){
        found = true
        console.log("found")
      }
    })
    
    if(found){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  //console.log("personsToShow", personsToShow)

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilterChange} filter={newFilter}/>
      
      <h2>Add a new</h2>
      <PersonForm submit={addName} 
                  name={newName} 
                  handleName={handleNameChange} 
                  number={newNumber}
                  handleNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App