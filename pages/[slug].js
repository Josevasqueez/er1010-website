const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { fetchAPI, getImage } from '../lib/api'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import Layout from '../components/Layout';
import Section from '../components/blocks/Section';
import Title from '../components/blocks/Title';
import Partnertitle from '../components/blocks/Partnertitle';
import LandingForm from '../components/LandingForm';
import CallNowButtom from '../components/CallNowButtom';

export default function Lawyer({ landing }) {
    console.log(landing);
    const seo = landing.attributes.seo;

    return (
        <Layout seo={seo} landing={true}>
            <div className='bg-slate-900' style={{ backgroundImage: "url(" + getImage(landing.attributes.background.data.attributes.url) + ")", backgroundSize: 'cover', backgroundPosition: "center" }}>
                <Section bg='bg-[#011747]/75 text-white' no={true} centered={true}>
                    <div className='grid lg:grid-cols-3 py-10 lg:py-0 gap-16 items-center'>
                        <div className='lg:col-span-2 space-y-2 lg:space-y-5'>
                            <div className='w-44'>
                                <Image alt="logo" src={getImage(landing.attributes.logo.data.attributes.url)} height="60" width="100%" layout="responsive" objectFit='contain' />
                            </div>
                            <br />
                            <Title><span className='font-medium'>{landing.attributes.title}</span></Title>
                            <Partnertitle main={true}>{landing.attributes.subtitle}</Partnertitle>
                            <ReactMarkdown className='hidden md:block md:space-y-5'>{landing.attributes.content}</ReactMarkdown>
                        </div>
                        <div className='bg-slate-900/75 lg:h-screen p-6 py-12 md:p-10 flex flex-col justify-center items-center'>
                            <LandingForm data={landing.attributes} />
                            <ReactMarkdown className='md:hidden mt-8 mb-16 space-y-5'>{landing.attributes.content}</ReactMarkdown>
                        </div>
                    </div>
                </Section>
            </div>
            <CallNowButtom phone={landing.attributes.phone} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const queryLocale = qs.stringify({
        locale: 'all',
        populate: '*',
    }, {
        encodeValuesOnly: true,
    });
    const landings = await fetchAPI("landing-pages?" + queryLocale);
    const paths = landings.map(landing => ({ params: { slug: landing.attributes.slug }, locale: landing.attributes.locale?.includes('es-MX') ? 'es' : 'en' }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ locale, params }) {
    try {
        const landing = await fetchAPI("landing-pages?populate=*&filters[slug]=" + params.slug + "&locale=" + (locale.includes('es') ? 'es-MX' : 'en'))
        console.log(params, landing[0]);
        return {
            props: { landing: landing[0] },
        }
    } catch (err) {
        console.log(err);
    }
}