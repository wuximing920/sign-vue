module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "f41a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sign_vue_vue_type_style_index_0_id_77670ce5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fd8d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sign_vue_vue_type_style_index_0_id_77670ce5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sign_vue_vue_type_style_index_0_id_77670ce5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"07675b22-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Sign.vue?vue&type=template&id=77670ce5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"canvasHW",class:!_vm.flag ? 'rotate-scrren' : '',attrs:{"id":"canvasDiv"}},[(_vm.flag)?_c('div',{staticClass:"sign-text"},[_vm._v("请签名")]):_vm._e(),_c('div',{staticClass:"can-div"},[_c('div',{staticClass:"can_vans"},[_c('div',{staticClass:"van_inner"},[_c('canvas',{ref:"canvasF",attrs:{"id":"can_vans"},on:{"touchstart":_vm.touchStart,"touchmove":_vm.touchMove,"touchend":_vm.touchEnd,"mousedown":_vm.mouseDown,"mousemove":_vm.mouseMove,"mouseup":_vm.mouseUp}})])])]),_c('div',{staticClass:"btn-div"},[_c('div',{staticClass:"clear-btn",on:{"click":_vm.overwrite}},[_vm._v("清除")]),_c('div',{staticClass:"submit-btn",on:{"click":_vm.generate}},[_vm._v("提交并预览")])]),_c('img',{attrs:{"src":_vm.ImgSrc,"alt":""}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/Sign.vue?vue&type=template&id=77670ce5&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Sign.vue?vue&type=script&lang=js&
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

// import { Dialog } from "vant";
/* harmony default export */ var Signvue_type_script_lang_js_ = ({
  name: "Sign",
  props: {
    lineWidth: {
      type: Number,
      default: 4,
    },
    lineColor: {
      type: String,
      default: "#000000",
    },
    bgColor: {
      type: String,
      default: "",
    },
    isCrop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: true,
      ImgSrc: "",
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#000",
      linewidth: 3,
      isDraw: false, //签名标记
      resultImg: "",
      hasDrew: false,
    };
  },
  mounted() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.renderResize,
      false
    );
    let canvas = this.$refs.canvasF;
    canvas.style.background = "#FAFAFA";
    this.canvasTxt = canvas.getContext("2d");
    this.renderResize();

    // 在画板以外松开鼠标后冻结画笔
    document.onmouseup = () => {
      this.isDraw = false;
    };
  },
  methods: {
    // changeStatus(){

    // },
    renderResize() {
      var orientation = window.orientation;
      setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (orientation == 90 || orientation == -90) {
          //横屏
          this.rotateScreen(w, h);
        } else {
          this.initCanvas(w, h);
        }
      }, 50);
      if (orientation == 90 || orientation == -90) {
        //横屏
        this.flag = false;
      } else {
        this.flag = true;
      }
    },

    initCanvas(width) {
      let canvas = this.$refs.canvasF;
      canvas.height = 310;
      canvas.width = width - 75;
    },
    rotateScreen(width, height) {
      let canvas = this.$refs.canvasF;
      canvas.height = height - 114;
      canvas.width = width - 130;
    },
    mouseDown(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      /*this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath(); //开始作画
      this.points.push(obj); //记录点*/
      this.drawStart(obj);
      this.isDown = true;
    },
    touchStart(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        this.isDraw = true; //签名标记
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawStart(obj);
        /*this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath(); //开始作画
        this.points.push(obj); //记录点*/
      }
    },
    mouseMove(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.drawMove(obj);
        /*this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点*/
      }
    },
    touchMove(ev) {
      ev = ev || event;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawMove(obj);
        /*this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点*/
      }
    },
    mouseUp(ev) {
      ev = ev || event;
      // ev.preventDefault();
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.drawEnd(obj);
      /*this.canvasTxt.closePath(); //收笔
      this.points.push(obj); //记录点
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;*/
    },
    touchEnd(ev) {
      ev = ev || event;
      // ev.preventDefault();
      if (ev.touches.length == 1) {
        const ele = ev.targetTouches[0];
        let obj = {
          x: ele.clientX - ele.target.offsetLeft,
          y: ele.clientY - ele.target.offsetTop,
        };
        this.drawEnd(obj);
        /*this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 }); //记录点*/
      }
    },
    // 绘制
    drawStart(obj) {
      this.hasDrew = true;
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.lineWidth = this.lineWidth;
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
    },
    drawMove(obj) {
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.strokeStyle = this.lineColor;
      this.canvasTxt.lineWidth = this.lineWidth;
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.startY = obj.y;
      this.startX = obj.x;
      this.points.push(obj);
    },
    drawEnd(obj) {
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.lineCap = "round";
      this.canvasTxt.lineJoin = "round";
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
    },
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
      this.hasDrew = false;
    },
    getCropArea(imgData) {
      var topX = this.$refs.canvasF.width;
      var btmX = 0;
      var topY = this.$refs.canvasF.height;
      var btnY = 0;
      for (var i = 0; i < this.$refs.canvasF.width; i++) {
        for (var j = 0; j < this.$refs.canvasF.height; j++) {
          var pos = (i + this.$refs.canvasF.width * j) * 4;
          if (
            imgData[pos] > 0 ||
            imgData[pos + 1] > 0 ||
            imgData[pos + 2] ||
            imgData[pos + 3] > 0
          ) {
            btnY = Math.max(j, btnY);
            btmX = Math.max(i, btmX);
            topY = Math.min(j, topY);
            topX = Math.min(i, topX);
          }
        }
      }
      topX++;
      btmX++;
      topY++;
      btnY++;
      const data = [topX, topY, btmX, btnY];
      return data;
    },
    // 操作
    generate() {
      const pm = new Promise((resolve, reject) => {
        if (!this.hasDrew) {
          reject(`Warning: Not Signned!`);
          return;
        }
        var resImgData = this.canvasTxt.getImageData(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.canvasTxt.globalCompositeOperation = "destination-over";
        this.canvasTxt.fillStyle = "#fff";
        this.canvasTxt.fillRect(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.resultImg = this.$refs.canvasF.toDataURL();
        var resultImg = this.resultImg;
        this.canvasTxt.clearRect(
          0,
          0,
          this.$refs.canvasF.width,
          this.$refs.canvasF.height
        );
        this.canvasTxt.putImageData(resImgData, 0, 0);
        this.canvasTxt.globalCompositeOperation = "source-over";
        if (this.isCrop) {
          const crop_area = this.getCropArea(resImgData.data);
          var crop_canvas = document.createElement("canvas");
          const crop_ctx = crop_canvas.getContext("2d");
          crop_canvas.width = crop_area[2] - crop_area[0];
          crop_canvas.height = crop_area[3] - crop_area[1];
          const crop_imgData = this.canvasTxt.getImageData(...crop_area);
          crop_ctx.globalCompositeOperation = "destination-over";
          crop_ctx.putImageData(crop_imgData, 0, 0);
          crop_ctx.fillStyle = "#fff";
          crop_ctx.fillRect(0, 0, crop_canvas.width, crop_canvas.height);
          resultImg = crop_canvas.toDataURL();
          crop_canvas = null;
        }
        resolve(resultImg);
      });
      return pm.then((res) => {
        this.ImgSrc = res;
        console.log(this.ImgSrc);
      });
    },
  },
});

// CONCATENATED MODULE: ./src/Sign.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Signvue_type_script_lang_js_ = (Signvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/Sign.vue?vue&type=style&index=0&id=77670ce5&lang=scss&scoped=true&
var Signvue_type_style_index_0_id_77670ce5_lang_scss_scoped_true_ = __webpack_require__("f41a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/Sign.vue






/* normalize component */

var component = normalizeComponent(
  src_Signvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "77670ce5",
  null
  
)

/* harmony default export */ var Sign = (component.exports);
// CONCATENATED MODULE: ./src/index.js
// 导入日期选择器组件


// 存储组件列表
const components = [Sign];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var src_0 = ({
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components,
});

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0);



/***/ }),

/***/ "fd8d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=sign-vue.common.js.map