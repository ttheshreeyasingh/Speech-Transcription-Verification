import React, { useState } from 'react';
import "./App.css";
import Navbar from './components/Navbar';
import AudioPlayerWithTextForm from './components/AudioPlayerWithTextForm';
import Alert from './components/Alert';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Inside Navigation.js
  const handleChunkSelect = (chunkNumber) => {
    console.log(`Selected Chunk: ${chunkNumber}`);
    setSelectedChunk(chunkNumber);
  };

  

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navigation numberOfChunks={100} handleChunkSelect={handleChunkSelect} />}
        <div className="content">
          <Navbar title="Speech Transcription Verification App" mode={mode} toggleMode={toggleMode} key={new Date()} />
          <Alert alert={alert} />

          <div className="App container py-3">
            {isLoggedIn ? (
              <Switch>
                <AudioPlayerWithTextForm selectedChunk={selectedChunk} />
              </Switch>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
