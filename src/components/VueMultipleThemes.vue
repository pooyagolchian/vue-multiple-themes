import {
	defineComponent,
	computed,
	ref,
	watch,
	onMounted,
	onBeforeUnmount,
	type PropType,
} from "vue-demi";
import type {
	ThemeDefinition,
	ThemeOptions,
	ThemeStrategy,
	ThemeTarget,
} from "../types";
import {
	buildCssVars,
	injectStyles,
	removeStyles,
} from "../utils/css-injector";
import {
	applyThemeToDom,
	readStorage,
	writeStorage,
	getSystemPreference,
} from "../utils/dom";
import { iconToSvg } from "../icons";

export default defineComponent({
	name: "VueMultipleThemes",

	props: {
		/** All available theme definitions */
		themes: {
			type: Array as PropType<ThemeDefinition[]>,
			default: () => [
				{
					name: "light",
					label: "Light",
					icon: "sun",
					colors: {
						primary: "#3b82f6",
						secondary: "#8b5cf6",
						accent: "#f59e0b",
						background: "#ffffff",
						surface: "#f8fafc",
						surfaceElevated: "#f1f5f9",
						text: "#111827",
						textMuted: "#6b7280",
						textInverse: "#ffffff",
						border: "#e5e7eb",
						ring: "#3b82f6",
						success: "#10b981",
						warning: "#f59e0b",
						error: "#ef4444",
						info: "#3b82f6",
					},
				},
				{
					name: "dark",
					label: "Dark",
					icon: "moon",
					colors: {
						primary: "#60a5fa",
						secondary: "#a78bfa",
						accent: "#fbbf24",
						background: "#0f172a",
						surface: "#1e293b",
						surfaceElevated: "#334155",
						text: "#f8fafc",
						textMuted: "#94a3b8",
						textInverse: "#0f172a",
						border: "#334155",
						ring: "#60a5fa",
						success: "#34d399",
						warning: "#fbbf24",
						error: "#f87171",
						info: "#60a5fa",
					},
				},
				{
					name: "sepia",
					label: "Sepia",
					icon: "coffee",
					colors: {
						primary: "#92400e",
						secondary: "#78350f",
						accent: "#d97706",
						background: "#fdf6e3",
						surface: "#f5e9c9",
						surfaceElevated: "#ede0b5",
						text: "#3c2415",
						textMuted: "#78583d",
						textInverse: "#fdf6e3",
						border: "#d6b896",
						ring: "#92400e",
						success: "#166534",
						warning: "#92400e",
						error: "#991b1b",
						info: "#1e40af",
					},
				},
			],
		},
		/** Active theme on first render (default: first in `themes`) */
		defaultTheme: {
			type: String,
			default: undefined,
		},
		/** How to stamp the theme on the DOM */
		strategy: {
			type: String as PropType<ThemeStrategy>,
			default: "attribute",
		},
		/** Attribute name (default: `data-theme`) */
		attribute: {
			type: String,
			default: "data-theme",
		},
		/** Class prefix (default: `theme-`) */
		classPrefix: {
			type: String,
			default: "theme-",
		},
		/** DOM element that receives the attribute / class */
		target: {
			type: String as PropType<ThemeTarget>,
			default: "html",
		},
		/** CSS variable prefix (default: `--vmt-`) */
		cssVarPrefix: {
			type: String,
			default: "--vmt-",
		},
		/** Inject CSS variables automatically */
		injectCssVars: {
			type: Boolean,
			default: true,
		},
		/** Persist theme in storage */
		storage: {
			type: String as PropType<"localStorage" | "sessionStorage" | "none">,
			default: "localStorage",
		},
		/** Storage key for persistence */
		storageKey: {
			type: String,
			default: "vmt-theme",
		},
		/** Respect OS dark/light preference on first load */
		respectSystemPreference: {
			type: Boolean,
			default: false,
		},
		/** Show the built-in toggle button */
		showToggle: {
			type: Boolean,
			default: true,
		},
		/** Show the label next to the icon */
		showLabel: {
			type: Boolean,
			default: false,
		},
		/** Size (px) of the toggle icon */
		iconSize: {
			type: Number,
			default: 20,
		},
		/** Extra CSS classes on the root wrapper */
		extraClass: {
			type: String,
			default: "",
		},
	},

	emits: ["change"],

	setup(props, { emit }) {
		// ── Resolve initial theme ───────────────────────────────────────────
		function getInitial(): string {
			if (props.storage !== "none") {
				const stored = readStorage(
					props.storageKey,
					props.storage as "localStorage" | "sessionStorage",
				);
				if (
					stored &&
					props.themes.some((t: ThemeDefinition) => t.name === stored)
				)
					return stored;
			}

			if (props.respectSystemPreference) {
				const pref = getSystemPreference();
				const match = props.themes.find(
					(t: ThemeDefinition) => t.name === pref,
				);
				if (match) return match.name;
			}

			if (
				props.defaultTheme &&
				props.themes.some((t: ThemeDefinition) => t.name === props.defaultTheme)
			) {
				return props.defaultTheme;
			}

			return props.themes[0]?.name ?? "light";
		}

		const currentName = ref<string>(getInitial());
		let previousName: string | null = null;

		const currentTheme = computed<ThemeDefinition>(
			() =>
				props.themes.find(
					(t: ThemeDefinition) => t.name === currentName.value,
				) ?? props.themes[0],
		);

		const isDark = computed<boolean>(() =>
			currentName.value.toLowerCase().includes("dark"),
		);

		const currentIconSvg = computed<string>(() =>
			iconToSvg(
				currentTheme.value.icon ?? "palette",
				props.iconSize,
				"currentColor",
				2,
			),
		);

		// ── Apply to DOM ────────────────────────────────────────────────────
		function applyTheme(name: string) {
			applyThemeToDom(name, previousName, {
				strategy: props.strategy,
				attribute: props.attribute,
				classPrefix: props.classPrefix,
				target: props.target,
			});
			previousName = name;

			if (props.storage !== "none") {
				writeStorage(
					props.storageKey,
					name,
					props.storage as "localStorage" | "sessionStorage",
				);
			}

			emit("change", currentTheme.value);
		}

		// ── Actions ─────────────────────────────────────────────────────────
		function setTheme(name: string) {
			if (!props.themes.some((t: ThemeDefinition) => t.name === name)) {
				console.warn(`[VueMultipleThemes] Unknown theme: "${name}"`);
				return;
			}
			currentName.value = name;
		}

		function nextTheme() {
			const idx = props.themes.findIndex(
				(t: ThemeDefinition) => t.name === currentName.value,
			);
			currentName.value = props.themes[(idx + 1) % props.themes.length].name;
		}

		function prevTheme() {
			const idx = props.themes.findIndex(
				(t: ThemeDefinition) => t.name === currentName.value,
			);
			currentName.value =
				props.themes[
					(idx - 1 + props.themes.length) % props.themes.length
				].name;
		}

		function toggleTheme() {
			if (props.themes.length < 2) return;
			const next = props.themes.find(
				(t: ThemeDefinition) => t.name !== currentName.value,
			);
			if (next) currentName.value = next.name;
		}

		// ── Lifecycle ────────────────────────────────────────────────────────
		onMounted(() => {
			if (props.injectCssVars) {
				const css = buildCssVars(props.themes, {
					strategy: props.strategy,
					attribute: props.attribute,
					classPrefix: props.classPrefix,
					cssVarPrefix: props.cssVarPrefix,
					target: props.target,
				});
				injectStyles(css);
			}
			applyTheme(currentName.value);
		});

		watch(currentName, (name) => {
			applyTheme(name);
		});

		onBeforeUnmount(() => {
			removeStyles();
		});

		return {
			currentName,
			currentTheme,
			isDark,
			currentIconSvg,
			setTheme,
			nextTheme,
			prevTheme,
			toggleTheme,
		};
	},
});
