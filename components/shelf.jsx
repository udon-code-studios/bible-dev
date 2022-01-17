import Book from './book';
import React, { useReducer, useRef, useEffect, useState } from 'react';

function insertEveryN (arr, n, fromEnd) {
	// Clone the received array, so we don't mutate the
	// original one. You can ignore this if you don't mind.

	let a = arr.slice(0);
	
	// Insert the <token> every <n> elements.

	let idx = (fromEnd) ? a.length - n : n;

	while ((fromEnd) ? idx >= 1 : idx <= a.length)
	{
			//a.splice(idx, 0, token);

			a.splice(idx, 0, <Spacer key = { 'spacer-' + idx.toString() }/>)
			idx = (fromEnd) ? idx - n : idx + n + 1;
	}

	if (a[a.length - 1] === <Spacer/>) {
		a.pop();
	}
	return a;
};

// shelf block between rows of books
function Spacer(props) {

	// text that forces spacer to expand to full size
	const [text, setText] = useState('p'.repeat(500));

	useEffect(() => {
		setText('p'.repeat(window.innerWidth / 3));
		window.addEventListener('resize', () => setText('p'.repeat(window.innerWidth / 3)));
	},[]);
	
	return <div className = "width-full bg-[#cd7447] text-transparent whitespace-nowrap cursor-default select-none overflow-hidden">
		{ text }
	</div>
}

export default function Shelf(props) {
	// forceUpdate function
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	// ref for reading width of bookshelf for calculations
	const containerRef = useRef(null);
	// create bookshelf content
	function generateData() {
		return insertEveryN(
			(props.books)
			.map(book => (
				<Book
					name = { book.name }
					testament = { book.testament }
					key = { book.name }
				/>
			)),
			Math.floor((containerRef && containerRef.current) ? containerRef.current.offsetWidth / 52 : 1500 / 52),
			false
		);
	}
	// resizing the bookshelf. Force update required or else bookshelf is funny looking on some screens
	useEffect(() => {
		forceUpdate();
		window.addEventListener('resize', forceUpdate);
	}, []);
	
	return (
		<div className = "p-4 text-white bg-[#cd7447]"
			style = {{
				width: 'calc(min(100%, 800px))',
				border: '#f49c6c solid 4px',
				borderBottom: 'none'
			}}
		>
			<div
				className = "flex flex-wrap justify-center items-end h-full bg-[#8e4d3a] overflow-x-visible"
				ref = { containerRef }
				style = {{
					boxShadow: 'inset 0 1rem 10px #7e3d2a'
				}}
			>
				{ generateData() }
			</div>
		</div>
	)
}