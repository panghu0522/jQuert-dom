// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"ZC2/":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    var elements = void 0; //const ???????????????
    if (typeof selectorOrArrayOrTemplate === 'string') {
        //???????????????????????????
        if (selectorOrArrayOrTemplate[0] === '<') {
            // ?????? div
            elements = [createElement(selectorOrArrayOrTemplate)];
        } else {
            // ?????? div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArray instanceof Array) {
        //????????????????????????
        elements = selectorOrArray;
    }
    function createElement(string) {
        var container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // api ????????????elements
    var api = Object.create(jQuery.prototype); // ???????????????????????????????????? __proto__ ????????????????????????
    // const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    });
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api;
};
jQuery.fn = jQuery.prototype = { //????????????????????????????????????????????????????????????
    //????????????????????????????????????
    constructor: jQuery,
    jquery: true,
    elements: elements,
    get: function get(index) {
        return this.elements[index];
    },
    appendTo: function appendTo(node) {
        if (node instanceof Element) {
            // ?????? elements???????????? el ?????? node.appendChild ??????
            this.each(function (el) {
                return node.appendChild(el);
            });
        } else if (node.jquery === true) {
            // ?????? elements???????????? el ?????? node.get(0).appendChild(el))  ??????
            this.each(function (el) {
                return node.get(0).appendChild(el);
            });
        }
    },
    append: function append(children) {
        var _this = this;

        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (var _i = 0; _i < children.length; _i++) {
                this.get(0).appendChild(children[_i]);
            }
        } else if (children.jquery === true) {
            children.each(function (node) {
                return _this.get(0).appendChild(node);
            });
        }
    },
    prepend: function prepend(children) {
        var _this2 = this;

        if (children instanceof Element) {
            this.get(0).prepend(children);
        } else if (children instanceof HTMLCollection) {
            for (var _i2 = 0; _i2 < children.length; _i2++) {
                this.get(0).prepend(children[_i2]);
            }
        } else if (children.jquery === true) {
            children.each(function (node) {
                return _this2.get(0).prepend(node);
            });
        }
    },
    after: function after(node) {
        var _this3 = this;

        if (node instanceof Element) {
            this.get(0).after(node[i]);
        } else if (node instanceof HTMLCollection) {
            for (var _i3 = 0; _i3 < node.length; _i3++) {
                this.get(0).after(node[_i3]);
            }
        } else if (node.jquery === true) {
            node.each(function (node) {
                return _this3.get(0).after(node);
            });
        }
    },
    before: function before(node) {
        var _this4 = this;

        if (node instanceof Element) {
            this.get(0).before(node[i]);
        } else if (node instanceof HTMLCollection) {
            for (var _i4 = 0; _i4 < node.length; _i4++) {
                this.get(0).before(node[_i4]);
            }
        } else if (node.jquery === true) {
            node.each(function (node) {
                return _this4.get(0).before(node);
            });
        }
    },
    addClass: function addClass(className) {
        for (var _i5 = 0; _i5 < elements.length; _i5++) {
            elements[_i5].classList.add(className);
        }
        return this;
    },
    find: function find(selector) {
        var array = [];
        for (var _i6 = 0; _i6 < elements.length; _i6++) {
            var elements2 = Array.from(elements[_i6].querySelectorAll(selector));
            array = array.concat(elements2);
        }
        //return arr //??????arr???????????????????????????
        //?????????????????????????????????api??? ??????jquery??????????????????this????????????????????????????????????
        array.oldApi = this; // this ?????? api
        return jQuery(array);
    },
    end: function end() {
        //?????????????????????
        return this.oldApi; //this ??????api
    },
    each: function each(fn) {
        for (var _i7 = 0; _i7 < elements.length; _i7++) {
            fn.call(null, elements[_i7], _i7);
        }
        return this;
    },
    parent: function parent() {
        var array = [];
        this.each(function (node) {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode);
            }
        });
        return jQuery(array);
    },
    children: function children() {
        var array = [];
        this.each(function (node) {
            if (array.indexOf(node.childNode) === -1) {
                array.push.apply(array, _toConsumableArray(node.children));
            }
        });
        return jQuery(array);
    },
    print: function print() {
        console.log(elements); //?????????????????????????????????
    },
    on: function on(eventType, fn) {
        this.each(function (node) {
            node.addEventListener(eventType, fn);
        });
    }
};
},{}]},{},["ZC2/"], null)
//# sourceMappingURL=jquery.746bfe3a.map