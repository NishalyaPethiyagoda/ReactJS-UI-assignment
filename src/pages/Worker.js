
import { Container } from '@mui/system';
import React from 'react'
import WorkersTable from '../dataTables/WorkersTable';
import Box from '@mui/material/Box';
import AddWorker from '../components/workers/AddWorker';



function Workers() {
    return (
        <div>
            <Container sx={{color:"Secondary"}}>
                <h1>Wokers Table</h1>
            </Container>

            <Container align="right" >
                <AddWorker></AddWorker>
            </Container>

            <Box sx={{margin: '34px'}}>
                <WorkersTable></WorkersTable>
            </Box>
                
        </div>
    )
}

export default Workers
