import React from 'react'
import styles from "./HeaderBar.module.scss";

import logo from "../../images/music-logo.png";

const HeaderBar = () => {

    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectUri = "http://localhost:3000/"
    const clientId = "6b11aa4cf77c4dbcaa02b134f080bfd6";

    const scopes = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-playback-position",
        "user-library-modify",
        "user-library-read"
    ]

    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;


return (
    <header className={styles.headerBar}>
        <img className={styles.logo} src={logo} />
        <h2 className={styles.title}>Music Generator</h2>
        <h4 className={styles.subheading}>Discover new genres</h4>
        <a href={loginUrl} className={styles.login}>Log in to Spotify</a>
    </header>
)
}

export default HeaderBar;
