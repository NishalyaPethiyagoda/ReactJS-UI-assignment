
import { Typography} from '@mui/material'
import {  useState } from 'react';
import React from 'react'
import {Button, Modal , Box } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import {  useEffect } from 'react';
import UnAssignedWorkersTable from '../../dataTables/UnAssignedWorkersTable';

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

    //getting all workers and filtering out assigened workers
    const [workersList, setWorkersList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:12759/api/Worker')
            .then(response => {
                setWorkersList(response.data);
            })
    }, []);

    const assignedWorkers = props.assignedWorkers;

    const [unAssignedWorkers, setUnAssignedWorkers] = useState([]);

    // filtering for unassigned workers
    const filterFuntion = () => {
        props.getAssignedFarmWorkers();

        const unAssignedWorkerList = workersList.filter((worker) => !assignedWorkers.some( (assignedWorker)=> assignedWorker.workerId===worker.id) );
        
        setUnAssignedWorkers(unAssignedWorkerList);
    }

    useEffect( () => {
        filterFuntion();
    }, []);

    return (
        <React.Fragment>
            <Button
                variant='contained'
                onClick={() => {
                    openAssignNewWorkerModal();
                    filterFuntion();
                }}
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
                            selectedFarm = {props.farmId}
                            unAssignedWorkers={unAssignedWorkers}
                            handleUnAssignedWorkerTableRefresh = {filterFuntion}
                        />
                    </Container>
                    <Button
                        variant='contained'
                        sx = {{margin: 3, minWidth: 100}}
                        onClick={() => { closeAssignNewWorkerModal();  }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
        
    )
}

export default AssignNewWorker
