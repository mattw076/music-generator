import React from 'react'
import styles from "./LogoutButton.module.scss";

const LogoutButton = (props) => {

    const { setSpotifyToken } = props;

    return (
        <button className={styles.logoutButton} onClick={() => setSpotifyToken("")}>Log out</button>
    )
}

export default LogoutButton;