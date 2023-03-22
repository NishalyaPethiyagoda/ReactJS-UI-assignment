import { FlashOnRounded } from '@mui/icons-material';
import { Typography} from '@mui/material'
import { useState } from 'react';
import React from 'react'
import {Button, Modal , Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function AssignNewWorker(props) {

    const [openModal, setModal] = useState(false);
    const openAssignNewWorkerModal = () => setModal(true);
    const closeAssignNewWorkerModal = () => setModal(false);
    return (
        <React.Fragment>
            <Button
                variant='contained'
                onClick={() => openAssignNewWorkerModal()}
                sx = {{margin: 3, minWidth: 100}}
            >
                Assign New Workers
            </Button>
            <Modal
                open = {Boolean(openModal)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography>
                        Assign more workers
                    </Typography>
                    <Typography>
                        `farm id = {props.farmId}`
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={() => closeAssignNewWorkerModal()}
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        
                        Close
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
        
    )
}

export default AssignNewWorker
