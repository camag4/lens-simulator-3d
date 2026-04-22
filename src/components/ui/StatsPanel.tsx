import { useLensStore } from '../../store/useLensStore';
import { motion } from 'framer-motion';

const glassmorphism = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";

export function StatsPanel() {
  const optics = useLensStore((state) => state.optics);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl ${glassmorphism} pointer-events-auto`}
    >
      <StatItem label="Near Focus" value={optics.dofNearLimitM} unit="m" />
      <StatItem label="Far Focus" value={optics.dofFarLimitM} unit={optics.dofFarLimitM === "Infinity" ? "" : "m"} />
      <StatItem label="Total DoF" value={optics.totalDofM} unit={optics.totalDofM === "Infinity" ? "" : "m"} />
      <StatItem label="Hyperfocal" value={optics.hyperfocalDistanceM} unit="m" />
    </motion.div>
  );
}

function StatItem({ label, value, unit }: { label: string; value: number | string; unit: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
      <span className="text-xl font-light text-white">
        {value} <span className="text-sm text-white/40">{unit}</span>
      </span>
    </div>
  );
}
