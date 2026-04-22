import { useLensStore } from '../../store/useLensStore';
import { motion } from 'framer-motion';

const glassmorphism = "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl";

export function StatsPanel() {
  const optics = useLensStore((state) => state.optics);
  const distance = useLensStore((state) => state.distance);

  // For the visual bar, let's map 0 to 50 meters
  const MAX_DIST = 50;
  
  // Calculate percentages for the visual bar
  const subjectPct = Math.min((distance / MAX_DIST) * 100, 100);
  const nearPct = Math.min((optics.dofNearLimitM / MAX_DIST) * 100, 100);
  
  // If far limit is infinity, the bar goes all the way to 100%
  const farPct = optics.dofFarLimitM === "Infinity" 
    ? 100 
    : Math.min((optics.dofFarLimitM / MAX_DIST) * 100, 100);

  const dofWidth = farPct - nearPct;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-2xl p-6 rounded-2xl ${glassmorphism} pointer-events-auto flex flex-col gap-6`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatItem 
          label="Near Focus" 
          value={optics.dofNearLimitM} 
          unit="m" 
          highlight={false} 
        />
        <StatItem 
          label="Far Focus" 
          value={optics.dofFarLimitM === "Infinity" ? "∞" : optics.dofFarLimitM}
          unit={optics.dofFarLimitM === "Infinity" ? "" : "m"} 
          highlight={false} 
        />
        <StatItem 
          label="Total Depth of Field" 
          value={optics.totalDofM === "Infinity" ? "∞" : optics.totalDofM}
          unit={optics.totalDofM === "Infinity" ? "" : "m"} 
          highlight={true} 
        />
        <StatItem 
          label="Hyperfocal Distance" 
          value={optics.hyperfocalDistanceM} 
          unit="m" 
          highlight={distance >= optics.hyperfocalDistanceM} 
          tooltip="Enfocando a esta distancia o más allá, todo hasta el infinito estará nítido."
        />
      </div>

      {/* Visual Depth Bar */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between text-[10px] text-white/50 font-medium uppercase tracking-widest">
          <span>Camera (0m)</span>
          <span>Infinity (50m+)</span>
        </div>
        
        <div className="relative h-6 bg-black/50 rounded-full overflow-hidden border border-white/10">
          {/* Base Grid marks inside the bar */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDBMMCAwaDB2MTBoMTBWMEoiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0wIDBMMCAxME0xMCAwaDB2MTBMMCAxMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] pointer-events-none" />
          
          {/* In-Focus Area (DoF) */}
          <motion.div 
            className="absolute top-0 bottom-0 bg-green-500/30 border-x border-green-400 flex items-center justify-end pr-2 overflow-hidden"
            animate={{ 
              left: `${nearPct}%`, 
              width: `${dofWidth}%` 
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
            {optics.dofFarLimitM === "Infinity" && (
              <span className="text-white/50 text-xs font-bold pointer-events-none">∞</span>
            )}
          </motion.div>

          {/* Subject Position Marker */}
          <motion.div 
            className="absolute top-0 bottom-0 w-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,1)] z-10"
            animate={{ left: `calc(${subjectPct}% - 2px)` }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/50 border border-green-400 rounded-sm" />
            <span className="text-xs text-white/60">In Focus (DoF)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-yellow-400 rounded-sm shadow-[0_0_5px_rgba(250,204,21,1)]" />
            <span className="text-xs text-white/60">Subject</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ 
  label, value, unit, highlight, tooltip 
}: { 
  label: string; value: number | string; unit: string; highlight: boolean; tooltip?: string;
}) {
  return (
    <div className={`flex flex-col p-3 rounded-xl border ${highlight ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-white/5 border-white/5'}`}>
      <span className="text-[10px] text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1">
        {label}
        {tooltip && (
          <span title={tooltip} className="cursor-help w-3 h-3 rounded-full bg-white/20 text-white flex items-center justify-center text-[8px]">?</span>
        )}
      </span>
      <span className={`text-2xl font-light ${highlight ? 'text-yellow-400' : 'text-white'}`}>
        {value} <span className="text-sm opacity-50">{unit}</span>
      </span>
    </div>
  );
}
