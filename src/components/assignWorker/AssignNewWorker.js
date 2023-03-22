import { Filter, FlashOnRounded } from '@mui/icons-material';
import { Typography} from '@mui/material'
import { useEffect, useState } from 'react';
import React from 'react'
import {Button, Modal , Box } from '@mui/material';
import axios from 'axios';
import { Container } from '@mui/system';
import UnAssignedWorkersTable from '../../dataTables/UnAssignedWorkers';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
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

    const assignedWorkers = props.assignedWorkers;
    const [workersList, setWorkersList] = useState([]);

    const [unAssigneWorkersTableKey, setUnAssigneWorkersTableKey] = useState();
    const handleTableRefresh = () => setUnAssigneWorkersTableKey(unAssigneWorkersTableKey+1);

    useEffect(() => {
        axios.get('http://localhost:12759/api/Worker')
            .then(response => {
                console.log(response.data);
                setWorkersList(response.data);
            })
    }, [unAssigneWorkersTableKey]);

    const unAssignedWorkers = workersList.filter((worker) => !assignedWorkers.some((assignedWorker) => assignedWorker.workerId === worker.id));  

     

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
                    <Container sx={{marginLeft: 1 , marginTop: 3}}>
                        <Typography>
                            Assign more workers
                        </Typography>
                    </Container>
                    <Container sx={{marginTop: 3}}>
                        <UnAssignedWorkersTable
                            unAssignedWorkers={unAssignedWorkers}
                        />
                    </Container>
                    <Button
                        variant='contained'
                        onClick={() => {
                            // console.log(unAssignedWorkers);
                            closeAssignNewWorkerModal();
                        }}
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
