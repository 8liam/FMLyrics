
type NowPlayingProps = {
    songLoading: boolean;
    track: string;
    artist: string;
    album: string;
    image: string;
    songUrl: string;
    fetchNowPlayingTrack: () => void;
}

export default function NowPlaying({ songLoading, track, artist, album, image, songUrl, fetchNowPlayingTrack }: NowPlayingProps) {
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