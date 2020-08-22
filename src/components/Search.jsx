import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Box, Select, MenuItem } from '@material-ui/core'
import clsx from 'clsx'
import { Search as SearchIcon} from '@material-ui/icons'


function Search({ className, onChange }) {
    const classes = useStyles()
    const handleTextChanged = target=>{
        console.log(target.value)
        onChange({filterText: target.value})
    }

    const handleRegionChanged = target=>{
        console.log(target.value)
        onChange({filterRegion: target.value})
    }

    return (
        <Box className={clsx(classes.root, className)}>
            <Box className='inp-search'>
                <SearchIcon />
                <input onChange={debounce(handleTextChanged)} placeholder="Search for a country...">
                </input>
            </Box>
            
            <Select className='sel-region'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Filter by region"
                disableUnderline
                dense
                onChange={debounce(handleRegionChanged)}
                >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Oceanic">Oceanic</MenuItem>
            </Select>
        </Box>
    )
}

function debounce(fn) {
    let id = null
    return ({target})=>{
        if(id){
            clearTimeout(id)
        }
        id = setTimeout(fn, 300, target)
    }
}

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        '& input': {
            width: '100%',
            border: 'none',
            outline: 'none',
            color: theme.palette.text.primary,
            fontSize: '1rem',
            background: 'none',
            letterSpacing: '-1px'
        },
        '& svg': {
            margin: '0 1.25rem'
        },
        '& .inp-search, .sel-region': {
            width: '100%',
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: '0.6rem',
            boxShadow: theme.shadows[1],
        },
        '& input::placeholder': {
            color: theme.palette.text.primary,
            letterSpacing: '-1px',
        },
        '& .inp-search': {
            maxWidth: '480px',
            width: 'calc(100% - 2rem - 200px)',
            display: 'flex',
            alignItems: 'center',
        },
        '& .sel-region': {
            maxWidth: '200px',
            '& .MuiSelect-root': {
                padding: '2.5px 0 2.5px'
            }
        },
        '& .MuiSelect-select:focus': {
            background: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            '& .inp-search, .sel-region': {
                margin: '0.5rem',
                maxWidth: 'none',
                width: '100%',
            }
        }
    }
}))

export default Search
