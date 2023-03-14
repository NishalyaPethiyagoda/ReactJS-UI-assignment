
import './App.css';

import Home from './pages/Home';
import Farms from './pages/Farm';
import Workers from './pages/Worker';
import ResponsiveAppBar from './components/AppBarTabs';

import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    
    <div className="App">
      <Router>
        

        <div>
          <ResponsiveAppBar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/farms" element={<Farms />} />
          <Route path="/workers" element={<Workers />} />
            
          {/* <Route path="*" element={<h1>Error 404: Page Not found</h1>} /> */}
        </Routes>


      </Router>
      
    </div>
  );
}

export default App;
