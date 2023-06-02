import React from "react"

interface SwitchAuthTypeProps {
    setAuthType: Function,
    authType: string,
    authText: string
}

const SwitchAuthType = ({ setAuthType, authType }: SwitchAuthTypeProps) => {
    const handleAuthType = (authType: string, authText: string) => {
        setAuthType({ type: authType, text: authText })
    }  

    return (
        <div className="border border-blue-600 rounded-full text-xs font-bold cursor-pointer">
            <button className={`${ authType === "login" ? "bg-blue-600" : "bg-transparent"} rounded-full px-3 py-1`} onClick={() => handleAuthType("login", "Masuk")}>Masuk</button>
            <button className={`${ authType === "signup" ? "bg-blue-600" : "bg-transparent"} rounded-full px-3 py-1`} onClick={() => handleAuthType("signup", "Daftar")}>Daftar</button>
        </div>
    )
}

export default SwitchAuthType