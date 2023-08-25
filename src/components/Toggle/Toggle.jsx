import React from 'react'
import styles from './Toggle.module.scss';


const Toggle = (props) => {

    const {isToggled, handleClickToggle } = props;

    // TODO: label should be passed in as props to be reusable

    return (
        <label className={styles.switch}>
            <span className={styles.text}>Show only favourites</span>
            <input type="checkbox" checked={isToggled} onClick={handleClickToggle}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}

export default Toggle