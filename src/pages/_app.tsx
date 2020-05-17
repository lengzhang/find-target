import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { Provider as ReduxProvider } from 'react-redux'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import 'typeface-roboto'

import createStore from '../config/store'

import theme from '../theme'

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>Leng Page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ReduxProvider store={createStore()}>
            <Component {...pageProps} />
          </ReduxProvider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}