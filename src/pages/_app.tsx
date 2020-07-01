import React, { useEffect } from 'react'
import App, { AppProps } from 'next/app'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import { ReactReduxContext } from 'react-redux'

import 'typeface-roboto'

import Head from '../components/Header'

import { wrapper } from '../config/storeWrapper'

import theme from '../theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore()
  const persistor = persistStore(store)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    return () => {
      if (window && window.Worker && window.resultWorker) {
        window.resultWorker.terminate()
      }
    }
  }, [])

  return (
    <React.Fragment>
      <Head title="Find Target">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp)
