import React, { useState, useContext } from 'react'
import { GoKebabVertical, GoSignOut } from 'react-icons/go'
import { BsPersonPlusFill, BsPersonFillUp } from 'react-icons/bs'
import { logout } from '../../../Rest'
import { AuthContext, TokenContext } from '../../../Context'
import FriendRequest from '../friendRequest/FriendRequest'
import AddFriend from '../addFriend/AddFriend'

const ChatMenu = () => {
    const { onLogout } = useContext(AuthContext)
    const token = useContext(TokenContext)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenFriendRequest, setIsOpenFriendRequest] = useState<boolean>(false)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState<boolean>(false)

    const handleFriendRequest = () => {
        setIsOpenMenu(false)
        setIsOpenFriendRequest(!isOpenFriendRequest)
    }

    const handleAddFriend = () => {
        setIsOpenMenu(false)
        setIsOpenAddFriend(!isOpenAddFriend)
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
                <GoKebabVertical tabIndex={0} size={22} className="text-blue-50 cursor-pointer" onClick={() => setIsOpenMenu(true)}/>
                {isOpenMenu &&
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl shadow-black bg-gray-700 w-52 rounded-lg">
                    <li>
                        <div onClick={handleAddFriend} >
                            <BsPersonPlusFill />
                            <span className='text-xs'>Tambah Teman</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={handleFriendRequest} >
                            <BsPersonFillUp />
                            <span className='text-xs'>Permintaan Pertemanan</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={handleLogout}>
                            <GoSignOut />
                            <span className='text-xs'>Keluar</span>
                        </div>
                    </li> 
                </ul>
                }
            </div>
            {isOpenFriendRequest && <FriendRequest onClose={handleFriendRequest} />}
            {isOpenAddFriend && <AddFriend onClose={handleAddFriend} />}
        </>
    )
}

export default ChatMenu