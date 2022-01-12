import Head from 'next/head';
import Image from 'next/image';
import Shelf from './shelf';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import backImg from '../../public/books-joshua/back.svg';
import ElementPicker from './picker';

var booksOld = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"];
var booksNew = ["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"];

function Curtain(props) {

	return (
		<div>
			<div className = 'w-1/2 bg-sky-700 h-screen flex items-center justify-end mr-0 transition-all duration-[1.5s] fixed top-0 left-0 z-10' style = {{ left: props.over ? '0' : '-100vw', transitionProperty: 'left'}}>
				<button
					onClick = { () => {
						props.onOld();
					} }
					
					className = 'rounded-3xl p-10 m-10 h-96 text-white text-xl bg-blue-900 shadow-xl hover:shadow-2xl transition-shadow duration-700'
				>
					Old
					<br/>
					Testament
				</button>
			</div>
			<div className = 'w-1/2 bg-sky-700 h-screen flex items-center justify-start mr-0 transition-all duration-[1.5s] fixed top-0 right-0 z-10' style = {{ right: props.over ? '0' : '-100vw', transitionProperty: 'right'}}>
				<button
					onClick = { () => {
						props.onNew();
					} }
					
					className = 'rounded-3xl p-10 m-10 h-96 text-white text-xl bg-blue-900 shadow-xl hover:shadow-2xl transition-shadow duration-300'
				>
					New
					<br/>
					Testament
				</button>
			</div>
		</div>
	)
}

export default function Page() {
	const curtainRef = useRef(null);
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'i' && e.ctrlKey) {
				window.epicker = window.epicker ? window.epicker.close() : new ElementPicker();
			}
		});
	}, []);

	const [bookshelf, setBookshelf] = useState(null);
	
	const [over, setOver] = useState(true)
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
							setOver(false);
							setBookshelf(
								<div
									className = 'w-screen min-h-screen bg-white'
								>
									<button
										onClick = {
											() => {
												setOver(true);
											} }
										className = 'fixed w-16 h-16 ml-4 cursor-pointer'
										style = {{ filter: 'invert(34%) sepia(63%) saturate(1326%) hue-rotate(80deg) brightness(95%) contrast(102%)' }}
									>
										<Image
											src = { backImg }
											alt = 'back'
							        width={500}
							        height={500}
										/>
									</button>
									<div className = 'min-h-screen overflow-auto flex justify-center items-center'>
										<Shelf books = { booksOld }/>
									</div>
								</div>
							)
						}
					}
					onNew = {
						() => {
							setOver(false);
							setBookshelf(
								<div
									className = 'w-screen min-h-screen bg-white'
								>
									<button
										onClick = {
											() => {
												setOver(true);
											} }
										className = 'fixed w-16 h-16 ml-4 cursor-pointer'
										style = {{ filter: 'invert(34%) sepia(63%) saturate(1326%) hue-rotate(80deg) brightness(95%) contrast(102%)' }}
									>
										<Image
											src = { backImg }
											alt = 'back'
							        width={500}
							        height={500}
										/>
									</button>
									<div className = 'min-h-screen overflow-auto flex justify-center items-center'>
										<Shelf books = { booksNew }/>
									</div>
								</div>
							)
						}
					}
				/>
				<div className = 'h-screen'>
					<div className = 'flex items-center flex-col'>
						{ bookshelf }
					</div>
				</div>
      </main>
    </div>
  )
}