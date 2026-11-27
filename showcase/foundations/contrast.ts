// WCAG contrast for the token colors. Token values are oklch(L C H) or oklch(L C H / A%).

export type Rgb = [number, number, number];

export function parseOklch(
  value: string,
): { l: number; c: number; h: number; alpha: number } | null {
  const m = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)%\s*)?\)$/.exec(
    value.trim(),
  );
  if (!m) return null;
  return {
    l: Number(m[1]),
    c: Number(m[2]),
    h: Number(m[3]),
    alpha: m[4] === undefined ? 1 : Number(m[4]) / 100,
  };
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

// oklch -> linear sRGB (Bjorn Ottosson's matrices), then clipped to the sRGB gamut.
export function oklchToLinearRgb(l: number, c: number, h: number): Rgb {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    clamp01(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clamp01(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clamp01(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

export function luminance(rgb: Rgb): number {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

// Contrast of a text color on a background color. Colors with transparency return null (not a text pair).
export function contrastRatio(foreground: string, background: string): number | null {
  const f = parseOklch(foreground);
  const b = parseOklch(background);
  if (!f || !b || f.alpha < 1 || b.alpha < 1) return null;
  const lf = luminance(oklchToLinearRgb(f.l, f.c, f.h));
  const lb = luminance(oklchToLinearRgb(b.l, b.c, b.h));
  const [hi, lo] = lf > lb ? [lf, lb] : [lb, lf];
  return (hi + 0.05) / (lo + 0.05);
}

// Text pairs shown with a contrast ratio: every X-foreground on X, plus the muted and status colors on the page.
export function textPairs(names: readonly string[]): { text: string; on: string }[] {
  const pairs: { text: string; on: string }[] = [];
  for (const n of names) {
    if (n.endsWith('-foreground')) {
      const base = n.slice(0, -'-foreground'.length);
      if (names.includes(base)) pairs.push({ text: n, on: base });
    }
  }
  pairs.push({ text: 'muted-foreground', on: 'background' });
  pairs.push({ text: 'destructive', on: 'background' });
  return pairs.filter((p, i) => pairs.findIndex((q) => q.text === p.text && q.on === p.on) === i);
}
