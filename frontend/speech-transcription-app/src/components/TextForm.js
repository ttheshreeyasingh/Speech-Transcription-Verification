// The audio chunks and the transcriptions are fetched from the 
// 'Original data' folder which is present in the public folder
// Works for any number of transcripts and audio files. 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';


export default function TextForm(props) {
    const [text, setText] = useState('Loading...');
    const [audioSrc, setAudioSrc] = useState(null);
    const [transcriptNumber, setTranscriptNumber] = useState(1);
    const [isAudio, setIsAudio] = useState(false);

    // Fetch the transcriptions and audio files 
    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get(`./Original data/transcripts/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
                setText(response.data);
                setIsAudio(false);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAudio = async () => {
            try {
                const response = await axios.get(`${process.env.PUBLIC_URL}/Original data/audio_chunks/chunk${transcriptNumber.toString().padStart(4, '0')}.wav`, {
                    responseType: 'blob'
                });
                const blob = new Blob([response.data]);
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
                setIsAudio(true);
            } catch (error) {
                console.error(error);
            }
        };

        if (props.isAudio) {
            fetchAudio();
        } else {
            fetchText();
        }
    }, [transcriptNumber, props.isAudio]);

    const fs = require('fs');

    // Save button
    const handleSave = () => {
        // Create a new Blob object with the text content
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        // Use the saveAs() function from FileSaver.js to save the file
        const filePath = 'transcripts' + transcriptNumber.toString().padStart(4, '0') + '.txt';
        FileSaver.saveAs(blob, filePath);
    };

    // Discard button
    const handleDiscard = () => {
        // Create a new Blob object with the text content
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        // Use the saveAs() function from FileSaver.js to save the file
        const filePath = 'transcripts' + transcriptNumber.toString().padStart(4, '0') + '.txt';
        FileSaver.saveAs(blob, filePath);
    };


    // Next button
    const handleNext = () => {
        props.handleNext();
        setTranscriptNumber(transcriptNumber + 1);
        setText('Loading...');
        setAudioSrc(null);
    };

    // Previous button
    const handlePrevious = () => {
        props.handlePrevious();
        setTranscriptNumber((prevNumber) => prevNumber - 1);
        setText('Loading...');
        setAudioSrc(null);
    };


    return (
        <>
            <div
                className='container'
                style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}
            >
                <div className='mb-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {isAudio && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%', height: '100%' }}>
                            <audio controls src={audioSrc} />
                        </div>
                    )}
                    <h3 className='mb-4'>{props.heading}</h3>
                    <textarea
                        className='form-control'
                        style={{
                            backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
                            color: props.mode === 'dark' ? 'white' : '#042743',
                        }}
                        id='myBox'
                        rows='8'
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={text === 'Loading...'} className='btn btn-primary mx-1 my-1' onClick={handleSave} style={{ backgroundColor: "limegreen" }}>Save</button>
                    <button disabled={text === 'Loading...'} className='btn btn-primary mx-1 my-1' onClick={handleDiscard} style={{ backgroundColor: "Red" }}>Discard</button>
                    <button className='btn btn-primary mx-1 my-1' onClick={handlePrevious} disabled={text === 'Loading...' || transcriptNumber <= 1}>Previous</button>
                    <button className='btn btn-primary mx-1 my-1' onClick={handleNext} disabled={text === 'Loading...'}>Next</button>

                </div>
            </div>
        </>
    );

}

