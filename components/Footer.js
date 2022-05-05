import Image from 'next/image';
import Partnertitle from './blocks/Partnertitle'
import Section from './blocks/Section'
import Subtitle from './blocks/Subtitle';
import { LocationMarkerIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { FaFacebookF, FaYelp, FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { getImage } from '../lib/api';
import Form from './Form';
import BackToTop from './BackToTop';
import CallNowButtom from './CallNowButtom';

export default function Footer({ content }) {
    const { contact } = content;
    return (
        <footer id="contact">
            <Section bg="bg-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 space-y-16 lg:space-y-0">
                    <div className='space-y-16 col-span-2'>
                        <div className="space-y-2 max-w-md">
                            <Subtitle>{contact.title}</Subtitle>
                            <Partnertitle>{contact.subtitle}</Partnertitle>
                        </div>
                        <div className='grid md:grid-cols-2 gap-10'>
                            <div className='flex space-x-4'>
                                <MailIcon className='h-10' />
                                <div>
                                    <h5 className='text-xs text-slate-900 font-semibold'>Email</h5>
                                    <span className='text-sm'>{contact.email}</span>
                                </div>
                            </div>
                            <div className='flex space-x-4'>
                                <PhoneIcon className='h-10' />
                                <div>
                                    <h5 className='text-xs text-slate-900 font-semibold'>Phone Number</h5>
                                    <span className='text-sm'>{contact.phone}</span>
                                </div>
                            </div>
                            <div className='flex space-x-4'>
                                <LocationMarkerIcon className='h-10' />
                                <div>
                                    <h5 className='text-xs text-slate-900 font-semibold'>Ezequiel Reyna Law Office</h5>
                                    <span className='text-sm'>{contact.location}</span>
                                </div>
                            </div>
                            <div className="flex md:col-span-2 space-x-2 items-center">
                                {
                                    content.socials.data.map(i => {
                                        return (
                                            <div key={i.id} className='flex items-center'>
                                                <a href={i.attributes.url} target="_blank" rel="noreferrer" className='bg-white/50 p-2 rounded hover:bg-white transition'>
                                                    {
                                                        i.attributes.icon?.includes('FaFacebookF') &&
                                                        <FaFacebookF />
                                                    }
                                                    {
                                                        i.attributes.icon?.includes('FaYelp') &&
                                                        <FaYelp />
                                                    }
                                                    {
                                                        i.attributes.icon?.includes('FaInstagram') &&
                                                        <FaInstagram />
                                                    }
                                                    {
                                                        i.attributes.icon?.includes('FaYoutube') &&
                                                        <FaYoutube />
                                                    }
                                                    {
                                                        i.attributes.icon?.includes('FaTwitter') &&
                                                        <FaTwitter />
                                                    }
                                                    {
                                                        i.attributes.icon?.includes('FaLinkedinIn') &&
                                                        <FaLinkedinIn />
                                                    }
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className="bg-white rounded shadow-2xl shadow-slate-200 px-10 py-16 lg:-mt-16">
                            <Form data={contact.form} />
                        </div>
                    </div>
                </div>
            </Section>
            <Section no={true} bg='bg-slate-900'>
                <div className="py-20 text-slate-400 grid md:grid-cols-3 md:gap-16 space-y-5 md:space-y-0 mb-14 md:mb-0">
                    <div>
                        <div className='w-36'>
                            <Image alt="logo" src={getImage(content.logo.data.attributes.url)} height="60" width="100%" layout="responsive" objectFit='contain' />
                        </div>
                        <p className='mb-2 text-xs'>{content.slogan}</p>
                        <span className='text-sm'>{content.copyright}</span>
                    </div>
                    <div className="col-span-2 space-y-2 rounded border border-slate-600 p-5">
                        <h4>Disclaimer</h4>
                        <p className='text-sm'>{content.disclaimer}</p>
                    </div>
                </div>
            </Section>
            <CallNowButtom phone={contact.phone} />
            <BackToTop />
        </footer >
    )
}
