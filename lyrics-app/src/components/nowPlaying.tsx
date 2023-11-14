import React from 'react';

export default function NowPlaying({ nowPlaying, songLoading, track, artist, album, image, songUrl, fetchNowPlayingTrack }) {
    return (
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
    );
}