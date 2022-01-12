import Book from './book';
import React, { useReducer, useRef, useEffect } from 'react';

function insertEveryN (arr, token, n, fromEnd) {
	// Clone the received array, so we don't mutate the
	// original one. You can ignore this if you don't mind.

	let a = arr.slice(0);
	
	// Insert the <token> every <n> elements.

	let idx = fromEnd ? a.length - n : n;

	while ((fromEnd ? idx >= 1 : idx <= a.length))
	{
			//a.splice(idx, 0, token);

			a.splice(idx, 0, <Spacer key = { 'spacer-' + idx.toString() }/>)
			idx = (fromEnd  ? idx - n : idx + n + 1);
	}

	if (a[a.length - 1] === token) {
		a.pop();
	}
	return a;
};
	
function Spacer(props) {
	const global = (() => {
		try {
			return window;
		} catch {
			return null;
		}
	})();
	return <div className = 'width-full bg-[#cd7447] h64 text-transparent cursor-default select-none overflow-hidden whitespace-nowrap' style = {{ /* boxShadow: '0 1rem 10px #7e3d2a'*/  }}>
		{ 'p'.repeat(global ? global.innerWidth / 3 : 500) }
	</div>
}

export default function Shelf(props) {
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
	
	const global = (() => {
		try {
			return window;
		} catch {
			return null;
		}
	})();

	
	const containerRef = useRef(null);

	function generateData() {
		return insertEveryN(
			(props.books || ['book'])
			.map(book => <Book name = { book } key = { book }/>),
			<Spacer/>,
			Math.floor(containerRef && containerRef.current ? containerRef.current.offsetWidth / 52 : 1500 / 52),
			false
		);
	}
	
	useEffect(() => {
		forceUpdate();
		window.addEventListener('resize', forceUpdate);
	}, []);
	return (
		<div className = 'p-4 text-white bg-[#cd7447]'  style = {{ width: 'calc(min(100%, 800px))', border: '#f49c6c solid 4px', borderBottom: 'none'}}>
			<div className = 'h-full bg-[#8e4d3a] flex items-end justify-center flex-wrap overflow-x-visible' ref = { containerRef } style = {{ boxShadow: 'inset 0 1rem 10px #7e3d2a' }}>
				{ generateData() }
			</div>
		</div>
	)
}