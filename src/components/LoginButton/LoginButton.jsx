import React from 'react'
import styles from "./LoginButton.module.scss";

const LoginButton = () => {

    const loginUrl = process.env.APP_URL + "login";

    return (
        <a className={styles.loginButton} href={loginUrl} >Log in to Spotify</a>
    )
}

export default LoginButton;