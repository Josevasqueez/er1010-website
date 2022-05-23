const qs = require('qs');
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { fetchAPI, getImage } from '../lib/api'
import Layout from '../components/Layout';
import Section from '../components/blocks/Section';
import Title from '../components/blocks/Title';
import Partnertitle from '../components/blocks/Partnertitle';
import LandingForm from '../components/LandingForm';
import CallNowButtom from '../components/CallNowButtom';

export default function Lawyer({ landing }) {
    const seo = landing.attributes.seo;

    return (
        <Layout seo={seo} landing={true}>
            <div className='bg-gray-900' style={{ backgroundImage: "url(" + getImage(landing.attributes.background.data.attributes.url) + ")", backgroundSize: 'cover', backgroundPosition: "center" }}>
                <Section bg='bg-gray-900/75 text-white' no={true} centered={true}>
                    <div className='grid lg:grid-cols-3 py-10 lg:py-0 gap-16 items-center'>
                        <div className='lg:col-span-2'>
                            <Link href={"/"}>
                                <a>
                                    <div className='w-56 mb-10'>
                                        <Image alt="logo" src={getImage(landing.attributes.logo.data.attributes.url)} height="50" width="100" layout="responsive" objectFit='contain' />
                                    </div>
                                </a>
                            </Link>
                            <Title><span className='font-medium text-white'>{landing.attributes.title}</span></Title>
                            <div className="h-2"></div>
                            <Partnertitle main={true}><span className='lg:text-2xl'>{landing.attributes.subtitle}</span></Partnertitle>
                            <ReactMarkdown className='hidden md:block md:space-y-5 my-10'>{landing.attributes.content}</ReactMarkdown>
                            <div className="hidden md:block">
                                <Image alt="Iconos" src={"/Iconos.png"} height="70" width="500" objectFit='contain' />
                            </div>
                        </div>
                        <div className='bg-gray-900/75 lg:h-screen p-6 py-10 md:p-10 flex flex-col justify-center items-center'>
                            <LandingForm data={landing.attributes} />
                            <ReactMarkdown className='md:hidden mt-8 mb-10 space-y-5 '>{landing.attributes.content}</ReactMarkdown>
                            <div className="md:hidden MB-16">
                                <Image alt="Iconos" src={"/Iconos.png"} height="50" width="400" objectFit='contain' />
                            </div>
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
    const landings = await fetchAPI("er-1010-landings?" + queryLocale);
    const paths = landings.map(landing => ({ params: { slug: landing.attributes.slug }, locale: landing.attributes.locale?.includes('es-MX') ? 'es' : 'en' }));
    console.log("PATH: ", paths);
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ locale, params }) {
    try {
        const landing = await fetchAPI("er-1010-landings?populate=*&filters[slug]=" + params.slug + "&locale=" + (locale.includes('es') ? 'es-MX' : 'en'))
        console.log(params, landing[0]);
        return {
            props: { landing: landing[0] },
        }
    } catch (err) {
        console.log(err);
    }
}