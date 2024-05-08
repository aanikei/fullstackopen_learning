import { useState, useEffect  } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

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
      const existingPerson = persons.filter(i => i.name == newName)[0]

      if (existingPerson.name == newName && existingPerson.number == newNumber) {
        alert(`${existingPerson.name} is already added to phonebook!`)
        return

      } else {
        if (window.confirm(`${existingPerson.name} is already added to the phonebook, replate the ole number with a new one?`)) {
          const updatedPerson = { ...existingPerson, number: newNumber }
          console.log("updatedPerson", updatedPerson)

          let isSucces = true;

          personService
            .update(updatedPerson)
            .then(returnedName => setPersons(persons.map(i => i.id != returnedName.id ? i : updatedPerson)))
            .catch(error => {
              const msg = {message: `Information about '${updatedPerson.name}' has already been removed from the server`, success: false}
              setPersons(persons.filter(i => i.name != updatedPerson.name))
              setMessage(msg)        
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
          
          if (isSucces) {
            const msg = {message: `Updated '${updatedPerson.name}'`, success: true}
            setMessage(msg)        
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService
        .create(newPerson)
        .then(returnedName => setPersons(persons.concat(returnedName)))

        const msg = {message: `Added '${newName}'`, success: true}
        setMessage(msg)        
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} />
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
