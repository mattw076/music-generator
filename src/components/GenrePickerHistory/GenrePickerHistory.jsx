import React, { useState } from 'react'
import styles from './GenrePickerHistory.module.scss';

import Toggle from '../Toggle/Toggle.jsx';
import GenrePickerHistoryItem from '../GenrePickerHistoryItem/GenrePickerHistoryItem.jsx'

const GenrePickerHistory = (props) => {

    const { history, handleClickStar } = props;

    const [favouritesToggled, setfavouritesToggled ] = useState(false);

    const handleClickToggle = () => {
        setfavouritesToggled(!favouritesToggled);
    }

    const historyItems = history.slice(1).map((song, i) => <GenrePickerHistoryItem key={i+1} song={song} history={history} id={i+1} handleClickStar={handleClickStar}/>);
    const historyItemsFavourited = historyItems.filter(item => item.props.song.favourite === true);
    // Q: is having 2 different arrays of items the right way to do it? Seems inefficient

    return (
        <div className={styles.history}>
            <h3 className={styles.heading}>History</h3>
            <Toggle isToggled={favouritesToggled} handleClick={handleClickToggle}/>
            {favouritesToggled ? historyItemsFavourited : historyItems}
            {/* Two below are equivalent to above:
            {showOnlyFavourites && historyItemsFavourited}
            {!showOnlyFavourites && historyItems} */}
        </div>
    )
}

// NOTE: could also remove the id prop and pass the id in the handleClick directly:

// <GenrePickerHistoryItem song={song} history={history} handleClickStar={() => handleClickStar(1) }/>

// then the onClick inside Star component would just be handleClickStar rather than () => handleClickStar(id)


export default GenrePickerHistory