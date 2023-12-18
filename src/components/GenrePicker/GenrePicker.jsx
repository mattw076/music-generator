import React, { useEffect, useState } from 'react'
import styles from './GenrePicker.module.scss';

import GenrePickerForm from '../GenrePickerForm/GenrePickerForm.jsx';
import GenrePickerPlayer from '../GenrePickerPlayer/GenrePickerPlayer.jsx';
import GenrePickerHistory from '../GenrePickerHistory/GenrePickerHistory.jsx';


const GenrePicker = (props) => {

    const { spotifyToken, setSpotifyToken } = props;


    const sessionHistory = window.sessionStorage.getItem("history");
    const sessionHistoryParsed = sessionHistory ? JSON.parse(sessionHistory) : [];
    const [history, setHistory] = useState(sessionHistoryParsed.length ? sessionHistoryParsed : []);

    // Refresh the Spotify token every hour
    const refreshToken = (expiresIn, refreshToken) => {
        setTimeout(() => {
            const urlParams = new URLSearchParams({ refresh_token: refreshToken });
            fetch(process.env.APP_URL + "refresh_token?" + urlParams)
                .then(res => {
                    res.json().then(data => {
                        setSpotifyToken(data.access_token);
                        refreshToken(data.expires_in, refreshToken);
                    });
                });
        }, expiresIn * 1000);
    }


    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);

        if (urlParams.size > 0 && !spotifyToken) {
            fetch(process.env.APP_URL + "access_token?" + urlParams)
                .then(res => {
                    res.json().then(data => {
                        setSpotifyToken(data.access_token);
                        //window.sessionStorage.setItem("refresh_token", data.refresh_token);
                        refreshToken(data.expires_in, data.refresh_token);
                    })
                });
        }

    }, []);


    // handleClickStar takes the id of the particular history item component
    const handleClickStar = (id) => {
        setHistory(prevHistory => {
            return prevHistory.map((song, i) => {
                // if position of song in history matches the given id, update the "favourite" property of the song that was clicked, otherwise don't update the "favourite" property
                return (i === id) ? { ...song, favourite: !song.favourite } : song;
            })
        })
    };

    return (
        <main className={styles.genrePicker}>
            <GenrePickerForm history={history} setHistory={setHistory} spotifyToken={spotifyToken}/>
            {history && history[0] && <GenrePickerPlayer history={history} handleClickStar={handleClickStar} />}
            <GenrePickerHistory history={history} handleClickStar={handleClickStar} />
        </main>
    )

}

export default GenrePicker