import React, { useEffect, useState } from 'react'
import styles from './GenrePicker.module.scss';

import GenrePickerForm from '../GenrePickerForm/GenrePickerForm.jsx';
import GenrePickerPlayer from '../GenrePickerPlayer/GenrePickerPlayer.jsx';
import GenrePickerHistory from '../GenrePickerHistory/GenrePickerHistory.jsx';


const GenrePicker = (props) => {

    const { spotifyToken, setSpotifyToken } = props;


    // useState(initialStateValue), returns array [ stateValue, setStateValue ]

    // Best practice when new state value is based on old state value is to pass callback to setState:
    // setState(prevState => prevState + 1);

    // Can also pass a callback function as 2nd paramter to be run after state is set (since state is set asynchronously)


    // Generally, it is bad practice to initialise state based on the value of incoming props (e.g. each favourites star intialises its own state based on a "favourite" prop). It is likely better to put state in the parent component in this case. See:
    // https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    const sessionHistory = window.sessionStorage.getItem("history");
    const sessionHistoryParsed = sessionHistory ? JSON.parse(sessionHistory) : [];
    const [history, setHistory] = useState(sessionHistoryParsed.length ? sessionHistoryParsed : []);

    // Refresh the Spotify token every hour
    const refreshToken = (expiresIn, refreshToken) => {
        setTimeout(() => {
            const urlParams = new URLSearchParams({ refresh_token: refreshToken });
            // TODO: * process.env not working in Render deployment
            fetch(process.env.APP_URL + "refresh_token?" + urlParams)
            //fetch("https://music-generator.onrender.com/" + "refresh_token?" + urlParams)
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
            // TODO: * process.env not working in Render deployment
            fetch(process.env.APP_URL + "access_token?" + urlParams)
            //fetch("https://music-generator.onrender.com/" + "access_token?" + urlParams)
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
                // if position of song in history matches the given id, update the "favourite" property of the song that was clicked, otherwise don't update the "favoruite" property
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