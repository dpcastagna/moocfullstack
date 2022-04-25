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
        <p key={person.id}>{person.name} {person.number} &nbsp;
        <button onClick={() => props.remove(person.id)}>delete</button></p>
      )}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log(message.toLowerCase().includes("removed"))
  if (message.toLowerCase().includes("removed")) {
    return (
      <div className="failure">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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

    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    }
    
    if(found){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result){
        const person = personsToShow.find(p => p.name === newName)
        personService 
          .update(person.id, personObject)
          .then(response => {
            console.log("päivitetty")
            setPersons(personsToShow.map(p => p.id !== person.id ? p : response ))
            setNotificationMessage(
              `Changed number for ${newName}`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)  
          })
          .catch(error => {
            setNotificationMessage(
              `Information of ${person.name} has already been removed from the server`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
              console.log("catchissa", error)
              setPersons(personsToShow.filter(p => p.id !== person.id))
            })
      }
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${newName}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
      })
      //setPersons(persons.concat(personObject))
      
    }
  }

  const removePerson = (id) => {
    const person = personsToShow.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name} ?`);
    console.log(result)
    if (result) {
      personService
        .remove(person.id)
        .then(response => {
          console.log("poistettu")
          setPersons(personsToShow.filter(p => p.id !== id))
          setNotificationMessage(
            `Removed ${person.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
        }
      )}
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
      <Notification message={notificationMessage} />
      <Filter handleFilter={handleFilterChange} filter={newFilter}/>
      
      <h2>Add a new</h2>
      <PersonForm submit={addName} 
                  name={newName} 
                  handleName={handleNameChange} 
                  number={newNumber}
                  handleNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} remove={removePerson} />
    </div>
  )

}

export default App