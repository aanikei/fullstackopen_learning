import { useState, useEffect  } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initPersons => {setPersons(initPersons)})
    }, 
  [])

  const displayList = filterName === "" ? persons : persons.filter(i => i.name.toLowerCase().includes(filterName.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.map(i => i.name).indexOf(newName) != -1) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService
        .create(newPerson)
        .then(returnedName => setPersons(persons.concat(returnedName)))
    }
    
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    const id = event.target.value
    console.log(id)
    const person = persons.filter(item => item.id == id)[0]
    console.log(person)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .deleteName(id)
        .then(returnedName => {
          console.log(returnedName)
          setPersons(persons.filter(item => item.id != returnedName.id))
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <Form addName={addName} 
            newName={newName}
            handleNewName={handleNewName}
            newNumber={newNumber}
            handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={displayList} deletePerson={deletePerson} />
    </div>
  )
}

export default App
