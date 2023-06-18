import React, { useState } from 'react'
import { GoKebabVertical, GoBell, GoSignOut } from 'react-icons/go'
import ChatNotif from './ChatNotif'
import { logout } from '../../Rest'

const ChatMenu = ({ onLogout }: { onLogout: Function }) => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenNotif, setIsOpenNotif] = useState<boolean>(false)

    const handleNotif = () => {
        setIsOpenMenu(false)
        setIsOpenNotif(!isOpenNotif)
    }

    const handleLogout = async () => {
        setIsOpenMenu(false)
        const response = await logout(localStorage.getItem('token'))
        if (response.code === 200) {
            localStorage.removeItem('token')
            onLogout()
        }
    }

    return (
        <>
            <div className="dropdown dropdown-bottom dropdown-end">
                <GoKebabVertical tabIndex={0} size={22} className="text-slate-200 cursor-pointer" onClick={() => setIsOpenMenu(true)}/>
                {isOpenMenu &&
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl shadow-black bg-gray-700 w-52">
                    <li>
                        <div onClick={handleNotif} >
                            <GoBell />
                            <span>Notifikasi</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={handleLogout}>
                            <GoSignOut />
                            <span>Keluar</span>
                        </div>
                    </li> 
                </ul>
                }
            </div>
            {isOpenNotif && <ChatNotif onClose={handleNotif} />}
        </>
    )
}

export default ChatMenu