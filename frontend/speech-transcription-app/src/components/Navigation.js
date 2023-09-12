import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your own CSS for custom styling

const Navigation = ({ numberOfChunks, handleChunkSelect }) => {
  const chunkLinks = Array.from({ length: numberOfChunks }, (_, index) => (
    <li key={index}>
      <button className="chunk-button" onClick={() => handleChunkSelect(index + 1)}>
        Chunk {index + 1}
      </button>
    </li>
  ));

  return (
    <div className="navigation">
      <h2 className="navigation-heading">Audio Chunks</h2>
      <ul className="chunk-list">{chunkLinks}</ul>
    </div>
  );
};

export default Navigation;
