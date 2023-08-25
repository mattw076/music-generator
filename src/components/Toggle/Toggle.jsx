import React, { useEffect } from 'react'
import styles from './Toggle.module.scss';


const Toggle = (props) => {

    const {isToggled, handleClick } = props;

    // TODO: label should be passed in as props to be reusable
    // NOTE: each Toggle will need a unique id

    // useEffect(() => {
    //     console.log(isToggled.value);
    //     // undefined
    //   }, [isToggled.value]);

    return (
        <label className={styles.switch}>
            <span className={styles.text}>Show only favourites</span>
            <input type="checkbox" checked={isToggled} onChange={handleClick}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}

export default Toggle