import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Note = () =>
{
    let params = useParams();

    // Get a reference to the text input so we can update it
    const textInput = useRef(null);

    const [title, setTitle] = useState("");
    const [lines, setLines] = useState("");
    const [emoji, setEmoji] = useState("");
    const [banner, setBanner] = useState("");

    useEffect(_ =>
    {
        // Load the data in for this pages note
        axios.get("http://localhost:4000/api/note/" + params.page)
            .then(d =>
            {
                setTitle(d.data.title)
                setLines(d.data.lines)
                setEmoji(d.data.emoji)
                setBanner(d.data.banner)

                // Set the height of the text area after the text is loaded
                updateTextareaHeight({ target: textInput.current })
            })
            .catch(err => console.log(err))
    }, [])

    // Send data to server when ever user updates input
    useEffect(() =>
    {
        // Dont send a empty update
        if (title === "" && emoji === "" && lines === "" && banner === "")
        {
            return;
        }

        // Update the note when a change in the variable occurs
        axios.put("http://localhost:4000/api/note/" + params.page, { title, emoji, lines, banner })

    }, [title, emoji, lines, banner]);

    return (
        <div>
            {/* Display the background image using direct styling */}
            <div className="banner" style={{ backgroundImage: "url('" + banner + "')" }}>
                <input className="title emoji-input" type="text" value={emoji} onInput={e => setEmoji(e.target.value)} maxLength={2} />
                <input className="title title-input" type="text" value={title} onInput={e => setTitle(e.target.value)} maxLength={21} />
                <a className="upload-button" onClick={e => updateBanner()}>
                    <img src="./Upload.png" />
                </a>
            </div>
            <textarea id="main-text" value={lines} autoFocus ref={textInput} onInput={e => { updateTextareaHeight(e); setLines(e.target.value); }}></textarea>
        </div >
    );

    function updateBanner()
    {
        let newBanner = window.prompt("Enter the new background image url", banner);

        if (newBanner !== null)
        {
            setBanner(newBanner)
        }
    }

    // Update the height of the text input area
    function updateTextareaHeight(e)
    {
        e.target.style.height = (e.target.scrollHeight) + "px";
    }
}

export default Note;
