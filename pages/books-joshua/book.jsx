import React from 'react';

const spineTextures = [
	'blue',
	'brown',
	'maroon',
	'red'
];

var lastBookColor = 0;
export default class Book extends React.Component {
	constructor(props) {
		super(props);
		this.key = (lastBookColor + Math.ceil(Math.random() * (spineTextures.length - 1))) % spineTextures.length;
		lastBookColor = this.key;
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
			<div className = { 'bg-repeat p-4 mx-1 mt-4 text-center inline-block align-middle text-3xl rounded whitespace-nowrap cursor-pointer' } style={{ writingMode: 'vertical-rl', boxShadow: 'inset 15px 0 12px rgba(0,0,0,.5), inset -15px 0 12px rgba(0,0,0,.5)', backgroundImage: 'url("/books-joshua/spines/spine-' + spineTextures[this.key] + '.png")' }}>
				{ this.props.name }
			</div>
		)
	}
}