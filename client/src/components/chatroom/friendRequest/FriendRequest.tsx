import React, { useState, useContext, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { GoKebabHorizontal } from 'react-icons/go'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { CgBlock } from 'react-icons/cg'
import { BASE_AVATAR_URL, getFriendPending } from '../../../Rest'
import { AlertUserInfo } from '../../template/Alert'
import { TokenContext } from '../../../Context'


const FriendRequest = ({ onClose }: { onClose: () => void }) => {
    const token = useContext(TokenContext)
    const [friendPending, setFriendPending] = useState([])
    const [detailUser, setDetailUser] = useState({
        avatar: '',
        username: '',
        email: '',
        about: '',
    })
    const [isAlertUserInfoOpen, setIsAlertUserInfoOpen] = useState<boolean>(false)
    
    const fetchFriendPending = async () => {
        const response = await getFriendPending(token)
        setFriendPending(response.data.recieved)
    }

    const handleConfirmedBtn = (id: number) => {
        // cancelFriendRequest(token, id)
        fetchFriendPending()
    }

    const handleClickedUser = ({ Avatar, Username, Email, About }: {
        Avatar: string,
        Username: string,
        Email: string,
        About: string,
    }) => {
        setDetailUser({
            avatar: Avatar,
            username: Username,
            email: Email,
            about: About,
        })
        setIsAlertUserInfoOpen(true)
    }

    useEffect(() => {
        fetchFriendPending()
    }, [])

    return (
        <>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-hidden scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Permintaan Pertemanan</p>
                </div>
                <ul className="h-screen px-4 py-6 overflow-y-scroll scrollbar-style">
                    { friendPending && 
                        friendPending.map((item) => (
                            <li className="flex justify-between items-center gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700">
                                <div 
                                    className="w-9/12 sm:w-8/12 lg:w-9/12 flex gap-x-2 items-center cursor-pointer"
                                    onClick={() => handleClickedUser(item)}
                                >
                                    <div className="avatar">
                                        <div className="w-10 h-10 max-h-10 object-cover rounded-full">
                                            <img src={`${BASE_AVATAR_URL}/${item.Avatar}`} alt="Foto Profil"/>
                                        </div>
                                    </div>
                                    <div className="flex-auto overflow-hidden">
                                        <p className="truncate text-sm font-semibold">{item.Username}</p>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-left">
                                    <label 
                                        tabIndex={0} 
                                        className="m-1 btn btn-xs px-3 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-blue-50 border border-blue-600 hover:border-blue-600  cursor-pointer rounded-full"
                                    >
                                        <GoKebabHorizontal size={20}/>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-gray-900 rounded-box w-28">
                                        <li className='py-2 px-3 flex flex-row items-center gap-3 text-blue-600 text-sm font-bold cursor-pointer hover:bg-gray-800'>
                                            <AiOutlineCheck className='p-0 hover:bg-transparent'/>
                                            <span className='p-0 hover:bg-transparent'>
                                                Terima
                                            </span>
                                        </li>
                                        <li className='py-2 px-3 flex flex-row items-center gap-3 text-blue-50 text-sm cursor-pointer hover:bg-gray-800'>
                                            <AiOutlineClose className='p-0 hover:bg-transparent'/>
                                            <span className='p-0 hover:bg-transparent'>
                                                Tolak
                                            </span>
                                        </li>
                                        <li className='py-2 px-3 flex flex-row items-center gap-3 text-red-400 text-sm font-bold cursor-pointer hover:bg-gray-800'>
                                            <CgBlock className='p-0 hover:bg-transparent'/>
                                            <span className='p-0 hover:bg-transparent'>
                                                Blokir
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            { isAlertUserInfoOpen &&
                <AlertUserInfo item={detailUser} onClose={() => setIsAlertUserInfoOpen(false)} />
            }
        </>
    )
}

export default FriendRequest