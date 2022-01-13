import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Bible() {
  // what the varients are for
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div>
      <Head>
        <title>Bible</title>
      </Head>

      <main>
        <div className="relative min-h-screen bg-gray-400">
          <div className="flex flex-row justify-center py-16 gap-6">
            <Link href="/books-leo/ot">
              <motion.div
                initial="hidden" animate="visible"
                variants={variants}
                transition={{ duration: 1 }}
                className="flex justify-center items-center w-48 h-80 rounded-3xl bg-gray-900 text-gray-400 text-xl text-center hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] duration-200">
                Old Testament
              </motion.div>
            </Link>

            <Link href="/books-leo/nt">
              <motion.div
                initial="hidden" animate="visible"
                variants={variants}
                transition={{ duration: 1 }}
                className="flex justify-center items-center w-48 h-80 rounded-3xl bg-gray-900 text-gray-400 text-xl text-center hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] duration-200">
                New Testament
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
