
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import WorkersTable from '../dataTables/WorkersTable';
import Box from '@mui/material/Box';
import AddWorker from '../components/workers/AddWorker';
import axios from 'axios';



function Workers() {

    const [workerList, setWorkerList] = useState([]);
    const [tableRefreshKey, setTableRefeshKey] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:12759/api/worker')
          .then(response => {
            setWorkerList(response.data);
          });
          
      }, [tableRefreshKey]);

    const handleTableResfresh= ( ) =>{
        setTableRefeshKey(tableRefreshKey + 1);
    }
    
    return (
        <div>
            <Container sx={{color:"Secondary"}}>
                <h1>Wokers Table</h1>
            </Container>

            <Container align="right" >
                <AddWorker
                    onAddWorker = {handleTableResfresh}
                ></AddWorker>
            </Container>

            <Box sx={{margin: '34px'}}>
                <WorkersTable
                    workerList = {workerList}
                    tableRefresh = {handleTableResfresh}
                ></WorkersTable>
            </Box>
                
        </div>
    )
}

export default Workers
