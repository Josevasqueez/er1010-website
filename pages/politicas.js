const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown';
import { fetchAPI, getImage } from '../lib/api'
import Layout from '../components/Layout'
import Title from '../components/blocks/Title';
import Section from '../components/blocks/Section';

export default function politicas({ navbar, footer, content }) {
    return (
        <Layout seo={content.seo} navigation={navbar} footer={footer}>
            <Section>
                <div className="space-y-10">
                    <Title black={true}>{content.title}</Title>
                    <ReactMarkdown className='mt-10 space-y-5'>
                        {content.content}
                    </ReactMarkdown>
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
    const { attributes: content } = await fetchAPI("privacy-policy?" + queryLocale)
    const { attributes: navbar } = await fetchAPI("navbar-er-1010?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer-er-1010?" + queryFooter)
    return {
        props: { navbar, footer, content },
    }
}