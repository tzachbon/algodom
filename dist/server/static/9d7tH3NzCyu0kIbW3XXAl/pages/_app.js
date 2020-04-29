module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hUgY");


/***/ }),

/***/ "J7OV":
/***/ (function(module, exports) {

module.exports = require("mobx-react-lite/batchingForReactDom");

/***/ }),

/***/ "KKbo":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "YLY0":
/***/ (function(module, exports) {



/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "hUgY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "mobx-react"
var external_mobx_react_ = __webpack_require__("sGQ9");

// CONCATENATED MODULE: ./src/store/store.tsx
const store = {};
/* harmony default export */ var store_store = (store);
// CONCATENATED MODULE: ./src/store/context.tsx

var __jsx = external_react_default.a.createElement;



const storeContext = Object(external_react_["createContext"])({
  store: store_store
});

const useStores = () => Object(external_react_["useContext"])(storeContext);

const StoreProvider = ({
  children
}) => {
  const state = Object(external_mobx_react_["useLocalStore"])(() => ({
    store: store_store
  }));
  return __jsx(storeContext.Provider, {
    value: state
  }, children);
};


/* harmony default export */ var context = (useStores);
// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__("KKbo");

// EXTERNAL MODULE: ./src/utils/styles.tsx
var styles = __webpack_require__("ls66");

// CONCATENATED MODULE: ./src/utils/theme.tsx

var theme_jsx = external_react_default.a.createElement;


const theme = Object(core_["createMuiTheme"])({
  palette: {
    background: {},
    primary: {
      light: '#fff',
      main: Object(styles["a" /* getMainColor */])(),
      dark: '#333'
    },
    secondary: {
      main: '#40739e',
      light: '#fff',
      contrastText: '#eee'
    }
  },
  typography: {
    fontFamily: 'Nunito Sans, Roboto, sans-serif',
    fontSize: 20,
    allVariants: {
      color: Object(styles["a" /* getMainColor */])()
    }
  }
});

const Theme = ({
  children
}) => theme_jsx(core_["MuiThemeProvider"], {
  theme: theme
}, children);

/* harmony default export */ var utils_theme = (Theme);
// EXTERNAL MODULE: ./src/assets/scss/styles.scss
var scss_styles = __webpack_require__("kH1S");

// EXTERNAL MODULE: ./src/components/Container/style.scss
var style = __webpack_require__("qxvT");

// CONCATENATED MODULE: ./src/components/Container/index.tsx
var Container_jsx = external_react_default.a.createElement;




const Container = ({
  children
}) => {
  return Container_jsx("div", {
    className: "Container"
  }, Container_jsx("div", {
    className: "bg",
    style: {
      backgroundImage: `url('bg.jpg')`
    }
  }), Container_jsx("div", {
    className: "content"
  }, children));
};

/* harmony default export */ var components_Container = (Object(external_mobx_react_["observer"])(Container));
// EXTERNAL MODULE: external "mobx-react-lite/batchingForReactDom"
var batchingForReactDom_ = __webpack_require__("J7OV");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./src/pages/_app.tsx

var _app_jsx = external_react_default.a.createElement;








const App = ({
  Component,
  pageProps
}) => {
  return _app_jsx(StoreProvider, null, _app_jsx(utils_theme, null, _app_jsx(components_Container, null, _app_jsx(head_default.a, null, _app_jsx("title", null, "AlgoDOM")), _app_jsx(Component, pageProps))));
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (Object(external_mobx_react_["observer"])(App));

/***/ }),

/***/ "kH1S":
/***/ (function(module, exports) {



/***/ }),

/***/ "ls66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getMainColor; });
/* harmony import */ var _assets_scss_css_variables_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YLY0");
/* harmony import */ var _assets_scss_css_variables_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_css_variables_scss__WEBPACK_IMPORTED_MODULE_0__);


const getMainColor = () => {
  var _mainColor;

  let {
    main: mainColor
  } = _assets_scss_css_variables_scss__WEBPACK_IMPORTED_MODULE_0___default.a;
  mainColor = (_mainColor = mainColor) !== null && _mainColor !== void 0 ? _mainColor : '#0295f3';
  return mainColor;
};

/***/ }),

/***/ "qxvT":
/***/ (function(module, exports) {



/***/ }),

/***/ "sGQ9":
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ })

/******/ });