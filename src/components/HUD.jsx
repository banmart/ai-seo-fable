/* HUD — data telemetry overlay + section nav dots */
import { ZONES } from '../hooks/useScrollEngine';

export default function HUD() {
  return (
    <aside className="hud" role="complementary" aria-label="Scroll telemetry">
      <div className="hud__rail">
        <div className="hud__fill" id="hud-fill" />
      </div>
      <div className="hud__readout">
        <span className="hud__label" id="hud-zone-label">THE CHAOS</span>
        <span className="hud__metric">
          <span id="hud-counter">0</span>
          <span id="hud-unit">% VISIBILITY</span>
        </span>
        <span className="hud__index" id="hud-index">Z-01 / 05</span>
      </div>
      <nav className="hud__nav" aria-label="Section navigation">
        {ZONES.map((z, i) => (
          <a
            key={z.id}
            href={`#${z.id}`}
            data-dot={i + 1}
            aria-label={z.label}
          />
        ))}
      </nav>
    </aside>
  );
}
