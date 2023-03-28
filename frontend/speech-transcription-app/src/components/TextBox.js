
// Define the path of the text file
// const filePath = '/home/shreeya/Speech-Transcription-Verification/main/transcripts/transcript0011.txt';

// create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// open the file using GET request
xhr.open("GET", "blah.txt", true);

// set the response type to text
xhr.responseType = "text";

// handle the onload event
xhr.onload = function() {
  // check if the request was successful
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    // retrieve the file content as a string
    var fileContent = xhr.responseText;
    console.log(fileContent);
  }
};

// send the request
xhr.send();



// // Create a new instance of the XMLHttpRequest object
// const xhr = new XMLHttpRequest();

// // Use the open() method to initialize the request
// xhr.open('GET', filePath);

// // Set the responseType property to 'text' to indicate that the server response should be treated as plain text
// xhr.responseType = 'text';

// // Define a callback function to handle the response
// xhr.onload = function() {
//   // Check if the request was successful (status code between 200 and 299)
//   if (xhr.status >= 200 && xhr.status < 300) {
//     // Store the response in a variable
//     const fileContent = xhr.responseText;
    
//     // Select the textarea element and set its value to the file content
//     const textarea = document.getElementById('myTextarea');
//     textarea.value = fileContent;
//   } else {
//     console.log('The request was unsuccessful.');
//   }
// };

// // Send the request to the server
// xhr.send();

