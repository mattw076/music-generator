import React from 'react'
import styles from './GenrePickerHistoryItem.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerHistoryItem = (props) => {

    const { song, history, id, handleClickStar } = props;

    return (
        <div className={styles.historyItem}>
            <Star classes={{historyStar: styles.historyStar}} id={id} history={history} handleClickStar={handleClickStar} />
            <iframe className={styles.song} src={`https://open.spotify.com/embed/track/${song.URI}`} width="100%" height="100%" allow="fullscreen" loading="lazy"></iframe>
            <p className={styles.genre}>{song.genre}</p>
        </div>
    )
}

export default GenrePickerHistoryItem