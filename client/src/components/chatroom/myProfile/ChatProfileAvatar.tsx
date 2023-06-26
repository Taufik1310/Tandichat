import React, { useState } from "react"
import { BiCamera } from 'react-icons/bi'

const ChatProfileAvatar = ({ avatar, setAvatar }: { avatar: string, setAvatar: () => {} }) => {
    const [isHoverAvatar, setIsHoverAvatar] = useState<boolean>(false)

    return (
        <div className="avatar">
            <div className="w-64 h-64 max-h-64 rounded-full overflow-hidden object-cover relative cursor-pointer">
                <img src={avatar} alt="Foto Profil" onMouseEnter={() => setIsHoverAvatar(!isHoverAvatar)} />
                {isHoverAvatar && 
                <div  className="bg-gray-700 absolute top-0 bottom-0 start-0 end-0 bg-opacity-80 flex flex-col items-center justify-center font-semibold" onMouseLeave={() => setIsHoverAvatar(!isHoverAvatar)}>
                    <input type="file" name="profilPicture" className="opacity-0 cursor-pointer absolute top-0 bottom-0 start-0 end-0" />
                    <BiCamera size={30}/>
                    <p>Ubah Foto Profil</p>
                </div>
                }
            </div>
        </div>
    )
}

export default ChatProfileAvatar