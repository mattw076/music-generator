import React from 'react'
import styles from "./HeaderBar.module.scss";

import logo from "../../images/music-logo.png";

const HeaderBar = () => {
    return (
        <header className={styles.headerBar}>
            <img className={styles.logo} src={logo} />
            <h2 className={styles.title}>Music Generator</h2>
            <h4 className={styles.subheading}>Discover new genres</h4>
        </header>
    )
}

export default HeaderBar;
