export default function Title({ children, black = false }) {
    return (
        <h1 className={`font-medium text-4xl lg:text-5xl xl:text-6xl ${black && `text-slate-900`}`}>{children}<span className="text-red-500">.</span></h1>
    )
}
