import React, { useState, useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Auth from "./Auth"
import ChatRoom from "./ChatRoom"

const LOGO = './assets/logo2.png'

interface AuthType {
    type: string,
    text: string,
}

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
      }, []);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    return (
        <HelmetProvider >
            <Helmet defer={false}>
                <link rel="icon" href={LOGO} />
                <title>Tandichat Web</title>
            </Helmet>
            <main>
                { isLoggedIn ? <ChatRoom onLogout={handleLogout}/> : <Auth onLogin={handleLogin}/> }
            </main>
        </HelmetProvider>
    )
}

export default Main