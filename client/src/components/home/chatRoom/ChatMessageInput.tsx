import React, { useContext, useState, useEffect } from "react"
import { RxPaperPlane } from 'react-icons/rx'
import { BiSmile } from 'react-icons/bi'
import { GiPaperClip } from 'react-icons/gi'
import { AlertContext, WebSocketContext } from "../../../Context"

const ChatMessageInput = ({ Id }: { Id: number  }) => {
    const { onSend } = useContext(WebSocketContext)
    const { onLimitChar } = useContext(AlertContext)
    const [message, setMessage] = useState<string>('')
    const [textareaHeight, setTextareaHeight] = useState('auto')

    const handleSubmitedForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (message.trim() !== '') {
            onSend(Id, message)
            setMessage('')
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmitedForm(event)
        }
    }

    useEffect(() => {
        const textarea = document.getElementById('messageInput')
        textarea.style.height = `auto`
        textarea.style.height = `${textarea.scrollHeight}px`
        setTextareaHeight(`${textarea.scrollHeight}px`)
        if (message.length > 800) {
            onLimitChar()
            const slicedMessage = message.slice(0, 800)
            setMessage(slicedMessage)
        }
    }, [message])

    return (
        <>
        <div 
            className={`bg-gray-700 h-[calc${textareaHeight}] px-3 pb-2 pt-1 flex items-end justify-center`}
        >
            <div className="flex">
                <button className="btn btn-sm text-xl border-none bg-gray-700 hover:bg-gray-700"><BiSmile /></button>
                <button className="btn btn-sm text-lg border-none bg-gray-700 hover:bg-gray-700"><GiPaperClip /></button>
            </div>
            <form className={`form-control w-11/12 h-[${textareaHeight}]`} onSubmit={handleSubmitedForm}>
                <div className={`input-group input-group-xs rounded-none flex flex-row justify-center items-end h-[${textareaHeight}`}>
                    <textarea  
                        id="messageInput"
                        rows={1}
                        placeholder="Ketikkan Sebuah Pesan" 
                        className={`input input-sm h-[${textareaHeight}] max-h-24 scrollbar-none resize-none leading-none rounded-none border-0 focus:border-0 focus:outline-none focus:ring-0 bg-gray-700 w-full`} 
                        autoFocus
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className="btn btn-sm text-lg bg-gray-700 border-none hover:bg-gray-700"
                        type={`${message !== '' ? 'submit' : 'button'}`}
                    ><RxPaperPlane /> </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ChatMessageInput