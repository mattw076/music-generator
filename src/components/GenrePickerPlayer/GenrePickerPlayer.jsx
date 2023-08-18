import React from 'react'
import styles from './GenrePickerPlayer.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerPlayer = (props) => {

    const { song, history, handleClickStar } = props;

    return (
        <div className={styles.player}>
        < iframe className={styles.song} src={song.URI} width="100%" height="100%" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <Star classes={{playerStar: styles.playerStar}} history={history} id={0} handleClickStar={handleClickStar}/>
        </div>
    )
}

export default GenrePickerPlayer


