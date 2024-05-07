const Persons = ({persons, deletePerson}) => {
    console.log("Persons", persons)
    return (
      <div>
        {persons.map(i => <p key={i.name}>{i.name} {i.number}<button value={i.id} onClick={deletePerson}>delete</button></p>)}
      </div>
    )
}

export default Persons
