import Link from "next/link";
import { Home, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 bg-white shadow-lg rounded-xl p-2" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href="/main" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition">
        <Home size={24} />
        {isHovered && <span>Home Page</span>}
      </Link>
      <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition">
        <User size={24} />
        {isHovered && <span>Profile Page</span>}
      </Link>
    </div>
  );
};

export default Navbar;
