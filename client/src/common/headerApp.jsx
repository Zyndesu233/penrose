import React from "react";
import "./headerApp.css";

function HeaderApp({list}) {
    return ( 
        <div className="nav-bar">
            <div className="logo">
                <a href="../../index.html" className="logo-link">
                    <img src="../img/Logo BW.png" alt="Penrose Logo" className="logo-image" />
                </a>
            </div>
            <nav>
                <ul>
                    {list.map((e, i) => <li><a href={e.link} key={i}>{e.name}</a></li>)}
                </ul>
            </nav>
            <div className="header-actions">
                <a href="#" className="btn btn-2 btn-small">Sign In</a>
            </div>
            <button className="mobile-nav-toggle" aria-label="Toggle navigation">
                <span className="hamburger-icon"></span>
            </button>
        </div>
    );
}

export default HeaderApp;