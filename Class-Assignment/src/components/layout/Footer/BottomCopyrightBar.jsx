export default function BottomCopyrightBar() {
  return (
    <div className="bg-[#18222c] py-4 text-gray-400 text-xs px-6 flex flex-col md:flex-row justify-between items-center gap-2 border-t border-gray-800">
      <p>© 2026, rvu.edu.in . All rights reserved. | Powered by Domseed Marketing</p>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>
    </div>
  );
}