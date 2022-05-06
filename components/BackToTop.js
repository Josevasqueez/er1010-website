import { useState } from 'react'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'

export default function BackToTop() {

    const [show, setShow] = useState("none")

    if (typeof window !== "undefined") {
        window.onscroll = function () {
            scrollFunction();
        };
    }

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setShow('block')
        } else {
            setShow('none')
        }
    }

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <button style={{ display: show }} className="p-3 bg-red-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out hidden bottom-20 md:bottom-5 right-5 fixed"
            id="btn-back-to-top" onClick={backToTop}>
            <ArrowNarrowUpIcon className='h-4' />
        </button>
    )
}
