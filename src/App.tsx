import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { HomePage } from './pages/home/home';
import { AgentsPage } from './pages/agents/agents';
import { MapsPage } from './pages/maps/maps';
import { ArsenalPage } from './pages/arsenal/arsenal';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
              <Route path = "/" element={<HomePage/>} />
              <Route path = "/agents" element={<AgentsPage/>} />
              <Route path = "/maps" element={<MapsPage/>} />
              <Route path = "/arsenal" element={<ArsenalPage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
