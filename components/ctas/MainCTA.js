import React from 'react'
import Button from '../blocks/Button'
import Section from '../blocks/Section'
import Subtitle from '../blocks/Subtitle'

export default function MainCTA({ locale }) {

    const title = locale.includes('es') ? "Abogados Especialistas en Accidentes Vehiculares" : "Ezequiel Reyna Law Office";    
    const cta = locale.includes('es') ? "Obten una cosulta gratis" : "Get a free consultation";    
    return (
        <Section bg='bg-gray-900'>
            <div className="grid lg:grid-cols-5 content-center lg:gap-16 text-white">
                <div className='col-start-2 col-span-3 space-y-5 text-center'>
                    <Subtitle><span className="text-white">{title}</span></Subtitle>
                    {
                        locale.includes('es')
                            ?
                            <p><b>¿Listo para su consulta gratuita? Nuestro equipo lucha por los heridos.</b> ¡No pagas nada hasta que ganemos! Llena el formulario para comenzar.</p>
                            :
                            <p><b>Ready for your Free Consultation? Our team fights for the injured.</b> You don’t pay anything until we win! Fill out the form below to get started.</p>
                    }
                    <br />
                    <a href="#contact" className='mt-10'>
                        <Button>{cta}</Button>
                    </a>
                </div>
            </div>
        </Section>
    )
}
