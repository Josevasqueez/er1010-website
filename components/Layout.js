import Head from "next/head";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ children, seo, navigation, footer, dark = false, landing = false }) {
    const { metaTitle, metaDescription } = seo;
    return (
        <div>
            <Head>
                <title>{metaTitle} - Ezequiel Reyna Law Office</title>
                <meta name="description" content={metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {
                !landing
                &&
                <Navigation content={navigation} dark={dark} />
            }
            <main>
                {children}
            </main>
            {
                !landing
                &&
                <Footer content={footer} />
            }
        </div>
    )
}
