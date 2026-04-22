import { useLensStore } from '../../store/useLensStore';
import { STANDARD_F_STOPS, SensorType } from '../../lib/opticsLogic';
import { motion } from 'framer-motion';

const glassmorphism = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";

export function ControlsPanel() {
  const fStop = useLensStore((state) => state.fStop);
  const focalLength = useLensStore((state) => state.focalLength);
  const distance = useLensStore((state) => state.distance);
  const sensor = useLensStore((state) => state.sensor);
  
  const setFStop = useLensStore((state) => state.setFStop);
  const setFocalLength = useLensStore((state) => state.setFocalLength);
  const setDistance = useLensStore((state) => state.setDistance);
  const setSensor = useLensStore((state) => state.setSensor);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full md:w-80 p-6 rounded-t-3xl md:rounded-2xl ${glassmorphism} pointer-events-auto flex flex-col gap-6`}
    >
      {/* Sensor Select */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Sensor Size</label>
        <select 
          value={sensor} 
          onChange={(e) => setSensor(e.target.value as SensorType)}
          className="bg-black/50 border border-white/20 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-400"
        >
          <option value="Full Frame">Full Frame (35mm)</option>
          <option value="APS-C">APS-C (1.5x Crop)</option>
          <option value="Micro 4/3">Micro 4/3 (2.0x Crop)</option>
          <option value="Smartphone">Smartphone (1/2.55")</option>
        </select>
      </div>

      {/* Distance Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label className="text-sm text-white/70">Subject Distance</label>
          <span className="text-yellow-400 font-medium">{distance.toFixed(1)} m</span>
        </div>
        <input 
          type="range" 
          min={0.5} max={50} step={0.5} 
          value={distance} 
          onChange={(e) => setDistance(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
      </div>

      {/* Focal Length Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label className="text-sm text-white/70">Focal Length</label>
          <span className="text-yellow-400 font-medium">{focalLength} mm</span>
        </div>
        <input 
          type="range" 
          min={14} max={200} step={1} 
          value={focalLength} 
          onChange={(e) => setFocalLength(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
      </div>

      {/* Aperture (F-Stop) */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label className="text-sm text-white/70">Aperture (f-stop)</label>
          <span className="text-yellow-400 font-medium">f/{fStop.toFixed(1)}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {STANDARD_F_STOPS.map((val) => (
            <button 
              key={val}
              onClick={() => setFStop(val)}
              className={`snap-center shrink-0 w-12 h-12 rounded-full border transition-all ${
                fStop === val 
                  ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                  : 'bg-black/40 text-white/70 border-white/20 hover:border-white/50'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
