import React, { useState } from 'react'
import styles from './GenrePicker.module.scss';

import GenrePickerForm from '../GenrePickerForm/GenrePickerForm.jsx';
import GenrePickerPlayer from '../GenrePickerPlayer/GenrePickerPlayer.jsx';
import GenrePickerHistory from '../GenrePickerHistory/GenrePickerHistory.jsx';


const GenrePicker = () => {

    const [song, setSong] = useState({
        genre: "",
        targetEnergy: "",
        URI: "",
        favourite: false
    });

    // useState(initialStateValue), returns array [ stateValue, setStateValue ]

    // Best practice when new state value is based on old state value is to pass callback to setState:
    // setState(prevState => prevState + 1);

    // Can also pass a callback function as 2nd paramter to be run after state is set (since state is set asynchronously)


    // Generally, it is bad practice to initialise state based on the value of incoming props (e.g. each favourites star intialises its own state based on a "favourite" prop). It is likely better to put state in the parent component in this case. See:
    // https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


    const hist1 = {
        genre: "",
        targetEnergy: "",
        URI: "https://open.spotify.com/embed/track/0ZixBENDWFlEY7q1jI9Zjd",
        favourite: false
    }

    const hist2 = {
        genre: "",
        targetEnergy: "",
        URI: "https://open.spotify.com/embed/track/2gcgwomqMF4Z92EZAPv3Ic",
        favourite: false
    }

    const hist3 = {
        genre: "",
        targetEnergy: "",
        URI: "https://open.spotify.com/embed/track/602d2gJewoiF1FivuOMMwE",
        favourite: false
    }

    const initialHistory = [song, hist1, hist2, hist3];

    const [history, setHistory] = useState(initialHistory)

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
            <GenrePickerForm setSong={setSong} />
            <GenrePickerPlayer song={song} history={history} handleClickStar={handleClickStar}/>
            <GenrePickerHistory song={song} history={history} handleClickStar={handleClickStar}/>
        </main>
    )

    // TODO: "Nothing to show yet" message when history is empty

    // TODO: add genre name to song and history items
}

export default GenrePicker