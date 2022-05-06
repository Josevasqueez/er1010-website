const qs = require('qs');
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import { fetchAPI, getImage } from '../../lib/api'
import Layout from '../../components/Layout'
import Section from '../../components/blocks/Section';
import Title from '../../components/blocks/Title';

export default function index({ navbar, footer, content, lawyers, locale }) {
    return (
        <Layout seo={content.seo} navigation={navbar} footer={footer}>
            <Section>
                <div className="grid lg:grid-cols-3 lg:gap-16 space-y-5 lg:space-y-0">
                    <div className='space-y-2'>
                        <Title black={true}>{content.title}</Title>
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <ReactMarkdown>{content.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="mt-24 grid lg:grid-cols-3 gap-10 pb-10">
                    {
                        lawyers?.map(lawyer => (
                            <div key={lawyer.id} className="rounded">
                                <Image alt="" src={getImage(lawyer.attributes.Avatar.data.attributes.url)} height="75" width="100%" layout="responsive" objectFit='cover' />
                                <div className='bg-slate-100 p-7'>
                                    <h3 className='text-xl lg:text-2xl font-bold text-slate-900'>{lawyer.attributes.Name}</h3>
                                    <p className='text-sm md:text-base'>{lawyer.attributes.Position}</p>
                                    <Link href={"/lawyers/" + lawyer.attributes.slug}><a className='text-red-500 hover:text-red-600 font-semibold text-sm'>{locale.includes('es') ? 'Ver más' : 'Read more'}</a></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Section>
        </Layout>
    )
}


export async function getStaticProps({ locale }) {
    const queryLocale = qs.stringify({
        locale: locale.includes('es') ? 'es-MX' : 'en',
        populate: '*',
    }, {
        encodeValuesOnly: true,
    });
    const queryFooter = qs.stringify({
        locale: locale.includes('es') ? 'es-MX' : 'en',
        populate: ['logo', 'socials', 'contact', 'contact.form'],
    }, {
        encodeValuesOnly: true,
    });

    const { attributes: content } = await fetchAPI("lawyers-page?" + queryLocale)
    const lawyers = await fetchAPI("lawyers?" + queryLocale)
    const { attributes: navbar } = await fetchAPI("navbar?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer?" + queryFooter)
    return {
        props: { navbar, footer, content, lawyers, locale },
    }
}