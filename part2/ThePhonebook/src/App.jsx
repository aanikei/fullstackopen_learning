import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')

  const display_list = filterName === "" ? persons : persons.filter(i => i.name.toLowerCase().includes(filterName.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.map(i => i.name).indexOf(newName) != -1) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    
    setNewName('')
    setNewNumber('')
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
      <Persons persons={display_list} />
    </div>
  )
}

export default App
