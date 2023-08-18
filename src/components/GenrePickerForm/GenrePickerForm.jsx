import React from 'react'
import styles from './GenrePickerForm.module.scss';

import spotifyData from "./SpotifyData.js";

const GenrePickerForm = (props) => {

    const { setSong } = props;

    const handleClick = async (e) => {
        e.preventDefault();
        // TODO: get API key
        // TODO: get form values to send in API call
        // TODO: get list of genres using GET /recommendations/available-genre-seeds
        // const response = await fetch("https://api.spotify.com/v1/recommendations?limit=1&seed_genres=drum-and-bass&target_energy=0.3");
        // const songJson = await response.json();
        const songJson = spotifyData;
        setSong(prevSong => ({
            ...prevSong,
            URI: `https://open.spotify.com/embed/track/${songJson.tracks[0].id}`
        }));

        // 1. API call
        // 2. set state
        // 3. append to history array (unshift)
    };

    return (
        <form className={styles.form} >
            <input className={styles.input} type="text" placeholder="Genre" />
            <input className={styles.input} type="text" placeholder="Energy" />
            <button className={styles.button} onClick={handleClick}>Get song</button>
        </form>
    )
}

export default GenrePickerForm