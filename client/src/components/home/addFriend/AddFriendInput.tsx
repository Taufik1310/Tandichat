import React, { useState, useEffect, useContext } from "react"
import { TokenContext } from "../../../Context"
import { addFriendRequest, getUserData } from "../../../Rest"
import AlertInfo from "../../alert/AlertInfo"

const AddFriendInput = ({ onSubmit }: { onSubmit: () => void }) => {
    const TOKEN = useContext(TokenContext)
    const [email, setEmail] = useState<string>('')
    const [textareaHeight, setTextareaHeight] = useState<string>('auto')
    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState<boolean>(false)
    const [isAlertDuplicateOpen, setIsAlertDuplicateOpen] = useState<boolean>(false)
    const [isAlertYourselfOpen, setIsAlertYourselfOpen] = useState<boolean>(false)
    const [isAlertNotFoundOpen, setIsAlertNotFoundOpen] = useState<boolean>(false)
    const [isAlertAlreadyOpen, setIsAlertAlreadyOpen] = useState<boolean>(false)

    const handleSubmitForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const userDataResponse = await getUserData(TOKEN, email)
        if (userDataResponse.code === 500) {
            setIsAlertNotFoundOpen(true)
            return
        }
        const { Id } = await userDataResponse.data
        const friendRequestResponse = await addFriendRequest(TOKEN, Id)
        if (friendRequestResponse.code === 500 && friendRequestResponse.details.includes("Already") ) {
            setIsAlertAlreadyOpen(true)
            return
        }
        if (friendRequestResponse.code === 500 && friendRequestResponse.details.includes("duplicated") ) {
            setIsAlertDuplicateOpen(true)
            return
        }
        if (friendRequestResponse.code === 500 && friendRequestResponse.details.includes("yourself") ) {
            setIsAlertYourselfOpen(true)
            return
        }
        setIsAlertSuccessOpen(true)
        setEmail("")
        onSubmit()
    }

    useEffect(() => {
        const textarea = document.getElementById('textEmail')
        textarea.style.height = `auto`
        textarea.style.height = `${textarea.scrollHeight}px`
        setTextareaHeight(`${textarea.scrollHeight}px`)
    }, [email])

    return (
        <form onSubmit={handleSubmitForm}>
            <div className="relative mb-2">
                <label htmlFor="textEmail" className="text-blue-600 text-xs">Masukkan Alamat Email</label>
                <textarea 
                    id="textEmail" 
                    style={{ height: textareaHeight }} 
                    rows={1} 
                    name="email" 
                    placeholder="Email" 
                    className={`scrollbar-none resize-none form-input w-full bg-transparent border-0 outline-none px-1 pb-2 focus:ring-0 border-b focus:border-b-blue-600`} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
            </div>
            <div>
            <button 
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 w-full py-1 rounded-lg font-semibold text-sm`}
                >Ajukan Pertemanan</button>
            </div>
            { isAlertSuccessOpen &&    
                <AlertInfo type="success" status="successFriendRequest" onClose={() => setIsAlertSuccessOpen(false)} />
            }
            { isAlertDuplicateOpen &&    
                <AlertInfo type="fail" status="duplicateFriendRequest" email={email} onClose={() => setIsAlertDuplicateOpen(false)} />
            }
            { isAlertYourselfOpen &&    
                <AlertInfo type="fail" status="cannotAddYourself" onClose={() => setIsAlertYourselfOpen(false)} />
            }
            { isAlertNotFoundOpen &&    
                <AlertInfo type="fail" status="userNotFound" email={email} onClose={() => setIsAlertNotFoundOpen(false)} />
            }
            { isAlertAlreadyOpen &&    
                <AlertInfo type="fail" status="alreadyFriend" email={email} onClose={() => setIsAlertAlreadyOpen(false)} />
            }
        </form>
    )
}

export default AddFriendInput