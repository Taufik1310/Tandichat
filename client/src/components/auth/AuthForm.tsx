import React, { useEffect, useState, useContext } from 'react'
import { FaEyeSlash, FaEye, FaInfoCircle } from 'react-icons/fa'
import { register, login, sendEmailVerify } from '../../Rest'
import { AuthContext, WebSocketContext } from '../../Context'

interface AuthFormProps {
    authType: string,
    authText: string,
    onVerify: (email: string) => void,
    onFailRegister: (email: string) => void,
    onFailLogin: () => void,
}

interface IsValid {
    email?: boolean,
    password?: boolean,
    confirmPassword?: boolean,
}

const AuthForm = ({ authType, authText, onVerify, onFailRegister, onFailLogin }: AuthFormProps) => {
    const { onLogin } = useContext(AuthContext)
    const { onConnect } = useContext(WebSocketContext)
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
    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true)

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          email: emailRegex.test(email) || email.length === 0,
        }))
    }, [email])      
    
    useEffect(() => {
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>-_=+]/
        const uppercaseRegex = /[A-Z]/
        const lowercaseRegex = /[a-z]/
        const numberRegex = /\d/
      
        let isValidPassword = true
        let passState = ''
      
        if (password.length === 0) {
          isValidPassword = true
        } else if (password.length < 8) {
          isValidPassword = false
          passState = 'Minimal panjang 8 karakter'
        } else if (!specialCharsRegex.test(password)) {
          isValidPassword = false
          passState = 'Menggunakan setidaknya 1 karakter khusus'
        } else if (!(uppercaseRegex.test(password) && lowercaseRegex.test(password))) {
          isValidPassword = false
          passState = 'Menggunakan setidaknya 1 huruf besar & kecil'
        } else if (!numberRegex.test(password)) {
          isValidPassword = false
          passState = 'Menggunakan setidaknya 1 angka'
        }
      
        setIsValid((prevIsValid) => ({ ...prevIsValid, password: isValidPassword }))
        setPassState(passState)
    }, [password])      
    
    useEffect(() => {
        const isValidConfirmPassword = confirmPassword === password || confirmPassword.length === 0
        setIsValid((prevIsValid) => ({ ...prevIsValid, confirmPassword: isValidConfirmPassword }))
    }, [confirmPassword])      

    useEffect(() => {
        const { email: isValidEmail, password: isValidPassword, confirmPassword: isValidConfirmPassword } = isValid
        const isEmailValid = isValidEmail && email.length !== 0
        const isPasswordValid = isValidPassword && password.length !== 0
        const isUsernameValid =  username.length !== 0
        const isConfirmPasswordValid = isValidConfirmPassword && confirmPassword.length !== 0

        let isFormValid = false

        if (authType === 'register') {
            isFormValid = isEmailValid && isPasswordValid && isUsernameValid && isConfirmPasswordValid    
        } else if (authType === 'login') {
            isFormValid = isEmailValid && isPasswordValid    
        }

        setIsDisabledBtn(!isFormValid)
    }, [isValid, email, username, password, confirmPassword])

    useEffect(() => {
        clearForm()
    }, [authType])

    const clearForm = () => {
        setEmail('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    const handleRegister = async () => {
        const response = await register(email, username, password)
        if (response.status === 500) {
            onFailRegister(email)
            setEmail('')
            return
        }
        sendEmailVerify(email)
        onVerify(email)
        clearForm()
    }

    const handleLogin = async () => {
        const response = await login(email, password)
        if (response.code === 400) {
            onFailLogin()
            setPassword('')
            return
        }
        clearForm()
        const token = response.data.Token
        localStorage.setItem('token', token)
        onLogin()
        onConnect(token)
    }

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        if (authType === 'register') {
            handleRegister()
        } 
        if (authType === 'login') {
            handleLogin()
        }
    }      
    
    return (
        <form className="flex flex-col gap-8 mt-10" onSubmit={validateForm}>
            <div className='relative form-control'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
            { authType === 'register' && 
            <div>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    className="form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-5 focus:ring-0 focus:border-b-blue-600" 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
            </div>
            }
            <div className="relative form-control">
                <input 
                    type={isShowPass ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    className={`form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-10 focus:ring-0 ${ isValid.password ? 'focus:border-b-blue-600' : 'border-b-red-400 focus:border-b-red-400'}`} 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
            { authType === "register" && 
            <div className="relative">
                <input 
                    type={isShowPass ? "text" : "password"} 
                    name="confirmPassword" 
                    placeholder="Konfirmasi Password" 
                    className={`form-input bg-transparent border-0 border-b w-80 outline-none rounded ps-1 pb-2 pe-10 focus:ring-0 ${ isValid.confirmPassword ? 'focus:border-b-blue-600' : 'border-b-red-400 focus:border-b-red-400'}`} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
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
                <button 
                    type="submit" 
                    className={`${isDisabledBtn ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} w-80 py-2 rounded-md font-semibold`}
                    disabled={isDisabledBtn}
                >{authText}</button>
            </div>
        </form>
    )
}

export default AuthForm