import { useEffect } from 'react';
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import AOS from 'aos';
import 'aos/dist/aos.css';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    AOS.init();
  }, [])
  

  return (
    <>
      <NextNProgress color="#fbbf24" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
