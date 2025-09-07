import React, { useState, useEffect } from "react";
import "./headerApp.css";

function HeaderApp({ list }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home"); // Default to Home

    useEffect(() => {
        const currentPath = window.location.pathname;
        const hash = window.location.hash;

        // Find a non-hash link that matches the current path
        const activePage = list.find(item => !item.link.startsWith('#') && currentPath.includes(item.link) && item.link !== "./page/dashboard.html");

        if (activePage) {
            setActiveLink(activePage.name);
        } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath.endsWith('dashboard.html')) {
            // We are on the home page, check for hash
            const activeHash = list.find(item => item.link === hash);
            if (activeHash) {
                setActiveLink(activeHash.name);
            } else {
                setActiveLink("Home"); // Default for home page
            }
        }
    }, [list]);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = (name) => {
        setActiveLink(name);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className="nav-bar">
            <div className="logo">
                <a href="../../index.html" className="logo-link">
                    <img src="../img/Logo BW.png" alt="Penrose Logo" className="logo-image" />
                </a>
            </div>
            <nav className={isMobileMenuOpen ? "mobile-menu-open" : ""}>
                <ul>
                    {list.map((e, i) => (
                        <li key={`${i}-th header item`}>
                            <a
                                href={e.link}
                                className={activeLink === e.name ? "active" : ""}
                                onClick={() => handleLinkClick(e.name)}
                            >
                                {e.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="header-actions">
                    <a href="#" className="btn btn-2 btn-small">Sign In</a>
                </div>
            </nav>
            <button
                className={`mobile-nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
                aria-label="Toggle navigation"
                onClick={toggleMobileMenu}
            >
                <span className="hamburger-icon"></span>
            </button>
        </div>
    );
}

export default HeaderApp;