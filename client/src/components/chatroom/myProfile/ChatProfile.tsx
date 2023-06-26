import React, { useState, useEffect, useContext } from "react"
import { BiArrowBack } from 'react-icons/bi'
import { getAvatar, getUserData } from "../../../Rest"
import { TokenContext } from "../../../Context"
import ChatProfileUsername from "./ChatProfileUsername"
import ChatProfileAbout from "./ChatProfileAbout"
import ChatProfileAvatar from "./ChatProfileAvatar"

const ChatProfile = () => {
    const token = useContext(TokenContext)
    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>("")
    
    const fetchAvatar = async () => {
        const response = await getUserData(token)
        const { Avatar } = response.data
        const avatarWithoutExt = Avatar.replace(/\.(jpg|png|jpeg)$/, "")
        const avatarUrl = await getAvatar(avatarWithoutExt)
        setAvatar(avatarUrl)
    }

    useEffect(() => {
        fetchAvatar()
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
                        <ChatProfileAvatar setAvatar={fetchAvatar} avatar={avatar}/>
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