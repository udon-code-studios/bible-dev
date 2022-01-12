import React from 'react';
import { motion } from 'framer-motion';

const spineTextures = [
	'bg-sky-500',
	'bg-amber-400',
	'bg-lime-500',
	'bg-red-600'
];

var lastBookColor = 0;
export default class Book extends React.Component {
	constructor(props) {
		super(props);
		this.key = (lastBookColor + Math.ceil(Math.random() * (spineTextures.length - 1))) % spineTextures.length;
		lastBookColor = this.key;
		this.key = Math.floor(Math.random() * (spineTextures.length))
		this.ref = React.createRef();
	}
	render() {
		setTimeout(() => {
			if (this.ref.current && this.ref.current.className.includes('wood')) {
				this.forceUpdate();
			} else {
				
			}
		}, 100);
		return (
			<motion.div
				initial = {{
					x: Math.random() > .5 ? Math.random() * 1000 + 1000 : Math.random() * -1000 - 1000,
					y: Math.random() > .5 ? Math.random() * 1000 + 1000 : Math.random() * -1000 - 1000,
				}}
				animate={{ x: 0, y: 0 }}
    		transition={{ duration: 1 }}
				className = { 'bg-repeat p-3 mx-1 mt-4 text-center text-sm inline-block align-middle text-3xl rounded whitespace-nowrap cursor-pointer ' + spineTextures[this.key] } style={{ writingMode: 'vertical-rl' }}>
				{ this.props.name }
			</motion.div>
		)
	}
}