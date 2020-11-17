### Vue.js Multiple Themes

1- Vue.js multipe theme and store in array and work with css variable

2- Easy to use and add themes (Color Plallet)

![vue-multiple-themes](vue-multiple-themes.gif)

### Install package

1. Install with npm `npm i vue-multiple-themes`
2. Install with yarn `yarn add vue-multiple-themes`

### Code sample

After import and register component in your Vue.js application:

```javascript
<template>
  <div>
    <vue-multiple-themes
          :defaultTheme="'light'"
          :themeColorList="[
            'light',
            'dark',
            'sepia',
            'black',
            'coffee',
            'rose',
          ]"
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

- You can override and change style and color pallet to array!

```css
<style lang="css" scoped>
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

[theme="black"] {
  --app-background-color: #000000;
  --app-title-color: #ffffff;
  --app-subtitle-color: #dddddd;
}

[theme="coffee"] {
  --app-background-color: #394545;
  --app-title-color: #aab1b3;
  --app-subtitle-color: #e9e5e3;
}

[theme="rose"] {
  --app-background-color: #2e1a1e;
  --app-title-color: #bcb8ce;
  --app-subtitle-color: #d5ddef;
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
  font-size: 20px;
  font-weight: bold;
}
</style>
```

## Documents

| Attribute      |                 Description                 |    Type | Default                                               |
| -------------- | :-----------------------------------------: | ------: | ----------------------------------------------------- |
| defaultTheme   |                 Color name                  |  String | 'light'                                               |
| themeColorList |               Array of themes               |   Array | ["light", "dark", "sepia", "black", "coffee", "rose"] |
| changeThemeOff | Show or hide change click for change themes | Boolean | true                                                  |
