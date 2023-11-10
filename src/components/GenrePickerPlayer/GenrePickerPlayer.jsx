import React, { useEffect } from 'react'
import styles from './GenrePickerPlayer.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerPlayer = (props) => {

    const { history, handleClickStar } = props;

    const song = history[0];


    // TODO: (2) - player is not updating when fetch new song

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
                    // // Update the iframe song URI every time the history changes
                    // document.addEventListener("historyChanged", (e) => {
                    //     EmbedController.loadUri(`spotify:track:${song.URI}`);
                    //     //EmbedController.loadUri(`spotify:track:${e.newSongURI}`);
                    // })
                    // Play the song once the iframe is ready
                    EmbedController.addListener('ready', () => {
                        EmbedController.play();
                        //EmbedController.togglePlay();
                        // TODO: getting a browser warning that is restricting play from working
                    });

                } catch (err) {
                    console.log(err);
                }
            };
            // Create an iframe in place of the "player-iframe" div returned by the component
            IFrameAPI.createController(element, options, callback);
        };

        return () => {
            window.onSpotifyIframeApiReady = null;
            delete window.onSpotifyIframeApiReady;
            // TODO: are these needed? What about deleting the other global variable to do with Spotify on window?
        }
    }, []);
    // }, [history]);
    // TODO: what dependencies array to use?

    // Add Spotify embed script to the page (on first time the component loads) to be able to use the iFrame API
    // NOTE: this has to go after the onSpotifyIframeApiReady useEffect for some reason otherwise browser restricts autoplay
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


