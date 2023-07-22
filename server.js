const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Enable CORS middleware to allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to receive the selected audio file name from the frontend and initiate audio splitting
app.post('/save-audio-file', upload.single('fileName'), (req, res) => {
  const fileName = req.body.fileName; // Get the selected audio file name from the request
  const opPath = './frontend/speech-transcription-app/public/Original data'; // Output path for audio splitting

  // Execute the audio_split.py script with the selected file name as an argument
  exec(`/usr/bin/python ./main/audio-split.py ./uploads/${fileName} ${opPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing audio_split.py: ${err}`);
    } else {
      console.log(`audio_split.py output: ${stdout}`);
      
      // Once audio splitting is done, execute the transcription.py script
      exec(`/usr/bin/python ./main/transcription.py ${fileName} ${opPath}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error executing transcription.py: ${err}`);
        } else {
          console.log(`transcription.py output: ${stdout}`);
          
          // Start the server after both scripts have finished
          const PORT = 5000;
          app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
        }
      });
    }
  });

  res.send('Audio splitting initiated');
});

// Save the text to a file
const fs = require('fs');
const path = require('path');

app.post('/save-text', (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const saveDirPath = path.join(__dirname, 'main/save/mod_1');
  const filePath = path.join(saveDirPath, `transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);

  // Create the save directory if it doesn't exist
  if (!fs.existsSync(saveDirPath)) {
    fs.mkdirSync(saveDirPath, { recursive: true });
  }

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

// Discard the text
app.post('/discard-text', (req, res) => {
  const text = req.body.text;
  const transcriptNumber = req.body.transcriptNumber;
  const discardDirPath = path.join(__dirname, 'main/discard/mod_1');
  const filePath = path.join(discardDirPath, `transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);

  // Create the discard directory if it doesn't exist
  if (!fs.existsSync(discardDirPath)) {
    fs.mkdirSync(discardDirPath, { recursive: true });
  }

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
