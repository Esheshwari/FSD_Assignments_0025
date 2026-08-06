export default function FooterLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 py-10 text-gray-300">
      {/* Column 1 */}
      <div>
        <h3 className="font-bold text-[#c89242] mb-3 text-sm">Main Navigation</h3>
        <ul className="space-y-2 text-xs">
          {['About', 'Schools & Programmes', 'Library', 'Research', 'Media & Events', 'Careers', 'Faculty', 'Mysuru Campus'].map(item => (
            <li key={item}><a href="#" className="hover:text-white transition">▪ {item}</a></li>
          ))}
        </ul>
      </div>

      {/* Column 2 & 3: Schools */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-[#c89242] mb-3 text-sm">Schools</h3>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">▪ School of Liberal Arts and Sciences</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School of Design and Innovation</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School of Economics and Business</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School of Computer Science and Engineering</a></li>
          </ul>
        </div>
        <div className="sm:mt-8">
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">▪ School of Law</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School of Film, Media and Creative Arts</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School for Continuing Education & Professional Studies</a></li>
            <li><a href="#" className="hover:text-white transition">▪ School of Allied and Healthcare Professions</a></li>
          </ul>
        </div>
      </div>

      {/* Column 4 */}
      <div>
        <h3 className="font-bold text-[#c89242] mb-3 text-sm">Admissions</h3>
        <ul className="space-y-2 text-xs">
          {['How to Apply', 'Dates & Deadlines', 'Student Activities', 'Financial Aid & Support', 'Cancellation & Refund Policy'].map(item => (
            <li key={item}><a href="#" className="hover:text-white transition">▪ {item}</a></li>
          ))}
        </ul>
      </div>

      {/* Column 5 */}
      <div>
        <h3 className="font-bold text-[#c89242] mb-3 text-sm">Helpful Links</h3>
        <ul className="space-y-2 text-xs">
          {['Annual Reports', 'Approvals', 'Blog', 'Contact', 'Disclosures', 'Statutory Committees', 'IQAC', 'University Grievance Committees'].map(item => (
            <li key={item}><a href="#" className="hover:text-white transition">▪ {item}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}