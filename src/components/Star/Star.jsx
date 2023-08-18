import React from 'react'
import styles from './Star.module.scss';

const Star = (props) => {

    const { history, id, handleClickStar, classes } = props;
    const { playerStar = "", historyStar = "" } = classes;

  return (
    <p className={`${styles.star} ${playerStar} ${historyStar}`} onClick={() => handleClickStar(id)}>{ history[id].favourite ? "★" : "☆"}</p>
  )
}

export default Star