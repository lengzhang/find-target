import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

interface BlockProps {
  header: string
  showChildren?: boolean
  action?: React.ReactNode
}

const Block: React.FC<BlockProps> = ({
  header,
  showChildren = false,
  children,
  action,
}) => {
  return (
    <Card>
      <CardHeader subheader={header} action={action} />
      {showChildren && (
        <CardContent style={{ paddingTop: 0 }}>{children}</CardContent>
      )}
    </Card>
  )
}

export default Block
