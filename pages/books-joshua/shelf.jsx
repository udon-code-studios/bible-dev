import Book from './book';
import React, { useState, useRef, useEffect } from 'react';

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
	
class Spacer extends React.Component {
	ref = React.createRef();
	
	render() {
		setTimeout(() => {
			if (this.ref.current && this.ref.current.className.includes('spine')) {
				this.forceUpdate();
			} else {
			
			}
		}, 100);
		const global = (() => {
			try {
				return window;
			} catch {
				return null;
			}
		})();
		return <div className = 'width-full h64 bg-[url("/books-joshua/wood.jpg")] text-transparent overflow-hidden whitespace-nowrap' ref = { this.ref }>{ 'p'.repeat(global ? global.innerWidth / 3 : 500) }</div>
	}
}

export default class Shelf extends React.Component {
	constructor(props) {
		super(props);
		const global = (() => {
			try {
				return window;
			} catch {
				return null;
			}
		})();
		this.state = {
			width: global ? global.document.body.offsetWidth : 1500,
			showing: true,
		}
		this.eventListner = null;
		if (global) {
			this.eventListener = global.addEventListener('resize', () => {
				this.setState({
					width: global ? global.document.body.offsetWidth : 1500
				});
			});
		}

		
		this.containerRef = React.createRef();
	}

	generateData() {
		return insertEveryN((this.props.books || ['book']).map(book => <Book name = { book } key = { book }/>), <Spacer/>, Math.floor(this.containerRef && this.containerRef.current ? this.containerRef.current.offsetWidth / 76 : 1500 * 5 / 6 / 90), false);
	}
	
	componentDidMount() {
		this.eventListener = window.addEventListener('resize', () => {
			this.setState({
				width: window ? window.document.body.offsetWidth : 1500
			});
		});
		this.setState({
			width: window ? window.document.body.offsetWidth : 1500
		});
		alert(this.props.hidden ? 'none' : 'block')
	}
	
	render() {
		return (
				<div className = 'bg-[url("/books-joshua/wood.jpg")] p-4 text-white'  style = {{ width: 'calc(min(100%, 800px))', display: this.props.hidden ? 'none' : 'block'}}>
					<div className = 'h-full bg-[url("/books-joshua/dark-wood.jpg")] flex items-end justify-center flex-wrap' ref = { this.containerRef }>
						{ this.generateData() }
					</div>
				</div>
		)
	}
}