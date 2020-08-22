import React, { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import NavBar from '../components/NavBar'


function RootPage({ChildPage}) {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <NavBar className="nav-bar page-gutter" />
            <ChildPage />
        </div>
    )
}


const useStyle = makeStyles(theme=>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            padding: '2.7rem 0'
        },
        [theme.breakpoints.down('xs')]: {
            '&>*': {
                padding: '1rem 0'
            },
        }
    }
}))

export default RootPage
