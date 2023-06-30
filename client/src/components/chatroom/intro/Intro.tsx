import React from "react"

const LOGO = './assets/logo2.png'

const Intro = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full text-blue-50">
            <img src={LOGO} alt="Tandichat logo" width={80} className="grayscale opacity-50"/>
            <h1 className="text-2xl mt-2 text-blue-50">Tandichat Web</h1>
            <p className="text-sm text-gray-400">Pilih obrolan untuk mulai mengirim pesan</p>
        </div>
    )
}

export default Intro