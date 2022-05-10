const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import { fetchAPI, getImage } from '../lib/api'
import Layout from '../components/Layout'
import Title from '../components/blocks/Title';
import Section from '../components/blocks/Section';

export default function casesResult({ navbar, footer, content, results }) {
    console.log(content, results);
    return (
        <Layout seo={content.seo} navigation={navbar} footer={footer}>
            <Section>
                <div className="grid lg:grid-cols-5 lg:gap-16 space-y-5 lg:space-y-0">
                    <div className='col-span-3 space-y-2 lg:space-y-8'>
                        <Title black={true}>{content.title}</Title>
                        <ReactMarkdown>{content.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="mt-20 grid lg:grid-cols-3 gap-10 pb-10">
                    {
                        results?.map(result => {
                            const haveImage = result.attributes.cover?.data?.attributes.url || null
                            return (
                                <div key={result.id} className="rounded">
                                    {
                                        haveImage &&
                                        <Image alt="" src={getImage(result.attributes.cover.data.attributes.url)} height="50" width="100%" layout="responsive" objectFit='cover' />
                                    }
                                    <div className='bg-gray-100 p-10'>
                                        <ReactMarkdown>{result.attributes.description}</ReactMarkdown>
                                        <h3 className='text-sm text-gray-400 mt-2'>{result.attributes.title}</h3>
                                        <h5 className='mt-6 text-red-400 font-bold text-2xl'>${new Intl.NumberFormat('en-US').format(result.attributes.compensation)}</h5>
                                    </div>
                                </div>
                            )
                        })
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
    const { attributes: content } = await fetchAPI("cases-result?" + queryLocale)
    const results = await fetchAPI("results?populate=*")
    const { attributes: navbar } = await fetchAPI("navbar-er-1010?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer-er-1010?" + queryFooter)
    return {
        props: { navbar, footer, content, results: results.sort((a,b) => b.attributes.compensation - a.attributes.compensation) },
    }
}