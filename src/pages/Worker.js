
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import WorkersTable from '../dataTables/WorkersTable';
import Box from '@mui/material/Box';
import AddWorker from '../components/workers/AddWorker';
import axios from 'axios';

const primaryTextColor = '#000080';

function Workers() {

    const [designations, setDesignations] = useState([]);
    useEffect(()=>{
        
        axios.get('http://localhost:12759/api/WorkerDesignation')
            .then(response => {
                setDesignations(response.data);
            })
    }, []);

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
            <Container sx={{color: primaryTextColor }}>
                <h1>Wokers Table</h1>
            </Container>

            <Container align="right" sx={{minWidth: '90%'}}>
                <AddWorker
                    designations = {designations}
                    onAddWorker = {handleTableResfresh}
                ></AddWorker>
            </Container>

            <Box sx={{marginTop: '12px' , marginLeft: '54px', marginRight:'54px' }}>
                <WorkersTable
                    designations= { designations}
                    workerList = {workerList}
                    tableRefresh = {handleTableResfresh}
                ></WorkersTable>
            </Box>
                
        </div>
    )
}

export default Workers
