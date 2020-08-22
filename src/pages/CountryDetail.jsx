import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useParams, Link } from 'react-router-dom'
import FieldValue from '../components/FieldValue'
import {getCountry} from '../services/getCountries'



function CountryDetail({ className }) {
    const classes = useStyles()
    const {countryCode} = useParams()
    
    const [country, setCountry] = useState(null)
    const [borderCountries, setBorderCountries] = useState(null)

    useEffect(()=>{
       (async ()=>{
            const country = await getCountry(countryCode)
            const borderCountiesPromise = country.borders.map(
                (borderCountryCode) =>{ 
                    return getCountry(borderCountryCode)
                })
            const borderCountries = await Promise.all(borderCountiesPromise)
            setBorderCountries(borderCountries)
            setCountry(country)
            
        })()
    }, [countryCode])

    return  (
        <>
            <section className="page-gutter">
                <Box>
                    <Link to="/">
                        <Button startIcon={<ArrowBackOutlinedIcon/>} variant="contained" color="primary">Back</Button>
                    </Link>
                </Box>
            </section>
            { !!country &&
            <section className="page-gutter">
                <Box className={classes.countryDetail}>
                    <img src={country.flag} alt={`flag of ${country.name}`}/>
                    <Typography className="country-name" variant="h3">{country.name}</Typography>
                    <Box className="country-fields1">
                        <FieldValue field="Native Name" value={country["nativeName"]}></FieldValue>
                        <FieldValue field="Population" value={country["population"]}></FieldValue>
                        <FieldValue field="Region" value={country["region"]}></FieldValue>
                        <FieldValue field="Sub Region" value={country["subRegion"]}></FieldValue>
                        <FieldValue field="Capital" value={country["capital"]}></FieldValue>
                    </Box>
                    <Box className="country-fields2">
                        <FieldValue field="Top Level Domain" value={country["topLevelDomain"]}></FieldValue>
                        <FieldValue field="Currencies" value={country["currencies"][0].code}></FieldValue>
                        <FieldValue field="Languages" value={
                            country.languages.reduce((aggregate, language) => {
                                return `${aggregate} ${language.name},`
                            }, "")}>
                            
                        </FieldValue>
                    </Box>
                    <Box className="borders">
                        <Typography className="title-borders" variant="body1">Border Countries:&nbsp;</Typography>
                        <Box>
                            {borderCountries.map(country => 
                                <Link to={`/country/${country.alpha3Code}`}>
                                    <Button size="small" variant="contained" color="primary">{country.name}</Button>
                                </Link>
                            )}
                        </Box>
                    </Box>
                </Box>
            </section>
            }
        </>
    )
}

const useStyles = makeStyles(theme=>({
    root: {

    },
    countryDetail: {
        display: 'grid',
        justifyContent: 'space-between',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: 'auto',
        gridColumnGap: '5%',
        alignItems: 'center',
        gridTemplateAreas: `
            "flag country-name country-name"
            "flag country-fields1 country-fields2"
            "flag borders borders"
        `,
        '& img': {
            gridArea: 'flag',
            width: '100%',
            maxWidth: 564,
            boxShadow: theme.shadows[2],
            padding: '0.5rem'
        },
        '& .country-name': {
            gridArea: 'country-name'
        },
        '& .country-fields1': {
            gridArea: 'country-fields1'
        },
        '& .country-fields2': {
            gridArea: 'country-fields2'
        },
        '& .borders': {
            gridArea: 'borders',
            display: 'flex',
            alignItems: 'center',
            '& button': {
                margin: '0.3rem'
            }
        },
        '& .country-fields1, .country-fields2': {
            '&>*': {
                margin: '0.3rem 0'
            }
        },
        '& .title-borders': {
            fontWeight: 'bold'
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '1fr',
            gridRowGap: '2rem',
            gridTemplateAreas: `
                "flag"
                "country-name"
                "country-fields1"
                "country-fields2"
                "borders"
            `,
            '& .borders': {
                flexDirection: 'column',
                alignItems: 'start'
            }
        }
        
    }
}))

export default CountryDetail
