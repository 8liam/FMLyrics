import React from 'react';
import { FaLastfm } from 'react-icons/fa';

export default function NavBar({ cookieExists, username, handleLogin, handleLogout, inputRef }) {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <div>FMLyrics</div>
                {!cookieExists && (
                    <div className="input-button-container">
                        <input
                            type="text"
                            placeholder="Enter Last.Fm username"
                            ref={inputRef}
                            className="input-field"
                        />
                        <button className="button-navbar" onClick={handleLogin}>
                            Connect
                        </button>
                    </div>
                )}
                {cookieExists && (
                    <div className="input-button-container">
                        <a href={`https://last.fm/user/${username}`} target="_blank">
                            <span className="logged-in">{username}</span>
                        </a>
                        <button className="button-navbar" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}