import React from 'react'

const AlertConfirm = ({ onClose, onConfirm, status }: {
    onClose: () => void,
    onConfirm: () => void,
    status: string,
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
                    <div className='py-3 px-5 rounded-tl-xl rounded-tr-xl h-3/6'>
                        <p className='font-bold text-lg'>Konfirmasi Hapus</p>
                        <p className='text-sm'>Apakah kamu yakin ingin menghapus pertemanan ?</p>
                    </div>
                    <div className='bg-gray-900 py-3 px-5 rounded-br-xl rounded-bl-xl h-3/6 flex items-center justify-evenly'>
                        <button 
                            className='bg-blue-600 w-5/12 text-sm rounded-lg py-1'
                            onClick={onConfirm}
                        >Ya</button>
                        <button 
                            className='bg-gray-800 w-5/12 text-sm rounded-lg py-1'
                            onClick={onClose}
                        >Tidak</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertConfirm