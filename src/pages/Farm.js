
import React from 'react'
import FarmersTable from '../dataTables/FarmersTable'

import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import AddFarm from '../components/farmers/AddFarm';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Farms() {

    const [farmList, getFarmList] = useState([]);

    const [ tablerRefreshKey , setTableRefresh] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:12759/api/Farm')
        .then(response => {
            getFarmList(response.data);
        });
    }, [tablerRefreshKey]);

    const handleTableRefresh = () => {
        setTableRefresh(tablerRefreshKey+1);
    }
    return (
        <div>
            <Container>
                <h1>Farms</h1>
            </Container>
            <Container align="right" >
                <AddFarm onAddFarm = {handleTableRefresh}></AddFarm>
            </Container>
            <Box sx={{margin: '34px'}}>
                <FarmersTable farmList={farmList} onTableRefresh={handleTableRefresh}></FarmersTable>
            </Box>
        </div>
    )
}

export default Farms
