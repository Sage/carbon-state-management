"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.Dispatcher = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

var _flux = _interopRequireDefault(require("flux"));

var _lodash = require("lodash");

var _reactRedux = require("react-redux");

var _logger = _interopRequireDefault(require("../logger"));

var _reducerRegistry = _interopRequireDefault(require("./reducer-registry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dispatcher = {
  register: function register() {},
  dispatch: function dispatch(action) {
    action.type = action.actionType;
    delete action.actionType;

    _reducerRegistry.default.store.dispatch(action);
  }
};
exports.Dispatcher = Dispatcher;

var buildPropsFromStores = function buildPropsFromStores(stores, data) {
  var props = {};

  if (stores.constructor === Array) {
    stores.forEach(function (store) {
      props[store.name] = data[store.name];
    });
  } else {
    props[stores.name] = data[stores.name];
  }

  return props;
};

function connect(ComposedView, stores) {
  var View =
  /*#__PURE__*/
  function (_ComposedView) {
    _inherits(View, _ComposedView);

    function View() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, View);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(View)).call.apply(_getPrototypeOf2, [this].concat(args)));
      var props = buildPropsFromStores(stores, _this.props);
      _this.state = (0, _lodash.assign)({}, _this.state, props);
      return _this;
    }

    _createClass(View, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (_get(_getPrototypeOf(View.prototype), "componentWillReceiveProps", this)) {
          _get(_getPrototypeOf(View.prototype), "componentWillReceiveProps", this).call(this, nextProps);
        }

        var props = buildPropsFromStores(stores, nextProps);
        this.setState(props);
      }
    }]);

    return View;
  }(ComposedView);

  var mapStateToProps = function mapStateToProps(state) {
    return buildPropsFromStores(stores, state);
  };

  var connectedView = (0, _reactRedux.connect)(mapStateToProps)(View);
  connectedView.displayName = ComposedView.displayName || ComposedView.name;
  connectedView._requiresReduxStore = true;
  connectedView._legacyConnect = true;
  return connectedView;
}