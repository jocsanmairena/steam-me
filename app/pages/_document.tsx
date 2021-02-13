import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang='en'>
        <Head></Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution/compiling order for NextJs applications.
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.

  // SUMMARY:
  // Getting the context/properties of each page, pulling out the JavaScript Style Sheets, and passing them to the client side to be render.

  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  debugger
  ctx.renderPage = () =>
    // We collect the styles of our App.
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
/*
CODE DOCUMENTATION
*  Setup a custom server-side stylesheet to be injected on the client side:
During the getInitialProps function call, were are going to initialize a new server style sheet.
ServerStyleSheets() allows us to pull the styles from each page and re-render them on the app.
originalRenderPage contains the original property values of a page.

TERMINOLOGY:
* Material UI server side rendering:
Material - UI was designed from the ground - up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated.It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC). To inject the style down to the client, we need to:

Create a fresh, new ServerStyleSheets instance on every request.
Render the React tree with the server - side collector.
Pull the CSS out.
Pass the CSS along to the client.
On the client side, the CSS will be injected a second time before removing the server - side injected CSS.
Read https://material-ui.com/guides/server-rendering/.

* ServerStyleSheets() allows us to pull the styles from each page and re - render them on the app.


*/
