import { useState, useEffect } from 'react';
import Footer from '../components/footer.tsx';
import { demoSongList } from '../data/demosongdata';

export default function DemoPage() {
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [image, setImage] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [songLyrics, setSongLyrics] = useState("");
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const { songs } = demoSongList();


    const getNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        return songs[nextIndex];
    };

    // Function to handle the "Refresh" button click
    const handleRefreshClick = () => {
        const randomSong = getNextSong();

        // Update the state with the random song's data
        setTrack(randomSong.track);
        setArtist(randomSong.artist);
        setAlbum(randomSong.album);
        setImage(randomSong.image);
        setSongUrl(randomSong.songUrl);
        setSongLyrics(randomSong.songLyrics);
    };

    // Run handleRefreshClick on page load
    useEffect(() => {
        handleRefreshClick();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
            <div>
                <div className="navbar">
                    <div className="navbar-container">
                        <div><a href="/" className="link">FMLyrics</a></div>
                        <div className="input-button-container">
                            <a href={'#'} target="_blank">
                                <span className="logged-in">Demo Account</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="song-container">
                        <div className="song-info">
                            <h4>Currently Playing</h4>

                            <div className="song-data">
                                <h4>{track} - {artist}</h4>
                                <a href={songUrl} target="_blank"><img className="albumArt" src={image} alt={track} /></a>
                                <h4>{album}</h4>

                                <button className="button-navbar btn-refresh" onClick={handleRefreshClick} >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lyrics-container">
                        <div className="lyrics">
                            <h4>Lyrics</h4>
                            <pre><h4>{songLyrics}</h4></pre>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}