import React from 'react';

export default function Lyrics({ nowPlaying, lyricsLoading, songLyrics, fetchNowPlayingTrack }) {
    return (
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
    );
}