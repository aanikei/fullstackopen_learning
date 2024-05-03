const Persons = ({persons}) => {
    console.log("Persons", persons)
    return (
      <div>
        {persons.map(i => <p key={i.name}>{i.name} {i.number}</p>)}
      </div>
    )
}

export default Persons
