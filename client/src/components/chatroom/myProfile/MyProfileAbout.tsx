import React, { useState, useEffect, useContext } from "react"
import { changeAbout, getUserData } from "../../../Rest"
import { TokenContext } from "../../../Context"
import { BiPencil } from 'react-icons/bi'

const MyProfileAbout = ({ isOpenProfile }: { isOpenProfile: boolean }) => {
    const token = useContext(TokenContext)
    const defaultAbout = `.`
    const [about, setAbout] = useState<string>('')
    const [isEnabledEdit, setIsEnabledEdit] = useState<boolean>(false)
    const [textareaHeight, setTextareaHeight] = useState<string>('auto')


    const fetchAbout = async () => {
        const response = await getUserData(token)
        const { About } = await response.data
        setAbout(About)
    }

    const handleChangedAbout = async (newAbout: string) => {
        if (newAbout.length < 1) {
            setAbout("")
            changeAbout(token, defaultAbout)
        } else {
            setAbout(newAbout)
            changeAbout(token, newAbout)
        }
    }

    useEffect(() => {
       fetchAbout() 
    }, [])

    useEffect(() => {
        if (about.length < 1) {
            setAbout(defaultAbout)
        }
    }, [isEnabledEdit])

    useEffect(() => {
        if (isOpenProfile) {
            const textareaAbout = document.getElementById('profileAbout')
            textareaAbout.style.height = `auto`
            textareaAbout.style.height = `${textareaAbout.scrollHeight}px`
        
            setTextareaHeight(`${textareaAbout.scrollHeight}px`)
        }
    }, [isOpenProfile, about, isEnabledEdit])

    return (
        <div className="relative">
            <label htmlFor="profileAbout" className="text-blue-600 text-xs">Tentang Kamu</label>
            <textarea 
                id="profileAbout" 
                style={{ height: textareaHeight }} 
                rows={1}
                name="about" 
                placeholder="Tentang" 
                className={`scrollbar-none resize-none form-input w-full bg-transparent border-0 outline-none ps-1 pe-10 pb-2 focus:ring-0 ${isEnabledEdit ? 'border-b focus:border-b-blue-600' : ''}`} 
                value={about} 
                readOnly={isEnabledEdit ? false : true} 
                onChange={(e) => handleChangedAbout(e.target.value)} 
                onBlur={() => setIsEnabledEdit(false)}
            />
            <span 
                className="text-gray-400 absolute end-2 top-8 cursor-pointer" 
                onClick={() => setIsEnabledEdit(true)} 
                hidden={!!isEnabledEdit}
            >
                <BiPencil size={20} />
            </span>
        </div>
    )
}

export default MyProfileAbout