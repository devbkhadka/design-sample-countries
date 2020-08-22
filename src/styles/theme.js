import { createMuiTheme } from '@material-ui/core'

const palette = {}
palette["dark"] = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(43, 55, 67)',
        },
        text: {
            primary: 'rgb(253, 255, 255)',
            secondary: 'rgb(232, 243, 252)'
        },
        background: {
            default: 'rgb(32, 45, 54)',
            paper: 'rgb(43, 55, 67)',
        }
    }
}).palette

palette["light"] = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(255, 255, 255)',
            contrastText: 'rgb(0, 0, 0)'
        },
        text: {
            primary: 'rgb(27, 29, 30)',
            secondary: 'rgb(35, 38, 37)'
        },
        background: {
            default: 'rgb(250, 250, 250)',
            paper: 'rgb(255, 255, 255)',
        }
    }
}).palette

const getTheme = (type)=> createMuiTheme({
    palette: palette[type],
    typography: {
        fontFamily: "'Nunito Sans', sans-serif",
        h3: {
            
        },
        h4: {
            
        },
        h5: {
            letterSpacing: '1px',
            fontWeight: 'bold'
        },
        body1: {
            
        }
    },

})

export default getTheme

