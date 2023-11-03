import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AudioPlayerWithTextForm from './components/AudioPlayerWithTextForm';
import Alert from './components/Alert';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import axios from 'axios';

function App() {
  const [text, setText] = useState('Loading...');
  const [audioSrc, setAudioSrc] = useState(null);
  const [isAudio, setIsAudio] = useState(false);
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [numberOfTranscripts, setNumberOfTranscripts] = useState(0); 
  const [chunkColors, setChunkColors] = useState(Array(57).fill('')); // For changing the color of the chunk buttons
  // Using localStorage API to store the last transcript number and retrieve it when the application starts again
  const [transcriptNumber, setTranscriptNumber] = useState(parseInt(localStorage.getItem('transcriptNumber')) || 1);


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

  // Fetch the number of transcripts in the database to display in navigation panel
  useEffect(() => {

    // Fetch the list of transcript files 
    axios.get(`${process.env.PUBLIC_URL}/Original data/transcripts/`)
      .then(response => {
        // Filter and count the transcript files based on your naming convention
        const transcriptFiles = response.data.filter(file => file.startsWith('transcript'));
        setNumberOfTranscripts(transcriptFiles.length);
      })
      .catch(error => {
        console.error('Error fetching transcript files', error);
      });
  }, []);
  

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

  const handleSendLoginDataEmail = () => {
    const loginData = localStorage.getItem('loginData'); // Retrieve the login data from local storage
    
    if (loginData) {
      // Now, make a request to your server to send the email
      fetch('http://localhost:5000/send-login-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginData }), // Send the login data to the server
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the response from the server
        })
        .catch((error) => {
          console.error('Error sending login data:', error);
        });
    } else {
      alert('No login data found.');
    }
  };
  
  const handleChunkSelect = async (chunkNumber) => {
    console.log(`chunk number: ${chunkNumber}`);
    setSelectedChunk(chunkNumber);
    setTranscriptNumber(chunkNumber);
    setIsAudio(true);
    console.log(`transcriptNumber: ${chunkNumber}`)
    try {

      const responseText = await axios.get(`${process.env.PUBLIC_URL}/Original data/transcripts/transcript${chunkNumber.toString().padStart(4, '0')}.txt`);
      setText(responseText.data);

      const responseAudio = await axios.get(`${process.env.PUBLIC_URL}/Original data/audio_chunks/chunk${chunkNumber.toString().padStart(4, '0')}.wav`, {
        responseType: 'blob'
      });
      const blob = new Blob([responseAudio.data]);
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);
      localStorage.setItem('transcriptNumber', chunkNumber);
    } catch (error) {
      console.error(error);
    }
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
          <div className="download-button" onClick={handleSendLoginDataEmail}>
            Email Login Data
          </div>
        )}

        {isLoggedIn && (
          <Navigation
            numberOfChunks={numberOfTranscripts}
            handleChunkSelect={handleChunkSelect}
            chunkColors={chunkColors}
            setChunkColors={setChunkColors} // Pass setChunkColors to Navigation
          />
        )}
        <div className="content">
          <Navbar title="Speech Transcription Verification App" mode={mode} toggleMode={toggleMode} key={new Date()} />
          <Alert alert={alert} />

          <div className="App container py-3">
            {isLoggedIn ? (
              <Switch>
                <AudioPlayerWithTextForm
                  selectedChunk={selectedChunk}
                  transcriptNumber={transcriptNumber}
                  setTranscriptNumber={setTranscriptNumber}
                  text={text}
                  audioSrc={audioSrc}
                  isAudio={isAudio}
                  setText={setText}
                  setAudioSrc={setAudioSrc}
                  setIsAudio={setIsAudio}
                  setChunkColors={setChunkColors}
                />
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
