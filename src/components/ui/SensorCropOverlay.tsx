import { useLensStore } from '../../store/useLensStore';
import { motion } from 'framer-motion';

export function SensorCropOverlay() {
  const sensor = useLensStore((state) => state.sensor);

  // We map the sensor crop factor to a percentage scale to simulate the crop visually.
  // Full Frame = 1.0 = 100% (No crop, frame fills screen)
  // APS-C = 1.52 crop
  // Micro 4/3 = 2.0 crop
  // Smartphone = 6.1 crop

  let scale = 1;
  let opacity = 0;
  let label = "";

  switch (sensor) {
    case "Full Frame":
      scale = 1;
      opacity = 0;
      break;
    case "APS-C":
      scale = 1 / 1.52; // roughly 65%
      opacity = 1;
      label = "APS-C Crop (1.5x)";
      break;
    case "Micro 4/3":
      scale = 1 / 2.0; // 50%
      opacity = 1;
      label = "Micro 4/3 Crop (2.0x)";
      break;
    case "Smartphone":
      scale = 1 / 6.1; // roughly 16%
      opacity = 1;
      label = "Smartphone Crop (6.1x)";
      break;
  }

  // To create a framing guide effect, we can use an SVG or borders.
  // We'll overlay a border that animates to the cropped size.
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <motion.div
        initial={false}
        animate={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          opacity: opacity,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="border-2 border-dashed border-white/50 relative flex items-start justify-start p-2"
        style={{
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)" // Darkens the area outside the crop
        }}
      >
        <span className="text-white/70 text-xs font-mono uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          {label}
        </span>
      </motion.div>
    </div>
  );
}