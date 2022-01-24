import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowSmUpIcon } from '@heroicons/react/outline';
import mongo from '/lib/mongodb';

// TODO: add description
export default function Page ({ prev, bookData, next }) {

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
        <title>{book && book[0].toUpperCase() + book.slice(1).toLowerCase()}</title>
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
          <div className="flex flex-grow my-4 w-screen max-h-[calc(100vh-225px)] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

            {/* previous book */}
						{ prev ? (
							<Link href = { '/' + prev.testament + '/' + prev.name }>
	            	<div className="flex justify-center items-center my-8 w-20 rounded-r-3xl bg-stone-400 text-stone-900 text-3xl cursor-pointer">
	              	<div className="rotate-90 whitespace-nowrap capitalize">{ prev.name }</div>
	            	</div>
							</Link>
						) : null
						}

            {/* current book */}
            <div className="flex flex-grow justify-center mx-8 border-8 border-stone-400 rounded-3xl">
              <div className="flex flex-col m-16 max-w-4xl">
                <h1 className="mb-10 capitalize text-5xl">{ book }</h1>
                <div className="max-h-[50vh] space-y-4 overflow-y-auto scrollbar-dark">
									{ bookData }
                </div>
              </div>
            </div>

            {/* next book */}
						{ next ? (
							<Link href = { '/' + next.testament + '/' + next.name }>
		            <div className="flex justify-center items-center my-8 w-20 rounded-l-3xl bg-stone-400 text-stone-900 text-3xl cursor-pointer">
		              <div className="rotate-90 whitespace-nowrap capitalize">{ next.name }</div>
		            </div>
							</Link>
						) : null
						}
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

export async function getStaticPaths() {
	const data = await mongo('books');
	let paths = data.map(book => book.name).reduce((a, b) => {
		a = a instanceof Array ? a : [a];
		if (a.includes(b)) {
			return a;
		}
		return [b, ...a];
	}).map(x => {
		return ({ params: { book: x.toLowerCase(), testament: data.find(book => book.name === x).testament } })
	});
	
	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const arr = await mongo('devHistory');
	const book = arr.find(book => book.name.toLowerCase() === params.book);
	const index = arr.indexOf(book);
	const prevName = index - 1 >= 0 ? arr[index - 1].name.toLowerCase() : null;
	const nextName = index + 1 < arr.length ? arr[index + 1].name.toLowerCase() : null;
  return {
    props: {
			prev: prevName === null ? null : { name: prevName, testament: arr.find(book => book.name.toLowerCase() === prevName).testament },
      bookData: book.description,
			next: nextName === null ? null : { name: nextName, testament: arr.find(book => book.name.toLowerCase() === nextName).testament },
    },
  };
}