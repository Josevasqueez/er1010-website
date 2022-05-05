const qs = require('qs');
import ReactMarkdown from 'react-markdown';
import { fetchAPI } from '../lib/api'
import Layout from '../components/Layout'
import Section from '../components/blocks/Section';
import Button from '../components/blocks/Button'
import Title from '../components/blocks/Title';

export default function careers({ navbar, footer, content, careers }) {
    console.log(careers);
    return (
        <Layout seo={content.seo} navigation={navbar} footer={footer}>
            <Section>
                <div className="grid lg:grid-cols-5 lg:gap-16 space-y-5 lg:space-y-0">
                    <div className='col-span-3 space-y-2 lg:space-y-8'>
                        <Title black={true}>{content.title}</Title>
                        <ReactMarkdown>{content.description}</ReactMarkdown>
                    </div>
                </div>
                <div className="mt-20 grid lg:grid-cols-2 gap-10 pb-10">
                    {
                        careers?.map(carrer => (
                            <div key={carrer.id} className="rounded">
                                <div className='bg-slate-100 p-10'>
                                    <h2 className='text-2xl font-bold mb-5'>{carrer.attributes.position}</h2>
                                    <ReactMarkdown className='mb-10 space-y-4 text-sm'>
                                        {carrer.attributes.description}
                                    </ReactMarkdown>
                                    <h3 className='text-lg font-semibold mb-2'>Requeriments</h3>
                                    <ul className='text-sm mb-10'>
                                        {carrer.attributes.requeriments.map((i, index) => <li key={index}>{i}</li>)}
                                    </ul>
                                    <a href="mailto:tinabeltran@zreynalaw.com" target="_blank" rel="noreferrer">
                                        <Button>Send Resume</Button>
                                    </a>
                                    <p className='mt-6 text-slate-500 text-xs'>
                                        tinabeltran@zreynalaw.com or fax to 956-969-0492. If called to interview, please dress business professional, no jeans. Salary is Negotiable.
                                        Please meet ALL requirements before applying.
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Section>
        </Layout >
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

    const { attributes: content } = await fetchAPI("careers-page?" + queryLocale)
    const careers = await fetchAPI("careers?populate=*")
    const { attributes: navbar } = await fetchAPI("navbar?" + queryLocale)
    const { attributes: footer } = await fetchAPI("footer?" + queryFooter)
    return {
        props: { navbar, footer, content, careers },
    }
}