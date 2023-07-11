import React, { useState } from "react"
import { MdMarkEmailRead } from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom"
import { verifyEmail } from "../Rest"
import AlertInfo from "../components/alert/AlertInfo"

const LOGO = '../../assets/logo2.png'

const Verification = () => {
    const { code } = useParams()
    const navigate = useNavigate()
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    
    const handleVerify = async () => {
        const response = await verifyEmail(code)
        if (response) {
            setIsAlertOpen(true)
        }
    }

    const handleCloseAlert = () => {
        setIsAlertOpen(false)
        navigate('/')
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-800 flex flex-col items-center justify-center gap-4 text-blue-50">
            <img src={LOGO} alt="tandichat logo" width={100}/>
            <div className="text-xl md:text-2xl font-semibold flex items-center gap-5">
                <MdMarkEmailRead size={32}/>
                <p>Verifikasi Alamat Email</p>
            </div>
            <div className="flex flex-col items-center gap-2 font-extralight text-sm">
                <p>Harap verifikasi alamat email dengan mengklik tombol di bawah ini</p>
            </div>
            <button 
                type="submit" 
                className='bg-blue-600 hover:bg-blue-700 w-80 py-2 rounded-md font-semibold'
                onClick={handleVerify}
            >Verifikasi Email Kamu</button>
            { isAlertOpen &&    
                <AlertInfo type="success" status="successVerify" onClose={handleCloseAlert} />
            }
        </div> 
    )
}

export default Verification