
import React from 'react'
import FarmersTable from '../dataTables/FarmersTable'
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import AddFarm from '../components/farmers/AddFarm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const primaryTextColor = '#000080';

function Farms() {

    const yesNoDropdown = [
        {id: 1, label: "Yes", value: true},
        {id: 2, label: "No" , value: false},
    ];

    //console.log(farmList);
    
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
            <Container sx={{color: primaryTextColor }}>
                <h1 >Farms Table</h1>
            </Container>
            <Container align="right" sx={{minWidth: '90%' }} >
                <AddFarm 
                    onAddFarm = {handleTableRefresh} 
                    yesNoDropdown={yesNoDropdown}
                ></AddFarm>
            </Container >
            
            <Container sx={{marginTop: '12px' , minWidth:'95%', }}>
                <FarmersTable 
                    farmList={farmList} 
                    yesNoDropdown={yesNoDropdown}
                    tableRefresh={handleTableRefresh} 
                ></FarmersTable>
            </Container>
        </div>
    )
}

export default Farms
{/* backgroundColor: 'blue' */}