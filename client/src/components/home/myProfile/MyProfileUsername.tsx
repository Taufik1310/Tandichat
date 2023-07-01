import React, { useState, useEffect, useContext } from "react"
import { changeUsername, getUserData } from "../../../Rest"
import { TokenContext } from "../../../Context"
import { BiPencil } from 'react-icons/bi'

const MyProfileUsername = ({ isOpenProfile }: { isOpenProfile: boolean }) => {
    const token = useContext(TokenContext)
    const defaultUsername = `user`
    const [username, setUsername] = useState<string>('')
    const [isEnabledEdit, setIsEnabledEdit] = useState<boolean>(false)
    const [textareaHeight, setTextareaHeight] = useState<string>('auto')


    const fetchUsername = async () => {
        const response = await getUserData(token)
        const { Username } = await response.data
        setUsername(Username)
    }

    const handleChangedUsername = async (newUsername: string) => {
        if (newUsername.length < 1) {
            setUsername("")
            changeUsername(token, defaultUsername)
        } else {
            setUsername(newUsername)
            changeUsername(token, newUsername)
        }
    }

    useEffect(() => {
       fetchUsername() 
    }, [])

    useEffect(() => {
        if (username.length < 1) {
            setUsername(defaultUsername)
        }
    }, [isEnabledEdit])

    useEffect(() => {
        if (isOpenProfile) {
            const textareaUsername = document.getElementById('profileUsername')
            textareaUsername.style.height = `auto`
            textareaUsername.style.height = `${textareaUsername.scrollHeight}px`
        
            setTextareaHeight(`${textareaUsername.scrollHeight}px`)
        }
    }, [isOpenProfile, username, isEnabledEdit])

    return (
        <div className="relative mb-4">
            <label htmlFor="profileUsername" className="text-blue-600 text-xs">Nama Kamu</label>
            <textarea 
                id="profileUsername" 
                style={{ height: textareaHeight }} 
                rows={1} 
                name="username" 
                placeholder="Nama" 
                className={`scrollbar-none resize-none form-input w-full bg-transparent border-0 outline-none ps-1 pe-10 pb-2 focus:ring-0 ${isEnabledEdit ? 'border-b focus:border-b-blue-600' : ''}`} 
                value={username} 
                readOnly={isEnabledEdit ? false : true} 
                onChange={(e) => handleChangedUsername(e.target.value)} 
                onBlur={() => setIsEnabledEdit(false)} 
            />
            <span 
                className="text-gray-400 absolute end-2 top-8 cursor-pointer" 
                onClick={() => setIsEnabledEdit(true)} 
                hidden={!!isEnabledEdit}
            >
                <BiPencil 
                
                size={20} />
            </span>
        </div>
    )
}

export default MyProfileUsername