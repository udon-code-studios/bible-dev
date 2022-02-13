// file: pages/index.js

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Book from '/components/Book';
import { getCollection } from '../lib/mongodb';

// TODO('add description')
export default function Page({ books }) {
  const [view, setView] = useState('home'); // states: 'home', 'old', 'new'
  const router = useRouter(); // used to change routing programmatically

  // QUESTION('is this necessary?')
  // if routed from not root page, change url to /
  //useEffect(() => router.push('/'), []);

  // TODO('add description')
  const selectTestament = (testament) => {
    setView(testament);
    setTimeout(() => { router.push(`/${testament}`) }, 1000) // allow 1s to transpire before navigating to the next page
  }

  // set motion varients
  const variants = {
    opacityVariants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    overviewVariants: {
      show: { opacity: 1 },
      hide: { x: -1500 },
    },
    otVariants: {
      show: { opacity: 1 },
      hide: { x: -1500 },
    },
    ntVariants: {
      show: { opacity: 1 },
      hide: { x: 1500 },
    },
    sizeVariants: {
      show: { opacity: 1, },
      hide: { opacity: 0, width: 0, height: 0 },
    },
    spacerVariants: {
      show: { width: '1.5rem' },
      hide: { width: 0 },
    },
  }

  // spacer component which shrinks on view animation
  function ShrinkingSpacer() {
    return (
      <motion.div
        initial="show"
        animate={(view === 'home') ? 'show' : 'hide'}
        variants={variants.spacerVariants}
        transition={{ delay: 0.3, duration: 0.7 }}
      ></motion.div>
    );
  }

	// Hooks for search bar
	const searchRef = useRef(null);

	/**
	 * @param {HTMLElement} child 
	 * @param {HTMLElement} parent 
	 */
	const isDeepChildOf = (child, parent) => {
		if (child === parent) {
			return true;
		} else if (child === document.body || document.documentElement || document.head) {
			return false;
		} else {
			return isDeepChildOf(child.parentNode);
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === '/' || (e.key === 'k' && e.ctrlKey)) {
				if (searchRef.current && e.target !== searchRef.current) {
					e.preventDefault();
					searchRef.current.focus();
				}
			} else if (e.key === 'Escape') {
				searchRef.current.value = '';
				searchRef.current.blur();
				setSearchItems('hidden');
				setSelected(null);
				setInputValue('');
			}
		});
	}, []);

	// list of books to be shown under search
	const [searchItems, setSearchItems] = useState('hidden');
	// selected book in list
	const [selected, setSelected] = useState(null);
	// current value of input
	const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Head>
        <title>BibleDev</title>
        <meta name="description" content="<placeholder description>" />
        <link rel="icon" href="/bible.png" />
      </Head>

      <main>
        {/* header */}
        <div className="grid grid-flow-col justify-center py-4 z-10">
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
					<div className="relative my-auto h-6 w-48">
						<div
							className='absolute max-h-[75vh] ml-3 bg-white overflow-y-auto nobar rounded-xl z-20 shadow-2xl'
							onKeyDown={
								(e) => {
									if (searchItems instanceof Array && searchItems.length > 0) {
										if (e.key === 'ArrowUp') {
											e.preventDefault();
											const idx = (typeof selected !== 'number') ? searchItems.length - 1 : (selected > 0) ? selected - 1 : searchItems.length - 1;
											setSelected(idx);
											searchRef.current.value = searchItems[idx].name;
										} else if (e.key === 'ArrowDown') {
											e.preventDefault();
											const idx = (typeof selected !== 'number') ? 0 : (selected < searchItems.length - 1) ? selected + 1 : 0;
											setSelected(idx);
											searchRef.current.value = searchItems[idx].name;
										} else if (e.key === 'Enter' && searchItems[selected]) {
											router.push(`/${searchItems[selected].testament}/${searchItems[selected].name.toLowerCase()}`);
										}
									}
								}
							}
						>
							<input
								onChange={
									(e) => {
										const v = e.target.value.toLowerCase();
										setInputValue(v);
										if (v.length >= 1) {
											let searchedBooks = books.filter(book => book.name.toLowerCase().includes(v.toLowerCase()));
											searchedBooks = searchedBooks.sort((first, second) => first.name.toLowerCase().indexOf(v) - second.name.toLowerCase().indexOf(v));
											searchedBooks.length = Math.min(searchedBooks.length, Infinity);
											setSearchItems(searchedBooks);
										} else {
											setSearchItems('hidden');
										}
										setSelected(null);
									}
								}
								ref={ searchRef }
								placeholder="Press '/' to search"
								className="w-48 h-6 p-3 border-2 rounded-xl focus-visible:outline-none focus-visible:border-black"
							/>
							<div
								className="w-full bg-white rounded-xl"
								style={{ display: searchItems === 'hidden' ? 'hidden' : 'block'}}
							>
								{ (() => {
									if (searchItems === 'hidden') {
										return null;
									} else if (searchItems.length > 0) {
										return (
											<div className='relative'>
												{ searchItems.map((item, idx) => (
												<div key={idx}>
													<Link href={`/${item.testament}/${item.name.toLowerCase()}`} className="w-full">
														<a
															className='block w-full text-center rounded-xl capitalize pl-2'
															style={{ backgroundColor: (idx === selected) ? 'rgba(0, 0, 0, .2)' : 'transparent' }}
														>
															{ item.name.substring(0, item.name.toLowerCase().indexOf(inputValue)) }
															<strong>{ inputValue }</strong>
															{ item.name.substring(item.name.toLowerCase().indexOf(inputValue) + inputValue.length) }
														</a>
													</Link>
												</div>
											))}
											</div>
										);
									} else {
										return (searchItems.length > 0) ? searchItems : 'No Results Found';
									}
								})() }
							</div>
						</div>
					</div>
        </div>

        <motion.div
          initial="hidden" animate="visible"
          variants={variants.opacityVariants} transition={{ duration: 1 }}
        >
          <div className="flex justify-center items-center py-14 px-8 overflow-hidden">

            {/* overview text */}
            <motion.div
              animate={(view === 'home') ? 'show' : 'hide'}
              variants={variants.overviewVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="space-y-1"
            >
              <motion.div variants={variants.sizeVariants} transition={{ duration: 0.7 }}>
                <h1 className="text-3xl font-serif font-bold">The Bible</h1>
                <p className="max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </motion.div>
            </motion.div>

            {/* spacer */}
            <ShrinkingSpacer />

            {/* old testament */}
            <motion.button
              animate={(view === 'home') ? 'show' : (view === 'old') ? 'show' : 'hide'}
              variants={variants.otVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="text-stone-400" onClick={() => selectTestament('old')}
            >
              <motion.div variants={variants.sizeVariants} transition={{ duration: 0.7 }}>
                <Book width="14rem" title="Old Testament" />
              </motion.div>
            </motion.button>

            {/* spacer */}
            <ShrinkingSpacer />

            {/* new testament */}
            <motion.button
              animate={(view === 'home' || view === 'new') ? 'show' : 'hide'}
              variants={variants.ntVariants} transition={{ when: 'beforeChildren', duration: 0.3 }}
              className="text-stone-400" onClick={() => selectTestament('new')}
            >
              <motion.div variants={variants.sizeVariants} transition={{ duration: 0.7 }}>
                <Book width="10rem" title="New Testament" />
              </motion.div>
            </motion.button>

          </div>
        </motion.div>
      </main>
    </>
  )
}

export async function getStaticProps() {
	return {
		props: {
			books: (await getCollection('books')).map(book => ({
				name: book.name,
				testament: book.testament,
			})),
		}
	};
}

//
// end of file: pages/index.js
