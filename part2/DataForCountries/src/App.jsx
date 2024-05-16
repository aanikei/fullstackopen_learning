import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDisplay from './components/CountryDisplay'

function App() {
  const [country, setCountry] = useState(null)
  const [countryList, setCountryList] = useState([])

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
      <CountryDisplay list={country} refreshList={refreshList} />
    </>
  )
}

export default App
