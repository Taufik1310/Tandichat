import React, { useState, useContext, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { BsPersonFillExclamation } from 'react-icons/bs'
import { GoKebabHorizontal } from 'react-icons/go'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { CgBlock } from 'react-icons/cg'
import { BASE_AVATAR_URL, acceptFriendRequest, blockUser, declineFriendRequest, getFriendPending } from '../../../Rest'
import { FriendContext, TokenContext, UserInfoContext } from '../../../Context'
import AlertConfirm from '../../alert/AlertConfirm'
import AlertInfo from '../../alert/AlertInfo'

const FriendRequest = ({ onClose }: { onClose: () => void }) => {
    const TOKEN = useContext(TokenContext)
    const { onClick } = useContext(UserInfoContext)
    const { onAcceptFriend } = useContext(FriendContext)
    const [friendPending, setFriendPending] = useState([])
    const [isConfirmBlockOpen, setIsConfirmBlockOpen] = useState<boolean>(false)
    const [isAlertInfoOpen, setIsAlertInfoOpen] = useState({
        accept: false,
        decline: false,
    })
    const [userId, setUserId] = useState<number>(0)
    
    const fetchFriendPending = async () => {
        const response = await getFriendPending(TOKEN)
        setFriendPending(response.data.received)
    }

    const handleAcceptedBtn = async (id: number) => {
        const response = await acceptFriendRequest(TOKEN, id)
        if (response) {
            setIsAlertInfoOpen({
                ...isAlertInfoOpen,
                accept: true
            })
            fetchFriendPending()
            onAcceptFriend()
        }
    }
    
    const handleDeclinedBtn = async (id: number) => {
        const response = await declineFriendRequest(TOKEN, id)
        if (response) {
            setIsAlertInfoOpen({
                ...isAlertInfoOpen,
                decline: true
            })
            fetchFriendPending()
        }
    }

    const handleAlertClosed = () => {
        setIsConfirmBlockOpen(false)
        setIsAlertInfoOpen({
            accept: false,
            decline: false
        })
    }

    const handleBlockedUser = (id: number) => {
        setUserId(id)
        setIsConfirmBlockOpen(true)
    }

    const handleBlockConfirmed = async () => {
        setIsConfirmBlockOpen(false)
        const response = await blockUser(TOKEN, userId)
        if (response) {
            fetchFriendPending()
        }
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
                { !friendPending || friendPending.length < 1 ?
                    <div className='w-full flex flex-col justify-center items-center gap-4 opacity-50 text-blue-50 px-10 py-20'>
                        <BsPersonFillExclamation size={160} />
                        <p className="font-semibold text-center text-lg">Tidak ada pengajuan pertemanan padamu baru baru ini</p>
                    </div>
                    :
                    <ul className="h-screen px-2 py-6 overflow-y-scroll scrollbar-style">
                        { friendPending && 
                            friendPending.map((item) => (
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
                                    <details className="dropdown dropdown-left">
                                        <summary 
                                            tabIndex={0} 
                                            className="m-1 btn btn-xs px-3 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-blue-50 border border-blue-600 hover:border-blue-600  cursor-pointer rounded-full"
                                        >
                                            <GoKebabHorizontal size={20}/>
                                        </summary>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-gray-900 rounded-box w-28">
                                            <li 
                                                className='py-2 px-3 flex flex-row items-center gap-3 text-blue-600 text-sm font-bold cursor-pointer hover:bg-gray-800'
                                                onClick={() => handleAcceptedBtn(item.Id)}
                                            >
                                                <AiOutlineCheck className='p-0 hover:bg-transparent'/>
                                                <a className='p-0 hover:bg-transparent'>
                                                    Terima
                                                </a>
                                            </li>
                                            <li 
                                                className='py-2 px-3 flex flex-row items-center gap-3 text-blue-50 text-sm cursor-pointer hover:bg-gray-800'
                                                onClick={() => handleDeclinedBtn(item.Id)}
                                            >
                                                <AiOutlineClose className='p-0 hover:bg-transparent'/>
                                                <a className='p-0 hover:bg-transparent'>
                                                    Tolak
                                                </a>
                                            </li>
                                            <li 
                                                className='py-2 px-3 flex flex-row items-center gap-3 text-red-400 text-sm font-bold cursor-pointer hover:bg-gray-800'
                                                onClick={() => handleBlockedUser(item.Id)}
                                            >
                                                <CgBlock className='p-0 hover:bg-transparent'/>
                                                <a className='p-0 hover:bg-transparent'>
                                                    Blokir
                                                </a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            { isConfirmBlockOpen &&
                <AlertConfirm onClose={handleAlertClosed} onConfirm={handleBlockConfirmed} status="block" />
            }
            { isAlertInfoOpen.accept &&
                <AlertInfo onClose={handleAlertClosed} status='acceptFriendRequest' type='success' />
            }
            { isAlertInfoOpen.decline &&
                <AlertInfo onClose={handleAlertClosed} status='declineFriendRequest' type='success' />
            }
        </>
    )
}

export default FriendRequest