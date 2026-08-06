import { Search, ChevronDown } from "lucide-react";
import rvuLogo from "../../../assets/rvu-logo.png"; // Adjust depth if needed

export default function MainNavbar() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
      {/* Logo Container */}
      <div className="flex items-center shrink-0 py-1">
        <img 
          src={rvuLogo} 
          alt="RV University Logo" 
          className="h-12 md:h-14 w-auto object-contain" 
        />
      </div>

      {/* Navigation Links */}
      <nav className="hidden xl:flex items-center space-x-5 text-sm font-semibold text-gray-800">
        <button className="flex items-center gap-1 hover:text-[#b07d33] transition">Campus <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1 hover:text-[#b07d33] transition">About RVU <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1 hover:text-[#b07d33] transition">Academics <ChevronDown size={14} /></button>
        <button className="flex items-center gap-1 hover:text-[#b07d33] transition">Admissions <ChevronDown size={14} /></button>
        <a href="#" className="hover:text-[#b07d33] transition">Faculty</a>
        <button className="flex items-center gap-1 hover:text-[#b07d33] transition">Research <ChevronDown size={14} /></button>
        <a href="#" className="hover:text-[#b07d33] transition">Events</a>
        <a href="#" className="hover:text-[#b07d33] transition">Placements</a>
        <a href="#" className="hover:text-[#b07d33] transition">Life at RVU</a>
      </nav>

      {/* CTA Button and Search */}
      <div className="flex items-center gap-4 shrink-0">
        <a href="#" className="bg-[#c89242] text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-[#b07d33] transition shadow-sm">
          Apply Now
        </a>
        <button aria-label="Search" className="text-gray-600 hover:text-black transition">
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}