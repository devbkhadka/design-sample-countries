import React from 'react'
import { Box, Typography } from '@material-ui/core'

const FieldValue = ({field, value})=>(
    <Box display="flex" style={{alignIem: 'center'}}>
        <Typography style={{fontWeight: 'bold'}} variant="body2">{`${field}:`}</Typography>
        &nbsp;
        <Typography variant="body2">{value}</Typography>
    </Box>
)

export default FieldValue