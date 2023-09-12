const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line for CORS support

const app = express();
app.use(bodyParser.json());

// Enable CORS middleware to allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Function to run Python scripts
function runPythonScript(scriptPath) {
  exec(`python ${scriptPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing ${scriptPath}: ${err}`);
    } else {
      console.log(`${scriptPath} output: ${stdout}`);
    }
  });
}

// Run the first script on startup
runPythonScript('./main/audio-split.py');

// Run the second script on startup, after the first script has finished
setTimeout(() => {
  runPythonScript('./main/transcription.py');
}, 5000); // Adjust the delay (in milliseconds) as needed to ensure the first script has finished

// Save the text to a file
const fs = require('fs');
const path = require('path');

app.post('/save-text', (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const filePath = path.join(__dirname, `./main/save/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving file');
    } else {
      console.log('File saved successfully');
      res.send('File saved successfully');
    }
  });
});

app.post('/discard-text', (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const filePath = path.join(__dirname, `./main/discard/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving file');
    } else {
      console.log('File discarded successfully');
      res.send('File discarded successfully');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
