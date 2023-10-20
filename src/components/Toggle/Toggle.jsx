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

// NOTE: in React, the for attribute of a label is called htmlFor, so when not nesting the input in the label as above, we would use e.g:
// <label htmlFor="test">Test</label>
// <input type="text" id="test" />

export default Toggle