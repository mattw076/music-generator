import React, { useState } from 'react'
import styles from './GenrePickerHistory.module.scss';

import Toggle from '../Toggle/Toggle.jsx';
import GenrePickerHistoryItem from '../GenrePickerHistoryItem/GenrePickerHistoryItem.jsx'

const GenrePickerHistory = (props) => {

    const { history, handleClickStar } = props;

    const [favouritesToggled, setFavouritesToggled] = useState(false);

    const handleChangeFavouritesToggled = () => {
        setFavouritesToggled(!favouritesToggled);
    }

    const historyItems = history.slice(1).map((song, i) => <GenrePickerHistoryItem key={i + 1} song={song} history={history} id={i + 1} handleClickStar={handleClickStar} />);
    const historyItemsFavourited = historyItems.filter(item => item.props.song.favourite === true);

    return (
        <div className={styles.history}>
            <h3 className={styles.heading}>History</h3>
            <Toggle isToggled={favouritesToggled} handleChange={handleChangeFavouritesToggled} labelText={"Show only favourites"} />
            {favouritesToggled ? historyItemsFavourited : historyItems}
            {!favouritesToggled && historyItems.length === 0 && <p className={styles.placeholder}>No song history to display yet.</p>}
            {favouritesToggled && historyItemsFavourited.length === 0 && <p className={styles.placeholder}>No favourite songs to display yet.</p>}
        </div>
    )
}

export default GenrePickerHistory