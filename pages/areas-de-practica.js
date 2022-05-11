const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import { fetchAPI, getImage } from '../lib/api'
import Layout from '../components/Layout'
import Section from '../components/blocks/Section';
import Title from '../components/blocks/Title';

export default function practiceAreas({ navbar, footer, content, areas }) {
    console.log(content);
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
                        areas?.map(area => (
                            <div key={area.id} className="rounded">
                                <Image alt="" src={getImage(area.attributes.Cover.data.attributes.url)} height="50" width="100%" layout="responsive" objectFit='cover' />
                                <div className='bg-gray-100 p-10'>
                                    <h3 className='text-xl font-medium text-red-500 mb-5'>{area.attributes.Title}</h3>
                                    <p className='mb-5'>{area.attributes.Description}</p>
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

    const { attributes: content } = await fetchAPI("areas-page?" + queryLocale)
    const areas = await fetchAPI("areas?" + queryLocale)
    const { attributes: navbar } = await fetchAPI("navbar-er-1010?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer-er-1010?" + queryFooter)
    return {
        props: { navbar, footer, content, areas },
    }
}