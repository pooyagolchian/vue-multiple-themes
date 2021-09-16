<template>
  <div :class="extraClass" class="vue-multiple-themes">
    <span v-if="changeThemeOff" class="change-theme-box" @click="changeTheme()">
      <span v-if="themeName === 'dark'" class="icon-moon"></span>
      <span v-if="themeName === 'light'" class="icon-sun"></span>
      <span v-if="themeName === 'sepia'" class="icon-coffee"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "VueMultipleThemes",
  props: {
    defaultTheme: {
      default: "light",
      type: String,
    },
    themeColorList: {
      default: () => ["light", "dark", "sepia"],
      type: Array,
    },
    extraClass: {
      default: '',
      type: String
    },
    changeThemeOff: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      theme: this.defaultTheme,
      counter: 0,
      themeName: this.defaultTheme,
      showChangeTheme: this.changeThemeOff,
    };
  },
  computed: {
    showChangeThemeHandler() {
      if (!this.showChangeTheme) {
        this.theme = this.defaultTheme;
        this.themeName = this.theme;
        this.themeColor(this.theme);
      }
    },
  },
  methods: {
    themeColor(themeColor) {
      this.theme = `${themeColor}`;
      document.title = "Multiple Themes in Vue.js";
      const bodyElement = document.body;
      bodyElement.classList.add("app-background");
      const htmlElement = document.documentElement;
      htmlElement.setAttribute("theme", `${themeColor}`);
      localStorage.setItem("theme", JSON.stringify(`${themeColor}`));
    },
    changeTheme() {
      this.counter = this.counter + 1;
      if (this.counter === this.themeColorList.length) {
        this.counter = 0;
      }
      this.themeName = this.themeColorList[this.counter];
      this.themeColor(this.themeName);
    },
  },
  mounted() {
    if (!this.showChangeTheme) this.showChangeThemeHandler();
    if (localStorage.getItem("theme") && this.showChangeTheme) {
      this.theme = JSON.parse(localStorage.getItem("theme"));
      const htmlElement = document.documentElement;
      htmlElement.setAttribute("theme", this.theme);
      this.themeName = this.theme;
      this.themeColor(this.theme);
    } else {
      this.theme = this.defaultTheme;
      this.themeName = this.theme;
      this.themeColor(this.theme);
    }
  },
};
</script>


<style lang="css">
@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?5gakus');
  src:  url('fonts/icomoon.eot?5gakus#iefix') format('embedded-opentype'),
  url('fonts/icomoon.ttf?5gakus') format('truetype'),
  url('fonts/icomoon.woff?5gakus') format('woff'),
  url('fonts/icomoon.svg?5gakus#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-coffee:before {
  content: "\e900";
}
.icon-moon:before {
  content: "\e901";
}
.icon-sun:before {
  content: "\e902";
}

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
</style>
