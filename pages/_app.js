import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#fbbf24" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
