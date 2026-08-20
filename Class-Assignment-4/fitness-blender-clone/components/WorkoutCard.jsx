import { Heart } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow transition">
      <div className="relative h-44 bg-gray-100">
        <img src={workout.thumbnail} alt={workout.title} className="w-full h-full object-cover" />
        {workout.isPlus && <span className="absolute top-2 left-2 bg-[#129B9B] text-white text-[10px] font-bold px-2 py-0.5 rounded">FB PLUS</span>}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-gray-700 hover:text-red-500"><Heart className="w-4 h-4" /></button>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500 font-bold">
          <span>{workout.duration} MIN</span>
          <span>DIFF {workout.difficulty}/5</span>
        </div>
        <h4 className="font-bold text-gray-800 text-sm line-clamp-2">{workout.title}</h4>
      </div>
    </div>
  );
}