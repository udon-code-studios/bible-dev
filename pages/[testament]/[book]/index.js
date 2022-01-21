import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowSmUpIcon } from '@heroicons/react/outline';
import Metadata from '/components/Metadata';

// TODO: add description
export default function Page() {

  // get book title from router
  const router = useRouter();
  const { book } = router.query;

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <Head>
      	<Metadata title = { book && book[0].toUpperCase() + book.slice(1).toLowerCase() }/>
      </Head>

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
          <div className="flex flex-grow my-4">

            {/* previous book */}
            <div className="flex justify-center items-center my-8 w-20 rounded-r-3xl bg-stone-400 text-stone-900 text-3xl">
              <div className="rotate-90 whitespace-nowrap">Genesis</div>
            </div>

            {/* current book */}
            <div className="flex flex-grow justify-center mx-8 border-8 border-stone-400 rounded-3xl">
              <div className="flex flex-col m-16 max-w-4xl">
                <h1 className="mb-10 capitalize text-5xl">{book}</h1>
                <div className="space-y-4 overflow-y-hidden">
                  <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </div>
              </div>
            </div>

            {/* next book */}
            <div className="flex justify-center items-center my-8 w-20 rounded-l-3xl bg-stone-400 text-stone-900 text-3xl">
              <div className="rotate-90 whitespace-nowrap">Leviticus</div>
            </div>

          </div>

          {/* timeline */}
          <div className="my-10 h-0 bg-stone-400"></div>

          {/* footer spacer */}
          <div className="h-20"></div>

        </motion.div>
      </div>
    </>
  );
}