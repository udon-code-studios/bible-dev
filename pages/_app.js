// file: pages/_app.js

import '../styles/globals.css';
import Footer from '/components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <div className="relative flex flex-col justify-between min-h-screen bg-stone-400 text-stone-900">
      <div className="flex grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

//
// end of file: pages/_app.js
