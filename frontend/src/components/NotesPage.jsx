import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../NotesPage.css"

const Notes = () =>
{
    let params = useParams();

    const textInput = useRef(null);

    const [note, setNote] = useState({ title: "", lines: "", emoji: "", banner: "" });

    useEffect(_ =>
    {
        axios.get("http://localhost:4000/api/note/" + params.page)
            .then(d =>
            {
                setNote(d.data)
                // Set the height of the text area after the text is loaded
                UpdateTextareaHeight({ target: textInput.current })
            })
            .catch(err => console.log(err))
    }, [])

    let OnInputChange = (e) =>
    {
        // Update the state of the note object
        setNote(prev =>
        {
            UpdateTextareaHeight(e)
            return { ...prev, lines: e.target.value }
        })

        UpdateLink();
    };

    // Update the title from an input
    let TitleUpdate = (e) =>
    {
        setNote(prev =>
        {
            return { ...prev, title: e.target.value }
        })

        UpdateLink();
    }

    // Update the emoji from an input
    let EmojiUpdate = (e) =>
    {
        setNote(prev =>
        {
            return { ...prev, emoji: e.target.value }
        })

        UpdateLink();
    }

    return (
        <div>
            <div className="banner" style={{ backgroundImage: "url('" + note.banner + "')" }}>
                <input className="title emoji-input" type="text" value={note.emoji} onInput={EmojiUpdate} maxLength={3} />
                <input className="title title-input" type="text" value={note.title} onInput={TitleUpdate} maxLength={10} />
            </div>
            <textarea id="main-text" value={note.lines} autoFocus ref={textInput} onInput={e => OnInputChange(e)}></textarea>
        </div >
    );

    function UpdateLink()
    {
        axios.put("http://localhost:4000/api/note/" + params.page, note)
    }

    // Update the height of the text input area
    function UpdateTextareaHeight(e)
    {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }
}

export default Notes;
