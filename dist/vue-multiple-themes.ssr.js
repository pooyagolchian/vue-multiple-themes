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
      showChangeTheme: this.changeThemeOff
    };
  },
  methods: {
    themeColor: function themeColor(_themeColor) {
      this.theme = _themeColor;
      document.title = "Multiple Themes in Vue.js";
      var bodyElement = document.body;
      bodyElement.classList.add("app-background");
      var htmlElement = document.documentElement;
      htmlElement.setAttribute("theme", _themeColor);
      localStorage.setItem("theme", _themeColor);
    },
    changeTheme: function changeTheme() {
      this.counter = (this.counter + 1) % this.themeColorList.length;
      this.themeName = this.themeColorList[this.counter];
      this.themeColor(this.themeName);
    }
  },
  mounted: function mounted() {
    if (!this.showChangeTheme) this.themeColor(this.defaultTheme);

    if (localStorage.getItem("theme") && this.showChangeTheme) {
      this.theme = localStorage.getItem("theme");
      this.themeName = this.theme;
      this.themeColor(this.theme);
    } else {
      this.themeColor(this.defaultTheme);
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
  }, [_vm._ssrNode(_vm.changeThemeOff ? "<div class=\"change-theme-box\" data-v-68e59412>" + (_vm.themeName === 'dark' ? "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" class=\"icon-moon\" data-v-68e59412><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" data-v-68e59412></path></svg>" : "<!---->") + " " + (_vm.themeName === 'light' ? "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" class=\"icon-sun\" data-v-68e59412><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\" data-v-68e59412></path></svg>" : "<!---->") + " " + (_vm.themeName === 'sepia' ? "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" class=\"icon-coffee\" data-v-68e59412><path d=\"M9 5h2V4H9c-1.1 0-2 .9-2 2v1c0 .55.45 1 1 1zm9-4h-2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V1H6v2c0 1.1-.9 2-2 2H2c-.55 0-1 .45-1 1v15c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-.55-.45-1-1-1zM8 22H4V9h4v13zm12 0h-4V9h4v13z\" data-v-68e59412></path></svg>" : "<!---->") + "</div>" : "<!---->")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-68e59412_0", {
    source: "[data-v-68e59412]:root{--app-background-color:#ffffff;--app-title-color:#333333;--app-subtitle-color:#555555}[theme=dark][data-v-68e59412]{--app-background-color:#333333;--app-title-color:#ffffff;--app-subtitle-color:#dddddd}[theme=sepia][data-v-68e59412]{--app-background-color:#d0bc91;--app-title-color:#8a6c44;--app-subtitle-color:#5f4938}.app-background[data-v-68e59412]{background-color:var(--app-background-color)}.app-title[data-v-68e59412]{color:var(--app-title-color)}.app-subtitle[data-v-68e59412]{color:var(--app-subtitle-color);padding-top:10px}.change-theme-box[data-v-68e59412]{cursor:pointer;color:var(--app-subtitle-color);font-size:1em;font-weight:400}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-68e59412";
/* module identifier */

var __vue_module_identifier__ = "data-v-68e59412";
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