import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { MenuIcon, XIcon, GlobeAltIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { getImage } from '../lib/api';
import Button from './blocks/Button';
import { useRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function NavLink({ item, dark }) {

    const { link, title, children = null } = item;

    if (!children) return (
        <Link href={link}>
            <a className={`text-base font-medium ${dark ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
                {title}
            </a>
        </Link >
    )

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            open ? `${dark ? 'text-white' : 'text-slate-900'}` : `${dark ? 'text-slate-300' : 'text-slate-500'}`,
                            `group rounded-md inline-flex items-center text-base font-medium ${dark ? 'hover:text-white' : 'hover:text-slate-900'}  focus:outline-none`
                        )}
                    >
                        <span>{title}</span>
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'text-red-500' : 'text-slate-400',
                                `ml-2 h-5 w-5 group-hover:text-red-600`
                            )}
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {children.map((item, index) => (
                                    <Link href={item.link} key={index}>
                                        <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-slate-100">
                                            <div className="ml-4">
                                                <p className="text-base font-medium text-slate-900">{item.title}</p>
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Popover.Panel>
                </>
            )}
        </Popover>
    )
}

export default function Navigation({ content, dark = false }) {

    const router = useRouter();
    console.log(router);
    const [realLinks, setRealLinks] = useState([])

    useEffect(() => {
        getLinks()
        // eslint-disable-next-line
    }, [])

    const getLinks = async () => {
        let links = await content.links?.filter(i => i.link)
        // let othersLinks = await content.links.find(i => i.children)?.children
        setRealLinks(links);
    }


    return (
        <Popover className={`relative bg-${dark ? "slate-900" : "white"}`}>
            <div className="max-w-7xl mx-auto px-5 md:px-16 sticky top-0 z-50">
                <div className={`flex justify-between items-center lg:justify-start md:space-x-10`}>
                    <div className="flex justify-start xl:w-0 xl:flex-1">
                        <Link href="/">
                            <a>
                                <span className="sr-only">ER1010</span>
                                <div className='w-44'>
                                    <Image alt="logo" src={getImage(dark ? content.logo_alt.data.attributes.url : content.logo.data.attributes.url)} height="60" width="100%" layout="responsive" objectFit='contain' />
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 lg:hidden flex items-center space-x-4">
                        {/* <Link href={router.asPath} locale={router.locales.find(i => i !== router.locale)}>
                            <a className='text-red-500 font-medium flex items-center'>
                                <GlobeAltIcon className='h-6 mr-1' />
                                {router.locales.find(i => i !== router.locale)}
                            </a>
                        </Link> */}
                        <Popover.Button className={`bg-red-500 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500`}>
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden lg:flex space-x-10">
                        {
                            content.links?.map((link, index) => (
                                <NavLink item={link} key={index} dark={dark} />
                            ))
                        }
                    </Popover.Group>

                    <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0 space-x-5">
                        {/* <Link href={router.asPath} locale={router.locales.find(i => i !== router.locale)}>
                            <a className='text-red-500 font-medium flex items-center'>
                                <GlobeAltIcon className='h-6 mr-1' />
                                {router.locales.find(i => i !== router.locale)}
                            </a>
                        </Link> */}
                        <a href="#contact">
                            <Button>{content.action.text}</Button>
                        </a>
                    </div>
                </div>
            </div>

            <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-50">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-slate-50">
                    <div className="pt-5 pb-6">
                        <div className="px-5 flex items-center justify-between">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                <div className='w-36'>
                                    <Image alt="logo" src={getImage(content.logo.data.attributes.url)} height="60" width="100%" layout="responsive" objectFit='contain' />
                                </div>
                            </div>
                            <div className="-mr-2">
                                <Popover.Button className={`bg-red-500 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500`}>
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                        <div>
                            <div className="relative grid gap-5 bg-white px-5 py-8 sm:gap-8 sm:p-8">
                                {realLinks?.map((item, index) => (
                                    <Link href={item.link} key={index}>
                                        <a className="-m-3 py-3 flex items-start rounded-lg hover:bg-slate-100">
                                            <div className="ml-4">
                                                <p className="text-base font-medium text-slate-900">{item.title}</p>
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                                <a href="#contact" className='mt-5'>
                                    <Popover.Button>
                                        <Button>{content.action.text}</Button>
                                    </Popover.Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    )
}
