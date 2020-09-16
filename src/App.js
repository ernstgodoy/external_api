import React from 'react';
import './App.css';
//components
import Artist from './components/Artist';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Artist />
    </Container>
  );
}

export default App;
