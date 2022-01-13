import bible from '../assets/bible.png'

export default function Header() {
    return (
      <div className="flex justify-center items-center py-4 gap-4 text-4xl font-semibold">
        <img src={bible} className="w-16 h-16"></img>
        <h1>BibleDev</h1>
      </div>
    );
  }