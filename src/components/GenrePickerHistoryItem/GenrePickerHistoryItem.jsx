import React from 'react'
import styles from './GenrePickerHistoryItem.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerHistoryItem = (props) => {

    const { song, history, id, handleClickStar } = props;

    return (
        <div className={styles.historyItem}>
            <Star className={styles.star} id={id} history={history} handleClickStar={handleClickStar} />
            < iframe className={styles.song} src={song.URI} width="100%" height="100%" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    )
}

export default GenrePickerHistoryItem