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
    // Q: is having 2 different arrays of items the right way to do it? Seems inefficient

    return (
        <div className={styles.history}>
            <h3 className={styles.heading}>History</h3>
            <Toggle isToggled={favouritesToggled} handleChange={handleChangeFavouritesToggled} labelText={"Show only favourites"} />
            {favouritesToggled ? historyItemsFavourited : historyItems}
            {/* Two below together are equivalent to above:
            {favouritesToggled && historyItemsFavourited}
        {!favouritesToggled && historyItems} */}
            {!favouritesToggled && historyItems.length === 0 && <p className={styles.placeholder}>No song history to display yet.</p>}
            {favouritesToggled && historyItemsFavourited.length === 0 && <p className={styles.placeholder}>No favourite songs to display yet.</p>}
        </div>
    )
}

// NOTE: could also remove the id prop and pass the id in the handleClick directly:

// <GenrePickerHistoryItem song={song} history={history} handleClickStar={() => handleClickStar(1) }/>

// then the onClick inside Star component would just be handleClickStar rather than () => handleClickStar(id)


export default GenrePickerHistory

// TODO: add genre name to song - DO FIRST