import React from 'react'

export default function Partnertitle({ children, main = false }) {

    if (main) return <h3 className='font-semibold text-redbase text-lg lg:text-xl'>{children}</h3>
    return (
        <h4 className='text-base font-medium lg:text-lg text-redbase'>{children}</h4>
    )
}
