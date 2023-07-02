import React, { useContext, useEffect, useState } from "react"
import { BiArrowBack } from 'react-icons/bi'
import { TokenContext, UserInfoContext } from "../../../Context"
import { BASE_AVATAR_URL, deleteFriend, getAllFriend } from "../../../Rest"
import { CgBlock, CgTrashEmpty } from 'react-icons/cg'
import AlertConfirm from "../../alert/AlertConfirm"

const UserInfo = ({ data }: { data: any }) => {
    const TOKEN = useContext(TokenContext)
    const { onClose } = useContext(UserInfoContext)
    const { Id, Avatar, Email, Username, About } = data
    const [isConfirmOpen, setIsConfirmOpen] = useState({
        deleteFriend: false,
        block: false,
    })
    const [listFriend, setListFriend] = useState([])
    const [isFriendExist, setIsFriendExist] = useState<boolean>(false)

    const handleAlertClosed = () => {
        setIsConfirmOpen({
            deleteFriend: false,
            block: false
        })
    }

    const handleDeleteConfirmed = async () => {
        setIsConfirmOpen({
            ...isConfirmOpen,
            deleteFriend: false
        })
        const response = await deleteFriend(TOKEN, Id)
        if (response) {
            onClose()
        }
    }

    const handleBlockConfirmed = async () => {
        setIsConfirmOpen({
            ...isConfirmOpen,
            block: false
        })
        // const response = await deleteFriend(TOKEN, Id)
        // console.log(response)
    }

    const fetchAllFriend =  async () => {
        const response  = await getAllFriend(TOKEN)
        setListFriend(response.data)
    }

    const checkFriendExistence = () => {
        const isFriendExist = listFriend.some((friend) => friend.Id === Id) 
        if (isFriendExist) {
            setIsFriendExist(true)
        } else {
            setIsFriendExist(false)
        }
    }

    useEffect(() => {
        fetchAllFriend()
    }, [])

    useEffect(() => {
        checkFriendExistence()
    }, [listFriend])

    return (
        <>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-y-auto scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0 z-10">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Informasi Pengguna</p>
                </div>
                <div className="flex flex-col items-center gap-10 px-6 py-10">
                    <section>
                        <div className="avatar">
                            <div className="w-40 h-40 max-h-40 rounded-full overflow-hidden object-cover relative cursor-pointer">
                                <img src={`${BASE_AVATAR_URL}/${Avatar}`} alt="Foto Profil" />
                            </div>
                        </div>
                    </section>
                    <section className="w-full">
                        <div className="mb-5">
                            <span className="text-blue-600 text-xs">Email</span>
                            <p className="text-blue-50 text-base break-all">{Email}</p>
                        </div>
                        <div className="mb-4">
                            <span className="text-blue-600 text-xs">Nama Pengguna</span>
                            <p className="text-blue-50 text-base break-all">{Username}</p>
                        </div>
                        <div>
                            <span className="text-blue-600 text-xs">Tentang</span>
                            <p className="text-blue-50 text-base break-all">{About}</p>
                        </div>
                    </section>
                    <section className="w-full">
                        { isFriendExist &&
                            <div 
                                className="flex items-center gap-2 text-gray-400 cursor-pointer mb-5"
                                onClick={() => setIsConfirmOpen({
                                    ...isConfirmOpen,
                                    deleteFriend: true
                                })}
                            >
                                <CgTrashEmpty size={16} />
                                <p className="text-xs font-semibold">Hapus Pertemanan</p>
                            </div>
                        }
                        <div 
                            className="flex items-center gap-2 text-red-500 cursor-pointer"
                            onClick={() => setIsConfirmOpen({
                                ...isConfirmOpen,
                                block: true
                            })}
                        >
                            <CgBlock size={20} />
                            <p className="text-sm font-semibold">Blokir</p>
                        </div>
                    </section>
                </div>
            </div>
            { isConfirmOpen.deleteFriend &&
                <AlertConfirm onClose={handleAlertClosed} onConfirm={handleDeleteConfirmed} status="deleteFriend" />
            }
            { isConfirmOpen.block &&
                <AlertConfirm onClose={handleAlertClosed} onConfirm={handleBlockConfirmed} status="block" />
            }
        </>
    )
}

export default UserInfo