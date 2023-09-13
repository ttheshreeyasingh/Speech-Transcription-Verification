import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navigation = ({ numberOfChunks, handleChunkSelect }) => {
  const [searchQuery, setSearchQuery] = useState(''); 

  const chunkLinks = Array.from({ length: numberOfChunks }, (_, index) => (
    <li key={index}>
      <button className="chunk-button" onClick={() => handleChunkSelect(index + 1)}>
        Chunk {index + 1}
      </button>
    </li>
  ));

  return (
    <div className="navigation">
      <h2 className="navigation-heading">Transcript Navigation</h2>

      {/* search bar */}
      <input
        type="text"
        className="search-bar" 
        placeholder="Search for a chunk"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="chunk-list">
        {chunkLinks
          .filter((_, index) =>
            searchQuery
              ? `Chunk ${index + 1}`.toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
          .map((chunkLink, index) => (
            <React.Fragment key={index}>{chunkLink}</React.Fragment>
          ))}
      </ul>
    </div>
  );
};

export default Navigation;
