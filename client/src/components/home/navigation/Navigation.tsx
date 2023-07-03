import React, { useContext, useState } from "react"
import NavigationBar from "./NavigationBar"
import ChatSearch from "./ChatSearch"
import ChatList from "./ChatList"
import UserInfo from "../userInfo/UserInfo"
import { FriendContext } from "../../../Context"
import { BsPersonFillExclamation, BsPersonPlusFill } from 'react-icons/bs'
import AddFriend from "../addFriend/AddFriend"

const Navigation = ({ isUserInfoOpen, userData }: { isUserInfoOpen: boolean, userData?: any }) => {
    const { listFriend } = useContext(FriendContext)
    const [isOpenAddFriend, setIsOpenAddFriend] = useState<boolean>(false)

    const handleAddFriend = () => {
        setIsOpenAddFriend(!isOpenAddFriend)
    }

    return (
        <>
            { !isUserInfoOpen ?
                <>
                    <NavigationBar/>
                    <ChatSearch />
                    { !listFriend || listFriend.length < 1 ?
                        <div className='w-full flex flex-col justify-center items-center gap-4  text-blue-50 px-10 py-20'>
                            <BsPersonFillExclamation size={120} className="opacity-50"/>
                            <p className="font-semibold text-center text-lg opacity-50">Kamu belum mempunyai teman</p>
                            <button
                                className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600 cursor-pointer flex items-center gap-2"
                                onClick={() => handleAddFriend()}
                            >
                                <BsPersonPlusFill size={18} />
                                <span>Tambah Teman</span>
                            </button>
                        </div>
                        :
                        <ChatList />
                    }
                    { isOpenAddFriend && <AddFriend onClose={handleAddFriend} /> }
                </>
                :
                <UserInfo data={userData} />
            }
        </>
    )
}

export default Navigation