import axios from "axios";
import React, { } from "react";
import { Link } from "react-router-dom";

const PageLink = (props) =>
{
    return (
        <div className="page-link">
            <Link to={props.note._id}>{props.note.emoji} {props.note.title}</Link>
            <a className="delete-button" onClick={e => deletePage(props.note.title, props.note._id)}>
                <img src="./Delete.png" />
            </a>
        </div>
    );

    function deletePage(title, id)
    {
        if (window.confirm("Are you sure you want to delete " + title))
        {
            axios.delete("http://localhost:4000/api/note/" + id)
                .then(r =>
                {
                    // console.log(r.data);
                    props.reloadData();
                })
                .catch(err => window.alert(err))
        }
    }
}

export default PageLink;
