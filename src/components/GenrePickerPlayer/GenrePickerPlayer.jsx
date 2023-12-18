import React, { useEffect, useReducer } from 'react'
import styles from './GenrePickerPlayer.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerPlayer = (props) => {

    const { history, handleClickStar } = props;

    const song = history[0];

    // Create a controller to control playback in the embedded song iFrame
    useEffect(() => {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('player-iframe');
            const options = {
                uri: "spotify:episode:7makk4oTQel546B0PZlDM5",
                width: "100%",
                height: "100px",
                theme: "dark"
            };
            const callback = (EmbedController) => {
                try {
                    // Update the iframe song URI on the first time the iframe is loaded
                    EmbedController.loadUri(`spotify:track:${song.URI}`);
                    
                    // Update the iframe song URI every time after that when the history changes
                    document.addEventListener("historyChanged", (e) => {
                        console.log(history);
                        EmbedController.loadUri(`spotify:track:${e.detail.newSongURI}`);
                    })

                    // Play the song once the iframe is ready
                    EmbedController.addListener('ready', () => {
                        EmbedController.play();
                    });

                } catch (err) {
                    console.log(err);
                }
            };
            // Create an iframe in place of the "player-iframe" div returned by the component
            IFrameAPI.createController(element, options, callback);

            // NOTE: Spotify has a bug in Firefox that means song is only a preview even when we are logged in
        };

        return () => {
            window.onSpotifyIframeApiReady = null;
            delete window.onSpotifyIframeApiReady;

        }
    }, []);

    // Add Spotify embed script to the page (on first time the component loads) to be able to use the iFrame API
    // NOTE: this has to go after the onSpotifyIframeApiReady useEffect for some reason otherwise browser restricts autoplay
    useEffect(() => {
        const script = document.createElement('script');

        script.id = "spotify-iframe-script";
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;

        document.body.appendChild(script);

    }, []);

    return (
        <div className={styles.player}>
            <div id="player-iframe" className={styles.song}></div>
            <Star classes={{ playerStar: styles.playerStar }} history={history} id={0} handleClickStar={handleClickStar} />
            <p className={styles.genre}>{song.genre}</p>
        </div>
    )
}


export default GenrePickerPlayer


