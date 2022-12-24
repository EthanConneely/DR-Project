import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () =>
{
    const [pages, setPages] = useState([]);

    useEffect(() =>
    {
        GetNotes()
    }, []);

    return (
        <div className="home">
            <h1>Pages</h1>
            {
                pages.map(element =>
                {
                    return (
                        <div key={element._id}>
                            <hr />
                            <div className="page-link">
                                <Link to={element._id} state={element} >{element.emoji} {element.title}</Link>
                            </div>
                        </div>
                    )
                })
            }
            <hr />
            <button onClick={newPage}>New Page</button>
            <hr />
            <br />
        </div >
    );

    function newPage()
    {
        axios.get("http://localhost:4000/api/notes")
            .then(d => setPages(d.data))
            .catch(err => console.log(err))
    }

    function GetNotes()
    {
        axios.get("http://localhost:4000/api/notes")
            .then(d => setPages(d.data))
            .catch(err => console.log(err))
    }
}

export default Home;
