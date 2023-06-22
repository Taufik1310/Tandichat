import React, { useState, useEffect } from "react"
import { BiArrowBack, BiCamera, BiPencil } from 'react-icons/bi'
import { getProfilePicture, getUserData } from "../../Rest"

const DEFAULT_AVATAR = './assets/default-avatar.png'

interface IsEnabledEdit {
    username?: boolean,
    about?: boolean
}

interface Value {
    username?: string,
    about?: string
}

const ChatProfile = () => {
    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false)
    const [isHoverAvatar, setIsHoverAvatar] = useState<boolean>(false)
    const [isEnabledEdit, setIsEnabledEdit] = useState<IsEnabledEdit>({
        username: false,
        about: false
    })
    const [profilePicture, setProfilePicture] = useState<string>("")
    const [value, setValue] = useState<Value>({
        username: '',
        about: '',
    })
    const [textareaHeight, setTextareaHeight] = useState<Value>({
        username: 'auto',
        about: 'auto'
    })
    
    const fetchUserData = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const responseGetUserData = await getUserData(token)
            const { Username, About, Img } = responseGetUserData.data
            setValue({
                username: Username,
                about: About,
            })
            const removeImgExt = Img.replace(/\.(jpg|png|jpeg)$/, "")
            const profilePicture = await getProfilePicture(removeImgExt)
            setProfilePicture(profilePicture)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        if (isOpenProfile) {
            const textareaUsername = document.getElementById('profileUsername')
            const textareaAbout = document.getElementById('profileAbout')
            textareaUsername.style.height = `auto`
            textareaUsername.style.height = `${textareaUsername.scrollHeight}px`
            textareaAbout.style.height = `auto`
            textareaAbout.style.height = `${textareaAbout.scrollHeight}px`
        
            setTextareaHeight({ 
                username: `${textareaUsername.scrollHeight}px`,  
                about: `${textareaAbout.scrollHeight}px`
            })
        }
    }, [isOpenProfile, value, isEnabledEdit])

    return (
        <div>
            <div className="avatar">
                <div className="w-10 h-10 max-h-10 overflow-hidden rounded-full object-cover cursor-pointer" onClick={() => setIsOpenProfile(!isOpenProfile)}>
                    <img src={profilePicture} alt="Foto Profil" />
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
                                <img src={profilePicture} alt="Foto Profil" onMouseEnter={() => setIsHoverAvatar(!isHoverAvatar)} />
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
                            <div className="relative mb-4">
                                <label htmlFor="profileUsername" className="text-blue-600 text-xs">Nama Kamu</label>
                                <textarea 
                                    id="profileUsername" 
                                    style={{ height: textareaHeight.username }} 
                                    rows={1} 
                                    name="username" 
                                    placeholder="Nama" 
                                    className={`scrollbar-none resize-none form-input w-full bg-transparent border-0 outline-none ps-1 pe-10 pb-2 focus:ring-0 ${isEnabledEdit.username ? 'border-b focus:border-b-blue-600' : ''}`} 
                                    value={value.username} 
                                    readOnly={isEnabledEdit.username ? false : true} 
                                    onChange={(e) => setValue({username: e.target.value})} 
                                    onBlur={() => setIsEnabledEdit({username: false})} 
                                />
                                <span 
                                    className="text-gray-400 absolute end-2 top-8 cursor-pointer" 
                                    onClick={() => setIsEnabledEdit({username: true})} 
                                    hidden={!!isEnabledEdit.username}
                                >
                                    <BiPencil 
                                    
                                    size={20} />
                                </span>
                            </div>
                            <div className="relative">
                                <label htmlFor="profileAbout" className="text-blue-600 text-xs">Tentang Kamu</label>
                                <textarea 
                                    id="profileAbout" 
                                    style={{ height: textareaHeight.about }} 
                                    rows={1}
                                    name="about" 
                                    placeholder="Tentang" 
                                    className={`scrollbar-none resize-none form-input w-full bg-transparent border-0 outline-none ps-1 pe-10 pb-2 focus:ring-0 ${isEnabledEdit.about ? 'border-b focus:border-b-blue-600' : ''}`} 
                                    value={value.about} 
                                    readOnly={isEnabledEdit.about ? false : true} 
                                    onChange={(e) => setValue({about: e.target.value})} 
                                    onBlur={() => setIsEnabledEdit({about: false})}
                                />
                                <span 
                                    className="text-gray-400 absolute end-2 top-8 cursor-pointer" 
                                    onClick={() => setIsEnabledEdit({about: true})} 
                                    hidden={!!isEnabledEdit.about}
                                >
                                    <BiPencil size={20} />
                                </span>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            }
        </div>
    )
}

export default ChatProfile