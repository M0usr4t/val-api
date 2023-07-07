import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <h1>Testing</h1>
      <Router>
        <Navbar/>
          <Routes>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
