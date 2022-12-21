import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NotesPage.css"

const Notes = () =>
{
    let { page } = useParams();

    let auto_grow = (element) =>
    {
        element.target.style.height = "5px";
        element.target.style.height = (element.target.scrollHeight) + "px";
    };

    return (
        <div>
            <h1 className="text-center title">{page.replace(/-/g, ' ')}</h1>
            <textarea autoFocus onInput={e => auto_grow(e)}></textarea>
        </div>
    );
}

export default Notes;
