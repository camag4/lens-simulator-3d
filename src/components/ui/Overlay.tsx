import { StatsPanel } from './StatsPanel';
import { ControlsPanel } from './ControlsPanel';

export function Overlay() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col md:flex-row justify-between p-0 md:p-6 pb-0 md:pb-6 overflow-hidden">
      
      {/* Top Left: HUD Stats */}
      <div className="w-full md:w-auto p-4 md:p-0">
        <StatsPanel />
      </div>

      {/* Bottom (Mobile) / Right (Desktop): Controls */}
      <div className="mt-auto md:mt-0 flex justify-end">
        <ControlsPanel />
      </div>

    </div>
  );
}
