const qs = require('qs');
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { fetchAPI, getImage } from '../lib/api';
import Layout from '../components/Layout';
import Section from '../components/blocks/Section';
import Title from '../components/blocks/Title';
import Subtitle from '../components/blocks/Subtitle';
import Partnertitle from '../components/blocks/Partnertitle';
import Button from '../components/blocks/Button';
import MainCTA from '../components/ctas/MainCTA';

export default function Home({ content, areas, navbar, footer, testimonials, locale }) {
  const { title, subtitle, cover, description, seo, sections } = content;
  return (
    <Layout seo={seo} navigation={navbar} footer={footer} dark={true}>
      <Section no={true} bg="bg-gradient-to-b from-slate-900 to-[#011747]">
        <div className="grid md:grid-cols-2 items-center">
          <div className='space-y-5 text-white py-20 md:py-0'>
            <Title>{title}</Title>
            <Partnertitle main={true}>{subtitle}</Partnertitle>
            <p>{description}</p>
          </div>
          <div>
            <Image priority={true} alt="ezequiel reyna" src={getImage(cover.data.attributes.url)} height="100%" width="100%" layout="responsive" objectFit='contain' />
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid lg:grid-cols-3 lg:gap-16 space-y-5 lg:space-y-0">
          <div className='space-y-2'>
            <Subtitle>{sections[0].title}</Subtitle>
            <Partnertitle>{sections[0].subtitle}</Partnertitle>
          </div>
          <div className='col-span-2 space-y-5'>
            <ReactMarkdown>{sections[0].content}</ReactMarkdown>
            <div></div>
            <a href="#contact">
              <Button>{sections[0].action.text}</Button>
            </a>
          </div>
        </div>
      </Section>
      <Section bg="bg-slate-50">
        <div className="grid lg:grid-cols-2 lg:gap-16">
          <div className='space-y-5'>
            <div className="space-y-2">
              <Subtitle>{sections[1].title}</Subtitle>
              <Partnertitle>{sections[1].subtitle}</Partnertitle>
            </div>
            <p className='md:hidden'>{sections[1].content}</p>
          </div>
        </div>
        <div className="mt-16 flex overflow-x-auto gap-10 pb-10 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-300">
          {
            areas?.map(area => (
              <div key={area.id} className="relative flex-shrink-0 w-5/6 sm:w-96 rounded overflow-hidden">
                <Image alt="" src={getImage(area.attributes.Cover.data.attributes.url)} height="50" width="100%" layout="responsive" objectFit='cover' />
                <div className='bg-white p-10'>
                  <h3 className='text-xl font-bold mb-5'>{area.attributes.Title}</h3>
                  <p className='line-clamp-3 mb-5'>{area.attributes.Description}</p>
                  <Link href="/practice-areas">
                    <a className='font-semibold text-amber-500 hover:text-amber-600'>{locale.includes("es") ? "Ver más" : "Read More"}</a>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </Section>
      <MainCTA locale={locale} />
      <Section bg="bg-slate-50">
        <div className="text-center">
          <div className='space-y-2'>
            <Subtitle>{sections[3].title}</Subtitle>
            <Partnertitle>{sections[3].subtitle}</Partnertitle>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-16">
          {
            testimonials.map(t => (
              <div key={t.id} className="p-8 rounded bg-white shadow-2xl shadow-slate-200">
                <p className='mb-8 line-clamp-5 text-xs'>{t.attributes.content}</p>
                <div className='flex space-x-4 items-center'>
                  <div className="h-10 w-10 rounded-full overflow-hidden blur-sm">
                    <Image alt="avatar" src={`https://i.pravatar.cc/50?u=${t.id}`} height="100%" width="100%" layout="responsive" objectFit='contain' />
                  </div>
                  <h4 className='text-sm font-semibold'>{t.attributes.autor}</h4>
                </div>
              </div>
            ))
          }
        </div>
      </Section>
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="max-w-md mx-auto">
              <Image alt="" src={getImage(sections[2].media.data[0].attributes.url)} height="100%" width="100%" layout="responsive" objectFit='contain' />
            </div>
          </div>
          <div className='space-y-5'>
            <div className="space-y-2">
              <Subtitle>{sections[2].title}</Subtitle>
              <Partnertitle>{sections[2].subtitle}</Partnertitle>
            </div>
            <ReactMarkdown>{sections[2].content}</ReactMarkdown>
          </div>
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

  const query = qs.stringify({
    locale: locale.includes('es') ? 'es-MX' : 'en',
    populate: ['sections', 'seo', 'cover', 'sections.action', 'sections.media'],
  }, {
    encodeValuesOnly: true,
  });
  const { attributes: content } = await fetchAPI("homepage?" + query)



  const areas = await fetchAPI("areas?" + queryLocale)
  const testimonials = await fetchAPI("testimonials?" + queryLocale)
  const { attributes: navbar } = await fetchAPI("navbar?" + queryLocale)
  const { attributes: footer } = await fetchAPI("footer?" + queryFooter)
  return {
    props: { content, areas, navbar, footer, testimonials, locale },
  }
}
