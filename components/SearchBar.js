// file: components/SearchBar.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';

export default function SearchBar({ books }) {
  // Hooks for search bar
  const searchRef = useRef(null);

  // router
  const router = useRouter();

  // For click to close input. Not in use right now
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

  // create event listeners for search shortcuts (/ and ctrl+k) and close search (Esc)
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      // focus search on / or ctrl k
      if (e.key === '/' || (e.key === 'k' && e.ctrlKey)) {
        if (searchRef.current && e.target !== searchRef.current) {
          e.preventDefault();
          searchRef.current.focus();
        }
      } else if (e.key === 'Escape') {
        // close search on Esc
        e.preventDefault();
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
        className="absolute ml-3 bg-white overflow-y-auto rounded-xl z-20 shadow-2xl"
        onKeyDown={
					// Allow users to arrow up and down to select search results
					// and hit enter to navigate to a result
          (e) => {
            if (searchItems instanceof Array && searchItems.length > 0) {

              if (e.key === 'ArrowUp') {
                // move selected item up

                e.preventDefault();
                const idx = (typeof selected !== 'number') ? searchItems.length - 1 : (selected > 0) ? selected - 1 : searchItems.length - 1;
                setSelected(idx);
                searchRef.current.value = searchItems[idx].title;
              } else if (e.key === 'ArrowDown') {
                // move selected item down

                e.preventDefault();
                const idx = (typeof selected !== 'number') ? 0 : (selected < searchItems.length - 1) ? selected + 1 : 0;
                setSelected(idx);
                searchRef.current.value = searchItems[idx].title;
              } else if (e.key === 'Enter' && searchItems[selected]) {
                // navigate to the selected item
                router.push(`/${searchItems[selected].testament}/${searchItems[selected].title.toLowerCase()}`);
              }
            }
          }
        }
      >
        <input
          onChange={
            (e) => {
              // grab the current value
              const inputText = e.target.value.toLowerCase();
              // save the input value
              setInputValue(inputText);
              if (inputText.length > 0) { // there is content
                // match items
                let searchedBooks = books.filter(book => book.title.toLowerCase().includes(inputText.toLowerCase()));
                // sort by earliest occorence of search first
                searchedBooks = searchedBooks.sort((first, second) => first.title.toLowerCase().indexOf(inputText) - second.title.toLowerCase().indexOf(inputText));
                // limit the length of the searched items
								// uncomment to put a limit on number of results
                // searchedBooks.length = Math.min(searchedBooks.length, Infinity);
                setSearchItems(searchedBooks);
              } else {
                // hide search box
                setSearchItems('hidden');
              }
              setSelected(null);
            }
          }
          onKeyDown={
						// if the current search value is a book title
						// navigate to that book
            (e) => {
              if (e.key === 'Enter') {
                if (books.map(book => book.title.toLowerCase()).includes(e.target.value.toLowerCase())) {
                  const targetBook = books.find(book => book.title.toLowerCase() === e.target.value.toLowerCase());
                  router.push(`/${targetBook.testament}/${targetBook.title.toLowerCase()}`)
                }
              }
            }
          }
          ref={searchRef}
          placeholder="Press '/' to search"
          className="w-48 h-6 p-3 border-2 rounded-xl focus-visible:outline-none focus-visible:border-black"
        />
        {/* container for search items */}
				{ (searchItems !== 'hidden') ? (
					<div
						className="w-full max-h-[75vh] bg-white rounded-xl overflow-y-auto nobar"
					>
						{(() => {
							if (searchItems.length > 0) {
								return (
									<div className="relative">
										{searchItems.map((item, idx) => (
											<div key={idx}>
												<Link href={`/${item.testament}/${item.title.toLowerCase()}`} className="w-full">
													<a
														className="block w-full rounded-xl"
														style={{ backgroundColor: (idx === selected) ? 'rgba(0, 0, 0, .2)' : 'transparent' }}
													>
														<div className="flex justify-center w-full">
															<p className="capitalize">
																{item.title.substring(0, item.title.toLowerCase().indexOf(inputValue))}
															</p>
															<strong style={{
																textTransform: item.title.toLowerCase().indexOf(inputValue) === 0 ? 'capitalize' : ''
															}}>
																{inputValue}
															</strong>
															<p>
																{item.title.substring(item.title.toLowerCase().indexOf(inputValue) + inputValue.length)}
															</p>
														</div>
													</a>
												</Link>
											</div>
										))}
									</div>
								);
							} else {
								return 'No Results Found';
							}
						})()}
					</div>
				) : null }
      </div>
    </div>
  )
}