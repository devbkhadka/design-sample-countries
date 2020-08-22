import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Brightness2 } from '@material-ui/icons'
import { ThemeContext } from '../contexts'


function NavBar({ className, changeThemeType }) {
    const classes = useStyles()
    const theme = useContext(ThemeContext)

    const toggleThemeType = ()=>{
        const newThemeType = theme.type === 'dark' ? 'light' : 'dark'
        theme.changeThemeType(newThemeType)
    }
    return (
        <Box className={classes.root}>
            <AppBar className={className}>
                <Toolbar className="toolbar">
                    <Typography variant='h5'>
                        Where in the world?
                    </Typography>
                    <Button onClick={toggleThemeType} className="btn-dark-mode">
                        <Brightness2></Brightness2>
                        Dark Mode
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
        
    )
}

const useStyles = makeStyles(theme=>({
    root: {
        minHeight: '4.8rem',
        '& .toolbar': {
            justifyContent: 'space-between',
            paddingLeft: 0,
            paddingRight: 0,
            minHeight: '4.7rem'
        },
        '& .btn-dark-mode': {
            textTransform: 'none'
        }
    }
}))

export default NavBar
