import React from 'react'
import styles from "./HeaderBar.module.scss";

import LoginButton from '../LoginButton/LoginButton.jsx';
import LogoutButton from '../LogoutButton/LogoutButton.jsx';

import logo from "../../images/music-logo.png";

const HeaderBar = (props) => {

    const { spotifyToken, setSpotifyToken } = props;

    return (
        <header className={styles.headerBar}>
            <img className={styles.logo} src={logo} />
            <h2 className={styles.title}>Music Generator</h2>
            <h4 className={styles.subheading}>Discover new genres</h4>
            {spotifyToken ? <LogoutButton setSpotifyToken={setSpotifyToken} /> : <LoginButton />}
        </header>
    )
}

export default HeaderBar;
