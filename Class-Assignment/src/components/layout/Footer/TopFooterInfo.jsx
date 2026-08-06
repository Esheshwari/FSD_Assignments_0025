import { Facebook, Youtube, Linkedin, Twitter, Instagram } from "lucide-react";

export default function TopFooterInfo() {
  return (
    <>
      {/* Top Tagline */}
      <div className="text-center mb-8">
        <h2 className="italic font-serif text-2xl md:text-3xl text-gray-200">
          Go, change the world<sup className="text-xs">®</sup>
        </h2>
      </div>

      {/* Address and Social Media Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-gray-700 gap-6">
        <div className="text-center md:text-left">
          <h1 className="font-bold text-xl uppercase tracking-wider text-white">RV University</h1>
          <p className="text-xs text-gray-400 italic">Go, change the world</p>
        </div>
        
        <div className="text-center md:text-left text-gray-300 text-xs md:text-sm">
          <p>RV Vidyanikethan Post, 8th Mile, Mysuru Road, Bengaluru – 560 059</p>
          <p className="mt-1">
            <span className="font-semibold">+91 63669 85882</span> &nbsp;|&nbsp; 
            <a href="mailto:admissions@rvu.edu.in" className="hover:underline">admissions@rvu.edu.in</a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-2">
          {[Facebook, Youtube, Linkedin, Twitter, Instagram].map((Icon, idx) => (
            <a key={idx} href="#" className="p-2.5 bg-[#334155] rounded-full hover:bg-[#c89242] transition text-white">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}