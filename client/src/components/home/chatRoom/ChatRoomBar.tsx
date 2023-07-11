import React, { useContext } from "react"
import { BASE_AVATAR_URL } from "../../../Rest"
import { AlertContext, ChatListContext, TokenContext, UserInfoContext } from "../../../Context"
import { GoKebabVertical } from 'react-icons/go'
import { CgBlock, CgTrashEmpty, CgProfile } from 'react-icons/cg'
import { BiArrowBack } from 'react-icons/bi'

const ChatRoomBar = ({ data }: { data: any }) => {
    const TOKEN = useContext(TokenContext)
    const { onClick } = useContext(UserInfoContext)
    const { onClose } = useContext(ChatListContext)
    const { onDeleteFriend: onDelete, onBlockUser } = useContext(AlertContext)
    const { Avatar, Username } = data

    const handleClickedUser = (data: any) => {
        onClick(data)
    }

    return (
        <>
            <div className="bg-gray-700 h-14 max-h-14 ps-4 pe-5 sm:px-8 py-2 flex items-center justify-between">
                <div className="flex items-center gap-5 w-10/12">
                    <div className="block sm:hidden" onClick={() => onClose()}>
                        <BiArrowBack size={22} className="cursor-pointer" />
                    </div>
                    <div 
                        className="avatar flex items-center gap-5 w-10/12 sm:w-full cursor-pointer"
                        onClick={() => handleClickedUser(data)}
                    >
                        <div className="w-9 h-9 max-h-9 object-cover rounded-full">
                            <img src={`${BASE_AVATAR_URL}/${Avatar}`} alt="Foto Profil"/>
                        </div>
                        <p className="truncate text-md font-bold">{Username}</p>
                    </div>
                </div>
                <details className="dropdown dropdown-end">
                    <summary tabIndex={0} className="btn p-0 bg-transparent hover:bg-gray-600 border-0" >
                        <GoKebabVertical size={22} className="text-blue-50 cursor-pointer" />
                    </summary>
                    <ul tabIndex={0} className="p-2 menu dropdown-content z-[1] shadow-2xl shadow-black bg-gray-700 rounded-lg w-48">
                        <li onClick={() => onClick(data)}>
                            <div>
                                <CgProfile />
                                <span className='text-xs'>Lihat Profil</span>
                            </div>
                        </li>
                        <li 
                            onClick={onDelete}
                        >
                            <div>
                                <CgTrashEmpty />
                                <span className='text-xs'>Hapus Pertemanan</span>
                            </div>
                        </li>
                        <li 
                            onClick={onBlockUser}
                        >
                            <div className="text-red-400">
                                <CgBlock />
                                <span className='text-xs font-semibold'>Blokir</span>
                            </div>
                        </li>
                    </ul>
                </details>
            </div>
        </>
    )
}

export default ChatRoomBar