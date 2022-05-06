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

            <Section>
                <div className="space-y-2 md:text-center" data-aos-duration="1000" data-aos="fade-in">
                    <Subtitle>{contact.title}</Subtitle>
                    <Partnertitle>{contact.subtitle}</Partnertitle>
                </div>
                <div className="mt-16" data-aos-duration="1000" data-aos="fade-in">
                    <div className="max-w-lg mx-auto bg-white rounded shadow-2xl shadow-slate-200 px-10 py-16">
                        <Form data={contact.form} />
                    </div>
                    <div className='flex flex-col md:items-center md:justify-center space-y-10 mt-16'>
                        <div className='md:flex space-y-10 md:space-y-0 md:space-x-10'>
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
                                    <h5 className='text-xs text-slate-900 font-semibold'>Teléfono</h5>
                                    <span className='text-sm'>{contact.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex md:col-span-2 space-x-2 items-center">
                            {
                                content.socials.data.map(i => {
                                    return (
                                        <div key={i.id} className='flex items-center'>
                                            <a href={i.attributes.url} target="_blank" rel="noreferrer" className='bg-gray-100 p-2 rounded hover:bg-gray-200 transition'>
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
            </Section>
            <Section no={true} bg='bg-slate-900'>
                <div className='pt-20 pb-40 md:pb-20 text-white text-center'>
                    <div className='w-44 mx-auto'>
                        <Image alt="logo" src={getImage(content.logo.data.attributes.url)} height="60" width="100%" layout="responsive" objectFit='contain' />
                    </div>
                    <p className='mb-2 text-xs'>{content.slogan}</p>
                    <span className='text-sm'>{content.copyright}</span>
                </div>
            </Section>
            <CallNowButtom phone={contact.phone} />
            <BackToTop />

            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PNFD3JB"
                    height="0" width="0" style={{ display: 'none', visibility: "hidden"}}></iframe>
            </noscript>


            <script dangerouslySetInnerHTML={{
                __html:
                    `var script = document.createElement('script');
                    script.async = true; script.type = 'text/javascript';
                    var target = 'https://www.clickcease.com/monitor/stat.js';
                    script.src = target;var elem = document.head;elem.appendChild(script);`
                ,
            }}>
            </script>

            <noscript>
                <a href='https://www.clickcease.com' rel='nofollow'><img src='https://monitor.clickcease.com/stats/stats.aspx' alt='ClickCease' /></a>
            </noscript>

        </footer >
    )
}
