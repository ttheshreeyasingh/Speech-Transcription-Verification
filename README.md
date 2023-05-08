# Speech-Transcription-Verification
## Brief description 
Our project aims to develop a system for verifying speech transcriptions by dividing a large audio file into smaller segments, converting each segment into text using the AP provided, and presenting it to the user for verification and correction. 
Develop an interface that displays the transcript text and allows the user to play the corresponding audio chunk. 
The user will have the option to edit the text if it is incorrect and save/discard the transcription. 
The system will ensure that each audio chunk is reviewed only once and will move on to the next chunk once the user has verified the transcription i.e should not appear again once the application is restarted.
Overall, our project aims to verify the efficiency of speech transcriptions and make the process more manageable for transcribers through an easy to use interface.

## Objective 
To develop a system to verify speech transcriptions by splitting a large audio file into smaller chunks, transcribing each chunk, and presenting them to the user for verification and correction. Enabling them to either "save" or "discard" the transcriptions. 

There are 3 main components:
1. Audio Splitting
2. Speech-to-text conversion
3. Transcription verification 
## Instructions to run
- Clone this directory and `cd` into it.
- Run `node server.js` to start the server.
- Then run `npm start` to host the app on the browser. 

## Components of the project
- Built with: Python3
- Frontend - React
- Backend - Javascript

### Modules used
- UI built using Creat-React-App
- Audio Splitting
  - Pydub
  - WebRTC Voice Activity Detector (VAD)
- Speech-to-text conversion
  - Speech-to-text API provided 
- Transcription verification 
  - Proptypes
  - Axios
  - LocalStorage API
