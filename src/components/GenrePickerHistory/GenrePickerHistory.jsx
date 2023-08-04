import React from 'react'
import styles from './GenrePickerHistory.module.scss';

import GenrePickerHistoryItem from '../GenrePickerHistoryItem/GenrePickerHistoryItem.jsx'

const GenrePickerHistory = (props) => {

    const { song, history, handleClickStar } = props;
    return (
        <div className={styles.history}>
            <h3 className={styles.heading}>History</h3>
            <GenrePickerHistoryItem song={song} history={history} id={1} handleClickStar={handleClickStar}/>
            <GenrePickerHistoryItem song={song} history={history} id={2} handleClickStar={handleClickStar}/>
            <GenrePickerHistoryItem song={song} history={history} id={3} handleClickStar={handleClickStar}/>
        </div>
    )
}

export default GenrePickerHistory