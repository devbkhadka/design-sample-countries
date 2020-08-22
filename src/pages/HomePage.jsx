import React, { useState, useEffect, useMemo } from 'react'
import { Box, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import FieldValue from '../components/FieldValue'
import getCountries from '../services/getCountries'


function HomePage() {
    const classes = useStyle()
    const [countries, setCountries] = useState(null)
    const [filterText, setFilterText] = useState("")
    const [filterRegion, setFilterRegion] = useState("")

    useEffect(()=>{
        (async ()=>{
            const countries = await getCountries()
            setCountries(countries)
        })()
        
    }, [])

    const filteredCountries = useMemo(()=>{
        if(!filterText && !filterRegion){
            return countries
        }
        console.log("filtering countries", filterText, filterRegion)
        let filteredCountries = countries

        if (filterRegion){
            filteredCountries = filteredCountries.filter(country => {
                return country.region === filterRegion
            })
        }
        if (filterText){
            filteredCountries = filteredCountries.filter(country=>{
                return country.name.toLowerCase().includes(filterText.toLowerCase())
            })
        }
        
        return filteredCountries
    }, [countries, filterText, filterRegion])

    const handleSearchValueChanged = ({filterText, filterRegion})=>{
        if(filterText != undefined){
            setTimeout(setFilterText, 0, filterText)
        }
        if(filterRegion != undefined){
            setTimeout(setFilterRegion, 0, filterRegion)
        }
    }

    return (
        <>
            <section className="page-gutter">
                <Search className="search" onChange={handleSearchValueChanged}/>
            </section>
            <section className='page-gutter'>
                <Box className={classes.countries}>
                    {filteredCountries && filteredCountries.slice(0,100).map((country, indx) => (
                        <Paper className='country-card' key={country.alpha2Code}>
                            <img src={country.flag} alt={`flag of ${country.name}`} />
                            <Box className="country-info">
                                <Link to={`/country/${country.alpha3Code}`}>
                                    <Typography style={{fontWeight: 'bold'}} variant="body1">{country.name}</Typography>
                                </Link>
                                <FieldValue field="Population" value={country.population} />
                                <FieldValue field="Region" value={country.region} />
                                <FieldValue field="Capital" value={country.capital} />
                            </Box>
                        </Paper>  
                    ))}
                </Box> 
            </section>
        </>
    )
}


const useStyle = makeStyles(theme=>({
    countries: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(264px, 1fr))',
        gap: '2.6rem',
        justifyItems: 'center',
        '& .country-card': {
            width: 264,
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden'
        },
        '& img': {
            width: '100%',
            height: 160,
            objectFit: 'cover',
        },
        '& .country-info': {
            padding: '1rem',
        }
    }
}))

export default HomePage
