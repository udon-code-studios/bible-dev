// file: pages/index.js

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Book from '/components/Book';
import SearchBar from '/components/SearchBar';
import Footer from '/components/Footer';

// TODO('add description')
export default function Page({ books }) {
  const [view, setView] = useState('home'); // states: 'home', 'old', 'new'
  const router = useRouter(); // used to change routing programmatically

  // QUESTION('is this necessary?')
  // if routed from not root page, change url to /
  //useEffect(() => router.push('/'), []);

  // TODO('add description')
  const selectTestament = (testament) => {
    setView(testament);
    setTimeout(() => { router.push(`/${testament}`) }, 1000) // allow 1s to transpire before navigating to the next page
  }

  // set motion varients
  const variants = {
    opacityVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    overviewVariants: {
      show: { opacity: 1 },
      hide: { x: -1500 },
    },
    otVariants: {
      show: { opacity: 1 },
      hide: { x: -1500 },
    },
    ntVariants: {
      show: { opacity: 1 },
      hide: { x: 1500 },
    },
    sizeVariants: {
      show: { opacity: 1, },
      hide: { opacity: 0, width: 0, height: 0 },
    },
    spacerVariants: {
      show: { width: '1.5rem' },
      hide: { width: 0 },
    },
  }

  // spacer component which shrinks on view animation
  function ShrinkingSpacer() {
    return (
      <motion.div
        initial="show"
        animate={(view === 'home') ? 'show' : 'hide'}
        variants={variants.spacerVariants}
        transition={{ delay: 0.3, duration: 0.7 }}
      ></motion.div>
    );
  }

  return (
    <>
      <Head>
        <title>BibleDev</title>
        <meta name="description" content="<placeholder description>" />
        <link rel="icon" href="/bible.png" />
      </Head>

      <body>
        <div className="relative flex flex-col justify-between min-h-screen bg-stone-400 text-stone-900">

          {/* header and main content */}
          <div>
            {/* header */}
            <div className="grid grid-flow-col justify-center py-4">
              <Link href="/">
                <a>
                  <div className="flex items-center gap-4 text-4xl font-semibold">
                    <div className="w-16 h-16 relative">
                      <Image src="/bible.png" alt="bible" layout="fill" />
                    </div>
                    <h1>BibleDev</h1>
                  </div>
                </a>
              </Link>
              <SearchBar books={books} />
            </div>

            <motion.div
              initial="hidden" animate="visible"
              variants={variants.opacityVariants} transition={{ duration: 1 }}
            >
              <div className="flex justify-center items-start py-14 px-8 overflow-hidden">

                {/* overview text */}
                <motion.div
                  animate={(view === 'home') ? 'show' : 'hide'}
                  variants={variants.overviewVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
                >
                  <motion.div
                    variants={variants.sizeVariants} transition={{ duration: 0.7 }}
                    className="max-w-sm space-y-2 text-justify"
                  >
                    <h1 className="text-3xl text-center font-serif font-bold">The Bible</h1>
                    <p>
                      is a collection of scriptures held sacred by Christians, Jews, and Muslims around the globe.  With
                      the earliest entry theorized to date back into the 2nd milenium BC, and the latest being authored
                      by 110 AD, the Bible is a work that has experienced a long and storied history as passed through
                      the hands of many authors and redactors.
                    </p>
                    <p>
                      BibleDev is a community driven effort to explore and document the development history of each book
                      through the ages. Who was Job? How long after Daniel was thrown into the Lions' den
                      was his story recorded? When did the canonical gospels solidify into the texts we have today?
                      These are the sorts of questions we hope you can find answers for as you explore and read the
                      entries in this site.
                    </p>
                  </motion.div>
                </motion.div>

                {/* spacer */}
                <ShrinkingSpacer />

                {/* old testament */}
                <motion.button
                  animate={(view === 'home') ? 'show' : (view === 'old') ? 'show' : 'hide'}
                  variants={variants.otVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
                  className="text-stone-400" onClick={() => selectTestament('old')}
                >
                  <motion.div variants={variants.sizeVariants} transition={{ duration: 0.7 }}>
                    <Book width="14rem" title="Old Testament" />
                  </motion.div>
                </motion.button>

                {/* spacer */}
                <ShrinkingSpacer />

                {/* new testament */}
                <motion.button
                  animate={(view === 'home' || view === 'new') ? 'show' : 'hide'}
                  variants={variants.ntVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
                  className="text-stone-400" onClick={() => selectTestament('new')}
                >
                  <motion.div variants={variants.sizeVariants} transition={{ duration: 0.7 }}>
                    <Book width="10rem" title="New Testament" />
                  </motion.div>
                </motion.button>

              </div>
            </motion.div>
          </div>

          {/* footer */}
          <Footer />

        </div>
      </body>
    </>
  )
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps() {
  // load list of book names and testaments
  let books = require('/data/books.json');

  return {
    props: {
      books: books
    }
  };
}

//
// end of file: pages/index.js