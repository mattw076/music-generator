import React from 'react'
import styles from './GenrePickerHistory.module.scss';

import GenrePickerHistoryItem from '../GenrePickerHistoryItem/GenrePickerHistoryItem.jsx'

const GenrePickerHistory = (props) => {

    const { song, history, handleClickStar } = props;

    const historyItems = history.slice(1).map((song, i) => <GenrePickerHistoryItem key={i+1} song={song} history={history} id={i+1} handleClickStar={handleClickStar}/>);

    // const historyItemsFavourited = history.slice(1)
    // .filter(song => song.favourite === true)
    // .map((song, i) => <GenrePickerHistoryItem key={i+1} song={song} history={history} id={i+1} handleClickStar={handleClickStar}/>
    // );
    const historyItemsFavourited = historyItems.filter(item => item.props.song.favourite === true);
    // Q: is having 2 different arrays of items even the best way to do it? Both of the above seem inefficient

    console.log(historyItemsFavourited);

    // TODO: conditionally render non-favourited items based on "Show only favourites" toggle 
    let showOnlyFavourites = false;

    return (
        <div className={styles.history}>
            <h3 className={styles.heading}>History</h3>
            {showOnlyFavourites ? historyItemsFavourited : historyItems}
        </div>
    )
}

// NOTE: could also remove the id prop and pass the id in the handleClick directly:

// <GenrePickerHistoryItem song={song} history={history} handleClickStar={() => handleClickStar(1) }/>

// then the onClick inside Star component would just be handleClickStar rather than () => handleClickStar(id)


export default GenrePickerHistory