<template>
    <div :class="extraClass" class="vue-multiple-themes">
    <span v-if="showChangeTheme" class="change-theme-box" @click="changeTheme()">
      <span v-for="(icon, index) in themeIcons" :key="index">
        <svg v-if="themeName === icon.name" :class="'icon-' + icon.name" :width="icon.width" :height="icon.height" :viewBox="icon.viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path :d="icon.path" :stroke="icon.stroke" :stroke-width="icon.strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
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
        themeIcons: {
            default: () => [
                { name: "dark", width: "24px", height: "24px", viewBox: "0 0 24 24", path: "M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z", stroke: "#ffffff", strokeWidth: "2" },
                { name: "light", width: "24px", height: "24px", viewBox: "0 0 24 24", path: "M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z", stroke: "#000000", strokeWidth: "2" },
                { name: "sepia", width: "24px", height: "24px", viewBox: "0 0 24 24", path: "M4 20H10.9433M10.9433 20H11.0567M10.9433 20C10.9622 20.0002 10.9811 20.0002 11 20.0002C11.0189 20.0002 11.0378 20.0002 11.0567 20M10.9433 20C7.1034 19.9695 4 16.8468 4 12.9998V8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V9M11.0567 20H18M11.0567 20C14.8966 19.9695 18 16.8468 18 12.9998M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V12.9998M18 9V12.9998M15 3L14 5M12 3L11 5M9 3L8 5", stroke: "#000000", strokeWidth: "2" }
            ],
            type: Array
        }
    },
    data() {
        return {
            theme: this.defaultTheme,
            counter: 0,
            themeName: this.defaultTheme,
            showChangeTheme: this.changeThemeOff,
        };
    },
    methods: {
        themeColor(themeColor) {
            this.theme = `${themeColor}`;
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
        if (!this.showChangeTheme) this.themeColor(this.defaultTheme);
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
