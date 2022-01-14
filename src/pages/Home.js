import { motion } from 'framer-motion';
import Book from '../components/Book'
import Header from '../components/Header';

export default function Home() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      initial="hidden" animate="visible"
      variants={variants} transition={{ duration: 1 }}
    >
      <Header />
      <div
        className="flex flex-row justify-center items-center py-16 px-8 gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold">The Bible</h1>
          <p className="pr-3 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="text-stone-400"><Book width="14rem" title="Old Testament" /></div>
        <div className="text-stone-400"><Book width="10rem" title="New Testament" /></div>
      </div>
    </motion.div>
  );
}