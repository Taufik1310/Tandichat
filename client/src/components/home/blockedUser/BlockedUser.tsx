import React, { useState, useContext, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { CgUnblock } from 'react-icons/cg'
import { BsPersonFillExclamation } from 'react-icons/bs'
import { BASE_AVATAR_URL, getAllBlockedUser, unblockUser } from '../../../Rest'
import { TokenContext, UserInfoContext } from '../../../Context'
import AlertConfirm from '../../alert/AlertConfirm'

const BlockedUser = ({ onClose }: { onClose: () => void }) => {
    const TOKEN = useContext(TokenContext)
    const { onClick } = useContext(UserInfoContext)
    const [blockedUser, setBlockedUser] = useState<any[]>([])
    const [isConfirmUnblockOpen, setIsConfirmUnblockOpen] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>(0)
    
    const fetchAllBlockedUser = async () => {
        const response = await getAllBlockedUser(TOKEN)
        setBlockedUser(response.data)
    }
    

    const handleAlertClosed = () => {
        setIsConfirmUnblockOpen(false)
    }

    const handleUnblockUser = (id: number) => {
        setUserId(id)
        setIsConfirmUnblockOpen(true)
    }

    const handleUnblockConfirmed = async () => {
        setIsConfirmUnblockOpen(false)
        const response = await unblockUser(TOKEN, userId)
        if (response) {
            fetchAllBlockedUser()
        }
    }

    useEffect(() => {
        fetchAllBlockedUser()
    }, [])

    return (
        <>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-hidden scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Pengguna yang Diblokir</p>
                </div>
                { !blockedUser || blockedUser.length < 1 ?
                    <div className='w-full flex flex-col justify-center items-center gap-4 opacity-50 text-blue-50 px-10 py-20'>
                        <BsPersonFillExclamation size={120} />
                        <p className="font-semibold text-center text-lg">Belum ada pengguna yang diblokir</p>
                    </div>
                    :
                    <ul className="h-screen px-2 py-6 overflow-y-scroll scrollbar-style">
                        { blockedUser && 
                            blockedUser.map((item) => (
                                <li className="flex justify-between items-center gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700">
                                    <div 
                                        className="w-9/12 sm:w-8/12 lg:w-9/12 flex gap-x-3 items-center cursor-pointer"
                                        onClick={() => onClick(item)}
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
                                    <div
                                         className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600 cursor-pointer flex items-center gap-1"
                                         onClick={() => handleUnblockUser(item.Id)}
                                    >
                                        <CgUnblock size={18} />
                                        <span>Buka</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            { isConfirmUnblockOpen &&
                <AlertConfirm onClose={handleAlertClosed} onConfirm={handleUnblockConfirmed} status="unblock" />
            }
        </>
    )
}

export default BlockedUser