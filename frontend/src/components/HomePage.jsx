import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLink from "./PageLink";

const Home = () =>
{
    const [pages, setPages] = useState([]);

    let navigate = useNavigate();

    useEffect(() =>
    {
        getNotes()
    }, []);

    return (
        <div className="home">
            <h1>Pages</h1>
            {
                pages.map(note =>
                {
                    return (
                        <div key={note._id}>
                            <hr />
                            <PageLink note={note} reloadData={getNotes}></PageLink>
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
        axios.post("http://localhost:4000/api/notes")
            .then(d =>
            {
                let data = d.data;
                navigate("/" + data._id, { replace: true })
            })
            .catch(err => window.alert(err))
    }

    function getNotes()
    {
        axios.get("http://localhost:4000/api/notes")
            .then(d => setPages(d.data))
            .catch(err => window.alert(err))
    }
}

export default Home;
