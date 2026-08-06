import TopFooterInfo from "./TopFooterInfo";
import FooterLinks from "./FooterLinks";
import BottomCopyrightBar from "./BottomCopyrightBar";

export default function Footer() {
  return (
    <footer className="bg-[#222f3e] text-white pt-10 relative font-sans">
      {/* Floating Side Action Tabs */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        <button className="bg-[#1f2a36] text-white [writing-mode:vertical-lr] px-2 py-3 rounded-l text-xs font-semibold hover:bg-[#c89242] transition border-l border-t border-b border-gray-600">Enquire Now</button>
        <button className="bg-[#1f2a36] text-white [writing-mode:vertical-lr] px-2 py-3 rounded-l text-xs font-semibold hover:bg-[#c89242] transition border-l border-t border-b border-gray-600">UGC Proforma</button>
        <button className="bg-[#1f2a36] text-white [writing-mode:vertical-lr] px-2 py-3 rounded-l text-xs font-semibold hover:bg-[#c89242] transition border-l border-t border-b border-gray-600">Chat with a Student</button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <TopFooterInfo />
        <FooterLinks />
      </div>

      <BottomCopyrightBar />
    </footer>
  );
}