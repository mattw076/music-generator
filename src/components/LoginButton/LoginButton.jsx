import React from 'react'
import styles from "./LoginButton.module.scss";

const LoginButton = () => {

    // const loginUrl = process.env.APP_URL + "login";
    const loginUrl = "https://music-generator.onrender.com/" + "login";
    // TODO: (0) - process.env is undefined in Render deployment

    return (
        <a className={styles.loginButton} href={loginUrl} >Log in to Spotify</a>
    )
}

export default LoginButton;