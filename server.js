const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line for CORS support

const multer = require('multer');

const fs = require('fs');
const path = require('path');

// Define the save and discard directories
const saveDir = path.join(__dirname, './main/save');
const discardDir = path.join(__dirname, './main/discard');

// Function to create a directory if it doesn't exist
function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Store audio as memory buffer
const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());

// Enable CORS middleware to allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Function to run Python scripts
// function runPythonScript(scriptPath) {
//   exec(`python ${scriptPath}`, (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing ${scriptPath}: ${err}`);
//     } else {
//       console.log(`${scriptPath} output: ${stdout}`);
//     }
//   });
// }

// Run the first script on startup
// runPythonScript('./main/audio-split.py');

// Run the second script on startup, after the first script has finished
// setTimeout(() => {
//   runPythonScript('./main/transcription.py');
// }, 5000); // Adjust the delay (in milliseconds) as needed to ensure the first script has finished

// Create save and discard directories if they don't exist
createDirectoryIfNotExists(saveDir);
createDirectoryIfNotExists(discardDir);

let savedTranscripts = [];
let discardedTranscripts = [];

// Save both text and audio
app.post('/save-text-and-audio', upload.fields([{ name: 'text' }, { name: 'audio' }]), (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const audio = req.files.audio[0];

  const textFilePath = path.join(__dirname, `./main/save/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
  const audioFilePath = path.join(__dirname, `./main/save/transcript${transcriptNumber.toString().padStart(4, '0')}.wav`);

  fs.writeFile(textFilePath, text, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving text file');
    } else {
      console.log('Text file saved successfully');
      // Handle the audio file
      fs.writeFile(audioFilePath, audio.buffer, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error saving audio file');
        } else {
          console.log('Audio file saved successfully');
          savedTranscripts.push(transcriptNumber); // Update the saved transcripts array
          res.send('Text and audio files saved successfully');
        }
      });
    }
  });
});

// Discard both text and audio
app.post('/discard-text-and-audio', upload.fields([{ name: 'text' }, { name: 'audio' }]), (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const audio = req.files.audio[0];

  const textFilePath = path.join(__dirname, `./main/discard/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
  const audioFilePath = path.join(__dirname, `./main/discard/transcript${transcriptNumber.toString().padStart(4, '0')}.wav`);

  fs.writeFile(textFilePath, text, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error discarding text file');
    } else {
      console.log('Text file discarded successfully');
      // Handle the audio file
      fs.writeFile(audioFilePath, audio.buffer, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error discarding audio file');
        } else {
          console.log('Audio file discarded successfully');
          discardedTranscripts.push(transcriptNumber); // Update the discarded transcripts array
          res.send('Text and audio files discarded successfully');
        }
      });
    }
  });
});

// Endpoint to get the list of saved transcripts
app.get('/get-saved-transcripts', (req, res) => {
  res.json({ savedTranscripts });
});

// Endpoint to get the list of discarded transcripts
app.get('/get-discarded-transcripts', (req, res) => {
  res.json({ discardedTranscripts });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});