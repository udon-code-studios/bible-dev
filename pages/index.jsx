import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Book from '/components/Book';

// TODO: add description
export default function Page() {

  const [view, setView] = useState('home'); // home, ot, nt
  const router = useRouter(); // used to change routing programmatically

  // TODO: add description
  const selectTestament = (testament) => {
    setView(testament);
    setTimeout(() => { router.push(`/${testament}`) }, 1000) // allow 1s to transpire before navigating to the next page
  }

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const overviewVarients = {
    show: { opacity: 1 },
    hide: { x: -1500 },
  }

  const otVarients = {
    show: { opacity: 1 },
    hide: { x: -1500 },
  }

  const ntVarients = {
    show: { opacity: 1 },
    hide: { x: 1500 },
  }

  const sizeVarients = {
    show: { opacity: 1 },
    hide: { opacity: 0, width: 0, height: 0 },
  }

  return (
    <>
      <Head>
        <title>BibleDev</title>
        <meta name="description" content="<placeholder description>"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
				<meta name="msapplication-TileColor" content="#da532c"/>
				<meta name="theme-color" content="#ffffff"/>
      </Head>

      <main>
        {/* header */}
        <div className="grid grid-flow-col justify-center py-4">
          <Link href="/">
            <a>
              <div className="flex items-center gap-4 text-4xl font-semibold">
                <img src="/bible.png" alt="bible" className="w-16 h-16" />
                <h1>BibleDev</h1>
              </div>
            </a>
          </Link>
        </div>

        <motion.div
          initial="hidden" animate="visible"
          variants={opacityVariants} transition={{ duration: 1 }}
        >
          <div className="flex justify-center items-center py-16 px-8 overflow-hidden">

            {/* overview text */}
            <motion.div
              animate={(view === 'home') ? 'show' : 'hide'}
              variants={overviewVarients} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="space-y-1"
            >
              <motion.div variants={sizeVarients} transition={{ duration: 0.7 }}>
                <h1 className="text-3xl font-serif font-bold">The Bible</h1>
                <p className="max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </motion.div>
            </motion.div>

            {/* spacer */}
            <motion.div variants={sizeVarients} transition={{ duration: 0.7 }} className="w-8"></motion.div>

            {/* old testament */}
            <motion.button
              animate={(view === 'home') ? 'show' : (view === 'ot') ? 'show' : 'hide'}
              variants={otVarients} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="text-stone-400" onClick={() => selectTestament('ot')}
            >
              <motion.div variants={sizeVarients} transition={{ duration: 0.7 }}>
                <Book width="14rem" title="Old Testament" />
              </motion.div>
            </motion.button>

            {/* spacer */}
            <motion.div variants={sizeVarients} transition={{ duration: 0.7 }} className="w-6"></motion.div>

            {/* new testament */}
            <motion.button
              animate={(view === 'home' || view === 'nt') ? 'show' : 'hide'}
              variants={ntVarients} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="text-stone-400" onClick={() => selectTestament('nt')}
            >
              <motion.div variants={sizeVarients} transition={{ duration: 0.7 }}>
                <Book width="10rem" title="New Testament" />
              </motion.div>
            </motion.button>

          </div>
        </motion.div>
      </main>
    </>
  )
}
