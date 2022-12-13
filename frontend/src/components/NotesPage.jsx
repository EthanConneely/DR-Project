import React, { useEffect } from 'react';

const Notes = () =>
{
    useEffect(() =>
    {
        console.log("Mounting...");
    });
    return (
        <h1>
            Notes
        </h1>
    );
}

export default Notes;
