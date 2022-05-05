const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import { fetchAPI, getImage } from '../lib/api'
import Layout from '../components/Layout'
import Section from '../components/blocks/Section';
import Subtitle from '../components/blocks/Subtitle';
import Title from '../components/blocks/Title';
import MainCTA from '../components/ctas/MainCTA';

export default function communityInvolvement({ navbar, footer, content, locale }) {
    console.log(content);
    return (
        <Layout seo={content.seo} navigation={navbar} footer={footer}>
            <Section>
                <div className="grid lg:grid-cols-3 lg:gap-16 space-y-5 lg:space-y-0">
                    <div className='space-y-2'>
                        <Title black={true}>{content.title}</Title>
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <ReactMarkdown>{content.content}</ReactMarkdown>
                    </div>
                </div>
            </Section>
            <Section bg='bg-slate-100'>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-full mx-auto">
                            <Image alt="" src={getImage(content.section[0].media.data[0].attributes.url)} height="100%" width="100%" layout="responsive" objectFit='contain' />
                        </div>
                    </div>
                    <div className='space-y-5'>
                        <div className="space-y-2">
                            <Subtitle>{content.section[0].title}</Subtitle>
                        </div>
                        <ReactMarkdown>{content.section[0].content}</ReactMarkdown>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className='space-y-5'>
                        <div className="space-y-2">
                            <Subtitle>{content.section[1].title}</Subtitle>
                        </div>
                        <ReactMarkdown>{content.section[1].content}</ReactMarkdown>
                    </div>
                    <div>
                        <div className="w-full mx-auto">
                            <Image alt="" src={getImage(content.section[1].media.data[0].attributes.url)} height="100%" width="100%" layout="responsive" objectFit='contain' />
                        </div>
                    </div>
                </div>
            </Section>
            <Section bg='bg-slate-100'>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="w-full mx-auto">
                            <Image alt="" src={getImage(content.section[2].media.data[0].attributes.url)} height="100%" width="100%" layout="responsive" objectFit='contain' />
                        </div>
                    </div>
                    <div className='space-y-5'>
                        <div className="space-y-2">
                            <Subtitle>{content.section[2].title}</Subtitle>
                        </div>
                        <ReactMarkdown>{content.section[2].content}</ReactMarkdown>
                    </div>
                </div>
            </Section>
            <MainCTA locale={locale}/>
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

    const query = qs.stringify({ locale: locale.includes('es') ? 'es-MX' : 'en', populate: ['section', 'seo', 'cover', 'section.action', 'section.media'], }, { encodeValuesOnly: true, });
    const { attributes: content } = await fetchAPI("community?" + query)
    const { attributes: navbar } = await fetchAPI("navbar?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer?" + queryFooter)
    return {
        props: { navbar, footer, content, locale },
    }
}