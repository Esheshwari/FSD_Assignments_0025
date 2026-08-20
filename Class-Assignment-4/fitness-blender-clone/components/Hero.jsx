export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#20A3B0] to-[#0EB7AC] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Feel Great.<br />Body and Mind.</h1>
          <p className="text-teal-50 text-sm">Choose from hundreds of workouts, healthy recipes, and expert articles.</p>
          <button className="bg-white text-[#0EB7AC] font-bold px-6 py-2.5 rounded-full text-sm hover:bg-teal-50">Join Now</button>
        </div>
        <div className="flex gap-4">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" className="w-24 h-24 rounded-full border-2 border-white object-cover" alt="Trainer" />
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" className="w-28 h-28 rounded-full border-2 border-white object-cover mt-6" alt="Trainer" />
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" className="w-20 h-20 rounded-full border-2 border-white object-cover" alt="Trainer" />
        </div>
      </div>
    </section>
  );
}