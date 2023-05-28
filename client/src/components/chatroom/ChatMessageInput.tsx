import React from "react"
import { RxPaperPlane } from 'react-icons/rx'
import { BiSmile } from 'react-icons/bi'
import { GiPaperClip } from 'react-icons/gi'

const ChatMessageInput = () => {
    return (
        <div className="bg-gray-700 h-12 max-h-12 px-5 flex items-center justify-center">
            <div>
                <button className="btn btn-sm text-xl border-none bg-gray-700 hover:bg-gray-700"><BiSmile /></button>
                <button className="btn btn-sm text-lg border-none bg-gray-700 hover:bg-gray-700"><GiPaperClip /></button>
            </div>
            <div className="form-control w-5/6">
                <div className="input-group input-group-xs flex flex-row justify-center items-center">
                    <textarea 
                        rows={1}
                        placeholder="Ketikkan Sebuah Pesan" 
                        className="input input-sm h-auto scrollbar-none resize-none leading-none border-0 focus:border-0 focus:outline-none focus:ring-0 bg-gray-700 w-full" 
                        autoFocus/>
                    <button className="btn btn-sm text-lg bg-gray-700 border-none hover:bg-gray-700"><RxPaperPlane /></button>
                </div>
            </div>
        </div>
    )
}

export default ChatMessageInput