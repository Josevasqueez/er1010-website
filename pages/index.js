const qs = require('qs');
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
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

export default function Home({ content, areas, navbar, footer, testimonials, results, lawyers, locale }) {
  const { title, subtitle, cover, description, seo, sections } = content;

  console.log(areas);

  console.log(results);

  return (
    <Layout seo={seo} navigation={navbar} footer={footer}>
      <Section>
        <div className='max-w-4xl space-y-8'>
          <Title>{title}</Title>
          <p>{description}</p>
          <div>
            <a href="#contact">
              <Button>Consulta Gratis</Button>
            </a>
          </div>
        </div>
      </Section>
      <Section id="cobertura">
        <div className="space-y-2 md:text-center" data-aos-duration="1000" data-aos="fade-in">
          <Subtitle>{sections[0].title}</Subtitle>
          <Partnertitle>{sections[0].subtitle}</Partnertitle>
        </div>
        <div className="mt-16">
          {
            areas.filter(i => [5, 14, 18].includes(i.id)).map(area => (
              <div key={area.id} className="mt-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded px-6 py-4 font-medium focus:outline-none border">
                        {/* <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"> */}
                        {area.attributes.Title}
                        <ChevronUpIcon
                          className={`${open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-red-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-6 bg-gray-50 rounded text-sm">
                        <ReactMarkdown>
                          {area.attributes.Description}
                        </ReactMarkdown>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))
          }
        </div>
      </Section>
      <Section id="equipo">
        <div className="grid lg:grid-cols-2 gap-10 md:items-center">
          <div className='grid grid-cols-3 md:p-10' data-aos-duration="1000" data-aos="fade-in">
            {
              lawyers.map(law => {
                console.log(law);
                return (
                  <div key={law.id} className="aspect-w-1 aspect-h-1 overflow-hidden relative">
                    <Image alt="" src={getImage(law.attributes.Avatar.data.attributes.url)} layout="responsive" width="100" height="100" objectFit='cover' />
                  </div>
                )
              })
            }
          </div>
          <div className="space-y-2" data-aos-duration="1000" data-aos="fade-in">
            <Subtitle>{sections[1].title}</Subtitle>
            <Partnertitle>{sections[1].subtitle}</Partnertitle>
            <br />
            <ReactMarkdown>{sections[1].content}</ReactMarkdown>
          </div>
        </div>
      </Section>
      <Section>
        <div className="space-y-2 md:text-center" data-aos-duration="1000" data-aos="fade-in">
          <Subtitle>{sections[2].title}</Subtitle>
          <Partnertitle>{sections[2].subtitle}</Partnertitle>
        </div>
        <div className="space-y-5 md:space-y-0 md:flex mt-16 gap-10 justify-center" data-aos-duration="1000" data-aos="fade-in">
          <div className="bg-gray-100 p-10 rounded">
            <h4 className='mb-2'>Más de</h4>
            <span className='text-4xl md:text-5xl font-bold'>{results.length}</span>
            <h3 className='mt-2'>Casos Resueltos</h3>
            <span>en los últimos meses.</span>
          </div>
          <div className="bg-gray-800 text-white p-10 rounded">
            <h4 className='mb-2'>Un aproximado de </h4>
            <span className='text-4xl md:text-5xl font-bold'>${new Intl.NumberFormat('en-US').format(results.reduce((a, c) => a + c.attributes.compensation, 0))}</span>
            <h3 className='mt-2'>En compensaciones</h3>
            <span>de nuestros grandes casos.</span>
          </div>
        </div>
      </Section>
      <Section id="testimonios">
        <div className="space-y-2" data-aos-duration="1000" data-aos="fade-in">
          <Subtitle>{sections[3].title}</Subtitle>
          <Partnertitle>{sections[3].subtitle}</Partnertitle>
        </div>
        <div className="mt-16 flex overflow-x-auto gap-10 pb-10 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
          {
            testimonials.map(t => (
              <div key={t.id} className="relative flex-shrink-0 w-5/6 sm:w-96 overflow-hidden p-8 rounded shadow-2xl shadow-gray-200" data-aos-duration="1000" data-aos="fade-in">
                <p className='mb-8 line-clamp-6 text-sm'>{t.attributes.content}</p>
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
  const { attributes: content } = await fetchAPI("homepage-er-1010?" + query)



  const areas = await fetchAPI("areas?" + queryLocale)
  const lawyers = await fetchAPI("lawyers?" + queryLocale)
  const results = await fetchAPI("results?" + queryLocale)
  const testimonials = await fetchAPI("testimonials?" + queryLocale)
  const { attributes: navbar } = await fetchAPI("navbar-er-1010?" + queryLocale)
  const { attributes: footer } = await fetchAPI("footer-er-1010?" + queryFooter)
  return {
    props: { content, navbar, footer, areas, testimonials, results, lawyers, locale },
    // props: { content, areas, navbar, footer, testimonials, locale },
  }
}
