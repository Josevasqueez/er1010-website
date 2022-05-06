export default function Subtitle({ children }) {
    return (
        <h2 className='text-slate-900 text-3xl lg:text-5xl'>{children}<span className="text-red-500">.</span></h2>
    )
}
