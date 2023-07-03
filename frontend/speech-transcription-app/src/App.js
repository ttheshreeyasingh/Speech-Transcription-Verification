import React, { useState } from 'react';
import "./App.css";
import Navbar from './components/Navbar';
import AudioPlayerWithTextForm from './components/AudioPlayerWithTextForm';
import Alert from './components/Alert';
import Login from './components/Login/Login';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <>
      <Navbar title="Speech Transcription Verification App" mode={mode} toggleMode={toggleMode} key={new Date()} />
      <Alert alert={alert} />

      <div className="App container py-3">
        {isLoggedIn ? (
          <>
            <h3>Verify the transcription of the below audio chunk</h3>
            <AudioPlayerWithTextForm showAlert={showAlert} mode={mode} />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </>
  );
}

export default App;
