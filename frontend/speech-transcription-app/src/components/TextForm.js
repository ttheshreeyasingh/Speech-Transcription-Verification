import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TextForm(props) {
    const [text, setText] = useState('Loading...');

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get('blah.txt');
                setText(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchText();
    }, []);

    console.log(text);

    const handleMarkForReview = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleSave = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleDiscard = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleNext = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h3 className='mb-4'>{props.heading}</h3>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
                        id="myBox"
                        rows="8"
                        onChange={handleOnChange}
                        value={text}
                    ></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleMarkForReview}>Mark for Review</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSave}>Save</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleDiscard}>Discard</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleNext}>Next</button>
            </div>
        </>
    );
}


