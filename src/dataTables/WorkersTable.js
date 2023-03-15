import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Modal } from '@mui/material';
import axios from 'axios';
import {useState, useEffect} from 'react'
import UpdateWorker from '../components/workers/UpdateWorker';


export default function WorkersTable() {

  const [workerList, setWorkerList] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:12759/api/worker')
      .then(response => {
        setWorkerList(response.data);
      })
      
  }, []);

  const handleEditClick = (worker) => {
    setSelectedWorker(worker);
    setOpen(true);
  };

  //console.log(workerList);
  return (
    
    <TableContainer component={Paper}>
      
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
            {/* <TableCell align="left">Worker ID</TableCell> */}
            <TableCell align="left"> Name</TableCell>
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
                    {/* <TableCell align='left'>
                      {worker.Id}  
                    </TableCell> */}
                    <TableCell align='left' component="th" scope="row">
                      {worker.name}  
                    </TableCell>
                    <TableCell align='left'>
                      {worker.age}  
                    </TableCell>
                    <TableCell align='left'>
                      {worker.email}  
                    </TableCell>
                    <TableCell align='left'>
                      {worker.certifiedDate } 
                    </TableCell>
                    <TableCell align='left'>
                      {worker.designation}  
                    </TableCell>
                    <TableCell align='left'>
                      <Button onClick={ () => handleEditClick(worker) } variant="contained" >Edit</Button> 
                    </TableCell>
                    <TableCell align='left'>
                      <Button variant="contained" >Delete</Button> 
                    </TableCell>
                  </TableRow>
                );
              } )
            }
          </TableBody>
        </Table>
        <Modal
          open={open}
          autocomplete="off"
        >
          <UpdateWorker  worker={selectedWorker}  setOpen={setOpen}  />
        </Modal>
      </TableContainer>
  );
}
