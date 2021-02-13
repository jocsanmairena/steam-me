//CREATING MATERIAL-UI THEMES
import grey from '@material-ui/core/colors/grey'
//createMuiTheme is a method that allows us to create a Material UI theme.
import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const themeDark = createMuiTheme({
  palette: {
    primary: { main: grey[200] },
    secondary: { main: grey[400] },
    type: 'dark'
  }
})

// Create a theme instance.
const themeLight = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: grey[900] },
    type: 'light'
  }
})

export { themeDark, themeLight }
