import React, { useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import 'alpinejs'
import AuthForm from "../components/auth/AuthForm"

const SECOND_LOGO = './assets/logo2.png'

interface AuthType {
    type: string,
    text: string,
}

const Auth = () => {
    const [authType, setAuthType] = useState<AuthType>({
        type: "login",
        text: "Masuk",
    })

    const handleAuthType = (authType: string) => {
        if (authType === "login") {
            setAuthType({ type: "signup", text: "Daftar" })
        } else if (authType === "signup") {
            setAuthType({ type: "login", text: "Masuk" })
        }
    }  

    return (
        <HelmetProvider >
            <Helmet defer={false}>
                <link rel="icon" href={`${SECOND_LOGO}`} />
                <title >Tandichat Web</title>
            </Helmet>
            <div className="min-h-screen max-w-screen-2xl bg-gray-800 text-blue-50 grid place-items-center">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-16">
                        <img src={SECOND_LOGO} alt="tandichat logo" width={120}/>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{authType.text} ke Tandichat</h1>
                        <p className="text-xs md:text-base font-thin text-gray-400">Tolong masukkan username dan password</p>
                    </div>
                    <AuthForm authText={authType.text} authType={authType.type}/>
                    <div className="mt-10">
                        <p className="text-xs">{authType.type === "login" ? "Belum" : "Sudah"} Punya Akun ? <span className="text-blue-600 cursor-pointer" onClick={() => handleAuthType(authType.type)}>{authType.type === "login" ? "Daftar" : "Masuk"} Disini</span></p>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default Auth