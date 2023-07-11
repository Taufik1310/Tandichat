import React, { useState } from "react"
import AuthForm from "../components/auth/AuthForm"
import SwitchAuthType from "../components/auth/SwitchAuthType"
import AuthHeader from "../components/auth/AuthHeader"
import AlertInfo from "../components/alert/AlertInfo"

const LOGO = './assets/logo2.png'

interface AuthType {
    type: string,
    text: string,
}

const Auth = () => {
    const [authType, setAuthType] = useState<AuthType>({
        type: "login",
        text: "Masuk",
    })
    const [isAlertOpen, setIsAlertOpen] = useState({
        successRegister: false,
        failedRegister: false,
        failedLogin: false
    })
    const [email, setEmail] = useState<string>('')

    const handleVerify = (email: string) => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            successRegister: true
        }))
        setEmail(email)
    }

    const handleFailedRegister = (email: string) => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            failedRegister: true
        }))
        setEmail(email)
    }

    const handleFailedLogin = () => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            failedLogin: true
        }))
    }

    const handleCloseAlert = () => {
        setIsAlertOpen({
            successRegister: false,
            failedRegister: false,
            failedLogin: false
        })
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-800 text-blue-50 grid place-items-center">
            <div className="flex flex-col items-center">
                <AuthHeader authText={authType.text} logo={LOGO}/>
                <SwitchAuthType setAuthType={setAuthType} authType={authType.type} authText={authType.text} />
                <AuthForm authText={authType.text} authType={authType.type} onVerify={handleVerify} onFailRegister={handleFailedRegister} onFailLogin={handleFailedLogin} />
            </div>
            { isAlertOpen.successRegister &&    
                <AlertInfo type="success" status="successRegister" email={email} onClose={handleCloseAlert} />
            }
            { isAlertOpen.failedRegister &&    
                <AlertInfo type="fail" status="failedRegister" email={email} onClose={handleCloseAlert} />
            }
            { isAlertOpen.failedLogin &&    
                <AlertInfo type="fail" status="failedLogin" onClose={handleCloseAlert} />
            }
        </div> 
    )
}

export default Auth