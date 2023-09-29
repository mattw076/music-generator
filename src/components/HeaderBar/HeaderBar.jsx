import React from 'react'
import styles from "./HeaderBar.module.scss";

import logo from "../../images/music-logo.png";

const HeaderBar = () => {

    // TODO: the below shouldn't be visible to react as it is secret? How to hide it
    console.log(process.env.CLIENT_SECRET);


    // TODO: check this works
    const loginUrl = process.env.APP_URL + "login";

    
return (
    <header className={styles.headerBar}>
        <img className={styles.logo} src={logo} />
        <h2 className={styles.title}>Music Generator</h2>
        <h4 className={styles.subheading}>Discover new genres</h4>
        <a className={styles.login} href={loginUrl} >Log in to Spotify</a>
    </header>
)
}

// TODO: changed message to "logged in" once logged in

export default HeaderBar;
