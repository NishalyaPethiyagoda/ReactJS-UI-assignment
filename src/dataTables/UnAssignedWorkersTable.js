import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useState, useEffect } from 'react';

function UnAssignedWorkersTable(props) {

    const unAssignedWorkers = props.unAssignedWorkers;

    //allocate worker table functions
    const handleAssignWorker = (workerId ) => {
      axios.post(`http://localhost:12759/api/FarmWorker/${props.selectedFarm}/${workerId}`)
      .then(response => {
          console.log(response.data);
          props.handleAssignedFarmWorkerTableRefresh();
      })
  }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Worker certified Until</TableCell>
                <TableCell align="left" sx={{padding:2}}>Designation</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unAssignedWorkers.map((worker) => {
                if(!worker)
                {
                  return(
                    <Container>
                      <Typography key="no-worker">
                        no workers available 
                      </Typography>
                    </Container>
                  )
                }
                else{
                  return(
                    <TableRow
                      key={worker.workerId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell  align="left">{worker.name}</TableCell>
                      <TableCell align="left">{worker.age}</TableCell>
                      <TableCell align="left">{worker.certifiedDate}</TableCell>
                      <TableCell align="left" sx={{padding:2}}>{worker.designationName}</TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          onClick={() => {
                            handleAssignWorker(worker.id);
                            
                            //handleTableRefresh();
                            //{console.log(unAssignedWorkers)}
                          }}
                          sx = {{minWidth: 100}}
                        >
                            Allocate
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                }
                
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default UnAssignedWorkersTable