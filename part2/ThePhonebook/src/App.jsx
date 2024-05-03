import { useState } from 'react'

const Persons = ({persons}) => {
  console.log("Persons", persons)
  return (
    <div>
      {persons.map(i => <p key={i.name}>{i.name} {i.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    console.log("handleNewName", event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
