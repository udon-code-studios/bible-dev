
import { useRef } from 'react';

// file: pages/[testament]/index.js
  
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getCollection } from '/lib/mongodb';
import Book from '/components/Book';
import Timeline from '/components/Timeline';
import mongo from '/lib/mongodb';

// TODO: add description
export default function Page({ booksData, timeSpans, dates }) {
  // get testament from router
  const router = useRouter();
  const { testament } = router.query;

	// ref for scrolling vertically -> horiziontally.
	const scrollRef = useRef(null);

	if (router.isFallback) {
    return <div>Loading...</div>
  }
	
  const initialWidth = (testament === 'old') ? '14rem' : '10rem';


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
  const varients = {
    shelf: {
      together: { overflowX: 'hidden', backgroundColor: 'rgb(41 37 36)', },
      apart: { width: '75%', /*overflowX: 'scroll',*/ backgroundColor: 'rgb(168 162 158)', },
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

      <main>
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

        <div className="flex flex-row justify-center items-center py-16 px-8 gap-6">
          <motion.div
            initial="together" animate="apart"
						ref = { scrollRef }
            variants={shelfVariants} transition={{ duration: 1.5 }}
            className="flex flex-row justify-start h-80 rounded-3xl w-48 force-overflow scrollbar-light"
            style={{ width: initialWidth }}
						onWheel = {
							(e) => {
								e.currentTarget.scrollLeft += e.deltaY + e.deltaX;
							}
						}
            variants={varients.shelf} transition={{ duration: 1.5 }}
            className="flex flex-row justify-start h-80 rounded-3xl w-48 force-overflow scrollbar-light"
            style={{ width: ((testament === 'old') ? '14rem' : '10rem') }}
          >

            {/* render books from books prop */}
            {books.filter(book => book.testament === testament).map((book, index) => {
              return (
                <motion.div key={index} variants={varients.book} transition={{ duration: 1.5 }}>
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
        <div
          className = 'w-screen overflow-x-auto overflow-y-visible nobar'
          onWheel = {
            (e) => {
              e.currentTarget.scrollLeft += e.deltaY + e.deltaX;
            }
          }
        >
  				<Timeline spans = { timeSpans } dates = { dates }/>
        </div>
      </main>
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
  const timeSpans = [
    { from: -687, to: -587, name: 'book -687' },
    { from: 528, to: 628, name: 'book 528' },
    { from: -1732, to: -1632, name: 'book -1732' },
    { from: -1750, to: -1650, name: 'book -1750' },
    { from: 189, to: 289, name: 'book 189' },
    { from: 383, to: 483, name: 'book 383' },
    { from: -1261, to: -1161, name: 'book -1261' },
    { from: 287, to: 387, name: 'book 287' },
    { from: -924, to: -824, name: 'book -924' },
    { from: -1870, to: -1770, name: 'book -1870' },
    { from: -1664, to: -1564, name: 'book -1664' },
    { from: -1826, to: -1726, name: 'book -1826' },
    { from: -1402, to: -1302, name: 'book -1402' },
    { from: 836, to: 936, name: 'book 836' },
    { from: -439, to: -339, name: 'book -439' },
    { from: 84, to: 184, name: 'book 84' },
    { from: -608, to: -508, name: 'book -608' },
    { from: -1251, to: -1151, name: 'book -1251' },
    { from: -1134, to: -1034, name: 'book -1134' },
    { from: -1023, to: -923, name: 'book -1023' },
    { from: -1611, to: -1511, name: 'book -1611' },
    { from: 166, to: 266, name: 'book 166' },
    { from: 737, to: 837, name: 'book 737' },
    { from: -738, to: -638, name: 'book -738' },
    { from: -748, to: -648, name: 'book -748' },
    { from: 379, to: 479, name: 'book 379' },
    { from: -666, to: -566, name: 'book -666' },
    { from: -1388, to: -1288, name: 'book -1388' },
    { from: -578, to: -478, name: 'book -578' },
    { from: 627, to: 727, name: 'book 627' },
    { from: -1251, to: -1151, name: 'book -1251' },
    { from: -1313, to: -1213, name: 'book -1313' },
    { from: 486, to: 586, name: 'book 486' },
    { from: -1029, to: -929, name: 'book -1029' },
    { from: -196, to: -96, name: 'book -196' },
    { from: -1897, to: -1797, name: 'book -1897' },
    { from: 675, to: 775, name: 'book 675' },
    { from: -1773, to: -1673, name: 'book -1773' },
    { from: -1028, to: -928, name: 'book -1028' }
  ];
  const dates = [
    { date: 411, name: 'book 411' },
    { date: 544, name: 'book 544' },
    { date: -129, name: 'book -129' },
    { date: -1032, name: 'book -1032' },
    { date: -48, name: 'book -48' },
    { date: -1638, name: 'book -1638' },
    { date: -875, name: 'book -875' },
    { date: 609, name: 'book 609' },
    { date: 48, name: 'book 48' },
    { date: -1487, name: 'book -1487' }
  ];
  const data = await mongo('books');
  return {
    props: {
      booksData: data,
      timeSpans: timeSpans,
      dates: dates,
  const books = await getCollection('books', {}, { _id: 0 });
  return {
    props: {
      books: books,
    },
  };
}

//
// end of file: pages/[testament]/index.js
