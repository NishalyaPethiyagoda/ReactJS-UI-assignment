
import React from 'react'
import FarmersTable from '../dataTables/FarmersTable'

import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import AddFarm from '../components/farmers/AddFarm';


function Farms() {
    return (
        <div>
            <body>
                <div>
                <Container>
                    <h1>Farms</h1>
                </Container>
                <Container align="right" >
                    <AddFarm></AddFarm>
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
