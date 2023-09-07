// TestKeyboard.js
import React from 'react';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard from 'react-simple-keyboard';
import { useState } from 'react';

const TestKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleShowKeyboard = () => {
    setKeyboardVisible(true);
  };

  const handleHideKeyboard = () => {
    setKeyboardVisible(false);
  };

  const handleInputChange = (input) => {
    // Define the logic for handling input change here
    console.log("Input changed:", input);
  };

  return (
    <div>
      <button onClick={handleShowKeyboard}>Show Keyboard</button>
      <button onClick={handleHideKeyboard}>Hide Keyboard</button>

      {keyboardVisible && <Keyboard onChange={handleInputChange} />}
    </div>
  );
};

export default TestKeyboard;
