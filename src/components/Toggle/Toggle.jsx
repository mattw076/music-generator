import React, { useEffect } from 'react'
import styles from './Toggle.module.scss';


const Toggle = (props) => {

    const {isToggled, handleChange, labelText } = props;

    return (
        <label className={styles.switch}>
            <span className={styles.text}>{labelText}</span>
            <input type="checkbox" checked={isToggled} onChange={handleChange}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}

export default Toggle