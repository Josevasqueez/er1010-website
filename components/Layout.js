import Head from "next/head";
import Script from "next/script";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ children, seo, navigation, footer, dark = false, landing = false }) {
    const { metaTitle, metaDescription } = seo;
    return (
        <div>
            <Head>
                <title>{metaTitle} - ER1010</title>
                <meta name="description" content={metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="google-site-verification" content="sa3zDvEK6zUHNbflM4jKlP_6wrXYe-fvcTDhbEMFbJ0" />
                <meta name="facebook-domain-verification" content="344802fh7gb8d4dcwq13up0bi5pgt5" />

            </Head>
            <Script id="google-tag-manager" dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PNFD3JB');`}} />
            <Script id="facebook-pixel" dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '629334045055055');
                    fbq('track', 'PageView');`}} />
            <noscript dangerouslySetInnerHTML={{
                __html: `<img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=629334045055055&ev=PageView&noscript=1"
                    />`}}>
            </noscript>
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
                <>
                    <noscript dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PNFD3JB"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}>
                    </noscript>
                    <script dangerouslySetInnerHTML={{
                        __html: `var script = document.createElement('script');
                        script.async = true; script.type = 'text/javascript';
                        var target = 'https://www.clickcease.com/monitor/stat.js';
                        script.src = target;var elem = document.head;elem.appendChild(script);`}}>
                    </script>
                    <noscript dangerouslySetInnerHTML={{
                        __html: `<a href='https://www.clickcease.com' rel='nofollow'><img src='https://monitor.clickcease.com/stats/stats.aspx' alt='ClickCease'/></a>`
                    }}>
                    </noscript>
                    <Footer content={footer} />
                </>
            }
        </div >
    )
}
