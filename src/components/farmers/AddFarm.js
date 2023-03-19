import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid } from '@mui/material';


function AddFarm() {

    const [openAddFarmModal, setAddFarmModal] = useState(false);

    const handleAddFarmClick = () => {
        setAddFarmModal(true);
    }
    return (
        <div>
            <Button
                variant='contained'
                onClick={() => handleAddFarmClick()}
            >
                Add Farm
            </Button>
            {/* <Modal
                open = {openAddFarmModal}
            >

            </Modal> */}
        </div>
    )
}

export default AddFarm
