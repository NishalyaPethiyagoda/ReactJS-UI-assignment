import React from 'react'
import  Modal  from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    minWidth: '300px',
    bgcolor: 'background.paper',
    backgroundColor:"whitesmoke",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };

function ConfirmationPopup( {
    deletingEntity,     
    confirmedAction, 
    confirmationMessage, 
    confirmButtonMessage, 
    openPopupModal, 
    closePopupModal,
}) {
    return (
        <div>
            <Modal
                open={Boolean(openPopupModal)}
                //onClose={closePopupModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box style={style} sx={{padding: 3}}>
                    <Typography 
                        id="modal-modal-title" 
                        variant="h6" 
                        component="h2"
                        sx={{marginLeft: 3 , marginTop: 2}}
                    >
                        {confirmationMessage}
                    </Typography>
                    <Button 
                        variant= "contained"
                        sx={{marginLeft: 3, marginTop: 2}}
                        onClick={() => confirmedAction(deletingEntity)}
                    >
                        {confirmButtonMessage}
                    </Button>
                    <Button 
                        variant= "contained"
                        sx={{marginLeft: 5, marginTop: 2}}
                        onClick={() => closePopupModal()}
                    >
                        Cancel
                    </Button>
                </Box>  
            </Modal>
        </div>
        
    )
}

export default ConfirmationPopup
