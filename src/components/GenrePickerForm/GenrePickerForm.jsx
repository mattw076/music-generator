import React, {useState } from 'react'
import styles from './GenrePickerForm.module.scss';

import spotifyData from "./SpotifyData.js";

const GenrePickerForm = (props) => {

    const { setSong } = props;

    const [formData, setFormData] = useState({
        genre: "",
        energy: "" 
    });
    
    console.log(formData);

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        });
    }

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
            <input className={styles.input} type="text" placeholder="Genre" onChange={handleChange} name="genre" value={formData.genre}/>
            <input className={styles.input} type="number" placeholder="Energy" min="0" max="100" onChange={handleChange} name="energy" value={formData.energy}/>
            <button className={styles.button} onClick={handleClick}>Get song</button>
        </form>
    )
}

// NOTE: we specifiy the value of the inputs as being based on the value of their respective state (make sure to define a name attribute), rather than leaving it to the built-in HTML inout "state".
// These are called "controlled components": https://legacy.reactjs.org/docs/forms.html

export default GenrePickerForm