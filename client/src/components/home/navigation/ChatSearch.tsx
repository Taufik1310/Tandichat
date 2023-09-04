import React, { useState } from "react";
import { GoSearch } from 'react-icons/go'

const ChatSearch = ({ onSearch }: { onSearch: (key: string) => void }) => {
    const [keyword, setKeyword] = useState<string>('')

    const handleChangeKeyword = (key: string) => {
        setKeyword(key)
        onSearch(key)
    }

    return (
        <div className="form-control w-full py-2">
            <div className="input-group input-group-xs flex flex-row justify-center items-center">
                <button 
                    className="btn btn-square btn-sm bg-gray-700 border-none hover:bg-gray-700" name="searchButton"
                >
                    <GoSearch />
                </button>
                <input 
                    type="text" 
                    placeholder="Cari Seseorang..." 
                    className="input focus:border-0 focus:outline-none focus:ring-0 input-sm bg-gray-700 w-10/12"
                    value={keyword}
                    onChange={(e) => handleChangeKeyword(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ChatSearch