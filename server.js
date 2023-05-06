const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Run the first script on startup
exec('python ./main/audio-split.py', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing first script: ${err}`);
  } else {
    console.log(`First script output: ${stdout}`);
  }
  
  // Run the second script on startup, after the first script has finished
  exec('python ./main/transcription.py', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing second script: ${err}`);
    } else {
      console.log(`Second script output: ${stdout}`);
    }
    
    // Start the server after both scripts have finished
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
});

// Enable CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Handle requests to run scripts here
app.post('/run-scripts', (req, res) => {
  // Run the scripts and send a response
});
