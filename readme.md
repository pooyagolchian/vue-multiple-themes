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

## Documents

| Attribute      |                 Description                 |    Type | Default                                               |
| -------------- | :-----------------------------------------: | ------: | ----------------------------------------------------- |
| defaultTheme   |                 Color name                  |  String | 'light'                                               |
| themeColorList |               Array of themes               |   Array | ["light", "dark", "sepia", "black", "coffee", "rose"] |
| changeThemeOff | Show or hide change click for change themes | Boolean | true                                                  |
