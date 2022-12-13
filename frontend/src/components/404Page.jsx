import React, { useEffect } from 'react';

const Error = () =>
{
    useEffect(() =>
    {
    });
    return (
        <div className='text-center'>
            <h1>
                404
            </h1>
            <h2>
                Page not found!
            </h2>
            <a href="/">Back to safety</a>
        </div>
    );
}

export default Error;
