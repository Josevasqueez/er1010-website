import React from 'react'
import { PhoneIcon } from '@heroicons/react/outline'

export default function CallNowButtom({ phone }) {
    return (
        <a href={"tel:" + phone} className="fixed md:hidden inset-x-0 bottom-0">
            <div className='p-4 w-full bg-amber-500 font-semibold text-white flex items-center space-x-2 justify-center'>
                <PhoneIcon className='h-6' />
                <span>
                    {phone}
                </span>
            </div>
        </a>
    )
}
