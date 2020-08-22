import axios from 'axios'

const data = {}
let countryMap = null

const getCountries = async ()=>{
    if(data.countries){
        return data.countries
    }

    console.log("getting countries")

    // const countries = await axios.get('https://restcountries.eu/rest/v2/all')
    const countries = await axios.get('/countries.json')
    data.countries = countries.data
    return countries.data
}

export async function getCountry(countryCode){
    if(!countryMap){
        countryMap = {}
        const countries = await getCountries()
        for(let country of countries) {
            countryMap[country.alpha3Code] = country
        }
    }
    return countryMap[countryCode]
}

export default getCountries