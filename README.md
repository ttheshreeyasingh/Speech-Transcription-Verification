# Speech-Transcription-Verification

## Objective
Develop an efficient Speech Transcription Validation System for Indian languages, incorporating automated audio segmentation, precise transcription generation, and a user-friendly interface with advanced features, including user authentication, transcription review, navigation, editing, synchronized audio playback, virtual keyboard support, and local storage. 

## Brief description 
Our project focuses on creating an efficient Speech Transcription Verification System tailored for Indian languages. It accomplishes this by segmenting large audio files, converting segments into text using a speech-to-text API, and presenting them to users for review and correction.
- This system features a user-friendly interface with advanced functionalities such as user authentication, enabling secure access and usage.
- Users can efficiently navigate through transcripts, ensuring seamless review and editing.
- Additionally, our system supports Indian languages by offering a virtual keyboard, enhancing accessibility and accuracy.
- Users have the option to save or discard each transcription, and the system ensures that audio segments are reviewed only once, optimizing the verification process.
Our project’s ultimate goal is to enhance the accuracy and efficiency of speech transcriptions while making the process user-friendly and accessible for transcribers.

## Getting Started
### Prerequisites

Make sure you have the following software installed on your local machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (only if you want to run the application locally without Docker)

These instructions will help you run the application using Docker. If you prefer to run it locally, please skip to the "Local Development" section.

- Clone this directory and move to its root using `cd Speech-Transcription-Verification/`
- Run `cd Frontend/`
// change if required once dockerization done 
- Build the Docker image: `sudo docker build -t your-docker-image-name .`
- Run the Docker container: `sudo docker run -p 3000:3000 your-docker-image-name`

Note - Running Docker with `sudo` can be necessary if your user doesn't have the necessary permissions to interact with Docker.

### Local Development 

If you want to run the application locally without Docker for development purposes:

- Clone this directory and move to its root using `cd Speech-Transcription-Verification/` 
- Run `node server.js` to start the server.
- Open a new tab in your terminal and run `cd frontend/speech-transcription-app/`
- Then run `npm start` to run the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  
## Interface 
// add updated image 
![alt text](https://github.com/ttheshreeyasingh/Speech-Transcription-Verification/blob/main/frontend/speech-transcription-app/public/preview.png)


## Tech Stack
• Programming Languages: Python for backend development, JavaScript for fron-
tend.
• Front-end: HTML, CSS, and JavaScript for the user interface, enhanced by React
for dynamic content rendering.
• Back-end: Python for audio splitting and generating transcripts, Node.js for server-
side logic and API development.
• Caching and Data Storage: LocalStorage API is employed for client-side caching
to store transient data, ensuring data continuity.
• Version Control: Git was used for version control and collaborative development.
• Docker: Docker was employed to containerize the web application for efficient
deployment.
• Other Libraries and Frameworks: Axios and Fetch API for save/discard, Pydub
and WebRTC Voice Activity Detection (VAD) for audio chunking, react-router-dom
for client-side routing and navigation, react-simple-keyboard for Telugu keyboard

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory `cd Speech-Transcription-Verification/frontend/speech-transcription-app/`, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Team 1

UG2K20 batch
- Srujana vanka - 2020102005
- Shreeya Singh - 2020102011
