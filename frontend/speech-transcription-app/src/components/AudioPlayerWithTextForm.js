import React, { useState, useEffect } from 'react';
import TextForm from './TextForm';

const AudioPlayerWithTextForm = ({selectedChunk, transcriptNumber, setTranscriptNumber , text, setText, isAudio, setIsAudio, audioSrc, setAudioSrc}) => {

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
                        transcriptNumber={transcriptNumber}
                        setTranscriptNumber={setTranscriptNumber}
                        text={text}
                        audioSrc={audioSrc}
                        isAudio={isAudio}
                        setText={setText}
                        setAudioSrc={setAudioSrc}
                        setIsAudio={setIsAudio}
                        selectedChunk={selectedChunk}
                    />
                </div>
            </div>
        </>
    );
};

export default AudioPlayerWithTextForm;
