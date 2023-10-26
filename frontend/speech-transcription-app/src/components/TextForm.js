import React, { useState, useEffect } from 'react';
import VirtualKeyboard from './keyboard';
import axios from 'axios';

export default function TextForm(props) {
    const text = props.text;
    const setText = props.setText;
    const audioSrc = props.audioSrc;
    const setAudioSrc = props.setAudioSrc;
    const isAudio = props.isAudio;
    const setIsAudio = props.setIsAudio;
    const transcriptNumber = props.transcriptNumber;
    const setTranscriptNumber = props.setTranscriptNumber;
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get(`${process.env.PUBLIC_URL}/Original data/transcripts/transcript${transcriptNumber.toString().padStart(4, '0')}.txt`);
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
    }, [transcriptNumber, props.isAudio, setAudioSrc, setIsAudio, setText]);

    // Save button
    const handleSave = () => {
        // Create a FormData object to send both text and audio
        const formData = new FormData();
        formData.append('text', text);
        formData.append('transcriptNumber', transcriptNumber);

        // If there's an audio source, append it to the form data
        if (audioSrc) {
            fetch(audioSrc)
                .then((response) => response.blob())
                .then((audioBlob) => {
                    formData.append('audio', audioBlob, 'audio.wav');

                    // Send the form data with both text and audio
                    axios
                        .post('http://localhost:5000/save-text-and-audio', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((response) => {
                            console.log(response.data);
                            // Set the chunk color to green upon successful save
                            props.setChunkColors((prevColors) => {
                                const updatedColors = [...prevColors];
                                updatedColors[transcriptNumber - 1] = 'green';

                                // Store updatedChunkColors in localStorage
                                localStorage.setItem('chunkColors', JSON.stringify(updatedColors));

                                return updatedColors;
                            });

                            // Call the onSave function to update the saved count
                            props.onSave();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            // If there's no audio source, send only the text
            axios
                .post('http://localhost:5000/save-text', {
                    text: text,
                    transcriptNumber: transcriptNumber,
                })
                .then((response) => {
                    console.log(response.data);
                    // Set the chunk color to green upon successful save
                    props.setChunkColors((prevColors) => {
                        const updatedColors = [...prevColors];
                        updatedColors[transcriptNumber - 1] = 'green';

                        // Store updatedChunkColors in localStorage
                        localStorage.setItem('chunkColors', JSON.stringify(updatedColors));

                        return updatedColors;
                    });

                    // Call the onSave function to update the saved count
                    props.onSave();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };



    // Discard button
    const handleDiscard = () => {
        // Create a FormData object to send both text and audio
        const formData = new FormData();
        formData.append('text', text);
        formData.append('transcriptNumber', transcriptNumber);

        // If there's an audio source, append it to the form data
        if (audioSrc) {
            fetch(audioSrc)
                .then((response) => response.blob())
                .then((audioBlob) => {
                    formData.append('audio', audioBlob, 'audio.wav');

                    // Send the form data with both text and audio
                    axios
                        .post('http://localhost:5000/discard-text-and-audio', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((response) => {
                            console.log(response.data);
                            // Set the chunk color to red upon successful discard
                            props.setChunkColors((prevColors) => {
                                const updatedColors = [...prevColors];
                                updatedColors[transcriptNumber - 1] = 'red';

                                // Store updatedChunkColors in localStorage
                                localStorage.setItem('chunkColors', JSON.stringify(updatedColors));

                                return updatedColors;
                            });

                            // Call the onDiscard function to update the discarded count
                            props.onDiscard();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // If there's no audio source, send only the text
            axios
                .post('http://localhost:5000/discard-text', {
                    text: text,
                    transcriptNumber: transcriptNumber,
                })
                .then((response) => {
                    console.log(response.data);
                    // Set the chunk color to red upon successful discard
                    props.setChunkColors((prevColors) => {
                        const updatedColors = [...prevColors];
                        updatedColors[transcriptNumber - 1] = 'red';

                        // Store updatedChunkColors in localStorage
                        localStorage.setItem('chunkColors', JSON.stringify(updatedColors));

                        return updatedColors;
                    });

                    // Call the onDiscard function to update the discarded count
                    props.onDiscard();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };



    // Next button
    const handleNext = async () => {
        localStorage.setItem('transcriptNumber', transcriptNumber + 1);
        setTranscriptNumber((prevState) => prevState + 1);

        // Fetch the new transcript text
        try {
            const response = await axios.get(`${process.env.PUBLIC_URL}/Original data/transcripts/transcript${(transcriptNumber + 1).toString().padStart(4, '0')}.txt`);
            setText(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTextareaClick = () => {
        setKeyboardVisible(true);
    };

    const handleBackspace = () => {
        // Define the logic for handling backspace here
        setText(prevText => prevText.slice(0, -1)); // Removes the last character
    };

    const handleSpace = () => {
        setText(prevText => prevText + ' '); // Adds a space
    };

    const handleEnter = () => {
        setKeyboardVisible(false); // Hide the virtual keyboard
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
                    <h3>Transcript {transcriptNumber}</h3>
                    <div onClick={handleTextareaClick} style={{ position: 'relative' }}>
                        <textarea
                            className='form-control'
                            style={{
                                backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
                                color: props.mode === 'dark' ? 'white' : '#042743',
                                width: '45rem',
                            }}
                            id='myBox'
                            rows='8'
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                        />
                        {keyboardVisible && (
                            <VirtualKeyboard onChange={setText}
                                onBackspace={handleBackspace}
                                onSpace={handleSpace}
                                onEnter={handleEnter}
                            />
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={text === 'Loading...'} className='btn btn-primary mx-1 my-1' onClick={handleSave} style={{ backgroundColor: "limegreen" }}>Save</button>
                    <button disabled={text === 'Loading...'} className='btn btn-primary mx-1 my-1' onClick={handleDiscard} style={{ backgroundColor: "Red" }}>Discard</button>
                    <button className='btn btn-primary mx-1 my-1' onClick={handleNext} disabled={text === 'Loading...'}>Next</button>


                </div>
            </div>
        </>
    );

}

