
import React from 'react'
import FarmersTable from '../dataTables/FarmersTable'

import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import AddFarm from '../components/farmers/AddFarm';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Farms() {

    const [farmList, getFarmList] = useState([]);

    const yesNoDropdown = [
        {id: 1, label: "Yes", value: true},
        {id: 2, label: "No" , value: false},
    ];

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
                <AddFarm 
                    onAddFarm = {handleTableRefresh} 
                    yesNoDropdown={yesNoDropdown}
                ></AddFarm>
            </Container>
            <Box sx={{margin: '34px'}}>
                <FarmersTable 
                    farmList={farmList} 
                    yesNoDropdown={yesNoDropdown}
                    tableRefresh={handleTableRefresh} 
                ></FarmersTable>
            </Box>
        </div>
    )
}

export default Farms
