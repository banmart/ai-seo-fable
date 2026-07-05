/* ScrubStage — fixed canvas background layer */
export default function ScrubStage() {
  return (
    <div className="scrub-stage" aria-hidden="true">
      <img
        id="poster"
        className="poster"
        src="/assets/images/hero-core.webp"
        alt=""
        width="1376"
        height="768"
        decoding="async"
        fetchPriority="high"
      />
      <canvas id="scrub-canvas" />
      <div className="grade-overlay" />
    </div>
  );
}
