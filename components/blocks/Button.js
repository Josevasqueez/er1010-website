import React from 'react'

export default function Button({ children }) {
    return (
        <button
            className='rounded text-white bg-amber-500 hover:bg-amber-600 transition px-6 py-4 font-semibold text-sm'
        >
            {children}
        </button>
    )
}
