import React from 'react';
import './Header.sass';

const Header = () => {
    return (
        <header className="header">
            <a href='/' className="logo header-logo">
                <h1 className='header-logo__title'>Logo</h1>
            </a>
            <nav className="nav header-nav">
                <ul className="nav-list header-nav-list">
                    <li className="nav-item header-nav-item"><a href="/">Home</a></li>
                    <li className="nav-item header-nav-item"><a href="/about">About</a></li>
                    <li className="nav-item header-nav-item"><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <button className="button button--primary header-button">
                Get Started
            </button>
        </header>
    );
};

export default Header;
