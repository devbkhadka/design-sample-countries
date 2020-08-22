import React, {useState} from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import getTheme from './styles/theme'
import {ThemeContext} from './contexts'

import HomePage from './pages/HomePage'
import CountryDetail from './pages/CountryDetail'
import RootPage from './pages/RootPage';

function App() {
  const [themeType, setThemeType] = useState('dark')

  const changeThemeType = (type) => {
    const validThemes = ['dark', 'light']
    if (!validThemes.includes(type)){
      console.log(`invalid theme type ${type}, must be one of ${validThemes}`)
      return 
    }
    setThemeType(type)
  }

  return (
    <ThemeContext.Provider value={{type:themeType, changeThemeType}}>
      <ThemeProvider theme={getTheme(themeType)}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/">
              <RootPage ChildPage={HomePage} />
            </Route>
            <Route path="/country/:countryCode">
              <RootPage ChildPage={CountryDetail} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
    
  );
}

export default App;
