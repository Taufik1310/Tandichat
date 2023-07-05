import React, { useState, useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Auth from "./Auth"
import Home from "./Home"
import { AuthContext, TokenContext, WebSocketContext } from "../Context"
import { getWebSocketAuth } from "../Rest"

const LOGO = './assets/logo2.png'

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    const [webSocket, setWebSocket] = useState(null)
    const [messages, setMessages] = useState<any[]>([])

    const fetchWebSocketAuth = async () => {
        const response = await getWebSocketAuth(token)
        const wsAuthCode = response.data.websocketAuthCode
        const ws = new WebSocket(`ws://localhost:5050/ws/connect?auth=${wsAuthCode}`)
        setWebSocket(ws)
    }

    useEffect(() => {
        if (webSocket) {
            webSocket.onopen = () => {
            console.log('WebSocket connection opened')
        }

        webSocket.onmessage = (event: any) => {
            const msg = JSON.parse(event.data)
            setMessages(prevMessages => [...prevMessages, msg])
        }

        webSocket.onerror = (event: any) => {
            console.log('WebSocket error:', event)
        }

        webSocket.onclose = (event: any) => {
            console.log('WebSocket connection closed:', event)
        }
    }
    }, [webSocket])

    const handleSend = (to: number, message: any) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            console.log(message)
            const messageData = {
                type: 0,
                data: {
                    to: Math.floor(Number(to)),
                    message: message
                }
            }
            const json = JSON.stringify(messageData)
            const msg = JSON.parse(json)
            setMessages(prevMessages => [...prevMessages, msg])
            webSocket.send(json)
        }
    }

    const handleClearMessage = () => {
        setMessages([])
    }

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
            fetchWebSocketAuth()
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const handleLogin = async () => {
        setIsLoggedIn(true)
    }   

    const handleLogout = () => {
        localStorage.removeItem('token')
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
                        <AuthContext.Provider value={{ 
                            onLogin: handleLogin, onLogout: handleLogout
                        }}>
                            <WebSocketContext.Provider value={{ 
                                onSend: handleSend,
                                onClear: handleClearMessage,
                                messages: messages
                             }}>
                                { isLoggedIn ? <Home /> : <Auth /> }
                            </WebSocketContext.Provider>
                        </AuthContext.Provider>
                    </TokenContext.Provider>
                </main>
            </HelmetProvider>
       
    )
}

export default Main