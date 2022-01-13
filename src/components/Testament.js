import { motion } from 'framer-motion';
import Book from './Book'

export default function Testament({ testament }) {
  const bookWidth = (chapters) => {
    const totalChapters = (testament === 'ot') ? 929 : 260;
    const remScaler = (testament === 'ot') ? 100 : 70;
    return (`${(chapters / totalChapters) * remScaler}rem`);
  };
  const books = {
    ot: [
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
    ],
    nt: [
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
    ],
  };

  const shelfVariants = {
    together: { width: '12rem', overflowX: 'hidden', backgroundColor: 'rgb(41 37 36)', },
    apart: { width: '75%', /*overflowX: 'scroll',*/ backgroundColor: 'rgb(168 162 158)', },
  };

  const bookVariants = {
    together: { color: 'rgb(41 37 36)', marginLeft: '-1rem', marginRight: '-1rem', },
    apart: { color: 'rgb(168 162 158)', marginLeft: '0.2rem', marginRight: '0.2rem', },
  };

  return (
    <div className="flex flex-row justify-center items-center py-16 px-8 gap-6">
      <motion.div
        initial="together" animate="apart"
        variants={shelfVariants} transition={{ duration: 1.5 }}
        className="flex flex-row justify-start h-80 rounded-3xl"
      >
        {/* render books from books.[ot/nt] array */}
        {books.ot.map((book, index) => {
          return (
            <motion.div key={index} variants={bookVariants} transition={{ duration: 1.5 }}>
              <Book width={bookWidth(book.chapters)} title="Old Testament" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}