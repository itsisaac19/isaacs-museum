import '../styles/globals.css'
import { ParallaxProvider } from 'react-scroll-parallax';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
  <ParallaxProvider>
    <Component {...pageProps} />
  </ParallaxProvider>
  )
}