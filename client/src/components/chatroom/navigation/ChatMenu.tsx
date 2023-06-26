import React, { useState, useContext } from 'react'
import { GoKebabVertical, GoPerson, GoSignOut } from 'react-icons/go'
import ChatFriendRequest from '../friendRequest/ChatFriendRequest'
import { logout } from '../../../Rest'
import { AuthContext, TokenContext } from '../../../Context'

const ChatMenu = () => {
    const { onLogout } = useContext(AuthContext)
    const token = useContext(TokenContext)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenNotif, setIsOpenNotif] = useState<boolean>(false)

    const handleNotif = () => {
        setIsOpenMenu(false)
        setIsOpenNotif(!isOpenNotif)
    }

    const handleLogout = async () => {
        setIsOpenMenu(false)
        const response = await logout(token)
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
                            <GoPerson />
                            <span className='text-xs'>Permintaan Pertemanan</span>
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
            {isOpenNotif && <ChatFriendRequest onClose={handleNotif} />}
        </>
    )
}

export default ChatMenu