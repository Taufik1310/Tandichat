import React, { useContext, useState } from "react"
import { RxPaperPlane } from 'react-icons/rx'
import { BiSmile } from 'react-icons/bi'
import { GiPaperClip } from 'react-icons/gi'
import { WebSocketContext } from "../../../Context"

const ChatMessageInput = ({ Id }: { Id: number  }) => {
    const [message, setMessage] = useState<string>('')
    const { onSend } = useContext(WebSocketContext)

    const handleSubmitedForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        onSend(Id, message)
        setMessage('')
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmitedForm(event)
        }
    }

    return (
        <div className="bg-gray-700 h-12 max-h-12 px-3 flex items-center justify-center">
            <div className="flex">
                <button className="btn btn-sm text-xl border-none bg-gray-700 hover:bg-gray-700"><BiSmile /></button>
                <button className="btn btn-sm text-lg border-none bg-gray-700 hover:bg-gray-700"><GiPaperClip /></button>
            </div>
            <form className="form-control w-11/12" onSubmit={handleSubmitedForm}>
                <div className="input-group input-group-xs flex flex-row justify-center items-center">
                    <textarea 
                        rows={1}
                        placeholder="Ketikkan Sebuah Pesan" 
                        className="input input-sm h-auto scrollbar-none resize-none leading-none border-0 focus:border-0 focus:outline-none focus:ring-0 bg-gray-700 w-full" 
                        autoFocus
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className="btn btn-sm text-lg bg-gray-700 border-none hover:bg-gray-700"
                        type={`${message !== '' ? 'submit' : 'button'}`}
                    ><RxPaperPlane /></button>
                </div>
            </form>
        </div>
    )
}

export default ChatMessageInput