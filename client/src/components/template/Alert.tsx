import React from "react"
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import { BsPersonFillExclamation } from 'react-icons/bs'


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

interface AlertInfo {
  type?: string, 
  status: string,
  onClose?: () => void,
  email?: string
}

export const AlertInfo = ({ type, status, onClose, email }: AlertInfo) => {

  return (
    <>
      <button 
          className="bg-gray-700 opacity-60 fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" 
          onClick={onClose}
      > </button>
      <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/5 w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/4">
          <div 
            className=
            {`${ type === 'success' ? 'bg-green-600' : 
                  type === 'danger' ? 'bg-red-500' :
                  'bg-blue-600'
            } 
            h-full flex flex-col items-center justify-center gap-5 px-4 rounded-2xl text-gray-300`}
          >
            <BsPersonFillExclamation size={80} />
            { 
              status === 'invalidExtensionAvatar' ? 
              <p className="font-semibold text-center  text-sm">Ekstensi file tidak valid.<br />Hanya file <strong>PNG</strong> dan <strong>GIF</strong> yang diperbolehkan</p>
              :
              status === 'duplicateFriendRequest' ?
              <p className="font-semibold text-center  text-sm">Kamu sudah mengajukan pertemanan pada <span className="font-bold italic">{email}</span>.<br />Cek daftar pengajuan tertunda.</p>
              :
              status === 'cannotAddYourself' ?
              <p className="font-semibold text-center  text-sm">Tidak dapat mengajukan pertemanan pada diri sendiri !!!</p>
              :
              status === 'userNotFound' ?
              <p className="font-semibold text-center  text-sm">Pengguna dengan email: <span className="font-bold italic">{email}</span> tidak ditemukan !!!</p>
              :
              null
            }
            <button 
                className="text-xs border border-light rounded-full px-3 p-1 font-semibold"
                onClick={onClose}
            >Oke!</button>
          </div>
      </div>
    </>
  )
}