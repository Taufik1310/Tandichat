import React from "react"
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import { BsPersonFillExclamation, BsPersonFillCheck, BsInfoCircle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { MdAlternateEmail } from 'react-icons/md'
import { CgBlock } from 'react-icons/cg'
import { BASE_AVATAR_URL } from "../../Rest"


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
  onClose: () => void,
  email?: string
}

export const AlertInfo = ({ type, status, onClose, email }: AlertInfo) => {

  return (
    <>
      <button 
          className="bg-gray-900 opacity-60 fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" 
          onClick={onClose}
      > </button>
      <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/5 w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/4">
          <div 
            className=
            {`${ type === 'success' ? 'bg-green-600' : 
                  type === 'danger' ? 'bg-red-500' :
                  'bg-blue-600'
            } h-full flex flex-col items-center justify-center gap-5 px-4 rounded-2xl text-gray-300`}
          >
            { 
              type === 'success' ? 
              <BsPersonFillCheck size={80} />
              :
              <BsPersonFillExclamation size={80} />
            }
            { 
              status === 'invalidExtensionAvatar' ? 
              <p className="font-semibold text-center text-sm">Ekstensi file tidak valid.<br />Hanya file <strong>PNG</strong> dan <strong>GIF</strong> yang diperbolehkan</p>
              :
              status === 'duplicateFriendRequest' ?
              <p className="font-semibold text-center text-sm">Kamu sudah mengajukan pertemanan pada <span className="font-bold italic">{email}</span>.<br />Cek daftar pengajuan tertunda.</p>
              :
              status === 'cannotAddYourself' ?
              <p className="font-semibold text-center text-sm">Tidak dapat mengajukan pertemanan pada diri sendiri !!!</p>
              :
              status === 'userNotFound' ?
              <p className="font-semibold text-center text-sm">Pengguna dengan email: <span className="font-bold italic">{email}</span> tidak ditemukan !!!</p>
              :
              status === 'successFriendRequest' ?
              <p className="font-semibold text-center text-base">Berhasil Mengajukan Pertemanan</p>
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

interface AlertUserInfo {
  item: {
    avatar: string,
    username: string,
    email: string,
    about: string,
  }
  onClose: () => void
}

export const AlertUserInfo = ({ item, onClose }: AlertUserInfo) => {
  const { avatar, username, email, about } = item

  return (
    <>
      <button 
          className="bg-gray-900 opacity-60 fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" 
          onClick={onClose}
      > </button>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-3/4 sm:w-2/4 md:w-1/3 lg:w-1/4">
          <div 
            className={`bg-gray-700 h-full flex flex-col gap-5 py-3 px-5 rounded-2xl`}
          >
            <div className="flex items-center justify-between text-base font-medium mb-8">
                <p>Informasi Pengguna</p>
                <IoMdClose size={22} className="cursor-pointer text-gray-300" onClick={onClose}/>
            </div>
            <div className="flex items-center gap-5 mb-10">
              <div className="avatar">
                  <div className="w-20 h-20 max-h-20 overflow-hidden rounded-full object-cover cursor-pointer">
                      <img src={`${BASE_AVATAR_URL}/${avatar}`} alt="Foto Profil" />
                  </div>
              </div>
              <p className="text-base font-medium truncate">{username}</p>
            </div>
            <ul className="flex flex-col gap-8">
              <li className="flex gap-5">
                <MdAlternateEmail size={24} className="w-1/12"/>
                <div className="w-10/12 h-16 overflow-scroll scrollbar-none">
                  <span className="text-xs text-gray-400">Email</span>
                  <p className="text-xs font-semibold">{email}</p>
                </div>
              </li>
              <li className="flex gap-5">
                <BsInfoCircle size={20} className="w-1/12"/>
                <div className="w-10/12 h-16 overflow-scroll scrollbar-none">
                  <span className="text-xs text-gray-400">Tentang</span>
                  <p className="text-xs font-semibold">{about}</p>
                </div>
              </li>
              <li className="flex items-center gap-5 text-red-400 cursor-pointer">
                <CgBlock size={30} className="w-1/12"/>
                <div className="w-10/12">
                  <p className="truncate text-sm font-semibold">Blokir</p>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </>
  )
}