import React, { useEffect } from 'react'
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
                uri: "",
                width: "100%",
                height: "100px",
                theme: "dark"
            };
            const callback = (EmbedController) => {
                try {

                    EmbedController.loadUri(`spotify:track:${song.URI}`);

                    EmbedController.addListener('ready', () => {
                        EmbedController.play();
                    });

                } catch (err) {
                    console.log(err);
                }
            };
            IFrameAPI.createController(element, options, callback);
        };

        return () => {
            window.onSpotifyIframeApiReady = null;
            delete window.onSpotifyIframeApiReady;
            // TODO: are these needed? What about deleting the other global variable to do with Spotify on window?
        }
    });

    // TODO: (2) - player is not updating when fetch new song

    // Add Spotify embed script to the page to be able to use the iFrame API
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
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


