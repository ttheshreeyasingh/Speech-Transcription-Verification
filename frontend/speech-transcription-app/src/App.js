import "./App.css";
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react';
import Alert from './components/Alert';

function log(msg) {
  console.log("[App.js] -> ", msg);
}

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

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
  let audio = new Audio("/2.mp3")

  const start = () => {
    audio.play()
  }
  return (
    
    <>
    <Navbar title="Speech Transcription Verification App" mode={mode} toggleMode={toggleMode} key={new Date()}/>
    <Alert alert={alert}/>
   
    <div className="App container py-3">
    <h3>Verify the transcription of the below audio chunk</h3>
    <button className="btn btn-primary mx-1 my-1" onClick={start}>Play</button>
    <TextForm showAlert={showAlert}  mode={mode}/>
    </div>
   
    </>
  );
}

export default App;

