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

    // Generally, it is bad practice to initialise state using props directly. It is likely better to put state in the parent component in this case. See:
    // https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


    const hist1 = {
        genre: "",
        targetEnergy: "",
        URI: "",
        favourite: false
    }

    const hist2 = {
        genre: "",
        targetEnergy: "",
        URI: "",
        favourite: false
    }

    const hist3 = {
        genre: "",
        targetEnergy: "",
        URI: "",
        favourite: false
    }

    const initialHistory = [song, hist1, hist2, hist3];

    const [history, setHistory] = useState(initialHistory)

    // handleClickStar takes the id of the song in the history array
    const handleClickStar = (id) => {
        setHistory(prevHistory => {
            const newHistory = [];
            for (i=0; i++; i < prevHistory.length) {
                const currentSong = history[i];
                if (currentSong.id === id) {
                    const updatedSong = {
                        ...currentSong,
                        favourite: !currentSong.favourite
                    };
                    newHistory.push(updatedSong);
                } else {
                    newHistory.push(currentSong);
                }
            }
            return newHistory;
        })
    };

    return (
        <main className={styles.genrePicker}>
            <GenrePickerForm setSong={setSong} />
            <GenrePickerPlayer song={song} history={history} handleClickStar={handleClickStar}/>
            <GenrePickerHistory song={song} history={history} handleClickStar={handleClickStar}/>
        </main>
    )


    // TODO: get handleClickStar working (see 7:12:00 onwards in video)

    // TODO: update History every time you fetch a new song
}

export default GenrePicker