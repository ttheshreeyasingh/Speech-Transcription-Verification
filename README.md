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

### Running the Application with Docker

These instructions will help you run the application using Docker. If you prefer to run it locally, please skip to the "Local Development" section.

- Clone this directory and move to its root using `cd Speech-Transcription-Verification/`
- Build the Docker images for the frontend and backend by running `docker-compose build`
- After the images are successfully built, you can run the application using `docker-compose up`
- Docker Compose will start the frontend and backend containers, and the application will be accessible at the following URL: [http://localhost:3000](http://localhost:3000)
- To stop the application and shut down the containers, press `Ctrl + C` in the terminal where Docker Compose is running.

Note - Running Docker with `sudo` can be necessary if your user doesn't have the necessary permissions to interact with Docker.

### Local Development 

If you want to run the application locally without Docker for development purposes:

- Clone this directory and move to its root using `cd Speech-Transcription-Verification/`
- Run `npm install` to install all the dependencies. 
- Run `node server.js` to start the server.
- Open a new tab in your terminal and run `cd frontend/speech-transcription-app/`
- Then run `npm start` to run the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  
## Interface - // add updated image 
![alt text](https://github.com/ttheshreeyasingh/Speech-Transcription-Verification/blob/main/frontend/speech-transcription-app/public/preview.png)


## Tech Stack
- Programming Languages: Python for backend development, JavaScript for fron-
tend.
- Front-end: HTML, CSS, and JavaScript for the user interface, enhanced by React
for dynamic content rendering.
- Back-end: Python for audio splitting and generating transcripts, Node.js for server-
side logic and API development.
- Caching and Data Storage: LocalStorage API is employed for client-side caching
to store transient data, ensuring data continuity.
- Version Control: Git was used for version control and collaborative development.
- Docker: Docker was employed to containerize the web application for efficient
deployment.
- Other Libraries and Frameworks: Axios and Fetch API for save/discard, Pydub
and WebRTC Voice Activity Detection (VAD) for audio chunking, react-router-dom
for client-side routing and navigation, react-simple-keyboard for Telugu keyboard

## Team 1

UG2K20 batch
- Srujana vanka - 2020102005
- Shreeya Singh - 2020102011
