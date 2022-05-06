const qs = require('qs');
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { fetchAPI, getImage } from '../../lib/api'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import Layout from '../../components/Layout';
import Partnertitle from '../../components/blocks/Partnertitle';
import Section from '../../components/blocks/Section';
import Subtitle from '../../components/blocks/Subtitle';
import Title from '../../components/blocks/Title';

export default function Lawyer({ navbar, footer, lawyer }) {
    console.log(lawyer);
    const seo = lawyer.attributes.SEO;

    return (
        <Layout seo={seo} navigation={navbar} footer={footer}>
            <Section bg='bg-slate-900'>
                <div className='space-y-2 lg:space-y-5 text-white'>
                    <Title>{lawyer.attributes.Name}</Title>
                    <Partnertitle>{lawyer.attributes.Position}</Partnertitle>
                    <div className="flex items-center space-x-8 text-sm">
                        <div className='flex items-center space-x-1 text-slate-400'>
                            <PhoneIcon className='h-6' />
                            <a href={"tel:" + lawyer.attributes.Phone} target="_blank" rel="noreferrer">
                                <span>{lawyer.attributes.Phone}</span>
                            </a>
                        </div>
                        <div className='flex items-center space-x-1 text-slate-400'>
                            <MailIcon className='h-6' />
                            <a href={"mailto:" + lawyer.attributes.Email} target="_blank" rel="noreferrer">
                                <span>{lawyer.attributes.Email}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <div className="grid lg:grid-cols-3 gap-16">
                    <div className='-mt-24 lg:mt-0 lg:order-last'>
                        <div>
                            <Image alt="" src={getImage(lawyer.attributes.Avatar.data.attributes.url)} height="80" width="100" layout="responsive" objectFit='cover' />
                        </div>
                        <div className="p-10 bg-slate-100">
                            <h3 className='font-bold text-2xl'>{lawyer.attributes.Name}</h3>
                            <span className='text-red-500'>{lawyer.attributes.Position}</span>
                            <h5 className='text-slate-600 font-semibold mt-6'>LinkedIn</h5>
                            <a href={lawyer.attributes.LinkedIn} target="_blank" rel="noreferrer" className="underline">View Profile</a>
                            <h5 className='text-slate-600 font-semibold mt-4'>Education</h5>
                            <p>
                                {lawyer.attributes.Education.join(", ")}.
                            </p>
                            {
                                lawyer.attributes.Education?.length > 0
                                &&
                                <>
                                    <h5 className='text-slate-600 font-semibold mt-4'>Honors and Awards</h5>
                                    <p>
                                        {lawyer.attributes.Education.join(", ")}.
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                    <div className='lg:col-span-2 space-y-5 lg:pr-16'>
                        <ReactMarkdown>{lawyer.attributes.Description}</ReactMarkdown>
                        {
                            lawyer.attributes.Associations?.length > 0
                            &&
                            (
                                <>
                                    <br />
                                    <br />
                                    <Subtitle>Professional Associations</Subtitle>
                                    <p>
                                        {lawyer.attributes.Associations.join(", ")}.
                                    </p>
                                </>
                            )
                        }
                        {
                            lawyer.attributes.Involvement?.length > 0
                            &&
                            (
                                <>
                                    <br />
                                    <br />
                                    <Subtitle>Community Involvement</Subtitle>
                                    <p>
                                        {lawyer.attributes.Involvement.join(", ")}.
                                    </p>
                                </>
                            )
                        }
                        {
                            lawyer.attributes.Admissions?.length > 0
                            &&
                            (
                                <>
                                    <br />
                                    <br />
                                    <Subtitle>Bar Admissions</Subtitle>
                                    <p>
                                        {lawyer.attributes.Admissions.join(", ")}.
                                    </p>
                                </>
                            )
                        }
                    </div>

                </div>
            </Section>
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
    const lawyers = await fetchAPI("lawyers?" + queryLocale);
    const paths = lawyers.map(law => ({ params: { slug: law.attributes.slug }, locale: law.attributes.locale?.includes('es-MX') ? 'es' : 'en' }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ locale, params }) {
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

    try {
        const lawyer = await fetchAPI("lawyers?populate=*&filters[slug]=" + params.slug + "&locale=" + (locale.includes('es') ? 'es-MX' : 'en'))
        const { attributes: navbar } = await fetchAPI("navbar?" + queryLocale)
        const { attributes: footer } = await fetchAPI("footer?" + queryFooter)
        return {
            props: { navbar, footer, lawyer: lawyer[0] },
        }
    } catch (err) {
        console.log(err);
    }
}