import React from 'react'
import  Modal  from '@mui/material/Modal';
import  Box  from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    minWidth: '300px',
    
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }; 

function EditFarm( {OpenUpdatePopupModal} ) {
    return (
        <div>
            <Modal
                open = {OpenUpdatePopupModal}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autocomplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Update Farm
                    </Typography>

                </Box>
            </Modal>
        </div>
    )
}

export default EditFarm
