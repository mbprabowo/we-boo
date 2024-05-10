import Image from "next/image";
import bookmarkIcon from "@/assets/icons/bookmark.svg";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="container py-4">
      <nav className="flex justify-between items-center">
        <div>
          <a href="/" className="text-4xl font-extrabold">
            We Boo
          </a>
          <div className="text-slate-400">
            All of your favorites anime in the universe.
          </div>
        </div>
        <div>
          <a href="/favorites">
            <Button variant="ghost" className="flex items-center gap-x-2">
              <span>My List</span>
              <Image src={bookmarkIcon} alt="bookmark-icon" />
            </Button>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header;
