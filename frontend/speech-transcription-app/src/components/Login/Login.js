import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [audioFiles, setAudioFiles] = useState(['final.wav']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const languages = ['telugu'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(''); 
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  // Validate email address
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (name && selectedLanguage && selectedFile) {
      if (isEmailValid(email)) {
        const loginData = {
          name,
          email,
          selectedLanguage,
          selectedFile
        };
  
        try {
          const fileName = 'login.json';
  
          const existingData = localStorage.getItem('loginData');
          if (existingData) {
            const newData = JSON.parse(existingData);
            newData.push(loginData);
            localStorage.setItem('loginData', JSON.stringify(newData));
          } else {
            localStorage.setItem('loginData', JSON.stringify([loginData]));
          }
  
          onLogin(selectedLanguage);
        } catch (error) {
          console.error('Error saving login data:', error);
          alert('Error saving login data.');
        }
      } else {
        setEmailError('Please enter a valid email address.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-bg"></div>
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <div className="divider d-flex align-items-center my-4"></div>
        <div className="mb-4">
          <input className="form-control" type="name" placeholder="Name" onChange={handleNameChange} />
        </div>
        <div className="mb-4">
          <input className="form-control" type="email" placeholder="Email Address" onChange={handleEmailChange} />
          <span style={{ color: 'red' }}>{emailError}</span>
        </div>
        <div className="mb-4">
          <select className="form-control" onChange={handleLanguageChange}>
            <option value="">Select Language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>{language === 'telugu' ? 'Telugu' : 'English'}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select className="form-control" onChange={(event) => setSelectedFile(event.target.value)}>
            <option value="">Select Audio File</option>
            {audioFiles.map((file, index) => (
              <option key={index} value={file}>{file}</option>
            ))}
          </select>
        </div>
        {/* <div>
        <input type="file" webkitdirectory = "true" multiple id="transcriptsFolder" onChange={moveFolder} />
        <input type="file" webkitdirectory = "true" multiple id="chunksFolder" onChange={moveFolder}/> 
        {/* <button type="button" onclick="moveFolder()">Move/Duplicate Folder</button> */}
        {/* </div>  */}
        <div className="text-center text-md-start mt-3">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
