import React, { useContext, useState } from "react"
import { BiCamera } from 'react-icons/bi'
import { changeAvatar } from "../../../Rest"
import { TokenContext } from "../../../Context"
import { FaInfoCircle } from 'react-icons/fa'


const ChatProfileAvatar = ({ avatar, setNewAvatar }: { 
    avatar: string, 
    setNewAvatar: (filename: string) => {} 
}) => {
    const token = useContext(TokenContext)
    const [isHoverAvatar, setIsHoverAvatar] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const handleSelectedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const validExtensions = ['png', 'gif']
        const file = event.target.files[0]
        const fileName = file.name
        const fileExtension = fileName.split('.').pop().toLowerCase()
        if (!validExtensions.includes(fileExtension)) {
            setIsAlertOpen(true)
            return
        }

        const formData = new FormData()
        formData.append("avatar", file, file.name)
        const newAvatar = await changeAvatar(token, formData)
        setNewAvatar(newAvatar.data.filename)
    }


    return (
        <div className="avatar">
            <div className="w-64 h-64 max-h-64 rounded-full overflow-hidden object-cover relative cursor-pointer">
                <img src={avatar} alt="Foto Profil" onMouseEnter={() => setIsHoverAvatar(!isHoverAvatar)} />
                {isHoverAvatar && 
                <div  className="bg-gray-700 absolute top-0 bottom-0 start-0 end-0 bg-opacity-80 flex flex-col items-center justify-center font-semibold" onMouseLeave={() => setIsHoverAvatar(!isHoverAvatar)}>
                    <input 
                        type="file" 
                        name="avatar" 
                        className="opacity-0 cursor-pointer absolute top-0 bottom-0 start-0 end-0" 
                        onChange={handleSelectedFile}
                    />
                    <BiCamera size={30}/>
                    <p>Ubah Foto Profil</p>
                </div>
                }
            </div>
            { isAlertOpen &&    
                <>
                    <button className="bg-gray-700 opacity-60 fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" onClick={() => setIsAlertOpen(false)}>  
                    </button>
                    <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-full sm:w-1/2 lg:w-2/5">
                        <div className="bg-blue-700 h-10 flex items-center justify-center gap-5 px-4 rounded-lg">
                            <FaInfoCircle size={26}/>
                            <p className="font-semibold text-xs">Ekstensi file tidak valid. Hanya file PNG dan GIF yang diperbolehkan</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ChatProfileAvatar