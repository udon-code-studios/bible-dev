import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Book from '/components/Book';
import mongo from '/lib/mongodb';

// TODO: add description
export default function Page({ booksData }) {

  // get testament from router
  const router = useRouter();
  const { testament } = router.query;

	if (router.isFallback) {
    return <div>Loading...</div>
  }
	
  const initialWidth = (testament === 'old') ? '14rem' : '10rem';

  const bookWidth = (chapters) => {
    const totalChapters = (testament === 'old') ? 929 : 260;
    const remScaler = (testament === 'old') ? 100 : 70;
    return (`${(chapters / totalChapters) * remScaler}rem`);
  };
  const books = {
    old: booksData.filter(book => book.testament === 'old'),
    new: booksData.filter(book => book.testament === 'new'),
  };

  const shelfVariants = {
    together: { overflowX: 'hidden', backgroundColor: 'rgb(41 37 36)', },
    apart: { width: '75%', /*overflowX: 'scroll',*/ backgroundColor: 'rgb(168 162 158)', },
  };

  const bookVariants = {
    together: { color: 'rgb(41 37 36)', marginLeft: '-1rem', marginRight: '-1rem', },
    apart: { color: 'rgb(168 162 158)', marginLeft: '0.2rem', marginRight: '0.2rem', },
  };

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
                <img src="/bible.png" alt="bible" className="w-16 h-16"></img>
                <h1>BibleDev</h1>
              </div>
            </a>
          </Link>
        </div>

        <div className="flex flex-row justify-center items-center py-16 px-8 gap-6">
          <motion.div
            initial="together" animate="apart"
            variants={shelfVariants} transition={{ duration: 1.5 }}
            className="flex flex-row justify-start h-80 rounded-3xl w-48 force-overflow scrollbar-light"
            style={{ width: initialWidth }}
          >
            {/* render books from books.[ot/nt] array */}
            {(testament === 'old' || testament === 'new') ? books[testament].map((book, index) => {
              return (
                <motion.div key={index} variants={bookVariants} transition={{ duration: 1.5 }}>
                  <Link href={`${testament}/${book.name.toLowerCase()}`}>
                    <a>
                      <Book width={bookWidth(book.chapters)} title={book.name} />
                    </a>
                  </Link>
                </motion.div>
              );
            }) : null}
          </motion.div>
        </div>

      </main>
    </>
  );
}

export async function getStaticPaths() {
	const data = await mongo('books');
	let paths = data.map(book => book.testament).reduce((a, b) => {
		a = a instanceof Array ? a : [a];
		if (a.includes(b)) {
			return a;
		}

		return [b, ...a];
	}).map(x => ({ params: { testament: x } }));
	console.log(paths);
	
	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps() {

  const data = await mongo('books');
  return {
    props: {
      booksData: data
    },
  };
}