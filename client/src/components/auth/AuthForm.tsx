import React, { ReactElement, useEffect, useState } from 'react'
import { FaEyeSlash, FaEye, FaInfoCircle } from 'react-icons/fa'
import { register } from '../../Rest'

interface AuthFormProps {
    authType: string,
    authText: string
}

interface IsValid {
    email?: boolean,
    password?: boolean,
    confirmPassword?: boolean,
}

const AuthForm = ({ authType, authText }: AuthFormProps) => {
    const [isShowPass, setIsShowPass] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passState, setPassState] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isValid, setIsValid] = useState<IsValid>({
        email: true,
        password: true,
        confirmPassword: true,
    })

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if (emailRegex.test(email) || email.length === 0) {
            setIsValid({ ...isValid, email: true })
        } else {
            setIsValid({ ...isValid, email: false })
        }
    }, [email])
    
    useEffect(() => {
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>-_=+]/
        const uppercaseRegex = /[A-Z]/
        const lowercaseRegex = /[a-z]/
        const numberRegex = /\d/

        if (password.length === 0) {
            setIsValid({ ...isValid, password: true })
        } else if (password.length < 8) {
            setIsValid({ ...isValid, password: false })
            setPassState('Minimal panjang 8 karakter')
        } else if (!specialCharsRegex.test(password)) {
            setIsValid({ ...isValid, password: false })
            setPassState('Menggunakan setidaknya 1 karakter khusus')
        } else if (!(uppercaseRegex.test(password) && lowercaseRegex.test(password))) {
            setIsValid({ ...isValid, password: false })
            setPassState('Menggunakan setidaknya 1 huruf besar & kecil')
        } else if (!numberRegex.test(password)) {
            setIsValid({ ...isValid, password: false })
            setPassState('Menggunakan setidaknya 1 angka')
        }
        else {
            setIsValid({ ...isValid, password: true })
        }
    }, [password])
    
    useEffect(() => {
        confirmPassword === password || confirmPassword.length === 0 ? setIsValid({ ...isValid, confirmPassword: true }) : setIsValid({ ...isValid, confirmPassword: false })
    }, [confirmPassword])

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        register(email, username, password)
    }

    return (
        <form encType='' className="flex flex-col gap-8 mt-10" onSubmit={validateForm}>
            { authType === "signup" &&
            <div className='relative form-control'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-5 focus:ring-0 ${ isValid.email ? 'focus:border-b-blue-600' : 'border-b-red-400 focus:border-b-red-400'}`} 
                    required
                />
                { !isValid.email &&
                <div className='label'>
                    <div className='tooltip absolute end-2 top-3 ' data-tip='contoh: "admin123@gmail.com"'>
                        <span className="text-red-400 cursor-pointer">
                            <FaInfoCircle />
                        </span>
                    </div>
                    <span className='label-text-alt text-red-400'>contoh: 'admin123@gmail.com'</span>
                </div>
                }
            </div>
            }
            <div>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    className="form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-5 focus:ring-0 focus:border-b-blue-600" 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="relative form-control">
                <input 
                    type={isShowPass ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    className={`form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-10 focus:ring-0 ${ isValid.password ? 'focus:border-b-blue-600' : 'border-b-red-400 focus:border-b-red-400'}`} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span className={`${ isValid.password ? 'text-gray-400' : 'text-red-400'} absolute end-2 top-2`} onClick={() => setIsShowPass(!isShowPass)}>
                    {isShowPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                </span>
                { !isValid.password && 
                    <div className='label'>
                        <span className='label-text-alt text-red-400'>{passState}</span>
                    </div>
                }
            </div>
            { authType === "signup" && 
            <div className="relative">
                <input 
                    type={isShowPass ? "text" : "password"} 
                    name="confirmPassword" 
                    placeholder="Konfirmasi Password" 
                    className={`form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-10 focus:ring-0 ${ isValid.confirmPassword ? 'focus:border-b-blue-600' : 'border-b-red-400 focus:border-b-red-400'}`} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <span className={`${ isValid.confirmPassword ? 'text-gray-400' : 'text-red-400'} absolute end-2 top-2`} onClick={() => setIsShowPass(!isShowPass)}>
                    {isShowPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                </span>
                { !isValid.confirmPassword && 
                    <div className='label'>
                        <span className='label-text-alt text-red-400'>Password tidak cocok</span>
                    </div>
                }
            </div>
            }
            <div>
                <button type="submit" className="bg-blue-600 w-80 py-2 rounded-md hover:bg-blue-700 font-semibold">{authText}</button>
            </div>
        </form>
    )
}

export default AuthForm