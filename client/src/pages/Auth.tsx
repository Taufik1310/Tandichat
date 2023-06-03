import React, { useState } from "react"
import AuthForm from "../components/auth/AuthForm"
import SwitchAuthType from "../components/auth/SwitchAuthType"
import AuthHeader from "../components/auth/AuthHeader"

const LOGO = './assets/logo2.png'

interface AuthType {
    type: string,
    text: string,
}

const Auth = ({ onLogin }: { onLogin: Function }) => {
    const [authType, setAuthType] = useState<AuthType>({
        type: "login",
        text: "Masuk",
    })

    return (
        <div className="min-h-screen min-w-screen bg-gray-800 text-blue-50 grid place-items-center">
            <div className="flex flex-col items-center">
                <AuthHeader authText={authType.text} logo={LOGO}/>
                <SwitchAuthType setAuthType={setAuthType} authType={authType.type} authText={authType.text} />
                <AuthForm authText={authType.text} authType={authType.type} setAuthType={setAuthType} onLogin={onLogin}/>
            </div>
        </div> 
    )
}

export default Auth