import React from 'react'

import { grey } from '@material-ui/core/colors'

import Head from '../components/Header'
import App from '../components/App'

const Home = () => (
  <>
    <Head title="Find Target" />
    <main style={{ backgroundColor: grey[200] }}>
      <App />
    </main>
  </>
)

export default Home
