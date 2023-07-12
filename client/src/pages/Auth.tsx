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
        passwordNotMatch: false,
        notVerify: false,
        userNotFound: false
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

    const handlePasswordNotMatch = () => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            passwordNotMatch: true
        }))
    }

    const handleNotVerify = (email: string) => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            notVerify: true
        }))
        setEmail(email)
    }

    const handleUserNotFound = (email: string) => {
        setIsAlertOpen((prevIsAlertOpen) => ({
            ...prevIsAlertOpen,
            userNotFound: true
        }))
        setEmail(email)
    }

    const handleCloseAlert = () => {
        setIsAlertOpen({
            successRegister: false,
            failedRegister: false,
            passwordNotMatch: false,
            notVerify: false,
            userNotFound: false
        })
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-800 text-blue-50 grid place-items-center">
            <div className="flex flex-col items-center">
                <AuthHeader authText={authType.text} logo={LOGO}/>
                <SwitchAuthType setAuthType={setAuthType} authType={authType.type} authText={authType.text} />
                <AuthForm 
                    authText={authType.text} 
                    authType={authType.type} 
                    onVerify={handleVerify} 
                    onFailRegister={handleFailedRegister} 
                    onPasswordNotMatch={handlePasswordNotMatch}
                    onNotVerify={handleNotVerify}
                    onUserNotFound={handleUserNotFound}
                />
            </div>
            { isAlertOpen.successRegister &&    
                <AlertInfo type="success" status="successRegister" email={email} onClose={handleCloseAlert} />
            }
            { isAlertOpen.failedRegister &&    
                <AlertInfo type="fail" status="failedRegister" email={email} onClose={handleCloseAlert} />
            }
            { isAlertOpen.passwordNotMatch &&    
                <AlertInfo type="fail" status="passwordNotMatch" onClose={handleCloseAlert} />
            }
            { isAlertOpen.notVerify &&    
                <AlertInfo type="fail" status="notVerify" email={email} onClose={handleCloseAlert}  />
            }
            { isAlertOpen.userNotFound &&    
                <AlertInfo type="fail" status="userNotFound" email={email} onClose={handleCloseAlert}  />
            }
        </div> 
    )
}

export default Auth