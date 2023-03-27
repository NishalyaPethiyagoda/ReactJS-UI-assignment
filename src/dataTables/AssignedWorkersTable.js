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

function AssignedWorkersTable(props) {

  const assignedWorkers = props.assignedWorkers;

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
              {assignedWorkers.map((worker) => {
                if(!worker)
                {
                  return(
                    <Container>
                      <Typography key="no-worker">
                        no workers assigned yet
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
                      <TableCell  align="left">{worker.workerName}</TableCell>
                      <TableCell align="left">{worker.age}</TableCell>
                      <TableCell align="left">{worker.certifiedDate}</TableCell>
                      <TableCell align="left" sx={{padding:2}}>{worker.designation}</TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          onClick={() => { props.deleteWorkerAssignment(worker.workerId); }}
                          sx = {{minWidth: 100}}
                        >
                            Deallocate
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

export default AssignedWorkersTable


