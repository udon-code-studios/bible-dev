import { withRouter } from 'next/router';
import React from 'react';
import { motion } from 'framer-motion';

const spineTextures = [
	'bg-cyan-400',
	'bg-cyan-500',
	'bg-cyan-600',
	'bg-cyan-700'
];

let lastBookColor = 0;
class Book extends React.Component {
	constructor(props) {
		super(props);
		this.key = Math.floor(Math.random() * (spineTextures.length));
		lastBookColor = this.key;
	}
	render() {
		return (
			<motion.div
				initial = {{
					x: (Math.random() > .5) ? Math.random() * 1000 + 1000 : Math.random() * -1000 - 1000,
					y: (Math.random() > .5) ? Math.random() * 1000 + 1000 : Math.random() * -1000 - 1000,
				}}
				animate={{ x: 0, y: 0 }}
    		transition={{ duration: 1 }}
				onClick = { () => {
					this.props.router.push('#' + this.props.testament + '/' + this.props.name.replaceAll(' ', ''));
				} }
			>
				<motion.div
					whileHover={{ scale: 1.2 }}
					whileTap = {{ scale: 1.1 }}
					className = {
						'inline-block mx-1 mt-4 p-3 ' + spineTextures[this.key] + ' text-center text-3xl whitespace-nowrap align-middle rounded cursor-pointer'
					}
					style={{
						writingMode: 'vertical-rl',
						fontSize: '0.875rem',
						lineHeight: '1.25rem'
					}}
				>
					{ this.props.name }
				</motion.div>
			</motion.div>
		)
	}
}

export default withRouter(Book);