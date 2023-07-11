import React from 'react'


const AuthHeader = ({ authText, logo }: { authText: string, logo: string }) => {
    return (
        <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="tandichat logo" width={120}/>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{authText} ke Tandichat</p>
        </div>
    )
}

export default AuthHeader