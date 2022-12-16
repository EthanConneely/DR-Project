import Home from './components/HomePage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/404Page';
import Notes from './components/NotesPage';

function App()
{
    return (
        <BrowserRouter>
            <div className="App">
                <div className='header'>Note Taking Site</div>
                <div className='centered-body'>
                    <Routes >
                        <Route path='/' element={<Home></Home>}></Route>
                        <Route path='/:page' element={<Notes></Notes>}></Route>
                        <Route path='*' element={<Error></Error>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
