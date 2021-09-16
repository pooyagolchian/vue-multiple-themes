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


<style>
@import "style.scss";
</style>
