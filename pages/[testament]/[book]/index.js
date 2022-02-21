// file: pages/[testament]/[book]/index.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getCollection } from '/lib/mongodb';
import { ArrowSmUpIcon } from '@heroicons/react/outline';
import ReactMarkdown from 'react-markdown';
import Footer from '/components/Footer';

// TODO('add description')
export default function Page({ prev, devHistory, next }) {
  // get book title from URL
  const router = useRouter();
  const { book } = router.query;

  // capitalizes first letter of each word in 'str'
  function capitalize(str) {
    return str.replace(new RegExp('\\b\\w', 'g'), (c) => c.toUpperCase());
  }

  // set motion variants
  const variants = {
    opacity: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  }

  return (
    <>
      <Head>
        <title>{book && capitalize(book)}</title>
      </Head>

      <main>
        <div className="relative flex flex-col justify-between min-h-screen bg-stone-900 text-stone-400 font-serif">

          {/* header and main content (motion: fade-in on load) */}
          <motion.div
            initial="hidden" animate="visible"
            variants={variants.opacity} transition={{ duration: 1 }}
          >

            {/* header */}
            <div className="flex items-center justify-between mx-8 py-6">
              <Link href="/">
                <a>
                  <div className="flex items-center">
                    <ArrowSmUpIcon className="h-10" />
                    <p className="font-sans font-bold text-xl">Home</p>
                  </div>
                </a>
              </Link>

              <Link href="/">
                <a>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image src="/bible_stone-400.png" alt="bible" layout="fill" />
                    </div>
                    <p className="font-sans font-bold text-xl">BibleDev</p>
                  </div>
                </a>
              </Link>
            </div>

            {/* books TODO('is this the best way to do it's height?') */}
            <div className="flex flex-grow my-4 max-h-[70vh]">

              {/* previous book */}
              {(prev) ?
                <div className="flex flex-col justify-center">
                  <Link href={`/${prev.testament.toLowerCase()}/${prev.name.toLowerCase()}`}>
                    <a className='block w-20 h-5/6'>
                      <div className="flex justify-center items-center min-h-full rounded-r-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{prev.name}</div>
                      </div>
                    </a>
                  </Link>
                </div>
                :
                <div className="w-24 bg-stone-900"></div>
              }

              {/* current book */}
              <div className="flex flex-grow justify-center mx-8 border-8 border-stone-400 rounded-3xl">
                <div className="flex flex-col m-12 max-w-3xl">
                  <div className="flex mb-10 justify-between items-end">
                    <h1 className="capitalize text-5xl">{book}</h1>
                    <h1 className="text-2xl">900 BC - 700 BC</h1>
                  </div>
                  <div className="space-y-4 overflow-y-auto scrollbar-dark">
                    {/* Render as markdown */}
                    <ReactMarkdown
                      components={{
                        // bypass some default tailwind stuff
                        h1: ({ node, ...props }) => <span className="text-6xl" {...props}></span>,
                        h2: ({ node, ...props }) => <span className="text-5xl" {...props}></span>,
                        h3: ({ node, ...props }) => <span className="text-4xl" {...props}></span>,
                        h4: ({ node, ...props }) => <span className="text-3xl" {...props}></span>,
                        h5: ({ node, ...props }) => <span className="text-2xl" {...props}></span>,
                        h6: ({ node, ...props }) => <span className="text-xl" {...props}></span>,
                        // use next Link instead of <a>
                        a: ({ node, ...props }) => (
                          <Link href = { props.href }>
                            <a className="underline hover:text-blue-600">
                              {props.children[0]}
                            </a>
                          </Link>
                        )
                      }}
                    >
                      { devHistory.description }
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* next book */}
              {(next) ?
                <div className="flex flex-col justify-center">
                  <Link href={`/${next.testament.toLowerCase()}/${next.name.toLowerCase()}`}>
                    <a className='block w-20 h-5/6'>
                      <div className="flex justify-center items-center min-h-full rounded-l-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{next.name}</div>
                      </div>
                    </a>
                  </Link>
                </div>
                :
                <div className="w-24 bg-stone-900"></div>
              }
            </div>

            {/* timeline goes here */}

          </motion.div>

          {/* footer */}
          <Footer />

        </div>
      </main>
    </>
  );
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
export async function getStaticPaths() {
  const data = await getCollection('books', {}, { _id: 0, name: 1, testament: 1 });
  const paths = data.map(book => {
    return ({
      params: {
        testament: book.testament.toLowerCase(),
        book: book.name.toLowerCase(),
      }
    })
  });

  return {
    paths: paths,
    fallback: false,
  };
}

// Next docs: https://nextjs.org/docs/api-reference/data-fetching/get-static-props
export async function getStaticProps({ params }) {
  // pull book development history entries matching book parameter
  let devHistory = await getCollection('devHistory', { name: { $regex: new RegExp(`${params.book}`), $options: 'i' } });
  devHistory = devHistory[0]; // convert devHistory from 1 item array to object

  // pull list of book names and testaments
  const bookList = await getCollection('books', {}, { _id: 0, name: 1, testament: 1 });

  // extract previous and next books from bookList if they exist
  const idx = bookList.findIndex((book) => book.name === devHistory.name);
  const prev = (idx > 0) ? bookList[idx - 1] : null;
  const next = (idx < bookList.length - 1) ? bookList[idx + 1] : null;

  return ({
    props: {
      prev: prev,
      devHistory: devHistory,
      next: next,
    },
  });
}

//
// end of file: pages/[testament]/[book]/index.js
