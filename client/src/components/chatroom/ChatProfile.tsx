import React, { useState, useEffect, useContext } from "react"
import { BiArrowBack, BiCamera } from 'react-icons/bi'
import { getAvatar, getUserData } from "../../Rest"
import { TokenContext } from "../../Context"
import ChatProfileUsername from "./ChatProfileUsername"
import ChatProfileAbout from "./ChatProfileAbout"

const ChatProfile = () => {
    const token = useContext(TokenContext)
    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false)
    const [isHoverAvatar, setIsHoverAvatar] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>("")
    
    const fetchUserData = async () => {
        if (token) {
            const responseGetUserData = await getUserData(token)
            const { Avatar } = responseGetUserData.data
            const removeImgExt = Avatar.replace(/\.(jpg|png|jpeg)$/, "")
            const avatar = await getAvatar(removeImgExt)
            setAvatar(avatar)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])


    return (
        <div>
            <div className="avatar">
                <div className="w-8 h-8 max-h-8 overflow-hidden rounded-full object-cover cursor-pointer" onClick={() => setIsOpenProfile(!isOpenProfile)}>
                    <img src={avatar} alt="Foto Profil" />
                </div>
            </div>
            {isOpenProfile && 
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-y-auto scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0 z-10">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={() => setIsOpenProfile(!isOpenProfile)}/>
                    <p>Profil</p>
                </div>
                <div className="flex flex-col items-center gap-10 px-6 py-10">
                    <section>
                        <div className="avatar">
                            <div className="w-52 h-52 max-h-52 rounded-full overflow-hidden object-cover relative cursor-pointer">
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
                    </section>
                    <section className="w-full">
                        <form>
                            <ChatProfileUsername isOpenProfile={isOpenProfile} />
                            <ChatProfileAbout isOpenProfile={isOpenProfile} />
                        </form>
                    </section>
                </div>
            </div>
            }
        </div>
    )
}

export default ChatProfile