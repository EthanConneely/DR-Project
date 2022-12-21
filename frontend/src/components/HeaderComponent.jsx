import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = (props) =>
{
    let location = useLocation();

    return (
        <div className="header">
            {
                location.pathname != '/' &&
                <a href="/">
                    <img src="/BackArrow.png" className="back" />
                </a>
            }
            <h3>
                Note Taking Site
            </h3>
        </div>
    );
}

export default Header;
