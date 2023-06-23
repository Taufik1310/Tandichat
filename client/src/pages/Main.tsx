import React, { useState, useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Auth from "./Auth"
import ChatRoom from "./ChatRoom"
import { IsLoggedInContex, TokenContext } from "../Context"

const LOGO = './assets/logo2.png'

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    
    useEffect(() => {
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
                    <TokenContext.Provider value={token}>
                        <IsLoggedInContex.Provider value={{ onLogin: handleLogin, onLogout: handleLogout }}>
                            { isLoggedIn ? <ChatRoom /> : <Auth /> }
                        </IsLoggedInContex.Provider>
                    </TokenContext.Provider>
                </main>
            </HelmetProvider>
       
    )
}

export default Main