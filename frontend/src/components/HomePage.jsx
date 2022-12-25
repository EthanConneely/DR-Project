import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () =>
{
    const [pages, setPages] = useState([]);

    let navigate = useNavigate();

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
                                <Link to={element._id}>{element.emoji} {element.title}</Link>
                                <a className="delete-button" onClick={e => deletePage(element.title, element._id)}>
                                    <img src="./Delete.png" />
                                </a>
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
        axios.post("http://localhost:4000/api/notes")
            .then(d =>
            {
                let data = d.data;
                navigate("/" + data._id, { replace: true })
            })
            .catch(err => window.alert(err))
    }

    function deletePage(title, id)
    {
        if (window.confirm("Are you sure you want to delete " + title))
        {
            axios.delete("http://localhost:4000/api/note/" + id)
                .then(_ => GetNotes())
                .catch(err => window.alert(err))
        }
    }

    function GetNotes()
    {
        axios.get("http://localhost:4000/api/notes")
            .then(d => setPages(d.data))
            .catch(err => window.alert(err))
    }
}

export default Home;
