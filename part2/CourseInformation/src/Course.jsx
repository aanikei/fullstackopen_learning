const Header = ({props}) => {
    console.log("Header args", props)
    return <h2>{props.name}</h2>
}

const Part = ({props}) => {
    console.log("Part props", props)
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = ({props}) => {
    return <h3>total of { props.reduce((sum, i) => sum + i.exercises, 0) } exercises</h3>
}
  
const Content = ({props}) => {
    const array = props.parts
    console.log("Content array", array)
    return (
        <div>
            { array.map(i => <Part key={i.id + props.id} props={i} />) }
            <Total props={array} />
        </div>
    )
}

const Course = ({courses}) => {
    console.log("Course args", courses)
    return (
        <div>
            <h1>Web development curriculum</h1>
            { courses.map(i => 
                <div key={i.id}>
                    {/*console.log("id", i.id)*/}
                    <Header key={i.id + 100} props={i} />
                    <Content key={i.id + 1000} props={i} />
                </div>
            )}
        </div>
    )
}

export default Course