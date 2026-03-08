# createBrandContext()

Factory for isolated, namespaced theme engines.

## Signature

```ts
function createBrandContext(
  defaults: ThemeOptions & { namespace: string }
): BrandContext
```

## Return Value

```ts
interface BrandContext {
  readonly namespace: string
  useTheme: (overrides?: Partial<ThemeOptions>) => UseThemeReturn
  BrandPlugin: { install: (app: App, overrides?: Partial<ThemeOptions>) => void }
}
```

| Property | Description |
|---|---|
| `namespace` | The namespace string used to create this context |
| `useTheme(overrides?)` | Composable scoped to this brand |
| `BrandPlugin` | Vue plugin for this brand — `app.use(ctx.BrandPlugin)` |

## Example

```ts
import { createBrandContext } from 'vue-multiple-themes'

const acme = createBrandContext({
  namespace: 'acme',
  themes: acmeThemes,
  cssVarPrefix: '--acme-',
  storageKey: 'acme-theme',
  defaultTheme: 'light',
  strategy: 'both',
})

// Register
app.use(acme.BrandPlugin)

// Use in any component
const { current, setTheme } = acme.useTheme()
```

See the [White-Label Guide](/guide/brand-context) for full documentation.
