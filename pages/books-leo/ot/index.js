import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftIcon } from '@heroicons/react/solid'

export default function OT() {
  // book animation variables
  const bookWidth = (chapters) => {
    const totalChapters = 929;
    const remScaler = 100;
    return (`${(chapters / totalChapters) * remScaler}rem`);
  };
  const books = [
    { name: 'Genesis', chapters: '50' },
    { name: 'Exodus', chapters: '40' },
    { name: 'Leviticus', chapters: '27' },
    { name: 'Numbers', chapters: '36' },
    { name: 'Deuteronomy', chapters: '34' },
    { name: 'Joshua', chapters: '24' },
    { name: 'Judges', chapters: '21' },
    { name: 'Ruth', chapters: '4' },
    { name: '1 Samuel', chapters: '31' },
    { name: '2 Samuel', chapters: '24' },
    { name: '1 Kings', chapters: '22' },
    { name: '2 Kings', chapters: '25' },
    { name: '1 Chronicles', chapters: '29' },
    { name: '2 Chronicles', chapters: '36' },
    { name: 'Ezra', chapters: '10' },
    { name: 'Nehemiah', chapters: '13' },
    { name: 'Esther', chapters: '10' },
    { name: 'Job', chapters: '42' },
    { name: 'Psalms', chapters: '150' },
    { name: 'Proverbs', chapters: '31' },
    { name: 'Ecclesiastes', chapters: '12' },
    { name: 'Song of Solomon', chapters: '8' },
    { name: 'Isaiah', chapters: '66' },
    { name: 'Jeremiah', chapters: '52' },
    { name: 'Lamentations', chapters: '5' },
    { name: 'Ezekiel', chapters: '48' },
    { name: 'Daniel', chapters: '12' },
    { name: 'Hosea', chapters: '14' },
    { name: 'Joel', chapters: '3' },
    { name: 'Amos', chapters: '9' },
    { name: 'Obadiah', chapters: '1' },
    { name: 'Jonah', chapters: '4' },
    { name: 'Micah', chapters: '7' },
    { name: 'Nahum', chapters: '3' },
    { name: 'Habakkuk', chapters: '3' },
    { name: 'Zephaniah', chapters: '3' },
    { name: 'Haggai', chapters: '2' },
    { name: 'Zechariah', chapters: '14' },
    { name: 'Malachi', chapters: '4' },
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
        <title>Old Testament</title>
      </Head>

      <main>
        <div className="relative min-h-screen bg-gray-400 text-gray-700">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial={{ gap: '1.5rem' }} animate={{ gap: '0rem' }} exit={{ gap: '1.5rem' }} transition={{ duration: duration }}
              className="flex flex-row justify-center py-16"
            >
              {/* OT bookshelf */}
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  initial="together" animate="apart" exit="together"
                  variants={shelfVariants} transition={{ duration: duration }}
                  className="flex flex-row justify-start h-80 rounded-3xl"
                >
                  {/* render books from books object */}
                  {books.map((book, index) => {
                    return (
                      <AnimatePresence exitBeforeEnter key={index}>
                        <motion.div
                          variants={bookVariants} transition={{ duration: duration }}
                          className="flex shrink-0 justify-center items-center min-w-[1.5rem] h-80 rounded-3xl bg-gray-900 text-gray-400 text-xl text-center font-serif"
                          style={{ width: bookWidth(book.chapters) }}
                        >
                          <div className="rotate-90 whitespace-nowrap">{book.name}</div>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* invisible NT placeholder */}
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  initial={{ width: '12rem' }} animate={{ width: '0rem' }} exit={{ width: '12rem' }} transition={{ duration: duration }}
                  className="w-48 h-80 bg-transparent"
                ></motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

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
