import React from 'react';
import { FaLastfm } from 'react-icons/fa';

export default function LoginInfo() {
    return (
        <>
            <div className="login">
                <h1>How to connect?</h1>
                <div className="info-container">
                    <h2>
                        <b>Step 1: </b>
                        Create a <a className="name" href="https://www.last.fm/join" target="_blank">Last.Fm <span className="icon"><FaLastfm size="1.5rem" /></span></a> account.
                    </h2>
                    <h2>
                        <b>Step 2: </b>
                        Click <a className="name" href="https://www.last.fm/settings/applications" target="_blank">here</a> and connect "Spotify Scrobbling" to your account.
                    </h2>
                    <h2>
                        <b>Step 3: </b>
                        Enter your Last.Fm account username above and connect!
                    </h2>
                </div>
            </div>
        </>
    );
}