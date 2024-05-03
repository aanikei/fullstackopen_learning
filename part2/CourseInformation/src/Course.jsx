const Header = ({props}) => {
    console.log("Header args", props)
    return <h1>{props.name}</h1>
}

const Part = ({props}) => {
    console.log("Part props", props)
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}
  
const Content = ({props}) => {
    const array = props.parts
    console.log("Content array", array)
    return (
        <div>
            { array.map(i => <Part key={i.id} props={i} />) }
        </div>
    )
}

const Course = ({course}) => {
    console.log("Course args", course)
    return (
        <div>
            <Header props={course} />
            <Content props={course} />
        </div>
    )
}

export default Course