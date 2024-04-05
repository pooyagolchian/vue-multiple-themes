'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
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
//
var script = {
  name: "VueMultipleThemes",
  props: {
    defaultTheme: {
      default: "light",
      type: String
    },
    themeColorList: {
      default: function _default() {
        return ["light", "dark", "sepia"];
      },
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
  data: function data() {
    return {
      theme: this.defaultTheme,
      counter: 0,
      themeName: this.defaultTheme,
      showChangeTheme: this.changeThemeOff,
      themeIcons: [{
        name: "dark",
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        path: "M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z",
        stroke: "#ffffff",
        strokeWidth: "2"
      }, {
        name: "light",
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        path: "M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",
        stroke: "#000000",
        strokeWidth: "2"
      }, {
        name: "sepia",
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        path: "M4 20H10.9433M10.9433 20H11.0567M10.9433 20C10.9622 20.0002 10.9811 20.0002 11 20.0002C11.0189 20.0002 11.0378 20.0002 11.0567 20M10.9433 20C7.1034 19.9695 4 16.8468 4 12.9998V8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V9M11.0567 20H18M11.0567 20C14.8966 19.9695 18 16.8468 18 12.9998M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V12.9998M18 9V12.9998M15 3L14 5M12 3L11 5M9 3L8 5",
        stroke: "#000000",
        strokeWidth: "2"
      }]
    };
  },
  methods: {
    themeColor: function themeColor(_themeColor) {
      this.theme = "".concat(_themeColor);
      document.title = "Multiple Themes in Vue.js";
      var bodyElement = document.body;
      bodyElement.classList.add("app-background");
      var htmlElement = document.documentElement;
      htmlElement.setAttribute("theme", "".concat(_themeColor));
      localStorage.setItem("theme", JSON.stringify("".concat(_themeColor)));
    },
    changeTheme: function changeTheme() {
      this.counter = this.counter + 1;

      if (this.counter === this.themeColorList.length) {
        this.counter = 0;
      }

      this.themeName = this.themeColorList[this.counter];
      this.themeColor(this.themeName);
    }
  },
  mounted: function mounted() {
    if (!this.showChangeTheme) this.themeColor(this.defaultTheme);

    if (localStorage.getItem("theme") && this.showChangeTheme) {
      this.theme = JSON.parse(localStorage.getItem("theme"));
      var htmlElement = document.documentElement;
      htmlElement.setAttribute("theme", this.theme);
      this.themeName = this.theme;
      this.themeColor(this.theme);
    } else {
      this.theme = this.defaultTheme;
      this.themeName = this.theme;
      this.themeColor(this.theme);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-multiple-themes",
    class: _vm.extraClass
  }, [_vm._ssrNode(_vm.showChangeTheme ? "<span class=\"change-theme-box\">" + _vm._ssrList(_vm.themeIcons, function (icon, index) {
    return "<span>" + (_vm.themeName === icon.name ? "<svg" + _vm._ssrAttr("width", icon.width) + _vm._ssrAttr("height", icon.height) + _vm._ssrAttr("viewBox", icon.viewBox) + " fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"" + _vm._ssrClass(null, 'icon-' + icon.name) + "><path" + _vm._ssrAttr("d", icon.path) + _vm._ssrAttr("stroke", icon.stroke) + _vm._ssrAttr("stroke-width", icon.strokeWidth) + " stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>" : "<!---->") + "</span>";
  }) + "</span>" : "<!---->")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-53343e5f_0", {
    source: ":root{--app-background-color:#ffffff;--app-title-color:#333333;--app-subtitle-color:#555555}[theme=dark]{--app-background-color:#333333;--app-title-color:#ffffff;--app-subtitle-color:#dddddd}[theme=sepia]{--app-background-color:#d0bc91;--app-title-color:#8a6c44;--app-subtitle-color:#5f4938}.app-background{background-color:var(--app-background-color)}.app-title{color:var(--app-title-color)}.app-subtitle{color:var(--app-subtitle-color);padding-top:10px}.change-theme-box{cursor:pointer;color:var(--app-subtitle-color);font-size:1em;font-weight:400}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-53343e5f";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueMultipleThemes(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueMultipleThemes', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports['default']=__vue_component__;