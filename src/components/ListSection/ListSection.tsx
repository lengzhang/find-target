import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionActions from '@material-ui/core/AccordionActions'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { RootState, listRemove, listClean } from '../../reducer'

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    detail: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
)

const selector = (state: RootState) => {
  return state.list
}

const ListSection: React.FC = () => {
  const classes = useStyles()
  const list = useSelector(selector)
  const dispatch = useDispatch()

  const [expanded, setExpanded] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (list.length === 0 && expanded) {
      setExpanded(false)
    }
  }, [list.length])

  const onExpandedChange = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (list.length > 0) setExpanded((prevExpanded) => !prevExpanded)
  }

  const onListRemove = (index: number) => () => {
    dispatch(listRemove(index))
  }

  const onListClean = () => {
    dispatch(listClean())
  }

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={onExpandedChange}
      >
        <Typography variant="h6">{`List (${list.length})`}</Typography>
      </AccordionSummary>
      {list.length > 0 && (
        <AccordionActions>
          <Button
            aria-label="clean list"
            onClick={onListClean}
            fullWidth
            variant="outlined"
          >
            Clean All Items
          </Button>
        </AccordionActions>
      )}
      <AccordionDetails>
        <Grid container spacing={1}>
          {list.map((item, index) => {
            return (
              <Grid item key={index}>
                <Button variant="outlined" onClick={onListRemove(index)}>
                  {item}
                </Button>
              </Grid>
            )
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default ListSection
