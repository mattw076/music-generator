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

    // handleClickStar takes the id of the particular history item component
    const handleClickStar = (id) => {
        setHistory(prevHistory => {
            const newHistory = [];
            for (let i = 0; i < prevHistory.length; i++ ) {
                const currentSong = history[i];
                // if position of song in history matches the given id
                if (i === id) {
                    // update the "favourite" property of the song that was clicked
                    const updatedSong = {
                        ...currentSong,
                        favourite: !currentSong.favourite
                    };
                    newHistory.push(updatedSong);
                } else {
                    // otherwise don't update the "favoruite" property
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

    // TODO: update History every time you fetch a new song
}

export default GenrePicker