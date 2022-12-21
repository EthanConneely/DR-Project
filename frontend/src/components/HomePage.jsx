import React, { useEffect } from "react";

const Home = () =>
{
    useEffect(() =>
    {
        console.log("Home");
    }, []);

    let test = ["123", "1234", "1235"]


    return (
        <div className="home">
            <h1>Pages</h1>
            {
                test.map(element =>
                {
                    return (
                        <div key={element}>
                            <hr />
                            <p className="page-link">{element}</p>
                        </div>
                    )
                })
            }
            <hr />
            <button onClick={newPage}>New Page</button>
            <hr />
            <br />
        </div>
    );

    function newPage()
    {
        test.push("12312123")
        console.log("Click");
    }
}


export default Home;
