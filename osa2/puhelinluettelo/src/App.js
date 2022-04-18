import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    let found = false

    event.preventDefault()
    console.log('button clicked', event.target)
    
    persons.forEach(person => {
      if (person.name === newName){
        found = true
      }
      console.log("found")
    })
    const personObject = {
      name: newName,
      //id: persons.length + 1,
    }
    if(found){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p>{person.name}</p>
      )}
    </div>
  )

}

export default App