import React from "react";
import ButtonApp from "./buttonApp";
import "./headerApp.css";

function HeaderApp({list}) {
    return ( 
        <div class="container">
            <div class="logo">
                <a href="#hero" class="logo-link">
                    <img src="../img/Logo BW.png" alt="Penrose Logo" class="logo-image" />
                </a>
            </div>
            <nav>
                <ul>
                    {list.map((e, i) => <li><a href={e.link} key={i}>{e.name}</a></li>)}
                </ul>
            </nav>
            <div class="header-actions">
                <a href="#" class="btn btn-secondary btn-small">Sign In</a>
                </div>
            <ButtonApp />
        </div>
    );
}

export default HeaderApp;
