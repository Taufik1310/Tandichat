import React from "react"
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'


export const AlertRegister = ({ state }: { state: number }) => {
    const isSuccess = state === 200
    const isEmailExist = state === 500
    
    return (
        <div className={`${isSuccess ? 'bg-green-600' : 'bg-red-400'} text-blue-50 text-xs flex items-center justify-center gap-2 w-3/4 p-1 rounded-xl m-auto`}>
        {isSuccess && (
          <>
            <FaCheckCircle />
            <p>Berhasil Daftar ke Tandichat</p>
          </>
        )}
        {isEmailExist && (
            <>
            <FaInfoCircle />
            <p>Gagal / Email sudah tersedia</p>
          </>
        )}
      </div>
    )
}

export const AlertLogin = ({ state }: { state: number }) => {
    const isSuccess = state === 200
    const isInvalid = state === 400
    
    return (
        <div className={`${isSuccess ? 'bg-green-600' : 'bg-red-400'} text-blue-50 text-xs flex items-center justify-center gap-2 w-3/4 p-1 rounded-xl m-auto`}>
        {isSuccess && (
          <>
            <FaCheckCircle />
            <p>Berhasil Login ke Tandichat</p>
          </>
        )}
        {isInvalid && (
            <>
            <FaInfoCircle />
            <p>Email / Password Salah</p>
          </>
        )}
      </div>
    )
}
