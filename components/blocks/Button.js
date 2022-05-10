import React from 'react'

export default function Button({ children }) {
    return (
        <button
            className='rounded text-white bg-red-500 hover:bg-red-600 transition px-6 py-4 font-semibold text-sm'
        >
            {children}
        </button>
    )
}
