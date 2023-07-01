import React, { useState, useEffect, useContext } from "react"
import { BiArrowBack } from 'react-icons/bi'
import { BASE_AVATAR_URL, getUserData } from "../../../Rest"
import { TokenContext } from "../../../Context"
import MyProfileUsername from "./MyProfileUsername"
import MyProfileAbout from "./MyProfileAbout"
import MyProfileAvatar from "./MyProfileAvatar"

const MyProfile = () => {
    const token = useContext(TokenContext)
    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(true)
    const [avatar, setAvatar] = useState<string>("")
    
    const fetchAvatar = async () => {
        const response = await getUserData(token)
        const { Avatar } = response.data
        setAvatar(Avatar)
    }

    useEffect(() => {
        fetchAvatar()
    }, [])

    return (
        <div>
            <div className="avatar">
                <div className="w-10 h-10 max-h-10 overflow-hidden rounded-full object-cover cursor-pointer" onClick={() => setIsOpenProfile(!isOpenProfile)}>
                    <img src={`${BASE_AVATAR_URL}/${avatar}`} alt="Foto Profil" />
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
                        <MyProfileAvatar setNewAvatar={fetchAvatar} avatar={avatar}/>
                    </section>
                    <section className="w-full">
                        <form>
                            <MyProfileUsername isOpenProfile={isOpenProfile} />
                            <MyProfileAbout isOpenProfile={isOpenProfile} />
                        </form>
                    </section>
                </div>
            </div>
            }
        </div>
    )
}

export default MyProfile