import React, { useState } from 'react'
import styles from './GenrePickerForm.module.scss';

import spotifyData from "./SpotifyData.js";

const GenrePickerForm = (props) => {

    const { setSong } = props;

    // Best practice to keep form data in an object and use a single piece of state for it (rather than one state for each input)
    const [formData, setFormData] = useState({
        genre: "",
        energy: "",
        isPopular: "",
        vibe: ""
    });

    // We create a handler that will work for all form input types
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
                // now this handleChange function will also work for checkboxes
            }
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        // TODO: get API key
        // TODO: get form values to send in API call
    
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

    // TODO: get list of genres using GET /recommendations/available-genre-seeds
    const genres = ["drum-and-bass", "indie-rock", "hip-hop"];

    const genreSelectOptions = genres.map(genre => <option value={genre}>{genre}</option>);

    console.log(formData);

    return (
        <form className={styles.form} >
            <select
                className={styles.input}
                placeholder="Genre"
                onChange={handleChange}
                name="genre"
                value={formData.genre}
                defaultValue=""
            >
                <option value="" hidden>Select a genre</option>
                <option value="random">RANDOM</option>
                {genreSelectOptions}
            </select>

            <input
                className={styles.input}
                type="number"
                placeholder="Energy"
                min="0"
                max="100"
                onChange={handleChange}
                name="energy"
                value={formData.energy}
            />

            <label htmlFor="popular">Show only popular songs</label>
            <input
                className={styles.input}
                type="checkbox"
                id="popular"
                onChange={handleChange}
                name="isPopular"
                checked={formData.isPopular}
            />

            <label>
                <div>Vibe: </div>
                <input
                    type="radio"
                    id="danceable"
                    name="vibe"
                    value="danceable"
                    checked={formData.vibe === "danceable"}
                    onChange={handleChange}
                />
                <label htmlFor="danceable">Danceable</label>
                <input
                    type="radio"
                    id="acoustic"
                    name="vibe"
                    value="acoustic"
                    checked={formData.vibe === "acoustic"}
                    onChange={handleChange}
                />
                <label htmlFor="acoustic">Acoustic</label>
                <input
                    type="radio"
                    id="instrumental"
                    name="vibe"
                    value="instrumental"
                    checked={formData.vibe === "instrumental"}
                    onChange={handleChange}
                />
                <label htmlFor="instrumental">Instrumental</label>
                <input
                    type="radio"
                    id="random"
                    name="vibe"
                    value="random"
                    checked={formData.vibe === "random"}
                    onChange={handleChange}
                />
                <label htmlFor="random">Random</label>
            </label>

            <button
                className={styles.button}
                onClick={handleClick}>Get song
            </button>
        </form>
    )
}

// NOTE: we specifiy the value of the inputs as being based on the value of their respective state (make sure to define a name attribute), rather than leaving it to the built-in HTML inout "state".
// These are called "controlled components": https://legacy.reactjs.org/docs/forms.html

// NOTE: to make radio buttons into controlled components, use the checked attribute as above
// NOTE: in React, textarea HTML tag has been changed to be self-closing and works in the same way as input (needs name, value attribute etc.). Usually textarea value comes from the text between the tags.
// NOTE: as for textarea, the select tag has been changed in React to accept a value attribute (unlike pure HTML where the value comes from the nested option tag having a "selected" attribute)
// NOTE: React has added a "defaultValue" attribute to to the select tag, rather than using <option selected></option>

export default GenrePickerForm


// TODO: only allow value between 1 and 100 for energy