const CountryDisplay = ({ list }) => {
    console.log("CountryDisplay", list)
    if (list === null) {
        return null
    } else if (list.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (list.length > 1) {
        return (
            <div>
                {list.map(value => <div>{value.name.common}</div>)}
            </div>
        )
    } else if (list.length == 1) {
        return (
            <div>
                {console.log(list)}
                <h2>{list[0].name.common}</h2>
                <div>capital {list[0].capital[0]}</div>
                <div>area {list[0].area}</div>
                <h4>languages</h4>
                <ul>
                    {console.log(list[0].languages)}
                    {Object.entries(list[0].languages).map(value => <li>{value[1]}</li>)}
                </ul>
                <img src={list[0].flags.png} height="100"></img>
            </div>
        )
    }
}

export default CountryDisplay
