import { Link } from "react-router-dom";
import bible from '../assets/bible.png'

export default function Header() {
  return (
    <div className="flex justify-center py-4">
      <Link to="/">
        <div className="flex items-center gap-4 text-4xl font-semibold">
          <img src={bible} className="w-16 h-16"></img>
          <h1>BibleDev</h1>
        </div>
      </Link>

    </div>
  );
}