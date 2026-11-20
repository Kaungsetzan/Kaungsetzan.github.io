/**
 * Geometry of the hero mechanism, in SVG user units (viewBox "10 14 530 420").
 *
 * Gear A (16 teeth) drives gear B (10) which drives gear C (12), all module 9.
 * Gear A is the master: every other angle is derived from its angle `a` (degrees).
 * The phase offsets were solved so a tooth of one gear sits in a gap of the next
 * along the line of centres, and the overlap was checked for a full tooth cycle.
 */
import { gearOutline, gearPath, gearRadii, radiusProfile, samplePolygon, toPath, type Pt } from "./gears";

export const MODULE = 9;
export const GEAR_A = { z: 16, m: MODULE, cx: 190, cy: 300 } as const;
export const GEAR_B = { z: 10, m: MODULE, cx: 283.6, cy: 229.8, phase: 138.14 } as const;
export const GEAR_C = { z: 12, m: MODULE, cx: 356.92, cy: 296.32, phase: 217.28 } as const;

export const angleB = (a: number) => GEAR_B.phase - (a * GEAR_A.z) / GEAR_B.z;
export const angleC = (a: number) => GEAR_C.phase + (a * GEAR_A.z) / GEAR_C.z;

/** d(angle of A) per d(angle of the gear the user is dragging). */
export const DRAG_RATIO = { A: 1, B: -GEAR_B.z / GEAR_A.z, C: GEAR_C.z / GEAR_A.z } as const;

export const PATHS = {
  gearA: gearPath(GEAR_A),
  gearB: gearPath(GEAR_B),
  gearC: gearPath(GEAR_C),
};
export const RADII = { A: gearRadii(GEAR_A), B: gearRadii(GEAR_B), C: gearRadii(GEAR_C) };

/* ---- crank-slider: crank pin on gear B drives a piston in a vertical cylinder ---- */
export const CRANK = { radius: 20, rod: 110, cylinderX: 283.38 } as const;

export function crankSlider(thetaBdeg: number) {
  const t = (thetaBdeg * Math.PI) / 180;
  const px = GEAR_B.cx + CRANK.radius * Math.cos(t);
  const py = GEAR_B.cy + CRANK.radius * Math.sin(t);
  const dx = px - CRANK.cylinderX;
  const pistonY = py - Math.sqrt(CRANK.rod * CRANK.rod - dx * dx);
  return { px, py, pistonY };
}

/* ---- cam on gear C pushes a spring-loaded follower to the right ---- */
export const camRadius = (psi: number) => 23 + 12 * Math.pow((1 + Math.cos(psi)) / 2, 2);

export const CAM_PATH = (() => {
  const pts: Pt[] = [];
  for (let i = 0; i < 72; i++) {
    const psi = (i / 72) * Math.PI * 2;
    const r = camRadius(psi);
    pts.push([r * Math.cos(psi), r * Math.sin(psi)]);
  }
  return toPath(pts);
})();

/** x of the follower roller centre for a gear C angle (the follower slides on y = cy). */
export const followerX = (thetaCdeg: number) => GEAR_C.cx + camRadius((-thetaCdeg * Math.PI) / 180) + 6;

export function springPath(followerXpos: number) {
  const s0 = 446.92;
  const s1 = followerXpos + 106;
  const coils = 8;
  let d = `M${s0.toFixed(1)} ${GEAR_C.cy}`;
  for (let k = 1; k < coils * 2; k++) {
    d += ` L${(s0 + ((s1 - s0) * k) / (coils * 2)).toFixed(1)} ${(GEAR_C.cy + (k % 2 ? -8 : 8)).toFixed(1)}`;
  }
  return `${d} L${s1.toFixed(1)} ${GEAR_C.cy}`;
}

/* ---- ratchet pawl on gear A ---- */
// The pawl lies along the wheel's edge and points the way the teeth move (gear A turns
// clockwise, so on its left side the teeth move up). At rest its hook sits in a gap.
export const PAWL = {
  pivot: [86.79, 306.6] as Pt,
  angle: -38.75,
  shape: [
    [0, -6], [36, -4.8], [41.6, -2.6], [44.2, 2.6], [43.8, 8.4],
    [40.4, 9.4], [34.5, 5.4], [28, 5], [0, 6],
  ] as Pt[],
};
export const PAWL_PATH = toPath(PAWL.shape, 1);

const PAWL_SAMPLES = samplePolygon(PAWL.shape, 1.5).filter(([x]) => x > 12); // the hub end never reaches the teeth
const PROFILE_A = radiusProfile(gearOutline(GEAR_A), GEAR_A.z);
const PITCH_A = 360 / GEAR_A.z;
const PROFILE_STEP = PITCH_A / 2 / (PROFILE_A.length - 1);

function pawlClear(a: number, lift: number) {
  const t = ((PAWL.angle - lift) * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  for (const [lx, ly] of PAWL_SAMPLES) {
    const x = PAWL.pivot[0] + lx * c - ly * s - GEAR_A.cx;
    const y = PAWL.pivot[1] + lx * s + ly * c - GEAR_A.cy;
    const r = Math.hypot(x, y);
    const th = (Math.atan2(y, x) * 180) / Math.PI - a;
    let psi = ((th % PITCH_A) + PITCH_A) % PITCH_A;
    if (psi > PITCH_A / 2) psi = PITCH_A - psi;
    const f = psi / PROFILE_STEP;
    const j = Math.min(PROFILE_A.length - 2, Math.floor(f));
    const R = PROFILE_A[j] + (PROFILE_A[j + 1] - PROFILE_A[j]) * (f - j);
    if (r < R + 0.5) return false;
  }
  return true;
}

/**
 * Smallest lift (degrees, pawl rotated away from the wheel) that keeps the pawl clear
 * of gear A's teeth. Steps up from zero: clearance is not monotonic in the lift (a
 * half-lifted hook can swing into the tooth ahead), so bisection would jump over it.
 */
export function pawlLift(a: number) {
  if (pawlClear(a, 0)) return 0;
  let d = 0;
  while (d < 40 && !pawlClear(a, d + 0.5)) d += 0.5;
  let lo = d;
  let hi = d + 0.5;
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    if (pawlClear(a, mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}
