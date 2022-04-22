import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'

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
  //console.log(props)
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
    personService
      .getAll()
      .then(response => {
        //console.log(response)
        //console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  //console.log('render', persons.length, 'notes')

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
        //id: persons.length + 1,
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
      })
      //setPersons(persons.concat(personObject))
      
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
  //console.log("persons", persons)
  //console.log("personsToShow", personsToShow)
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