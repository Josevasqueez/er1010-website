import React from 'react'

export default function Partnertitle({ children, main = false }) {

    if (main) return <h3 className='font-semibold text-red-500 text-lg lg:text-xl'>{children}</h3>
    return (
        <h4 className='text-base lg:text-xl text-gray-400'>{children}</h4>
    )
}
