/**
 * Gear and rack outlines for the blueprint drawings.
 *
 * Teeth are drawn in the "blueprint icon" style: straight flanks, flat tips and
 * roots, slightly rounded corners. All gears that mesh share one module `m`
 * (tooth size), so pitch radius = m * Z / 2 and centre distance = sum of pitch radii.
 * Tooth k is centred at angle 2πk/Z, so tooth 0 points along +x.
 */

export type Pt = readonly [number, number];

/** Tooth proportions: tip land and root land as a fraction of the angular pitch. */
export const TOOTH = { tip: 0.35, root: 0.52, addendum: 0.8, dedendum: 1.0 } as const;

const polar = (r: number, a: number): Pt => [r * Math.cos(a), r * Math.sin(a)];

function bezier(p0: Pt, p1: Pt, p2: Pt, n: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push([u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]]);
  }
  return out;
}

const unit = (v: Pt): Pt => {
  const l = Math.hypot(v[0], v[1]);
  return [v[0] / l, v[1] / l];
};

/** Rounds the corner at P with a quadratic curve that starts `d` back along `inDir` and ends `d` along `outDir`. */
function roundCorner(inDir: Pt, P: Pt, outDir: Pt, d: number, n = 3): Pt[] {
  const S: Pt = [P[0] + inDir[0] * d, P[1] + inDir[1] * d];
  const E: Pt = [P[0] + outDir[0] * d, P[1] + outDir[1] * d];
  return [S, ...bezier(S, P, E, n)];
}

export interface GearSpec {
  /** number of teeth */
  z: number;
  /** module: pitch diameter / teeth */
  m: number;
}

export function gearRadii({ z, m }: GearSpec) {
  const pitch = (m * z) / 2;
  return { pitch, tip: pitch + TOOTH.addendum * m, root: pitch - TOOTH.dedendum * m };
}

/** Closed outline of a spur gear centred on the origin. */
export function gearOutline(spec: GearSpec): Pt[] {
  const { z, m } = spec;
  const { tip: ra, root: rf } = gearRadii(spec);
  const half = Math.PI / z;
  const tipHalf = TOOTH.tip * half;
  const rootHalf = TOOTH.root * half;
  const rTip = 0.1 * m;
  const rRoot = 0.14 * m;

  // One side of tooth 0, from the middle of the gap up to the middle of the tip.
  const side: Pt[] = [];
  const rootCorner = polar(rf, -rootHalf);
  const tipCorner = polar(ra, -tipHalf);
  const flankUp = unit([tipCorner[0] - rootCorner[0], tipCorner[1] - rootCorner[1]]);
  const landEnd = -rootHalf - rRoot / rf;
  for (let i = 0; i <= 3; i++) side.push(polar(rf, -half + ((landEnd + half) * i) / 3));
  const alongRootBack = unit([Math.sin(-rootHalf), -Math.cos(-rootHalf)]);
  side.push(...roundCorner(alongRootBack, rootCorner, flankUp, rRoot).slice(1));
  const alongTip = unit([-Math.sin(-tipHalf), Math.cos(-tipHalf)]);
  side.push(...roundCorner([-flankUp[0], -flankUp[1]], tipCorner, alongTip, rTip));
  const a0 = -tipHalf + rTip / ra;
  for (let i = 1; i <= 3; i++) side.push(polar(ra, a0 * (1 - i / 3)));

  const mirrored = side
    .slice()
    .reverse()
    .slice(1)
    .map(([x, y]): Pt => [x, -y]);
  const tooth = [...side, ...mirrored];

  const out: Pt[] = [];
  for (let k = 0; k < z; k++) {
    const th = (2 * Math.PI * k) / z;
    const c = Math.cos(th);
    const s = Math.sin(th);
    const rotated = tooth.map(([x, y]): Pt => [x * c - y * s, x * s + y * c]);
    out.push(...(k === 0 ? rotated : rotated.slice(1)));
  }
  out.pop(); // last point equals the first
  return out;
}

export function toPath(pts: readonly Pt[], decimals = 2, close = true): string {
  const f = (n: number) => n.toFixed(decimals);
  const [first, ...rest] = pts;
  return `M${f(first[0])} ${f(first[1])} L${rest.map(([x, y]) => `${f(x)} ${f(y)}`).join(" ")}${close ? " Z" : ""}`;
}

export const gearPath = (spec: GearSpec) => toPath(gearOutline(spec));

/**
 * A straight rack (a gear with infinite radius) along +x, teeth pointing to -y.
 * Same tooth proportions as `gearOutline`, so a gear with the same module meshes with it.
 */
export function rackPath(opts: {
  firstToothX: number;
  module: number;
  pitchY: number;
  backY: number;
  length: number;
}): string {
  const { firstToothX, module: m, pitchY, backY, length } = opts;
  const p = Math.PI * m;
  const yTip = pitchY - TOOTH.addendum * m;
  const yRoot = pitchY + TOOTH.dedendum * m;
  const wt = (TOOTH.tip * p) / 2;
  const wr = (TOOTH.root * p) / 2;
  const rt = 0.4;
  const rr = 0.55;
  const fl = Math.hypot(wr - wt, yRoot - yTip);
  const ux = (wr - wt) / fl;
  const uy = (yRoot - yTip) / fl;

  const pts: Pt[] = [
    [0, backY],
    [0, yRoot],
  ];
  for (let cx = firstToothX; cx + wr <= length; cx += p) {
    if (cx - wr < 0) continue;
    const A: Pt = [cx - wr, yRoot];
    const B: Pt = [cx - wt, yTip];
    const C: Pt = [cx + wt, yTip];
    const D: Pt = [cx + wr, yRoot];
    pts.push([A[0] - rr, yRoot], ...bezier([A[0] - rr, yRoot], A, [A[0] + ux * rr, A[1] - uy * rr], 3));
    const b0: Pt = [B[0] - ux * rt, B[1] + uy * rt];
    pts.push(b0, ...bezier(b0, B, [B[0] + rt, yTip], 3));
    const c0: Pt = [C[0] - rt, yTip];
    pts.push(c0, ...bezier(c0, C, [C[0] + ux * rt, C[1] + uy * rt], 3));
    const d0: Pt = [D[0] - ux * rr, D[1] - uy * rr];
    pts.push(d0, ...bezier(d0, D, [D[0] + rr, yRoot], 3));
  }
  pts.push([length, yRoot], [length, backY]);
  return toPath(pts, 1, false);
}

/**
 * Outline radius as a function of angle from a tooth centre, sampled every
 * (pitch/2)/(n-1) radians. Used to let the ratchet pawl ride the teeth.
 */
export function radiusProfile(outline: readonly Pt[], z: number, n = 46): number[] {
  const halfPitch = Math.PI / z;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = (halfPitch * i) / (n - 1);
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    let best = 0;
    for (let j = 0; j < outline.length; j++) {
      const [x1, y1] = outline[j];
      const [x2, y2] = outline[(j + 1) % outline.length];
      // ray (t*dx, t*dy) vs segment (x1,y1)-(x2,y2)
      const ex = x2 - x1;
      const ey = y2 - y1;
      const den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-12) continue;
      const t = (x1 * ey - y1 * ex) / den;
      const u = (x1 * dy - y1 * dx) / den;
      if (t > 0 && u >= 0 && u <= 1) best = Math.max(best, t);
    }
    out.push(+best.toFixed(2));
  }
  return out;
}

/** Points every `step` units along a closed polygon. */
export function samplePolygon(poly: readonly Pt[], step: number): Pt[] {
  const out: Pt[] = [];
  let carry = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    const len = Math.hypot(x2 - x1, y2 - y1);
    let d = carry;
    while (d <= len) {
      out.push([x1 + ((x2 - x1) * d) / len, y1 + ((y2 - y1) * d) / len]);
      d += step;
    }
    carry = d - len;
  }
  return out;
}
