import React from "react";
import { useState } from "react";
import ButtonApp from "./buttonApp";
import "./headerApp.css";

function HeaderApp() {
    const [list, setList] = useState([
        {
            name: "Home",
            link: "#hero"
        },
        {
            name: "Product",
            link: "#prodecut-intro"
        },
        {
            name: "About Us",
            link: "#company-intro"
        },
        {
            name: "Testimonials",
            link: "#testimonials"
        },
        {
            name: "Workspace",
            link: "#"
        },
        {
            name: "Dashboard",
            link: "#"
        }
    ]);

    return ( 
        <div class="container">
            <div class="logo">
                <a href="#hero" class="logo-link">
                    <img src="../img/Logo BW.png" alt="Penrose Logo" class="logo-image" />
                </a>
            </div>
            <nav>
                <ul>
                    {list.map((e, i) => <li><a href={e.link}>{e.name}</a></li>)}
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
