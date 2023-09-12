import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [audioFiles, setAudioFiles] = useState(['mod_1.wav', 'Audio2.wav', 'final.wav']); // Initial audio file names
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('telugu'); // Default language
  const languages = ['telugu', 'english']; // Available language options
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleLogin = async () => {
    if (name && email && selectedLanguage && selectedFile) {
      const loginData = {
        name,
        email,
        selectedLanguage,
        selectedFile
      };

      try {
        const fileName = 'login.json';

        // Using localStorage to store the data
        const existingData = localStorage.getItem('loginData');
        if (existingData) {
          // Append new login data to the existing data
          const newData = JSON.parse(existingData);
          newData.push(loginData);
          localStorage.setItem('loginData', JSON.stringify(newData));
        } else {
          // Create a new array and store the login data
          localStorage.setItem('loginData', JSON.stringify([loginData]));
        }

        // Perform login logic with the selected language
        onLogin(selectedLanguage);

      } catch (error) {
        console.error('Error saving login data:', error);
        alert('Error saving login data.');
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
