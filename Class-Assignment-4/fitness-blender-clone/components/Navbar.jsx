import { Search, ShoppingBag } from "lucide-react";
export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-[#535C68] text-white text-[11px] text-center py-2 font-medium tracking-wide flex justify-center items-center gap-1">
        <span>Week 3 is here!</span>
        <a href="#" className="text-[#38D2D2] underline font-bold hover:text-white transition">
          Jump in anytime—add the program to your calendar and start moving today!
        </a>
      </div>
      {/* Main Nav */}
      <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#129B9B] flex items-center justify-center text-white text-xs pl-0.5 font-bold shadow-sm">
            ▲
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-2xl tracking-tighter text-[#2A2E30]">
              fitness<span className="font-light text-[#5B6471]">BLENDER</span>
            </span>
          </div>
        </div>
        {/* Links */}
        <nav className="hidden lg:flex items-center gap-7 font-bold text-[12px] text-[#31363A] tracking-wider">
          <a href="#" className="hover:text-[#129B9B] transition flex items-center gap-1">WORKOUTS <span className="text-[9px]">▼</span></a>
          <a href="#" className="hover:text-[#129B9B] transition flex items-center gap-1">PROGRAMS <span className="text-[9px]">▼</span></a>
          <a href="#" className="hover:text-[#129B9B] transition flex items-center gap-1">HEALTHY LIVING <span className="text-[9px]">▼</span></a>
          <a href="#" className="hover:text-[#129B9B] transition flex items-center gap-1">COMMUNITY <span className="text-[9px]">▼</span></a>
          <a href="#" className="hover:text-[#129B9B] transition flex items-center gap-1">ABOUT <span className="text-[9px]">▼</span></a>
          <a href="#" className="hover:text-[#129B9B] transition">STORE</a>
          <a href="#" className="text-[#20A3B0] font-extrabold hover:text-[#129B9B] transition">MEMBERSHIP</a>
        </nav>
        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block border-r pr-6 border-gray-200">
            <div className="text-[11px] text-[#20A3B0] font-bold cursor-pointer">Hi! Sign In</div>
            <div className="text-[11px] font-bold text-[#31363A] flex items-center gap-1 cursor-pointer">
              MY FITNESS <span className="text-[8px]">▼</span>
            </div>
          </div>
          <Search className="w-5 h-5 text-[#31363A] cursor-pointer hover:text-[#129B9B]" />
          <ShoppingBag className="w-5 h-5 text-[#31363A] cursor-pointer hover:text-[#129B9B]" />
        </div>
      </div>
    </header>
  );
}
