import React, { useState } from 'react';
import axios from 'axios'; // Add this line to use axios for HTTP requests
import './Login.css';

function Login({ onLogin }) {
  const [audioFiles, setAudioFiles] = useState(['mod_1.wav', 'Audio2.wav']); // Initial audio file names
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Add the uploaded file to the dropdown options
      const fileName = selectedFile.name;
      setAudioFiles((prevFiles) => [...prevFiles, fileName]);
    }
  };

  const handleLogin = () => {
    if (selectedFile) {
      onLogin(selectedFile.name); // Pass the selected file name to the onLogin function

      // Make a POST request to the server with the selected file name
      const formData = new FormData();
      formData.append('fileName', selectedFile.name);

      axios.post('http://localhost:5000/save-audio-file', formData)
        .then((response) => {
          console.log(response.data); 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-bg"></div>

      <div className="login-form">
        <h2 className="login-heading">Login</h2>

        <div className="divider d-flex align-items-center my-4"></div>

        <div className="mb-4">
          <input className="form-control" type="name" placeholder="Name" />
        </div>
        <div className="mb-4">
          <input className="form-control" type="email" placeholder="Email Address" />
        </div>
        <div className="mb-4">
          <select className="form-control" onChange={(event) => setSelectedFile(event.target.value)}>
            <option value="">Select Audio File</option>
            {audioFiles.map((file, index) => (
              <option key={index} value={file}>{file}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input type="file" onChange={handleFileChange} />
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </div>

        <div className="text-center text-md-start mt-3">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
