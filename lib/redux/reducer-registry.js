"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _redux = require("redux");

var reducers = {};

var ReducerRegistry = function ReducerRegistry() {
  var _this = this;

  this.register = function (name, reducer) {
    reducers[name] = reducer;

    if (_this.store) {
      _this.store.replaceReducer((0, _redux.combineReducers)(reducers));
    }
  };

  this.createStore = function (initialReducers) {
    Object.assign(reducers, initialReducers);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this.store = _redux.createStore.apply(void 0, [(0, _redux.combineReducers)(reducers)].concat(args));
    return _this.store;
  };
};

var _default = new ReducerRegistry();

exports.default = _default;