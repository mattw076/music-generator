import React, { useState, useEffect } from 'react'
import styles from './GenrePickerForm.module.scss';

const GenrePickerForm = (props) => {

    const { history, setHistory, spotifyToken } = props;

    const [genres, setGenres] = useState([]);


    useEffect(() => {

        if (spotifyToken) {
            fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`
                }
            })
                .then(res => {
                    if (res.status === 429) {
                        alert("Too many requests, try waiting a few minutes.")
                        throw(new Error("Too many requests to Spotify. Try waiting a few minutes"));
                    }
                    return res.json();
                })
                .then(data => {
                    if (data && data.genres) {
                        setGenres(data.genres);
                    }
                })
                .catch(err => {
                    // Do nothing
                 });

        }

    }, [spotifyToken]);


    const genreSelectOptions = genres.map(genre => <option key={genre} value={genre}>{genre}</option>);

    // Object to store form data
    const [formData, setFormData] = useState({
        genre: "",
        energy: "",
        isPopular: "",
        vibe: "random"
    });

    // We create a handler that will work for all form input types
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { energy, vibe, genre, isPopular } = formData;

        const energyLevel = energy || Math.floor(Math.random() * 100) + 1;
        const genreSeed = (genre === "random" || genre === "") ? genres[Math.floor(Math.random() * genres.length)] : genre;
        

        const token = document.cookie.split("; ").find((row) => row.startsWith("spotify_token="))?.split("=")[1] || "";
        if (token) {
            fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genreSeed}&target_energy=${energyLevel / 100}&min_instrumentalness=${vibe === "instrumental" ? 0.7 : 0}&min_acousticness=${vibe === "acoustic" ? 0.7 : 0}&min_danceability=${vibe === "danceable" ? 0.7 : 0}&target_popularity=${isPopular ? 100 : 0}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 429) {
                        alert("Too many requests to Spotify. Try waiting a few minutes.")
                        throw(new Error("Too many requests to Spotify. Try waiting a few minutes"));
                    }
                    return res.json();
                })
                .then(data => {
                    if (data && data.tracks && data.tracks[0]) {

                        setHistory(prevHistory => [
                            {
                                genre: genreSeed,
                                URI: data.tracks[0].id,
                                favourite: false,
                            },
                            ...prevHistory
                        ]);

                    } else {
                        window.alert("No matching songs found. Try some different search parameters!")
                    }
                })
                .catch(err => {
                    // Do nothing
                });
        } else {
            window.alert("Please log in to Spotify first using the button at the top right of the page.")
        }

    };

    // Save history state to session storage every time it changes, and dispatch an event to tell the Spotify iframe API that history has changed
    useEffect(() => {
        window.sessionStorage.setItem("history", JSON.stringify(history));

        // Trigger a custom event to tell the Spotify iFrame API to update its song URI
        const historyChangedEvent = new CustomEvent("historyChanged", { "detail": {newSongURI: history.length ? history[0].URI : ""}});
        document.dispatchEvent(historyChangedEvent);

    }, [history])
    


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <select
                className={styles.input}
                placeholder="Genre"
                onChange={handleChange}
                name="genre"
                value={formData.genre}
                required
            >
                <option value="" disabled>Select a genre</option>
                <option value="random">RANDOM</option>
                {genreSelectOptions}
            </select>

            <input
                className={styles.input}
                type="number"
                placeholder="Energy level (1 - 100 or leave blank for random)"
                min="1"
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

            <label className={styles.checkbox}>Prefer popular songs
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="isPopular"
                    checked={formData.isPopular}
                />
                <span></span>

            </label>

            <button className={styles.button}>Get song</button>
        </form>
    )
}

export default GenrePickerForm