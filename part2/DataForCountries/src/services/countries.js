import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${baseUrl}/api/name/${country}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lng, key) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
    return request.then(response => response.data)
}

export default { 
    getAll, getCountry, getWeather
}
