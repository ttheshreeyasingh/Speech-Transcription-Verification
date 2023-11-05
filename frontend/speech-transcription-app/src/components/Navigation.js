import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';

const Navigation = ({ numberOfChunks, handleChunkSelect, chunkColors, setChunkColors }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCount, setSavedCount] = useState(0);
  const [discardedCount, setDiscardedCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(numberOfChunks);

  // Retrieve chunkColors from localStorage on component mount
  useEffect(() => {
    const storedChunkColors = JSON.parse(localStorage.getItem('chunkColors'));
    if (storedChunkColors) {
      // Update chunkColors with stored values
      setChunkColors(storedChunkColors); // Use setChunkColors directly
    }
  }, []);


  // Update counts whenever chunkColors change
  useEffect(() => {
    const saved = chunkColors.filter((color) => color === 'green').length;
    const discarded = chunkColors.filter((color) => color === 'red').length;
    setSavedCount(saved);
    setDiscardedCount(discarded);
    setRemainingCount(numberOfChunks - saved - discarded);
  }, [chunkColors, numberOfChunks]);

  const chunkLinks = Array.from({ length: numberOfChunks }, (_, index) => (
    <li key={index}>
      <button
        className={`chunk-button ${chunkColors[index] === 'green'
          ? 'green-button'
          : chunkColors[index] === 'red'
            ? 'red-button'
            : ''
          }`}
        onClick={() => handleChunkSelect(index + 1)}
      >
        Chunk {index + 1}
      </button>
    </li>
  ));

  // Filter chunkLinks to exclude saved and discarded chunks
  const visibleChunks = chunkLinks.filter((_, index) => chunkColors[index] !== 'red' && chunkColors[index] !== 'green');


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

      <div className="transcript-counts">
        <h2 className="count-title">Transcripts Count</h2>
        <div className="count-table">
          <div className="count-row">
            <div className="count-label">Saved:</div>
            <div className="count-value">{savedCount}</div>
          </div>
          <div className="count-row">
            <div className="count-label">Discarded:</div>
            <div className="count-value">{discardedCount}</div>
          </div>
          <div className="count-row">
            <div className="count-label">Remaining:</div>
            <div className="count-value">{remainingCount}</div>
          </div>
        </div>
      </div>


      <ul className="chunk-list">
        {visibleChunks.map((chunkLink, index) => (
          <React.Fragment key={index}>{chunkLink}</React.Fragment>
        ))}


      </ul>
    </div>
  );
};

export default Navigation;
