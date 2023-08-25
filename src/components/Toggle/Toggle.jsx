import React, { useEffect } from 'react'
import styles from './Toggle.module.scss';


const Toggle = (props) => {

    const {isToggled, handleChange } = props;

    // TODO: label should be passed in as props to be reusable
    // NOTE: each Toggle will need a unique id

    return (
        <label className={styles.switch}>
            <span className={styles.text}>Show only favourites</span>
            <input type="checkbox" checked={isToggled} onChange={handleChange}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}

export default Toggle