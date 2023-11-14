import React from 'react';

export default function NothingPlaying({ fetchNowPlayingTrack }) {
    return (
        <div className="info-container">
            <div className="nothing-playing">
                <h4>Nothing is currently playing. Play a song to display lyrics.</h4>
                <button className="button-refresh" onClick={fetchNowPlayingTrack}>
                    Refresh
                </button>
            </div>
        </div>
    );
}