import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/solid'

export default function NT() {
  // book animation variables
  const bookWidth = (chapters) => {
    const totalChapters = 260;
    const remScaler = 70;
    return (`${(chapters / totalChapters) * remScaler}rem`);
  };
  const books = [
    { name: 'Matthew', chapters: '28' },
    { name: 'Mark', chapters: '16' },
    { name: 'Luke', chapters: '24' },
    { name: 'John', chapters: '21' },
    { name: 'Acts', chapters: '28' },
    { name: 'Romans', chapters: '16' },
    { name: '1 Corinthians', chapters: '16' },
    { name: '2 Corinthians', chapters: '13' },
    { name: 'Galatians', chapters: '6' },
    { name: 'Ephesians', chapters: '6' },
    { name: 'Philippians', chapters: '4' },
    { name: 'Colossians', chapters: '4' },
    { name: '1 Thessalonians', chapters: '5' },
    { name: '2 Thessalonians', chapters: '3' },
    { name: '1 Timothy', chapters: '6' },
    { name: '2 Timothy', chapters: '4' },
    { name: 'Titus', chapters: '3' },
    { name: 'Philemon', chapters: '1' },
    { name: 'Hebrews', chapters: '13' },
    { name: 'James', chapters: '5' },
    { name: '1 Peter', chapters: '5' },
    { name: '2 Peter', chapters: '3' },
    { name: '1 John', chapters: '5' },
    { name: '2 John', chapters: '1' },
    { name: '3 John', chapters: '1' },
    { name: 'Jude', chapters: '1' },
    { name: 'Revelation', chapters: '22' },
  ];
  const shelfVariants = {
    together: { width: '12rem', overflow: 'hidden', backgroundColor: 'rgb(17 24 39)', },
    apart: { width: '75%', /*overflowX: 'scroll',*/ backgroundColor: 'rgb(156 163 175)', },
  };
  const bookVariants = {
    together: { color: 'rgb(17 24 39)', marginLeft: '-1rem', marginRight: '-1rem', },
    apart: { color: 'rgb(156 163 175)', marginLeft: '0.2rem', marginRight: '0.2rem', },
  };
  const duration = 1.5;

  return (
    <div>
      <Head>
        <title>New Testament</title>
      </Head>

      <main>
        <div className="relative min-h-screen bg-gray-400">
          <motion.div
            initial={{ gap: '1.5rem' }} animate={{ gap: '0rem' }} transition={{ duration: duration }}
            className="flex flex-row justify-center py-16"
          >
            {/* invisible OT placeholder */}
            <motion.div
              initial={{ width: '12rem' }} animate={{ width: '0rem' }} transition={{ duration: duration }}
              className="w-48 h-80 bg-transparent"
            ></motion.div>

            {/* NT bookshelf */}
            <motion.div
              initial="together" animate="apart"
              variants={shelfVariants} transition={{ duration: duration }}
              className="flex flex-row justify-start h-80 rounded-3xl"
            >
              {/* render books from books object */}
              {books.map((book, index) => {
                return (
                  <motion.div key={index}
                    variants={bookVariants} transition={{ duration: duration }}
                    className="flex shrink-0 justify-center items-center min-w-[1.5rem] h-80 rounded-3xl bg-gray-900 text-gray-400 text-xl text-center font-serif hover:shadow-2xl"
                    style={{ width: bookWidth(book.chapters) }}
                  >
                    <div className="rotate-90 whitespace-nowrap">{book.name}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <Link href="/books-leo">
            <div>
              <ArrowLeftIcon className="w-10 h-10 rounded-full" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
