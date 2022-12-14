import Home from "./components/HomePage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/404Page";
import Note from "./components/NotePage";
import Header from "./components/HeaderComponent";

function App()
{
    return (
        <BrowserRouter>
            <div className="App">
                <Header ></Header>
                <div className="centered-body">
                    <div className="container" >
                        <Routes >
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/:page" element={<Note></Note>}></Route>
                            <Route path="*" element={<Error></Error>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
