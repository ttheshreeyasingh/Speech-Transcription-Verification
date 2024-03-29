import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AudioPlayerWithTextForm from './components/AudioPlayerWithTextForm';
import Alert from './components/Alert';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [selectedChunk, setSelectedChunk] = useState(null);

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    selectedLanguage: '',
  });

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
    localStorage.setItem('isLoggedIn', 'true'); // Set login state in localStorage
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false'); // Set login state in localStorage to false
    }
  };

  // Function to handle download of login data
  const handleDownloadLoginData = () => {
    const loginData = localStorage.getItem('loginData'); // Retrieve the login data from local storage

    if (loginData) {
      // Create a Blob with the login data as text
      const blob = new Blob([JSON.stringify(JSON.parse(loginData), null, 2)], { type: 'text/plain' });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'login_data.txt'; // Set the filename for the downloaded text file
      a.style.display = 'none';

      // Append the download link to the document and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the Blob URL
      window.URL.revokeObjectURL(url);
    } else {
      alert('No login data found.');
    }
  };

  // Inside Navigation.js
  const handleChunkSelect = (chunkNumber) => {
    console.log(`Selected Chunk: ${chunkNumber}`);
    setSelectedChunk(chunkNumber);
  };

  
  return (
    <Router>
      <div className="app">
        {isLoggedIn && (
          <div className="logout-button" onClick={handleLogout}>
            Logout
          </div>
        )}

        {isLoggedIn && (
          <div className="download-button" onClick={handleDownloadLoginData}>
            Download Login Data
          </div>
        )}

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
