import React, { useState, useEffect } from 'react'
import styles from './GenrePickerForm.module.scss';

import spotifyData from "./SpotifyData.js";

const GenrePickerForm = (props) => {

    const { setSong } = props;

    /*
    React is responsible for: 
    1. working with the DOM/browser to render UI
    2. managing state between render cycles (values are rememebred from one render to the the next)
    3. keep UI updated whenever state changes occur
    
    Side effects are things which live outside of React's reach, e.g. localStorage, API/database interactions, subscriptions (e.g. web sockets), syncing 2 different internal states together)
    We use the effect hook to interact outside of React:
    
    */

    const [genres, setGenres] = useState(["drum-and-bass", "indie-rock", "hip-hop"]);

    useEffect(() => {
        // TODO: request Spotify API token (expires every 60mins, what's the best way to do it?)
        
        fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds")
        .then(res => res.json())
        .then(data => {
            if (data.genres) {
                setGenres(data.genres);
            }
        })

        /*
        When using async/await, remember: The callback function passed to useEffect cannot be async since it needs to return the cleanup function (not a promise)
        Instead define an async function inside the callback and run it immediately.

        // const getGenres = async() => {
        //     const response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds");
        //     const genresJson = await response.json();
        //     setGenres(genresJson.genres);
        // }
        // getGenres();

        The function returned by useEffect is a cleanup function which runs when the component is destroyed (e.g. to remove event listeners)
        // return () => {
        //     console.log("Cleanup run for GenrePickerForm");
        // }
        
        */

    }, []);
    // Without a second parameter, the callback passed to useEffect will run as if outside useEffect, after the elements are rendered
    // the second parameter (the dependencies array) contains values which when changed will cause the effect to run
    // an empty dependencies array means the effect will only run on the first time the component loads (rather than getting stuck in a loop where new data fetched causes re-render which cause new data fetched...)


    const genreSelectOptions = genres.map(genre => <option value={genre}>{genre}</option>);


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        
        // TODO: send form values in API call

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
        <form className={styles.form} onSubmit={handleSubmit}>
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

            <span className={styles.vibe}>Vibe:

                <label>
                    <input
                        type="radio"
                        name="vibe"
                        value="danceable"
                        checked={formData.vibe === "danceable"}
                        onChange={handleChange}
                    />
                    <span></span>
                    Danceable
                </label>

                <label>
                    <input
                        type="radio"
                        name="vibe"
                        value="acoustic"
                        checked={formData.vibe === "acoustic"}
                        onChange={handleChange}
                    />
                    <span></span>
                    Acoustic
                </label>

                <label>
                    <input
                        type="radio"
                        name="vibe"
                        value="instrumental"
                        checked={formData.vibe === "instrumental"}
                        onChange={handleChange}
                    />
                    <span></span>
                    Instrumental
                </label>

                <label>
                    <input
                        type="radio"
                        name="vibe"
                        value="random"
                        checked={formData.vibe === "random"}
                        onChange={handleChange}
                    />
                    <span></span>
                    Random
                </label>

            </span>

            <label className={styles.checkbox}>Show only popular songs
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="isPopular"
                    checked={formData.isPopular}
                />
                <span></span>

            </label>

            <button className={styles.button}>Get song</button>
            {/* Button is inside a form so automatically has type="submit" and will make use of the form's onSubmit */}
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