//
//
//
//
//
//
//
//
//
//
var script = {
  name: "VueMultipleThemes",
  props: {
    defaultTheme: {
      default: "light",
      type: String
    },
    themeColorList: {
      default: () => ["light", "dark", "sepia"],
      type: Array
    },
    extraClass: {
      default: '',
      type: String
    },
    changeThemeOff: {
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      theme: this.defaultTheme,
      counter: 0,
      themeName: this.defaultTheme,
      showChangeTheme: this.changeThemeOff
    };
  },

  computed: {
    showChangeThemeHandler() {
      if (!this.showChangeTheme) {
        this.theme = this.defaultTheme;
        this.themeName = this.theme;
        this.themeColor(this.theme);
      }
    }

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
    }

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
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-multiple-themes",
    class: _vm.extraClass
  }, [_vm.changeThemeOff ? _c('span', {
    staticClass: "change-theme-box",
    on: {
      "click": function ($event) {
        return _vm.changeTheme();
      }
    }
  }, [_vm.themeName === 'dark' ? _c('span', {
    staticClass: "icon-moon"
  }) : _vm._e(), _vm._v(" "), _vm.themeName === 'light' ? _c('span', {
    staticClass: "icon-sun"
  }) : _vm._e(), _vm._v(" "), _vm.themeName === 'sepia' ? _c('span', {
    staticClass: "icon-coffee"
  }) : _vm._e()]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-183ac2ec_0", {
    source: "@font-face{font-family:icomoon;src:url(fonts/icomoon.eot?5gakus);src:url(fonts/icomoon.eot?5gakus#iefix) format('embedded-opentype'),url(fonts/icomoon.ttf?5gakus) format('truetype'),url(fonts/icomoon.woff?5gakus) format('woff'),url(fonts/icomoon.svg?5gakus#icomoon) format('svg');font-weight:400;font-style:normal;font-display:block}[class*=\" icon-\"],[class^=icon-]{font-family:icomoon!important;speak:never;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-coffee:before{content:\"\\e900\"}.icon-moon:before{content:\"\\e901\"}.icon-sun:before{content:\"\\e902\"}:root{--app-background-color:#ffffff;--app-title-color:#333333;--app-subtitle-color:#555555}[theme=dark]{--app-background-color:#333333;--app-title-color:#ffffff;--app-subtitle-color:#dddddd}[theme=sepia]{--app-background-color:#d0bc91;--app-title-color:#8a6c44;--app-subtitle-color:#5f4938}.app-background{background-color:var(--app-background-color)}.app-title{color:var(--app-title-color)}.app-subtitle{color:var(--app-subtitle-color);padding-top:10px}.change-theme-box{cursor:pointer;color:var(--app-subtitle-color);font-size:1em;font-weight:400}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueMultipleThemes(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueMultipleThemes', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
