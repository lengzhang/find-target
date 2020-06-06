import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import MuiBox from '@material-ui/core/Box'
import MuiContainer from '@material-ui/core/Container'
import MuiPaper from '@material-ui/core/Paper'
import MuiTypography from '@material-ui/core/Typography'

import InputSection from '../InputSection'
import CalculateButton from '../CalculateButton'
import ListSection from '../ListSection'
import ResultTable from 'src/components/ResultTable'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    container: {
      minHeight: '100vh',
      [theme.breakpoints.up('md')]: {
        paddingTop: '1vh',
        paddingBottom: '1vh',
      },
    },
    paper: {
      minHeight: '100vh',
      [theme.breakpoints.up('md')]: {
        minHeight: '98vh',
      },
    },
  })
)

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <MuiContainer className={classes.container} maxWidth="md" disableGutters>
      <MuiPaper className={classes.paper}>
        <MuiBox padding={3}>
          <MuiTypography variant="h4">Find Target</MuiTypography>
          <MuiBox marginTop={2}>
            <InputSection />
          </MuiBox>
          <MuiBox marginTop={2}>
            <CalculateButton />
          </MuiBox>
          <MuiBox marginTop={2}>
            <ListSection />
          </MuiBox>
          <MuiBox marginTop={2}>
            <ResultTable />
          </MuiBox>
        </MuiBox>
      </MuiPaper>
    </MuiContainer>
  )
}

export default App
