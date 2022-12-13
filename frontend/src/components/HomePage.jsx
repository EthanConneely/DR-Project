import React, { useEffect } from 'react';

const Home = () =>
{
    useEffect(() =>
    {
        console.log("Mounting...");
    });
    return (
        <h1>
            Geeks....!
        </h1>
    );
}

export default Home;
