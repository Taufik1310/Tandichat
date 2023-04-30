import React from 'react'


const AuthHeader = ({ authText, logo }: { authText: string, logo: string }) => {
    return (
        <div className="flex flex-col items-center mb-16">
            <img src={logo} alt="tandichat logo" width={120}/>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{authText} ke Tandichat</h1>
            <p className="text-xs md:text-base font-thin text-gray-400">Tolong masukkan username dan password</p>
        </div>
    )
}

export default AuthHeader