"use client";

export default function FilterSidebar({ selected, setSelected }) {
  const toggle = (val) => {
    setSelected(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
  };

  return (
    <aside className="w-full md:w-56 bg-white p-5 rounded-lg border text-sm space-y-4">
      <h3 className="font-bold border-b pb-2">Filter By Focus</h3>
      {["Total Body", "Lower Body", "Core"].map(focus => (
        <label key={focus} className="flex items-center gap-2 cursor-pointer text-gray-600 block">
          <input type="checkbox" checked={selected.includes(focus)} onChange={() => toggle(focus)} className="rounded text-[#129B9B]" />
          {focus}
        </label>
      ))}
    </aside>
  );
}