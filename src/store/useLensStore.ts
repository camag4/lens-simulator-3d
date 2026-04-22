import { create } from 'zustand';
import { calculateOptics, SensorType, OpticsCalculationResult, SENSORS } from '../lib/opticsLogic';

interface LensState {
  // Inputs
  fStop: number;
  focalLength: number; // in mm
  distance: number; // in meters
  sensor: SensorType;
  
  // Derived Outputs (Calculated automatically)
  optics: OpticsCalculationResult;
  
  // Actions
  setFStop: (val: number) => void;
  setFocalLength: (val: number) => void;
  setDistance: (val: number) => void;
  setSensor: (val: SensorType) => void;
}

const INITIAL_STATE = {
  fStop: 2.8,
  focalLength: 50,
  distance: 2.0,
  sensor: "Full Frame" as SensorType,
};

export const useLensStore = create<LensState>((set) => ({
  ...INITIAL_STATE,
  optics: calculateOptics(
    INITIAL_STATE.fStop,
    INITIAL_STATE.focalLength,
    INITIAL_STATE.distance,
    INITIAL_STATE.sensor
  ),
  
  setFStop: (fStop) => set((state) => ({ 
    fStop, 
    optics: calculateOptics(fStop, state.focalLength, state.distance, state.sensor) 
  })),
  
  setFocalLength: (focalLength) => set((state) => ({ 
    focalLength, 
    optics: calculateOptics(state.fStop, focalLength, state.distance, state.sensor) 
  })),
  
  setDistance: (distance) => set((state) => ({ 
    distance, 
    optics: calculateOptics(state.fStop, state.focalLength, distance, state.sensor) 
  })),
  
  setSensor: (sensor) => set((state) => ({ 
    sensor, 
    optics: calculateOptics(state.fStop, state.focalLength, state.distance, sensor) 
  })),
}));

export const getSensorCoc = (sensorType: SensorType) => {
  return SENSORS[sensorType].coc;
};
