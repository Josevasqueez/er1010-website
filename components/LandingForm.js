import React, { useState } from 'react'
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useForm } from '../hooks/useForm';

export default function LandingForm({ data }) {

    const router = useRouter()
    const [isSubmit, setIsSubmit] = useState(false)
    const [formValues, handleInputChange] = useForm({});
    const { form, last_content, phone } = data;
    const { content, fields, submit, title, toemail } = form

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formValues.botfield) throw new Error("Eres un Bot")
            setIsSubmit(true)

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formValues, toemail, route: router.asPath })
            })

            if (response.status !== 200) throw new Error("Ocurrio un error")
            router.push('/thank-you')

        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmit(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-2xl uppercase text-amber-500'>{title}</h3>
            <a href={`tel:${phone}`} target="_blank" rel="noreferrer" className='text-2xl md:text-3xl font-bold text-amber-500 hover:text-amber-600 transition'>{phone}</a>
            <ReactMarkdown className='mb-8 mt-5'>{content}</ReactMarkdown>
            {
                fields?.map((f, index) => (
                    <Group key={index} label={f.label} type={f.type} id={f.id} placeholder={f.placeholder} required={f.required} handleInputChange={handleInputChange} />
                ))
            }
            <input type="text" name="botfield" id="botfield" placeholder='Don’t fill this out' className='hidden' onChange={handleInputChange} />
            <input type="submit" value={isSubmit ? "..." : submit} disabled={isSubmit} className={`w-full rounded text-white ${isSubmit ? 'bg-slate-700 cursor-wait' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer'} transition px-6 py-4 font-semibold text-sm `} />
            <p className='mt-4 text-amber-500'>{last_content}</p>
        </form>
    )
}

function Group({ label, type, id, placeholder = "", required = false, handleInputChange }) {
    return (
        <div className="mb-2">
            <label className='text-xs'>{label}{required && <span className='text-amber-500 font-bold'>*</span>}</label>
            {
                type === "longtext"
                    ?
                    <textarea onChange={handleInputChange} id={id} name={id} placeholder={placeholder} className='text-slate-800 rounded border-b border-slate-200 w-full p-3 focus:outline-none focus:border-slate-400' />
                    :
                    <input onChange={handleInputChange} type={type} id={id} name={id} placeholder={placeholder} required={required} className='text-slate-800 rounded border-b border-slate-200 w-full p-3 focus:outline-none focus:border-slate-400' />
            }
        </div>
    )
}