const HEX = "8,0 4,6.9 -4,6.9 -8,0 -4,-6.9 4,-6.9";

function Bolt({ className }: { className: string }) {
  return (
    <svg width="18" height="18" viewBox="-9 -9 18 18" aria-hidden="true" className={`absolute ${className}`}>
      <polygon points={HEX} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle r="3.4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Four hex bolts in the corners of a positioned parent, like a plate screwed to the sheet. */
export function CornerBolts() {
  return (
    <>
      <Bolt className="top-2.5 left-2.5" />
      <Bolt className="top-2.5 right-2.5" />
      <Bolt className="bottom-2.5 left-2.5" />
      <Bolt className="right-2.5 bottom-2.5" />
    </>
  );
}
