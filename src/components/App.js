import React, { Component, Fragment } from 'react';
import '../styles/App.css';
import Home from '../components/Home';
import Nav from '../components/Nav';
import Login from '../components/Login';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Pop Quiz</h1>
        <Nav />
        <Home />
        <Login />
      </header>
    </div>
  );
}

export default App;
