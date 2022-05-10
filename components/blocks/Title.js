export default function Title({ children, black = false }) {
    return (
        <h1 className={`text-4xl lg:text-5xl xl:text-6xl ${black && `text-gray-900`}`}>{children}</h1>
    )
}
