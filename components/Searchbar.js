import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';

export default function Searchbar({ books }) {
	// Hooks for search bar
	const searchRef = useRef(null);

	// router
	const router = useRouter();
		
	/**
	 * @param {HTMLElement} child 
	 * @param {HTMLElement} parent 
	 */
	/*
	const isDeepChildOf = (child, parent) => {
		console.log(child.parentNode, parent);
		if (child == parent) {
			return true;
		} else if (child === document.body || child === document.documentElement || document.head || window) {
			return false;
		} else {
			return isDeepChildOf(child.parentNode, parent);
		}
	}
	*/

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
		<div className="relative my-auto h-6 w-48">
			<div
				className='absolute ml-3 bg-white overflow-y-auto rounded-xl z-20 shadow-2xl'
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
					onKeyDown={
						(e) => {
							if (e.key === 'Enter') {
								if (books.map(book => book.name.toLowerCase()).includes(e.target.value.toLowerCase())) {
									const targetBook = books.find(book => book.name.toLowerCase() === e.target.value.toLowerCase());
									router.push(`/${targetBook.testament}/${targetBook.name.toLowerCase()}`)
								}
							}
						}
					}
					ref={ searchRef }
					placeholder="Press '/' to search"
					className="w-48 h-6 p-3 border-2 rounded-xl focus-visible:outline-none focus-visible:border-black"
				/>
				<div
					className="w-full max-h-[75vh] bg-white rounded-xl overflow-y-auto nobar"
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
												className='block w-full rounded-xl'
												style={{ backgroundColor: (idx === selected) ? 'rgba(0, 0, 0, .2)' : 'transparent' }}
											>
												<div className="flex justify-center w-full">
													<p className="capitalize">
														{ item.name.substring(0, item.name.toLowerCase().indexOf(inputValue)) }
													</p>
													<strong style = {{
														textTransform: item.name.toLowerCase().indexOf(inputValue) === 0 ? 'capitalize' : ''
													}}>
														{ inputValue }
													</strong>
													<p>
														{ item.name.substring(item.name.toLowerCase().indexOf(inputValue) + inputValue.length) }
													</p>
												</div>
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
	)
}