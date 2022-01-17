import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import backImg from '../../public/books-joshua/back.svg';
import ElementPicker from '/components/picker';
import Shelf from '/components/shelf';
import mongo from '../../lib/mongodb';


// screen on top of bookshelf
function Curtain(props) {
	return (
		<div>
			<div
				className = "flex justify-end items-center fixed top-0 left-0 z-10 w-1/2 h-screen bg-sky-700 transition-all duration-[1.5s]"
				style = {{ left: props.over ? '0' : '-100vw', transitionProperty: 'left'}}
			>
				<button
					onClick = { props.onOld }
					className = "m-10 p-10 h-96 rounded-3xl bg-blue-900 text-white text-xl shadow-xl transition-shadow duration-700 hover:shadow-2xl"
				>
					Old
					<br/>
					Testament
				</button>
			</div>
			<div
				className = "flex justify-start items-center fixed top-0 right-0 z-10 w-1/2 h-screen bg-sky-700 transition-all duration-[1.5s]"
				style = {{ right: props.over ? '0' : '-100vw', transitionProperty: 'right'}}
			>
				<button
					onClick = { props.onNew }
					className = "m-10 p-10 h-96 rounded-3xl bg-blue-900 text-white text-xl shadow-xl transition-shadow duration-700 hover:shadow-2xl"
				>
					New
					<br/>
					Testament
				</button>
			</div>
		</div>
	)
}

function BookshelfWrapper({ books, onBack }) {
	return (
		<div
			className = 'w-screen min-h-screen bg-white'
		>
			<button
				onClick = { onBack }
				className = 'ml-4 fixed w-16 h-16 cursor-pointer'
				style = {{ filter: 'invert(34%) sepia(63%) saturate(1326%) hue-rotate(80deg) brightness(95%) contrast(102%)' }}
			>
				<Image
					src = { backImg }
					alt = 'back'
					width={500}
					height={500}
				/>
			</button>
			<div className = 'flex justify-center items-center min-h-screen overflow-auto'>
				<Shelf books = { books }/>
			</div>
		</div>
	)
}

export default function Page({ books }) {
	// next router
	const router = useRouter();
	console.log(router.asPath);
	useEffect(() => {
		if (!router.asPath.includes('#')) router.replace('#');	
	});

	// current bookshelf
	const [bookshelf, setBookshelf] = useState(null);

	// whether the curtain is over
	const [over, setOver] = useState(true);
	
  return (
    <div>
      <Head>
        <title>Joshuas books</title>
      </Head>
      <main>
				<Curtain
					over = { over }
					onOld = {
						() => {
							router.push('#old')
							setOver(false);
							setBookshelf(
								<BookshelfWrapper
									books = { books.filter(book => book.testament === 'old') }
									onBack = { () => {
										setOver(true);
										router.push('#');
									} }
									/>
							)
						}
					}
					onNew = {
						() => {
							setOver(false);
							router.push('#new');
							setBookshelf(
								<BookshelfWrapper
									books = { books.filter(book => book.testament === 'new') }
									onBack = { () => {
										setOver(true);
										router.push('#');
									} }
									/>
							)
						}
					}
				/>
				<div className = 'h-screen'>
					<div className = 'flex flex-col items-center'>
						{ bookshelf }
					</div>
				</div>
      </main>
    </div>
  )
}


export async function getStaticProps() {

  const data = await mongo('books');
  return {
    props: {
      books: data
    },
  };
}