
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { FaLastfm } from 'react-icons/fa';

const LASTFM_API_KEY = 'b5ec587a857114c0a57356ecb1a66af9';
const LYRICS_API_BASE_URL = 'http://localhost:3000';

export default function Navigation() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [cookieExists, setCookieExists] = useState(false);
    const [username, setUsername] = useState('');
    const [artist, setArtist] = useState('');
    const [track, setTrack] = useState('');
    const [album, setAlbum] = useState('');
    const [image, setImage] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songLyrics, setSongLyrics] = useState('');
    const [nowPlaying, setNowPlaying] = useState(false);
    const [lyricsLoading, setLyricsLoading] = useState(false);
    const [songLoading, setSongLoading] = useState(false);

    const fetchUsernameCookie = () => {
        const usernameCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (usernameCookie) {
            setCookieExists(true);
            setUsername(usernameCookie);
        }
    };

    useEffect(() => {
        fetchUsernameCookie();
    }, []);

    const handleLogin = () => {
        const username = inputRef.current?.value;
        if (username) {
            document.cookie = `username=${username}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            setCookieExists(true);
            setUsername(username);
            console.log(`Username saved as cookie: ${username}`);
        }
    };

    const handleLogout = () => {
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        setCookieExists(false);
        setUsername('');
        console.log('Logged out');
    };

    const fetchNowPlayingTrack = () => {
        if (cookieExists) {
            setSongLoading(true);
            setArtist('');
            setTrack('');
            setAlbum('');
            setImage('');
            setSongUrl('');
            setSongLyrics('');

            const FM_API = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=${LASTFM_API_KEY}&user=${encodeURIComponent(username)}&format=json`;

            axios.get(FM_API)
                .then((response) => {
                    const { data } = response;

                    if (data.recenttracks.track[0]["@attr"] === undefined) {
                        setNowPlaying(false);
                        console.log("Nothing Playing");
                    } else if (response.status === 200) {
                        setNowPlaying(true);
                        console.log("data.status");
                        const { artist: { "#text": playingArtist }, name: playingTrack, album: { "#text": album }, image: imageArr, url } = data.recenttracks.track[0];
                        const image = imageArr[3]["#text"];

                        setArtist(playingArtist);
                        setTrack(playingTrack);
                        setAlbum(album);
                        setImage(image);
                        setSongUrl(url);

                        console.log("Set current track to " + playingTrack);
                        setSongLoading(false);
                        setLyricsLoading(true);

                        const LYRICS_API = `${LYRICS_API_BASE_URL}/?&user=${encodeURIComponent(username)}`;
                        axios.get(LYRICS_API)
                            .then((response) => {
                                const data = response.data;
                                if (data?.lyrics) {
                                    const playingArtistCleaned = playingArtist.replace(/\s/g, '').toLowerCase();
                                    const dataArtistCleaned = data.artist.replace(/\s/g, '').toLowerCase();

                                    console.log("playingArtist:", playingArtistCleaned);
                                    console.log("data.artist:", dataArtistCleaned);
                                    console.log(dataArtistCleaned === playingArtistCleaned);
                                    if (dataArtistCleaned.includes(playingArtistCleaned)) {
                                        console.log(`${data.artist} does match ${playingArtist}`);
                                        setSongLyrics(data.lyrics);
                                        setLyricsLoading(false);
                                    } else {
                                        console.log(`${dataArtistCleaned} does not match ${playingArtistCleaned}`);
                                        setSongLyrics("No lyrics found");
                                        setLyricsLoading(false);
                                    }
                                } else {
                                    console.log("Data or data.lyrics is missing");
                                    setSongLyrics("No lyrics found");
                                    setLyricsLoading(false);
                                }
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                                setSongLyrics("Error retrieving lyrics");
                                setLyricsLoading(false);
                            });
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        setNowPlaying(false);
                        console.log("API Error: 404 Not Found");
                    } else {
                        console.error("Error:", error);
                    }
                });
        }
    };

    useEffect(() => {
        let timer = setInterval(fetchNowPlayingTrack, 400000);

        return () => {
            clearInterval(timer);
        };
    }, [cookieExists]);

    useEffect(() => {
        setArtist('');
        setTrack('');
        fetchNowPlayingTrack();
    }, [cookieExists]);

    return (
        <>
            <div>
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

                {/* Not Logged In */}
                {!cookieExists && (
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
                        <div className="login">
                            <h1>Want a Demo?</h1>
                            <div className="demo-container">
                                <h2>
                                    <b>Click </b>
                                    <a className="name" href="/demo" target="_blank">Here</a>
                                </h2>
                            </div>
                        </div>
                    </div>

                )}
                <div className="content">
                    {/* Logged In */}
                    {cookieExists && (
                        <>
                            {nowPlaying && (
                                <div className="song-container">
                                    <div className="song-info">
                                        <h4>Currently Playing</h4>
                                        {songLoading && (
                                            <div className="loading">
                                                <h4>Loading...</h4>
                                            </div>
                                        )}
                                        <div className="song-data">
                                            <h4>{track} - {artist}</h4>
                                            <a href={songUrl} target="_blank"><img className="albumArt" src={image} alt={track} /></a>
                                            <h4>{album}</h4>

                                            <button className="button-navbar btn-refresh" onClick={fetchNowPlayingTrack}>
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {nowPlaying ? (
                                <div className="lyrics-container">
                                    <div className="lyrics">
                                        <h4>Lyrics</h4>
                                        {lyricsLoading && (
                                            <div className="loading">
                                                <h4>Loading...</h4>
                                            </div>
                                        )}
                                        <pre><h4>{songLyrics}</h4></pre>
                                    </div>
                                </div>
                            ) : (

                                <div className="info-container">
                                    <div className="nothing-playing">
                                        <h4>Nothing is currently playing. Play a song to display lyrics.</h4>
                                        <button className="button-refresh" onClick={fetchNowPlayingTrack}>
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                            )}


                        </>
                    )}
                </div >

            </div >
        </>
    );
}
