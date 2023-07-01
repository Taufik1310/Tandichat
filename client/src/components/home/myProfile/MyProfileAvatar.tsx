import React, { useContext, useState } from "react"
import { BiCamera } from 'react-icons/bi'
import { BASE_AVATAR_URL, changeAvatar } from "../../../Rest"
import { TokenContext } from "../../../Context"
import { AlertInfo } from "../../alert/Alert"


const MyProfileAvatar = ({ avatar, setNewAvatar }: { 
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
                <img src={`${BASE_AVATAR_URL}/${avatar}`} alt="Foto Profil" onMouseEnter={() => setIsHoverAvatar(!isHoverAvatar)} />
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
                <AlertInfo type="danger" status="invalidExtensionAvatar" onClose={() => setIsAlertOpen(false)}/>
            }
        </div>
    )
}

export default MyProfileAvatar