import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import LoginInfo from '../components/loginInfo';
import DemoInfo from '../components/demoInfo';
import NowPlaying from '../components/nowPlaying';
import Lyrics from '../components/lyrics';
import NothingPlaying from '../components/nothingPlaying';

const LASTFM_API_KEY = 'b5ec587a857114c0a57356ecb1a66af9';
const LYRICS_API_BASE_URL = 'https://fmlyrics-3618e53bdfe2.herokuapp.com';

export default function LyricsPage() {
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

                        const LYRICS_API = `${LYRICS_API_BASE_URL}/?&track=${playingTrack}&artist=${playingArtist}`;
                        axios.get(LYRICS_API)
                            .then((response) => {
                                const data = response.data;
                                if (data?.lyrics) {
                                    setSongLyrics(data.lyrics);
                                    setLyricsLoading(false);
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
                <NavBar
                    cookieExists={cookieExists}
                    username={username}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    inputRef={inputRef}
                />

                {/* Not Logged In */}
                {!cookieExists && (
                    <>
                        <LoginInfo />
                        <DemoInfo />
                    </>
                )}

                <div className="content">
                    {/* Logged In */}
                    {cookieExists && (
                        <>
                            {nowPlaying && (
                                <NowPlaying

                                    songLoading={songLoading}
                                    track={track}
                                    artist={artist}
                                    album={album}
                                    image={image}
                                    songUrl={songUrl}
                                    fetchNowPlayingTrack={fetchNowPlayingTrack}
                                />
                            )}

                            {nowPlaying ? (
                                <Lyrics
                                    lyricsLoading={lyricsLoading}
                                    songLyrics={songLyrics}
                                />
                            ) : (
                                <NothingPlaying fetchNowPlayingTrack={fetchNowPlayingTrack} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

