export default function Section({ id = undefined, children, no = false, bg = "bg-white", image = null, full = false, centered = false }) {
    return (
        <section
            id={id}
            style={{ backgroundImage: image && "url(" + image + ")", backgroundSize: 'cover', backgroundPosition: "center" }}
            className={`${no ? "" : "py-20 lg:py-36"} ${bg} ${full ? "h-screen" : ''} ${centered ? "flex items-center" : ''}`}
        >
            <div className="max-w-7xl mx-auto px-5 md:px-16">
                {children}
            </div>
        </section >
    )
}
