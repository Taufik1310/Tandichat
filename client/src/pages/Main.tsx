import React, { useState, useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Auth from "./Auth"
import ChatRoom from "./ChatRoom"
import { IsLoggedInContex } from "../Context"

const LOGO = './assets/logo2.png'

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

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
                    <IsLoggedInContex.Provider value={{ onLogin: handleLogin, onLogout: handleLogout }}>
                        { isLoggedIn ? <ChatRoom /> : <Auth /> }
                    </IsLoggedInContex.Provider>
                </main>
            </HelmetProvider>
       
    )
}

export default Main