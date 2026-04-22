import { useLensStore } from '../../store/useLensStore';
import { STANDARD_F_STOPS } from '../../lib/opticsLogic';
import type { SensorType } from '../../lib/opticsLogic';
import { motion } from 'framer-motion';
import { Aperture, Maximize, Orbit, Ruler } from 'lucide-react';

const glassmorphism = "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl";

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
      className={`w-full md:w-96 p-6 rounded-t-3xl md:rounded-2xl ${glassmorphism} pointer-events-auto flex flex-col gap-8`}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-white/90 font-medium tracking-wide flex items-center gap-2">
          <Aperture size={18} className="text-yellow-400" />
          Lens Controls
        </h2>
      </div>

      {/* Sensor Select */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
          <Maximize size={14} /> Sensor Format
        </label>
        <div className="relative">
          <select 
            value={sensor} 
            onChange={(e) => setSensor(e.target.value as SensorType)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/90 outline-none focus:border-yellow-400 focus:bg-white/10 transition-all appearance-none cursor-pointer"
          >
            <option value="Full Frame" className="bg-neutral-900">Full Frame (35mm) - Professional</option>
            <option value="APS-C" className="bg-neutral-900">APS-C (1.5x) - Enthusiast</option>
            <option value="Micro 4/3" className="bg-neutral-900">Micro 4/3 (2.0x) - Compact</option>
            <option value="Smartphone" className="bg-neutral-900">Smartphone (1/2.55") - Mobile</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▼</div>
        </div>
      </div>

      {/* Focal Length Slider */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
            <Orbit size={14} /> Focal Length
          </label>
          <span className="text-yellow-400 font-mono text-sm bg-yellow-400/10 px-2 py-0.5 rounded">{focalLength}mm</span>
        </div>
        <input 
          type="range" 
          min={14} max={200} step={1} 
          value={focalLength} 
          onChange={(e) => setFocalLength(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:bg-white/20 transition-all"
        />
        <div className="flex justify-between text-[10px] text-white/30 font-medium px-1">
          <span>Wide (14mm)</span>
          <span>Telephoto (200mm)</span>
        </div>
      </div>

      {/* Distance Slider */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
            <Ruler size={14} /> Focus Distance
          </label>
          <span className="text-yellow-400 font-mono text-sm bg-yellow-400/10 px-2 py-0.5 rounded">{distance.toFixed(1)}m</span>
        </div>
        <input 
          type="range" 
          min={0.5} max={50} step={0.5} 
          value={distance} 
          onChange={(e) => setDistance(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:bg-white/20 transition-all"
        />
        <div className="flex justify-between text-[10px] text-white/30 font-medium px-1">
          <span>Macro (0.5m)</span>
          <span>Far (50m)</span>
        </div>
      </div>

      {/* Aperture (F-Stop) Ring */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex justify-between items-end">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
            <Aperture size={14} /> Aperture Ring
          </label>
          <span className="text-yellow-400 font-mono text-sm bg-yellow-400/10 px-2 py-0.5 rounded">f/{fStop.toFixed(1)}</span>
        </div>
        
        {/* Lens Ring Style */}
        <div className="relative w-full overflow-hidden bg-black/40 rounded-xl border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          {/* Central indicator mark */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-yellow-400 z-10 pointer-events-none opacity-50" />
          <div className="absolute left-1/2 top-0 w-2 h-2 -translate-x-1/2 bg-yellow-400 rounded-b-sm z-10 pointer-events-none" />
          
          <div className="flex overflow-x-auto py-4 px-[45%] snap-x snap-mandatory hide-scrollbar items-center scroll-smooth">
            {STANDARD_F_STOPS.map((val) => {
              const isSelected = fStop === val;
              return (
                <button 
                  key={val}
                  onClick={(e) => {
                    setFStop(val);
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                  className={`snap-center shrink-0 w-16 flex flex-col items-center gap-1 transition-all duration-300 ${
                    isSelected ? 'scale-110' : 'scale-90 opacity-40 hover:opacity-100'
                  }`}
                >
                  <div className={`w-[1px] h-3 ${isSelected ? 'bg-yellow-400' : 'bg-white/30'}`} />
                  <span className={`text-xs font-mono font-medium ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                    {val}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-white/30 font-medium px-1">
          <span>More Blur (f/1.0)</span>
          <span>More Sharp (f/22)</span>
        </div>
      </div>
    </motion.div>
  );
}
