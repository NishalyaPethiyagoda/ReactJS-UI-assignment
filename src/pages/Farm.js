
import React from 'react'
import FarmersTable from '../dataTables/FarmersTable'

import { Container } from '@mui/system';
import Box from '@mui/material/Box';


function Farms() {
    return (
        <div>
            <body>
                <div>
                <Container sx={{color:"red"}}>
                    <h1>Farmers Table</h1>
                </Container>
                <Box sx={{margin: '34px'}}>
                    <FarmersTable></FarmersTable>
                </Box>
                </div>
            </body>
        </div>
    )
}

export default Farms
