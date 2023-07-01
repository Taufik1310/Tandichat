import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const AlertInfo = ({ onClose, status, type }: {
    onClose: () => void,
    status: string,
    type: string
}) => {

    return (
        <>
            <div 
                className="bg-gray-900 opacity-80 fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen" 
            > </div>
            <div className="fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-8/12 sm:w-7/12 md:w-6/12 lg:w-4/12 ">
                <div 
                    className={`bg-gray-800 h-full flex flex-col gap-5 rounded-xl border-[1px] border-gray-500 text-blue-50`}
                >
                    <div className='py-3 pb-1 px-5 rounded-tl-xl rounded-tr-xl h-4/6'>
                        <div className='flex items-center gap-3 mb-3'>
                            <AiFillCloseCircle size={32} className=' text-red-500'/>
                            <p className='font-bold text-xl'>Gagal</p>
                        </div>
                        <p className='text-sm'>Ekstensi file tidak valid. Hanya file PNG dan GIF yang diperbolehkan</p>
                    </div>
                    <div className='bg-gray-900 py-1 px-5 rounded-br-xl rounded-bl-xl h-2/6 flex items-center justify-center'>
                        <button 
                            className='bg-gray-800 w-6/12 text-sm rounded-lg py-1'
                            onClick={onClose}
                        >Oke</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertInfo