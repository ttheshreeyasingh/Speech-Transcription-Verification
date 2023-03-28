import "./App.css";
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState, useRef } from 'react';
import Alert from './components/Alert';

// Import audio file
import song from "./static/chunk0002.wav";

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  // Define State as part of component state
  const [state, setState] = useState({
    // Get audio file in a variable
    audio: new Audio(song),
    // Set initial state of song
    isPlaying: false,
    // Set initial state of scrubbing
    scrubTime: 0,
  });

  // Define playPause function as part of component
  const playPause = () => {
    // Get state of song
    let isPlaying = state.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing
      state.audio.pause();
    } else {
      // Play the song if it is paused
      state.audio.play();
    }

    // Change the state of song
    setState({ ...state, isPlaying: !isPlaying });
  };

  // Define formatTime function as part of component
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  // Define scrub function as part of component
  const scrub = (e) => {
    const scrubTime = e.nativeEvent.offsetX / progressRef.current.offsetWidth * state.audio.duration;
    state.audio.currentTime = scrubTime;
    setState({ ...state, scrubTime: scrubTime });
  };

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }

  const progressRef = useRef(null);

  return (
    <>
      <Navbar title="Speech Transcription Verification App" mode={mode} toggleMode={toggleMode} key={new Date()} />
      <Alert alert={alert} />
  
      <div className="App container py-3">
        <h3>Verify the transcription of the below audio chunk</h3>
  
        <div className="progress-container text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button onClick={playPause} style={{ backgroundColor: "#007bff", color: "white", borderRadius: "20px", border: "none", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          {state.isPlaying ? "Pause Audio" : "Play"}
        </button>
        <div className="progress" onClick={scrub} ref={progressRef} style={{ height: "20px", marginTop: "10px", backgroundColor: "#f5f5f5", borderRadius: "20px", width: "80%", display: "inline-block", marginLeft: "10px", marginRight: "10px" }}>
        <div className="progress-bar" style={{ height: "20px", borderRadius: "20px", backgroundColor: "#1a237e", width: (state.audio.currentTime / state.audio.duration) * 100 + "%" }}></div>
        </div>

        </div>
        <p style={{ margin: "10px 0", fontSize: "14px", color: "#6c757d" }}>
          {state.isPlaying ? "Audio is playing" : "Audio is paused"} | {formatTime(state.audio.currentTime)} / {formatTime(state.audio.duration)}
        </p>
      </div>


        <TextForm showAlert={showAlert} mode={mode} />
    </>
  );
}  

export default App;
