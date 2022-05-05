export default function Section({ children, no = false, bg = "bg-white", image = null, full = false, centered = false }) {
    return (
        <section
            style={{ backgroundImage: image && "url(" + image + ")", backgroundSize: 'cover', backgroundPosition: "center" }}
            className={`${no ? "" : "py-20 lg:py-32"} ${bg} ${full ? "h-screen" : ''} ${centered ? "flex items-center" : ''}`}
        >
            <div className="container mx-auto px-5 md:px-16">
                {children}
            </div>
        </section >
    )
}
