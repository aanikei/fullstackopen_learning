import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDisplay from './components/CountryDisplay'

function App() {
  const [country, setCountry] = useState([])
  const [countryList, setCountryList] = useState([])
  const [weather, setWeather] = useState([])

  const refreshList = (list) => {
    setCountry(list)
  }
  
  useEffect(() => {
    console.log("fill countriesList start")
    countryService
      .getAll()
      .then(list => {
        setCountryList(list)
        setCountry(list)
        console.log("fill countriesList end")
      })
  }, 
  [])

  useEffect(() => {
    if (country.length == 1) {
      const api_key = import.meta.env.VITE_OWM_KEY
      console.log("api_key", import.meta.env)
      const latlng = country[0].capitalInfo.latlng
      countryService
        .getWeather(latlng[0], latlng[1], api_key)
        .then(response => {
          console.log("openweathermap", response)
          console.log("openweathermap data", [response.main.temp - 273.15, response.weather[0].icon, response.wind.speed])
          setWeather([response.main.temp - 273.15, response.weather[0].icon, response.wind.speed])
      })
    }
  }, 
  [country])


  const handleCountry = (event) => {
    console.log("event value:", event.target.value)
    const filteredCountryList = countryList.filter(i => i.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log("filteredCountryList", filteredCountryList)
    refreshList(filteredCountryList)
  }

  return (
    <>
      <div>
        find countries: <input onChange={handleCountry} />
      </div>
      <CountryDisplay list={country} refreshList={refreshList} weather={weather} />
    </>
  )
}

export default App
