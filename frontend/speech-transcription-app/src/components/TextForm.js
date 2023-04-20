// The audio chunks and the transcriptions are fetched from the 
// 'Original data' folder which is present in the public folder
// Works for any number of transcripts and audio files. 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    // Save button
    const handleSave = () => {
        let newText = '';
        setText(newText);
        props.showAlert('Text Cleared!', 'success');
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    // Discard button
    const handleDiscard = () => {
        if (isAudio) {
            navigator.clipboard.writeText('');
        } else {
            navigator.clipboard.writeText(text);
        }
        props.showAlert('Copied to Clipboard!', 'success');
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
                <h3 className='mb-4'>{props.heading}</h3>
                <div className='mb-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <textarea
                        className='form-control'
                        style={{
                            backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
                            color: props.mode === 'dark' ? 'white' : '#042743',
                        }}
                        id='myBox'
                        rows='8'
                        onChange={handleOnChange}
                        value={text}
                    />
                    {isAudio && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%', height: '100%' }}>
                            <audio controls src={audioSrc} />
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={text === 'Loading...' || text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleSave}style={{ backgroundColor:"limegreen" }}>Save</button>
                    <button disabled={text === 'Loading...' || text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleDiscard}style={{ backgroundColor:"Red" }}>Discard</button>
                    <button className='btn btn-primary mx-1 my-1' onClick={handlePrevious} disabled={text === 'Loading...' || transcriptNumber <= 1}>Previous</button>
                    <button className='btn btn-primary mx-1 my-1' onClick={handleNext} disabled={text === 'Loading...'}>Next</button>

                </div>
            </div>
        </>
    );

}
