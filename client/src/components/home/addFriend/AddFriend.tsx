import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import AddFriendInput from './AddFriendInput'
import AddFriendPending from './AddFriendPending'

const AddFriend = ({ onClose }: { onClose: () => void }) => {
    const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false)

    return (
        <div>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-hidden scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Tambah Teman</p>
                </div>
                <div className="px-4 py-10 overflow-y-scroll scrollbar-style h-[calc(100vh-5rem)] ">
                    <section className='mb-16'>
                        <AddFriendInput onSubmit={() => setIsSubmitForm(true)}/>
                    </section>
                    <section>
                        <AddFriendPending isSubmitForm={isSubmitForm} onSubmit={() => setIsSubmitForm(false)}/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AddFriend