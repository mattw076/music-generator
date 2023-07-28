import React from 'react'

import styles from './GenrePicker.module.scss';

import spotifyData from "./SpotifyData.js";

const GenrePicker = () => {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(spotifyData.tracks[0].id);
    };

    const songURI = `https://open.spotify.com/embed/track/${spotifyData.tracks[0].id}`;
    // TODO: use state to update song displayed automatically

    return (
        <main className={styles.genrePicker}>
            <form className={styles.form} >
                <input className={styles.input} type="text" placeholder="Genre" />
                <input className={styles.input} type="text" placeholder="Popularity" />
                <button className={styles.button} onClick={handleClick}>Get song</button>
            </form>
            <iframe className={styles.song} src={songURI} width="100%" height="100%" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </main>
    )
}

export default GenrePicker