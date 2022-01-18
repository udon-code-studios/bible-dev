import '../styles/globals.css';
import Footer from '/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-stone-400 text-stone-900">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp
