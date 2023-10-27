import React from 'react'
import styles from './GenrePickerPlayer.module.scss';

import Star from '../Star/Star.jsx';

const GenrePickerPlayer = (props) => {

    const { history, handleClickStar } = props;

    const song = history[0];

    return (
        <div className={styles.player}>
        < iframe className={styles.song} src={`${song.URI}?&theme=0`} width="100%" height="100px" allowFullScreen="" loading="lazy"></iframe>
        <Star classes={{playerStar: styles.playerStar}} history={history} id={0} handleClickStar={handleClickStar}/>
        <p className={styles.genre}>{song.genre}</p>
        </div>
    )
}


export default GenrePickerPlayer


