import React from 'react'

export default function Partnertitle({ children, main = false }) {

    if (main) return <h3 className='font-semibold text-amber-500 text-lg lg:text-xl'>{children}</h3>
    return (
        <h4 className='text-base font-medium lg:text-lg text-amber-500'>{children}</h4>
    )
}
