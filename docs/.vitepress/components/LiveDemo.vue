import { computed } from "vue";
import {
VueMultipleThemes,
useTheme,
PRESET_THEMES,
} from "vue-multiple-themes";

const { current, theme } = useTheme({
themes: PRESET_THEMES,
defaultTheme: "light",
storageKey: "vmt-docs-theme",
injectCssVars: false,
});

const currentLabel = computed(() => theme.label ?? theme.name);
const currentInitial = computed(() =>
(theme.label ?? theme.name).charAt(0).toUpperCase(),
);

const previewColors = computed(() => ({
primary: theme.colors.primary ?? "",
secondary: theme.colors.secondary ?? "",
accent: theme.colors.accent ?? "",
success: theme.colors.success ?? "",
warning: theme.colors.warning ?? "",
error: theme.colors.error ?? "",
}));

function getTextColor(hex: string): string {
// Simple luminance check for readable text on swatches
if (!hex || hex.startsWith("var")) return "#111827";
try {
const r = Number.parseInt(hex.slice(1, 3), 16);
const g = Number.parseInt(hex.slice(3, 5), 16);
const b = Number.parseInt(hex.slice(5, 7), 16);
const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
return luminance > 0.5 ? "#111827" : "#ffffff";
} catch {
return "#111827";
}
}
