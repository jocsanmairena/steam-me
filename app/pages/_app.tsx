import React from 'react'
// All @material-ui/* imports
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
// App imports
import { themeDark, themeLight } from 'lib/theme'


export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {

    // Remove the server-side injected CSS
    // Query the #jss-server-side element on the DOM and assigned to jssStyles const.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={false ? themeDark : themeLight}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}


/*
DOCUMENTATION:
-------------

OVERWRITING DEFUALT APP COMPONENT:
We pass "props" as a argument, but in desconstructable form: { Component, pageProps }.
Component takes the value of a page defined in the pages folder when you navigate to it.
We wrap ThemeProvider over the global app Component( Some page ) to apply global theme styles.
CssBaseline resets all our css styles to a particular format.
Read https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CssBaseline/CssBaseline.js.
We make a copy of pageProps using the spread operator.

TERMINOLOGY
Custom 'App':
Next.js uses the App component to initialize pages.
You can override it and control the page initialization by creating a _app,js file under the pages folder.
The allows you to do amazing things like:
  Persisting layout between page changes
  Keeping state when navigating pages
  Custom error handling using componentDidCatch
  Inject additional data into pages
  Add global CSS
Read: https://nextjs.org/docs/advanced-features/custom-app



useEffect:
This Hook performs a function that you pass to it right away and after every change to the Component's state or props.
By using this Hook, you tell React that your component needs to do something after render.
React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.

*/
