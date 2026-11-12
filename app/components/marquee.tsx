const TRACK_REPEAT = 2;

export default function Marquee({ items }: { items: string[] }) {
  const track = Array.from({ length: TRACK_REPEAT }).flatMap(() => items);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
