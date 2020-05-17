import React from 'react'
import { useDispatch } from 'react-redux'

import MuiBox from '@material-ui/core/Box'
import MuiContainer from '@material-ui/core/Container'
import MuiPaper from '@material-ui/core/Paper'
import MuiTypography from '@material-ui/core/Typography'

import InputSection from '../InputSection'
import ListSection from '../ListSection'

import { listPush } from '../../reducer/list'

const App: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <MuiContainer
      maxWidth="md"
      style={{ minHeight: '100vh', paddingTop: '1vh', paddingBottom: '1vh' }}
    >
      <MuiPaper style={{ minHeight: '98vh' }}>
        <MuiBox padding={3}>
          <MuiTypography variant="h4">DPH HFA SPA Checker</MuiTypography>
          <MuiBox marginTop={2}>
            <InputSection />
          </MuiBox>
          <MuiBox marginTop={2}>
            <ListSection />
          </MuiBox>
        </MuiBox>
      </MuiPaper>
    </MuiContainer>
  )
}

export default App
