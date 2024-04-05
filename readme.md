### Vue.js 2 Multiple Themes

The Vue.js 2 Multiple Themes package allows you to implement multiple themes in your Vue.js application. It provides easy integration and customization options through CSS variables. This version exclusively uses SVG icons, eliminating the need for icon fonts.

---

![vue-multiple-themes](vue-multiple-themes.gif)

### Installation

You can install the package via npm or yarn:

1. **npm**
   ```bash
   npm install vue-multiple-themes
   ```

2. **Yarn**
   ```bash
   yarn add vue-multiple-themes
   ```

### Usage

After importing and registering the component in your Vue.js application, you can use it in your template:

```vue
<template>
    <div>
        <vue-multiple-themes
            :defaultTheme="'light'"
            :themeColorList="['light', 'dark', 'sepia']"
            :changeThemeOff="true"
        ></vue-multiple-themes>
    </div>
</template>

<script>
    import VueMultipleThemes from "vue-multiple-themes";
    export default {
        components: { VueMultipleThemes }
    };
</script>
```

You can also customize the styles and color palette by overriding the CSS variables:

```scss
@import "fonts.scss";

:root {
  --app-background-color: #ffffff;
  --app-title-color: #333333;
  --app-subtitle-color: #555555;
}

[theme="dark"] {
  --app-background-color: #333333;
  --app-title-color: #ffffff;
  --app-subtitle-color: #dddddd;
}

[theme="sepia"] {
  --app-background-color: #d0bc91;
  --app-title-color: #8a6c44;
  --app-subtitle-color: #5f4938;
}

.app-background {
  background-color: var(--app-background-color);
}

.app-title {
  color: var(--app-title-color);
}

.app-subtitle {
  color: var(--app-subtitle-color);
  padding-top: 10px;
}

.change-theme-box {
  cursor: pointer;
  color: var(--app-subtitle-color);
  font-size: 1em;
  font-weight: normal;
}
```

### Attributes

| Attribute      | Description                                    | Type    | Default      |
| -------------- | ---------------------------------------------- | ------- | ------------ |
| defaultTheme   | Default theme color                            | String  | 'light'      |
| themeColorList | List of available theme colors                 | Array   | ['light', 'dark', 'sepia'] |
| changeThemeOff | Show or hide the theme change button           | Boolean | true         |
| extraClass     | Additional custom class for the icon wrapper   | String  | null         |
