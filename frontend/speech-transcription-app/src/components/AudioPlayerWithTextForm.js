import React, { useState, useEffect } from 'react';
import TextForm from './TextForm';

const AudioPlayerWithTextForm = ({ selectedChunk }) => {
    const [transcriptNumber, setTranscriptNumber] = useState(selectedChunk);
    console.log(`dd: ${transcriptNumber}`)
    const [isAudio, setIsAudio] = useState(false);

    useEffect(() => {
        // Update transcriptNumber when selectedChunk changes
        setTranscriptNumber(selectedChunk);
    }, [selectedChunk]);

    const handleNext = () => {
        setTranscriptNumber((prevNumber) => prevNumber + 1);
        setIsAudio(false);
    };

    useEffect(() => {
        setIsAudio(false);
    }, [transcriptNumber]);

    useEffect(() => {
        setIsAudio(true);
    }, [transcriptNumber]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <TextForm
                        heading={`Transcript ${transcriptNumber}`}
                        handleNext={handleNext}
                        isAudio={isAudio}
                        transcriptNumber={transcriptNumber}
                        selectedChunk={selectedChunk}
                    />
                </div>
            </div>
        </>
    );
};

export default AudioPlayerWithTextForm;
