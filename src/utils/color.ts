/**
 * color.ts — Pure color manipulation utilities.
 *
 * All functions are SSR-safe (no DOM access).
 * Everything operates on standard color formats:
 *   - Hex:  '#rgb' | '#rrggbb' | '#rrggbbaa'
 *   - HSL:  [h, s, l] where h∈[0,360), s/l∈[0,100]
 *   - RGB:  [r, g, b] where each channel ∈[0,255]
 */

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type HSL = [number, number, number];

// ─── Parsing ──────────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): RGB {
	const h = hex.replace("#", "");
	const full =
		h.length === 3
			? h
					.split("")
					.map((c) => c + c)
					.join("")
			: h;
	const n = Number.parseInt(full.slice(0, 6), 16);
	return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

export function rgbToHex(r: number, g: number, b: number): string {
	return (
		"#" +
		[r, g, b]
			.map((v) =>
				Math.round(Math.max(0, Math.min(255, v)))
					.toString(16)
					.padStart(2, "0"),
			)
			.join("")
	);
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	if (max === min) return [0, 0, Math.round(l * 100)];
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
	else if (max === gn) h = ((bn - rn) / d + 2) / 6;
	else h = ((rn - gn) / d + 4) / 6;
	return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToRgb(h: number, s: number, l: number): RGB {
	const hn = h / 360;
	const sn = s / 100;
	const ln = l / 100;
	if (sn === 0) {
		const v = Math.round(ln * 255);
		return [v, v, v];
	}
	const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
	const p = 2 * ln - q;
	const hue2rgb = (t: number) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};
	return [
		Math.round(hue2rgb(hn + 1 / 3) * 255),
		Math.round(hue2rgb(hn) * 255),
		Math.round(hue2rgb(hn - 1 / 3) * 255),
	];
}

export function hexToHsl(hex: string): HSL {
	return rgbToHsl(...hexToRgb(hex));
}

export function hslToHex(h: number, s: number, l: number): string {
	return rgbToHex(...hslToRgb(h, s, l));
}

/** Parse any CSS color string (hex, rgb(), hsl()) into [h,s,l]. */
export function parseColor(color: string): HSL {
	const c = color.trim();
	if (c.startsWith("#")) return hexToHsl(c);
	const rgbMatch = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
	if (rgbMatch) {
		return rgbToHsl(
			Number.parseInt(rgbMatch[1]),
			Number.parseInt(rgbMatch[2]),
			Number.parseInt(rgbMatch[3]),
		);
	}
	const hslMatch = c.match(/hsla?\((\d+),\s*(\d+)%?,\s*(\d+)%?/);
	if (hslMatch) {
		return [
			Number.parseInt(hslMatch[1]),
			Number.parseInt(hslMatch[2]),
			Number.parseInt(hslMatch[3]),
		];
	}
	// fallback: blue
	return [220, 90, 56];
}

// ─── Manipulation ─────────────────────────────────────────────────────────────

/** Lighten by a percentage of the current lightness delta toward 100. */
export function lighten(hex: string, amount: number): string {
	const [h, s, l] = hexToHsl(hex);
	return hslToHex(h, s, Math.min(100, l + amount));
}

/** Darken by reducing lightness. */
export function darken(hex: string, amount: number): string {
	const [h, s, l] = hexToHsl(hex);
	return hslToHex(h, s, Math.max(0, l - amount));
}

/** Saturate / desaturate. */
export function saturate(hex: string, amount: number): string {
	const [h, s, l] = hexToHsl(hex);
	return hslToHex(h, Math.min(100, Math.max(0, s + amount)), l);
}

/** Shift hue by `degrees`. */
export function rotateHue(hex: string, degrees: number): string {
	const [h, s, l] = hexToHsl(hex);
	return hslToHex((h + degrees + 360) % 360, s, l);
}

/** Mix two hex colors with a given weight (0 = full a, 1 = full b). */
export function mix(hexA: string, hexB: string, weight = 0.5): string {
	const [r1, g1, b1] = hexToRgb(hexA);
	const [r2, g2, b2] = hexToRgb(hexB);
	return rgbToHex(
		Math.round(r1 + (r2 - r1) * weight),
		Math.round(g1 + (g2 - g1) * weight),
		Math.round(b1 + (b2 - b1) * weight),
	);
}

/** Add alpha to a hex color, returning an rgba() string. */
export function withAlpha(hex: string, alpha: number): string {
	const [r, g, b] = hexToRgb(hex);
	return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Contrast & accessibility ─────────────────────────────────────────────────

/** Relative luminance per WCAG 2.1. */
export function luminance(hex: string): number {
	const [r, g, b] = hexToRgb(hex).map((v) => {
		const c = v / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio (≥4.5 = AA, ≥7 = AAA). */
export function contrastRatio(hexA: string, hexB: string): number {
	const la = luminance(hexA);
	const lb = luminance(hexB);
	const lighter = Math.max(la, lb);
	const darker = Math.min(la, lb);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Return whichever of `onLight` / `onDark` has higher contrast against `bg`.
 * Defaults to pure white / pure black.
 */
export function autoContrast(
	bg: string,
	onLight = "#ffffff",
	onDark = "#000000",
): string {
	const cl = contrastRatio(bg, onLight);
	const cd = contrastRatio(bg, onDark);
	return cl >= cd ? onLight : onDark;
}

/**
 * Ensure text color has at least WCAG AA contrast (4.5:1) against bg.
 * Iteratively darkens or lightens until the ratio is met.
 */
export function ensureContrast(
	text: string,
	bg: string,
	minRatio = 4.5,
): string {
	let candidate = text;
	const [h, s] = hexToHsl(candidate);
	const bgLum = luminance(bg);
	const darkBg = bgLum < 0.5;
	let l = hexToHsl(candidate)[2];

	for (let i = 0; i < 20; i++) {
		if (contrastRatio(candidate, bg) >= minRatio) break;
		l = darkBg ? Math.min(100, l + 5) : Math.max(0, l - 5);
		candidate = hslToHex(h, s, l);
	}
	return candidate;
}

// ─── Color scale generator ────────────────────────────────────────────────────

/**
 * Generate a Tailwind-style 11-stop scale from a single base color.
 * Returns an object: { 50, 100, 200, …, 900, 950 }
 */
export function generateColorScale(hex: string): Record<string, string> {
	const [h, s] = hexToHsl(hex);
	const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	// lightness curve: 50→97%, 500→mid, 950→4%
	const lightnesses = [97, 93, 86, 76, 64, 54, 44, 35, 25, 15, 8];
	const result: Record<string, string> = {};
	stops.forEach((stop, i) => {
		result[stop] = hslToHex(h, Math.min(s + 5, 100), lightnesses[i]);
	});
	return result;
}

// ─── Harmony generators ───────────────────────────────────────────────────────

/** Return complementary color (180° opposite). */
export function complementary(hex: string): string {
	return rotateHue(hex, 180);
}

/** Return [primary, split1, split2] for split-complementary harmony. */
export function splitComplementary(hex: string): [string, string, string] {
	return [hex, rotateHue(hex, 150), rotateHue(hex, 210)];
}

/** Return [primary, triadic1, triadic2] for triadic harmony. */
export function triadic(hex: string): [string, string, string] {
	return [hex, rotateHue(hex, 120), rotateHue(hex, 240)];
}

/** Return [primary, analogous1, analogous2] shifted by `angle` degrees. */
export function analogous(hex: string, angle = 30): [string, string, string] {
	return [hex, rotateHue(hex, angle), rotateHue(hex, -angle)];
}

// ─── Named CSS colors (subset) ───────────────────────────────────────────────

const NAMED_COLORS: Record<string, string> = {
	black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000',
	blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff',
	orange: '#ffa500', purple: '#800080', pink: '#ffc0cb', gray: '#808080',
	grey: '#808080', silver: '#c0c0c0', maroon: '#800000', olive: '#808000',
	lime: '#00ff00', aqua: '#00ffff', teal: '#008080', navy: '#000080',
	fuchsia: '#ff00ff', transparent: '#00000000',
}

// ─── Normalize any CSS color to space-separated RGB channels ──────────────────

/**
 * Normalize any CSS color value to space-separated RGB channels: `"R G B"`.
 *
 * This is the format required by Tailwind CSS for opacity modifier support,
 * e.g. `bg-primary/50` → `rgb(var(--vmt-primary) / 0.5)`.
 *
 * Accepts:
 *   - Hex:           `'#3b82f6'`, `'#fff'`, `'#3b82f680'`
 *   - RGB/RGBA:      `'rgb(59, 130, 246)'`, `'rgba(59, 130, 246, 0.5)'`
 *   - HSL/HSLA:      `'hsl(220, 90%, 56%)'`, `'hsla(220, 90%, 56%, 0.5)'`
 *   - Channel-only:  `'59 130 246'` (returned as-is)
 *   - Named:         `'red'`, `'white'`, etc. (common subset)
 *
 * @example
 * normalizeToRgbChannels('#3b82f6')        // '59 130 246'
 * normalizeToRgbChannels('rgb(59,130,246)') // '59 130 246'
 * normalizeToRgbChannels('hsl(220,90%,56%)') // '59 130 246'
 * normalizeToRgbChannels('59 130 246')      // '59 130 246'
 */
export function normalizeToRgbChannels(color: string): string {
	const c = color.trim()

	// Already in channel format: "R G B"
	if (/^\d{1,3}\s+\d{1,3}\s+\d{1,3}$/.test(c)) {
		return c
	}

	// Hex
	if (c.startsWith('#')) {
		const [r, g, b] = hexToRgb(c)
		return `${r} ${g} ${b}`
	}

	// rgb() / rgba()
	const rgbMatch = c.match(/rgba?\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/)
	if (rgbMatch) {
		return `${rgbMatch[1]} ${rgbMatch[2]} ${rgbMatch[3]}`
	}

	// hsl() / hsla()
	const hslMatch = c.match(/hsla?\(\s*(\d+)\s*[,\s]\s*(\d+)%?\s*[,\s]\s*(\d+)%?/)
	if (hslMatch) {
		const [r, g, b] = hslToRgb(
			Number.parseInt(hslMatch[1]),
			Number.parseInt(hslMatch[2]),
			Number.parseInt(hslMatch[3]),
		)
		return `${r} ${g} ${b}`
	}

	// Named color
	const named = NAMED_COLORS[c.toLowerCase()]
	if (named) {
		const [r, g, b] = hexToRgb(named)
		return `${r} ${g} ${b}`
	}

	// Fallback: try to parse as hex without #
	if (/^[0-9a-fA-F]{3,8}$/.test(c)) {
		const [r, g, b] = hexToRgb(`#${c}`)
		return `${r} ${g} ${b}`
	}

	// Last resort: return original value (CSS will use it as-is)
	return c
}
