import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getCollection } from '/lib/mongodb';
import { ArrowSmUpIcon } from '@heroicons/react/outline';

// TODO: add description
export default function Page({ prev, devHistory, next }) {
  // get book title from URL
  const router = useRouter();
  const { book } = router.query;

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <Head>
        <title>{book && book[0].toUpperCase() + book.slice(1).toLowerCase()}</title>
      </Head>

      <main>
        <div className="relative flex flex-col min-h-screen bg-stone-900 text-stone-400 font-serif">
          <motion.div
            initial="hidden" animate="visible"
            variants={opacityVariants} transition={{ duration: 1 }}
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
                    <img src="/bible_stone-400.png" alt="bible" className="w-10 h-10"></img>
                    <p className="font-sans font-bold text-xl">BibleDev</p>
                  </div>
                </a>
              </Link>
            </div>

            {/* books */}
            <div className="flex flex-grow my-4 w-screen max-h-[calc(100vh-225px)] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

              {/* previous book */}
              {prev ? (
                <div className="flex flex-col justify-center">
                  <Link href={`/${prev.testament.toLowerCase()}/${prev.name.toLowerCase()}`}>
                    <a className='block w-20 h-5/6'>
                      <div className="flex justify-center items-center min-h-full rounded-r-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{prev.name}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              ) :
                <div className="w-24 bg-stone-900"></div>
              }

              {/* current book */}
              <div className="flex flex-grow justify-center mx-8 border-8 border-stone-400 rounded-3xl">
                <div className="flex flex-col m-16 max-w-4xl">
                  <h1 className="mb-10 capitalize text-5xl">{book}</h1>
                  <div className="max-h-[50vh] space-y-4 overflow-y-auto scrollbar-dark">
                    {devHistory.description}
                  </div>
                </div>
              </div>

              {/* next book */}
              {next ? (
                <div className="flex flex-col justify-center">
                  <Link href={`/${next.testament.toLowerCase()}/${next.name.toLowerCase()}`}>
                    <a className='block w-20 h-5/6'>
                      <div className="flex justify-center items-center min-h-full rounded-l-3xl bg-stone-400 text-stone-900 text-3xl">
                        <div className="rotate-90 whitespace-nowrap capitalize">{next.name}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              ) :
                <div className="w-24 bg-stone-900"></div>
              }
            </div>

            {/* timeline */}
            <div className="my-10 h-0 bg-stone-400"></div>

            {/* footer spacer */}
            <div className="h-20"></div>

          </motion.div>
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

  return {
    props: {
      prev: prev,
      devHistory: devHistory,
      next: next,
    },
  };
}