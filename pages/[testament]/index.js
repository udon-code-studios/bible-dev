// file: pages/[testament]/index.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getCollection } from '/lib/mongodb';
import Book from '/components/Book';
import Footer from '/components/Footer';
import Timeline from '/components/Timeline';

// TODO('add description')
export default function Page({ books }) {
  // get testament from URL
  const router = useRouter();
  const { testament } = router.query;

  // TODO('add description')
  const bookWidth = (chapters) => {
    const totalChapters = (testament === 'old') ? 929 : 260;
    const remScaler = (testament === 'old') ? 100 : 70;
    return (`${(chapters / totalChapters) * remScaler}rem`);
  };

  // set motion varients
  const variants = {
    shelf: {
      together: { backgroundColor: 'rgb(41 37 36)', },
      apart: { width: '75%', backgroundColor: 'rgb(168 162 158)', },
    },
    book: {
      together: { color: 'rgb(41 37 36)', marginLeft: '-1rem', marginRight: '-1rem', },
      apart: { color: 'rgb(168 162 158)', marginLeft: '0.2rem', marginRight: '0.2rem', },
    }
  }

  return (
    <>
      <Head>
        <title>{(testament === 'old') ? 'Old Testament' : 'New Testament'}</title>
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
            </div>

            {/* shelf */}
            <div className="flex flex-row justify-center items-center py-10 px-8 gap-6">
              <motion.div
                initial="together" animate="apart"
                variants={variants.shelf} transition={{ duration: 1.5 }}
                className="flex flex-row justify-start rounded-3xl pb-1 w-48 overflow-x-auto scrollbar-light"
                style={{ width: ((testament === 'old') ? '14rem' : '10rem') }}
              >

                {/* render books from books prop */}
                {books.filter(book => book.testament === testament).map((book, index) => {
                  return (
                    <motion.div key={index} variants={variants.book} transition={{ duration: 1.5 }}
                    >
                      <Link href={`/${testament}/${book.name.toLowerCase()}`}>
                        <a>
                          <Book width={bookWidth(book.chapters)} title={book.name} />
                        </a>
                      </Link>
                    </motion.div>
                  );
                })}

              </motion.div>
            </div>

            {/* timeline 
            <div className="w-screen overflow-x-auto scrollbar-light">
              <Timeline />
            </div>*/}
          </div>

          {/* footer */}
          <Footer />

        </div>
      </body>
    </>
  );
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export async function getStaticPaths() {
  return {
    paths: [
      { params: { testament: 'old' } },
      { params: { testament: 'new' } },
    ],
    fallback: false,
  };
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps() {
  const books = await getCollection('books', {}, { _id: 0 });
  return {
    props: {
      books: books,
    }
  }
}

//
// end of file: pages/[testament]/index.js
