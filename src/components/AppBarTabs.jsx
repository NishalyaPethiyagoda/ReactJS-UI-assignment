import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// const pages = ['Farm', 'workers'];

function ResponsiveAppBar() {

  let navigate = useNavigate();

  return (
    <AppBar sx={{ position:'static', color:'secondary'}}>
        <Toolbar sx={{marginLeft:2, position: 'static'}}>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Aqua-Culture
          </Typography>

          <Box sx={{ display: { md: 'flex' } }}>
            
              <Button 
                  onClick={()=> {navigate('/farms')}} 
                  sx={{
                    marginLeft: 1, 
                    my: 2, 
                    color: 'white', 
                    fontWeight:500,
                    display: 'block',
                    minWidth: 110 }}
                  variant= "contained"
              >
                Farms
              </Button> 

              <Button 
                  onClick={()=> {navigate('/workers')}} 
                  sx={{ 
                        marginLeft: 1,
                        my: 2, 
                        color: 'white', 
                        fontWeight:500,
                        display: 'block',
                        minWidth: 110 }}
                  variant= "contained"
              >
                Workers
              </Button>
          </Box>
        </Toolbar>
      
    </AppBar>
  );
}
export default ResponsiveAppBar;