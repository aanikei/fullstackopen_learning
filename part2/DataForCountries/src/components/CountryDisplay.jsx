import axios from 'axios'

const CountryDisplay = ({ list, refreshList, weather }) => {
    console.log("CountryDisplay", list)
    if (list === null) {
        return null
    } else if (list.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (list.length > 1) {
        return (
            <div>
                {list.map(value => <div key={value.cca2}>{value.name.common} <button id={value.cca3} onClick={() => refreshList(list.filter(i => i.name.common == value.name.common))}>show</button></div>)}
            </div>
        )
    } else if (list.length == 1) {
        const capital = list[0].capital[0]
        return (
            <div>
                {console.log(list)}
                <h2>{list[0].name.common}</h2>
                <div>capital {capital}</div>
                <div>area {list[0].area}</div>
                <h4>languages</h4>
                <ul>
                    {console.log(list[0].languages)}
                    {Object.entries(list[0].languages).map(value => <li key={value[0]}>{value[1]}</li>)}
                </ul>
                <img src={list[0].flags.png} height="100" />
                <h3>weather in {capital}</h3>
                <div>temperature {weather[0].toFixed(2)} °C</div>
                <div><img src={`https://openweathermap.org/img/wn/${weather[1]}@2x.png`}/></div>
                <div>wind {weather[2].toFixed(2)} m/s</div>
            </div>
        )
    }
}

export default CountryDisplay
