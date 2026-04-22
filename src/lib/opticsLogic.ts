export type SensorType = "Full Frame" | "APS-C" | "Micro 4/3" | "Smartphone";

export interface SensorData {
  coc: number; // Circle of Confusion in mm
  height: number; // Sensor height in mm
  crop: number; // Crop factor
}

export const SENSORS: Record<SensorType, SensorData> = {
  "Full Frame": { coc: 0.029, height: 24.0, crop: 1.0 },
  "APS-C": { coc: 0.019, height: 15.6, crop: 1.52 },
  "Micro 4/3": { coc: 0.015, height: 13.0, crop: 2.0 },
  "Smartphone": { coc: 0.002, height: 7.3, crop: 6.1 },
};

export const STANDARD_F_STOPS = [1.0, 1.2, 1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0, 22.0];

export interface OpticsCalculationResult {
  hyperfocalDistanceM: number;
  dofNearLimitM: number;
  dofFarLimitM: number | "Infinity";
  totalDofM: number | "Infinity";
  fovDegrees: number;
  equivalentFocalLengthMm: number;
}

export function calculateOptics(
  fStop: number,
  focalLengthMm: number,
  subjectDistanceM: number,
  sensorName: SensorType
): OpticsCalculationResult {
  const sensor = SENSORS[sensorName] || SENSORS["Full Frame"];
  
  const f_mm = focalLengthMm;
  const d_mm = subjectDistanceM * 1000;
  
  // Hyperfocal Distance: H = f + (f^2 / (N * c))
  const hyperfocal_mm = f_mm + Math.pow(f_mm, 2) / (fStop * sensor.coc);
  const hyperfocal_m = hyperfocal_mm / 1000;
  
  let near_mm = 0;
  let far_mm: number | typeof Infinity = 0;
  
  if (hyperfocal_mm > 0) {
    // Near limit
    near_mm = (hyperfocal_mm * d_mm) / (hyperfocal_mm + (d_mm - f_mm));
    
    // Far limit
    const denominator_far = hyperfocal_mm - (d_mm - f_mm);
    if (denominator_far <= 0) {
      far_mm = Infinity;
    } else {
      far_mm = (hyperfocal_mm * d_mm) / denominator_far;
    }
  }

  const near_m = near_mm / 1000;
  const far_m = far_mm === Infinity ? "Infinity" : far_mm / 1000;
  
  let total_dof_m: number | "Infinity" = "Infinity";
  if (far_mm !== Infinity) {
    total_dof_m = (far_mm - near_mm) / 1000;
  }
  
  // FOV calculation
  const fov_rad = 2 * Math.atan(sensor.height / (2 * f_mm));
  const fov_deg = fov_rad * (180 / Math.PI);
  
  // Effective focal length
  const eq_focal = f_mm * sensor.crop;
  
  return {
    hyperfocalDistanceM: Number(hyperfocal_m.toFixed(3)),
    dofNearLimitM: Number(near_m.toFixed(3)),
    dofFarLimitM: far_m === "Infinity" ? "Infinity" : Number(far_m.toFixed(3)),
    totalDofM: total_dof_m === "Infinity" ? "Infinity" : Number(total_dof_m.toFixed(3)),
    fovDegrees: Number(fov_deg.toFixed(2)),
    equivalentFocalLengthMm: Number(eq_focal.toFixed(1)),
  };
}
