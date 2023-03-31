import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Modal } from '@mui/material';
import axios from 'axios';
import {useState} from 'react'
import UpdateWorker from '../components/workers/UpdateWorker';
import ConfirmationPopup from '../components/ConfirmationPopup';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';

export default function WorkersTable(props) {

  const workerList= props.workerList;

//update functions

  const [selectedWorker, setSelectedWorker] = useState(null );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleEditClick = (worker) => {
    setSelectedWorker(worker);
    setOpenUpdateModal(true);
  };

//delete function 

  const [deletingWorker, setDeletingWorker] = useState(null);
  const [openDeletePopupModal, setDeletePopupModal] = useState(false);
  //const [deletedAlert, setDeletedAlert] = useState("");

  const handleDeleteClick = (worker) => {
    setDeletingWorker(worker);
    setDeletePopupModal(true);
  }

  const handleDeleteAction = (worker) =>{

    axios.delete(`http://localhost:12759/api/worker/${worker.id}`)
       .then(response=> {
          console.log(response.data);
          props.tableRefresh();
        });

    setDeletePopupModal(false);
  }

  const handleCloseDeletePopup = () => {
    setDeletePopupModal(false);
  }

  const UpdateWorkerWithRef = React.forwardRef( (props, ref) => {
    return <UpdateWorker {...props} ref={ref} />
  })

  const ConfirmationPopupWithRef = React.forwardRef( (props, ref) => {
    return <ConfirmationPopup {...props} ref={ref} />
  })

  return (
    
    <TableContainer component={Paper}  sx={{ maxHeight: 540}}>
      
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="left">Worker's Picture</TableCell>
            <TableCell align="left" sx={{paddingLeft: 3}}> Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Certified Until</TableCell>
            <TableCell align="left">Designation</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              workerList.map( (worker) => {
              
                return(
                  <TableRow hover role = "checkbox" key={worker.name}>
                    <TableCell align='center'>
                        <Avatar align='center' src={worker.workerPhotoSrc} sx={{ width: 60, height: 60 }}/>
                    </TableCell>
                    <TableCell align='left' component="th" scope="row" sx={{paddingLeft: 3}}>
                      {worker.name}  
                    </TableCell>
                    <TableCell align='left'>
                      {worker.age} 
                    </TableCell>
                    <TableCell align='left'>
                      { //console.log(worker.email)
                        worker.email
                      }  
                    </TableCell>
                    <TableCell align='left'>
                      {
                        // Date(worker.certifiedDate) 
                        worker.certifiedDate
                      } 
                    </TableCell>
                    <TableCell align='left'>
                      {worker.designationName}  
                    </TableCell>
                    <TableCell align='left'>
                      <Button 
                        onClick={ () => handleEditClick(worker) } 
                        variant="contained" 
                      >
                        Edit
                      </Button> 
                    </TableCell>
                    <TableCell align='left'>
                      <Button 
                        onClick={
                          () => handleDeleteClick(worker)
                        }
                        variant="contained" >Delete</Button> 
                    </TableCell>
                  </TableRow>
                );
              } )
            }
          </TableBody>
        </Table>
        <Modal
          open={openUpdateModal}
        >
          <UpdateWorkerWithRef  
            worker={selectedWorker}  
            setOpenUpdateModal={setOpenUpdateModal}  
            tableRefresh = {props.tableRefresh}
          />
        </Modal>

        <Modal
          open= {openDeletePopupModal}
          onClose = {handleCloseDeletePopup}
        >
          <ConfirmationPopupWithRef 
            confirmationMessage={"Are you sure to delete this worker?"}
            confirmButtonMessage= {"Delete"}
            deletingEntity = {deletingWorker}
            confirmedAction ={handleDeleteAction}
            openPopupModal={setDeletePopupModal}
            closePopupModal = {handleCloseDeletePopup}
          />
        </Modal>
      </TableContainer>
  );
}
