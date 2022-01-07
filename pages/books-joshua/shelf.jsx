import Book from './book';

var books = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalm","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"];

function insertEveryN (arr, token, n, fromEnd) {

    // Clone the received array, so we don't mutate the
    // original one. You can ignore this if you don't mind.

    let a = arr.slice(0);
    
    // Insert the <token> every <n> elements.

    let idx = fromEnd ? a.length - n : n;

    while ((fromEnd ? idx >= 1 : idx <= a.length))
    {
        a.splice(idx, 0, token);
        idx = (fromEnd  ? idx - n : idx + n + 1);
    }

    return a;
};

function Spacer() {
	return <div className = 'width-full h64 bg-[url("/books-joshua/wood.jpg")] text-transparent overflow-hidden whitespace-nowrap'>deli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platterdeli platter</div>
}

export default function Shelf () {
	return (
		<div className = 'bg-[url("/books-joshua/wood.jpg")] w-10/12 p-4 text-white'>
			<div className = 'h-full bg-[url("/books-joshua/dark-wood.jpg")] flex items-end justify-center flex-wrap'>
				{ insertEveryN(books.map(book => <Book name = { book }/>), <Spacer/>, 9, false) }
			</div>
		</div>
	)
}