"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.Dispatcher = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

var _flux = _interopRequireDefault(require("flux"));

var _lodash = require("lodash");

var _logger = _interopRequireDefault(require("carbon-react/lib/utils/logger"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dispatcher = new _flux.default.Dispatcher();
/**
 * Connects a view component to one or more flux based stores.
 *
 * It handles the following:
 *
 * * Registering and de-registering the listeners between the component and the store(s).
 * * Making the data available to the component from the store.
 * * Updating the component with the new state when the store emits a change.
 *
 * You can import this function with the following:
 *
 *   import { connect } from 'carbon-react/lib/utils/flux';
 *
 * You can then use the function like this:
 *
 *   connect(MyView, MyStore);
 *
 * With multiple stores, this will look like:
 *
 *   connect(MyView, [StoreOne, StoreTwo, StoreThree]);
 *
 * @method connect
 * @param {ReactComponent} ComposedView The view component to interact with the store(s).
 * @param {Object|Array} stores The store(s) you want to connect to the ComposedView.
 * @return {Class} An enhanced version of the ComposedView to work with flux stores.
 */

exports.Dispatcher = Dispatcher;

function connect(ComposedView, stores) {
  _logger.default.deprecate('connect has been deprecated in favour of the connect higher order component', {
    group: 'connect'
  }); // Build an object mapping any stores passed to the connect function, using
  // the store's class name as the key.


  var _stores = {};

  function _addStore(store) {
    _stores[store.name] = store;
  }

  if (stores.constructor === Array) {
    // if there are multiple stores, iterate through them and add them
    stores.forEach(function (store) {
      _addStore(store);
    });
  } else {
    // if there is a single store, just add it
    _addStore(stores);
  }
  /**
   * Extends the specified view component with additional functionality with working
   * with flux stores.
   *
   * @class View
   * @constructor
   */


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
      /**
       * Combines the view component's state with the data from the store.
       *
       * @property state
       * @type {Object}
       */

      _defineProperty(_assertThisInitialized(_this), "_onChange", function (key) {
        // update the state with the data for the store that changed
        _this.setState(_defineProperty({}, key, _stores[key].getState()));
      });

      _defineProperty(_assertThisInitialized(_this), "_getStoreStates", function () {
        var states = {};

        for (var key in _stores) {
          states[key] = _stores[key].getState();
        }

        return states;
      });

      _this.state = (0, _lodash.assign)({}, _this.state, _this._getStoreStates());
      return _this;
    }
    /**
     * Lifecycle method called by React when a component is mounted.
     *
     * @method componentDidMount
     * @return {void}
     */


    _createClass(View, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // ensure that the super view calls its version of componentDidMount

        /* istanbul ignore else */
        if (_get(_getPrototypeOf(View.prototype), "componentDidMount", this)) {
          _get(_getPrototypeOf(View.prototype), "componentDidMount", this).call(this);
        } // listen to each store when the view component mounts


        for (var key in _stores) {
          _stores[key].addChangeListener(this._onChange);
        }
      }
      /**
       * Lifecycle method called by React when a component is unmounted.
       *
       * @method componentWillUnmount
       * @return {void}
       */

    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // ensure that the super view calls its version of componentWillUnmount

        /* istanbul ignore else */
        if (_get(_getPrototypeOf(View.prototype), "componentWillUnmount", this)) {
          _get(_getPrototypeOf(View.prototype), "componentWillUnmount", this).call(this);
        } // unlisten to each store when the view component unmounts


        for (var key in _stores) {
          _stores[key].removeChangeListener(this._onChange);
        }
      }
      /**
       * A callback for whenever a store that is listened to emits a change.
       *
       * @method _onChange
       * @param {String} key The name for the store that changed.
       * @return {void}
       */

    }]);

    return View;
  }(ComposedView); // ensures that the new component has the original component's name


  View.displayName = ComposedView.displayName || ComposedView.name;
  return View;
}