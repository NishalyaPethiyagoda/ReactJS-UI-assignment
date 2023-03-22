import { Modal, Box , Button} from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import AssignNewWorker from '../assignWorker/AssignNewWorker';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    innerHeight: '70%',
    outerHeight: '75%',
    minWidth: '300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AssignedWorkers(props) {

    const [openModal, setModal] = useState(false);
    const openAssignedWorkersModal = () => setModal(true);
    const closeAssignNewWorkerModal = () => setModal(false);

    return (
        <div>
            <Modal
                open={Boolean(props.openFarmWorkersModal)}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                autoComplete="off"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Assigned Workers to this Farm
                    </Typography>
                    
                    <AssignNewWorker 
                        farmId = {props.selectedFarmId}
                    >
                        {/* {console.log(props.farmId)} */}
                    </AssignNewWorker>
                    <Button
                        variant='contained'
                        onClick={() => props.closeFarmWorkersModal()}
                        sx = {{margin: 3, minWidth: 100}}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AssignedWorkers
