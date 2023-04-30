import React, { useState } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

interface AuthFormProps {
    authType: string,
    authText: string
}

const AuthForm = ({ authType, authText }: AuthFormProps) => {
    const [isShowPass, setIsShowPass] = useState(false)

    return (
        <form className="flex flex-col gap-10">
            <div>
                <input type="text" name="username" placeholder="Username" className="form-input bg-transparent border-0 border-b w-80 outline-none ps-1 pb-2 focus:ring-0 focus:border-b-blue-600"/>
            </div>
            <div className="relative">
                <input type={isShowPass ? "text" : "password"} name="password" placeholder="Password" className="form-input bg-transparent border-0 border-b w-80 outline-none ps-1 pb-2 focus:ring-0 focus:border-b-blue-600"/>
                <span className="text-gray-400 absolute end-2 top-2" onClick={() => setIsShowPass(!isShowPass)}>
                    {isShowPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                </span>
            </div>
            { authType === "signup" && 
            <div className="relative">
                <input type={isShowPass ? "text" : "password"} name="confirmPassword" placeholder="Konfirmasi Password" className="form-input bg-transparent border-0 border-b w-80 outline-none ps-1 pb-2 focus:ring-0 focus:border-b-blue-600"/>
                <span className="text-gray-400 absolute end-2 top-2" onClick={() => setIsShowPass(!isShowPass)}>
                    {isShowPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                </span>
            </div>
            }
            <div>
                <button type="submit" className="bg-blue-600 w-80 py-2 rounded-md hover:bg-blue-700 font-semibold">{authText}</button>
            </div>
        </form>
    )
}

export default AuthForm