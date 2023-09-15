import React, { useState } from 'react'
import styles from './GenrePicker.module.scss';

import GenrePickerForm from '../GenrePickerForm/GenrePickerForm.jsx';
import GenrePickerPlayer from '../GenrePickerPlayer/GenrePickerPlayer.jsx';
import GenrePickerHistory from '../GenrePickerHistory/GenrePickerHistory.jsx';


const GenrePicker = () => {


    // useState(initialStateValue), returns array [ stateValue, setStateValue ]

    // Best practice when new state value is based on old state value is to pass callback to setState:
    // setState(prevState => prevState + 1);

    // Can also pass a callback function as 2nd paramter to be run after state is set (since state is set asynchronously)


    // Generally, it is bad practice to initialise state based on the value of incoming props (e.g. each favourites star intialises its own state based on a "favourite" prop). It is likely better to put state in the parent component in this case. See:
    // https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


    const [history, setHistory] = useState([])

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
            <GenrePickerForm setHistory={setHistory}/>
            {history && history[0] && <GenrePickerPlayer history={history} handleClickStar={handleClickStar}/>}
            <GenrePickerHistory history={history} handleClickStar={handleClickStar}/>
        </main>
    )

}

export default GenrePicker