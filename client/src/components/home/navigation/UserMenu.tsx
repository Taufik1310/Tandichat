import React, { useState, useContext, useEffect } from 'react'
import { GoKebabVertical, GoSignOut } from 'react-icons/go'
import { BsPersonPlusFill, BsPersonFillUp, BsPersonFillSlash } from 'react-icons/bs'
import { getFriendPending, logout } from '../../../Rest'
import { AuthContext, FriendPendingContext, TokenContext } from '../../../Context'
import FriendRequest from '../friendRequest/FriendRequest'
import AddFriend from '../addFriend/AddFriend'
import AlertConfirm from '../../alert/AlertConfirm'
import BlockedUser from '../blockedUser/BlockedUser'

const UserMenu = () => {
    const { onLogout } = useContext(AuthContext)
    const TOKEN = useContext(TokenContext)
    const { friendPending } = useContext(FriendPendingContext)
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState<boolean>(false)
    const [isOpenFriendRequest, setIsOpenFriendRequest] = useState<boolean>(false)
    const [isOpenBlockedUser, setIsOpenBlockedUser] = useState<boolean>(false)
    const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState<boolean>(false)

    const handleFriendRequest = () => {
        setIsOpenMenu(false)
        setIsOpenFriendRequest(!isOpenFriendRequest)
    }

    const handleAddFriend = () => {
        setIsOpenMenu(false)
        setIsOpenAddFriend(!isOpenAddFriend)
    }

    const handleBlockedUser = () => {
        setIsOpenMenu(false)
        setIsOpenBlockedUser(!isOpenBlockedUser)
    }

    const handleLogout = async () => {
        setIsOpenMenu(false)
        const response = await logout(TOKEN)
        if (response) {
            onLogout()
        }
    }

    return (
        <>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div className='relative cursor-pointer border-none border-0 outline-none hover:border-0 hover:outline-none' onClick={() => setIsOpenMenu(true)}>
                    <GoKebabVertical tabIndex={0} size={22} className="text-blue-50 border-0 outline-none hover:border-0 hover:outline-none" />
                    <span className={`badge badge-xs bg-blue-600 border-0 absolute end-0 top-4 text-blue-50 text-[10px] ${friendPending.length < 1 ? 'hidden' : ''}`}>
                        { friendPending &&
                            friendPending.length < 99 ?
                            friendPending.length
                            :
                            `+99`
                        }
                    </span>
                </div>
                {isOpenMenu &&
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl shadow-black bg-gray-700 w-52 rounded-lg">
                    <li>
                        <div onClick={handleAddFriend} >
                            <BsPersonPlusFill size={18}/>
                            <span className='text-xs'>Tambah Teman</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={handleFriendRequest} className='relative'>
                            <BsPersonFillUp size={18}/>
                            <span className='text-xs'>Permintaan Pertemanan</span>
                            <span className={`badge badge-xs bg-blue-600 border-0 absolute start-6 bottom-2 text-blue-50 text-[10px] ${friendPending.length < 1 ? 'hidden' : ''}`}>
                                { friendPending &&
                                    friendPending.length < 99 ?
                                    friendPending.length
                                    :
                                    `+99`
                                }
                            </span>
                        </div>
                    </li>
                    <li>
                        <div onClick={handleBlockedUser} >
                            <BsPersonFillSlash size={18}/>
                            <span className='text-xs'>Pengguna Diblokir</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setIsConfirmLogoutOpen(true)}>
                            <GoSignOut size={18}/>
                            <span className='text-xs'>Keluar</span>
                        </div>
                    </li> 
                </ul>
                }
            </div>
            {isOpenFriendRequest && <FriendRequest onClose={handleFriendRequest} />}
            {isOpenAddFriend && <AddFriend onClose={handleAddFriend} />}
            {isOpenBlockedUser && <BlockedUser onClose={handleBlockedUser} />}
            { isConfirmLogoutOpen &&
                <AlertConfirm onClose={() => setIsConfirmLogoutOpen(false)} onConfirm={handleLogout} status="logout" />
            }
        </>
    )
}

export default UserMenu