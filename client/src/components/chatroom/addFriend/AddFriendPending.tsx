import React, { useState, useEffect, useContext } from "react"
import { cancelFriendRequest, getFriendPending } from "../../../Rest"
import { TokenContext, BaseAvatarURLContext } from "../../../Context"

const AddFriendPending = ({ isSubmitForm, onSubmit }: { 
    isSubmitForm: boolean, 
    onSubmit: () => void 
}) => {
    const BASE_AVATAR_URL = useContext(BaseAvatarURLContext)
    const token = useContext(TokenContext)
    const [friendPending, setFriendPending] = useState([])

    const fetchFriendPending = async () => {
        const response = await getFriendPending(token)
        setFriendPending(response.data.sended)
    }

    const handleClickedButton = (id: number) => {
        cancelFriendRequest(token, id)
        fetchFriendPending()
    }

    useEffect(() => {
        fetchFriendPending()
    }, [])

    useEffect(() => {
        onSubmit()
        fetchFriendPending()
    }, [isSubmitForm])

    return (
        <div>
            <h5 className="font-semibold bg-blue-600 text-center text-light rounded-tl-lg rounded-tr-lg py-1">Tertunda</h5>
            <div className="border-x border-b border-blue-600 rounded-bl-lg rounded-br-lg">
                { friendPending.length === 0 ?
                    <p className="text-sm text-center italic text-gray-400 p-2">Kamu belum mengajukan pertemanan pada siapapun baru-baru ini</p>
                    :
                    <ul>
                        { friendPending && 
                            friendPending.map(item => (
                                <li className="flex justify-between items-start gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700 cursor-pointer">
                                    <div className="w-9/12 sm:w-8/12 lg:w-9/12 flex gap-x-2 items-center">
                                        <div className="avatar">
                                            <div className="w-8 max-h-8 object-cover rounded-full">
                                                <img src={`${BASE_AVATAR_URL}/${item.Avatar}`} alt="Foto Profil"/>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="truncate text-xs font-semibold">{item.Username}</p>
                                            <p className="truncate text-xs text-gray-400">{item.Email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button 
                                            className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600"
                                            onClick={() => handleClickedButton(item.Id)}
                                        >Batal</button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default AddFriendPending