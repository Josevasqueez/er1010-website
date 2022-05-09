const qs = require('qs');
import Link from 'next/link'
import { fetchAPI } from '../lib/api'
import Section from '../components/blocks/Section'
import Layout from '../components/Layout'
import Title from '../components/blocks/Title'
import ReactMarkdown from 'react-markdown'
import Button from '../components/blocks/Button'

export default function thankYou({ content, locale }) {

    const seo = () => {
        if(locale.includes('en')) return { metaTitle: "Thank you for contacting us", metaDescription: "You have contacted us, we are the Ezequiel Reyna Law Office, experienced personal injury attorneys" }
        return { metaTitle: "Gracias por contactarnos", metaDescription: "Nos ha contactado, somos ER1010, abogados con experiencia en lesiones personales." }
    }

    return (
        <Layout seo={seo()} landing={true}>
            <Section>
                <div className="space-y-5">
                    <Title><span className='text-red-500'>{content.title}</span></Title>
                    <ReactMarkdown>{content.message}</ReactMarkdown>
                    <br />
                    <Link href={content.button.url}><a><Button>{content.button.text}</Button></a></Link>
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
    const { attributes: content } = await fetchAPI("thanks-you?" + queryLocale)
    return {
        props: { content, locale },
    }
}