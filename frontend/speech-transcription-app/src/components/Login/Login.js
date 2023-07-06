import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [audioFiles, setAudioFiles] = useState(['audio1.mp3', 'audio2.mp3', 'audio3.mp3']); // Initial audio file names
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

  return (
    <div className="login-container">
      <div className="login-image-bg"></div>

      <div className="login-form">
        <h2 className="login-heading">Login</h2>

        <div className="divider d-flex align-items-center my-4">
          {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */}
        </div>

        <div className="mb-4">
          <input className="form-control" type="name" placeholder="Name" />
        </div>
        <div className="mb-4">
          <input className="form-control" type="email" placeholder="Email Address" />
        </div>
        <div className="mb-4">
          <select className="form-control">
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
          <button className="btn btn-primary" onClick={onLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
