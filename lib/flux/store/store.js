"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.function.name");

var _events = require("events");

var _flux = require("../flux");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A constant used for the change event within this module.
 *
 * @property CHANGE_EVENT
 * @type String
 * @final
 */
var CHANGE_EVENT = 'change';
/**
 * A base class that can be used to extend a store with boilerplate to work with
 * a flux based architecture.
 *
 * It provides the following:
 *
 * * A method to return data from the store.
 * * A method to determine if the store should react to an action from the dispatcher.
 * * Methods to setup or remove change listeners with a specified callback.
 * * Methods to handle interaction with data history (eg. undo, redo and reset).
 *
 * You can import this class with the following:
 *
 *   import Store from 'carbon-react/lib/utils/flux/store';
 *
 * You can then use the imported store to extend your defined store class:
 *
 *   class MyStore extends Store {
 *   }
 *
 *   // get the initial data for your store
 *   let data = ImmutableHelper.parse({});
 *
 *   // You should initialize your store with a name and its data.
 *   //
 *   // optional - By enabling history in the opts, the store will collect
 *   // any data interaction. You should only set this if you intend to
 *   // use the data collected.
 *   // optional - You can pass in a custom dispatcher in the opts.
 *   export default new MyStore("myStore", data, { history: true });
 *
 * Please note, you should initialize your store with a name and initial data.
 * You can also pass a third param of additional options which allows you to
 * enable history or supply a custom dispatcher for your store.
 *
 * @class Store
 * @param {String} name
 * @param {Object} data
 * @param {Object} opts
 * @constructor
 * @extends EventEmitter
 */

var Store =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(name, data) {
    var _this;

    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Store);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this, name, data, opts));

    _defineProperty(_assertThisInitialized(_this), "addChangeListener", function (callback) {
      _this.on(CHANGE_EVENT, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "removeChangeListener", function (callback) {
      _this.removeListener(CHANGE_EVENT, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _this.data;
    });

    _defineProperty(_assertThisInitialized(_this), "dispatcherCallback", function (action) {
      if (!action.actionType) {
        throw new Error('You are dispatching an invalid action (maybe the constant is incorrect or missing)');
      } // We determine if the store has the actionType available as a function.
      // In traditional flux this normally uses a switch/case statement.


      if (_this[action.actionType]) {
        // if history is enabled, store it at this point
        if (_this.trackHistory) {
          _this.history.push(_this.data);
        } // call the function on the store with the action


        _this[action.actionType].call(_assertThisInitialized(_this), action); // tell the store a change has occurred


        _this._triggerChange();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "undo", function () {
      if (_this.history.length > 1) {
        // pop the last entry in history and set it as the current data
        _this.data = _this.history.pop(); // tell the store a change has occurred

        _this._triggerChange();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      // set the data to the initial state stored in the history array
      _this.data = _this.history[0]; // reset the history array

      _this.history = [_this.data]; // tell the store a change has occurred

      _this._triggerChange();
    });

    _this.setMaxListeners(50);

    var suffix = "Check the initialization of ".concat(_this.constructor.name, "."); // tell the developer if they have not defined the name property.

    if (!name) {
      throw new Error("You need to initialize your store with a name. ".concat(suffix));
    } // tell the developer if they have not defined the data property.


    if (!data) {
      throw new Error("You need to initialize your store with data. ".concat(suffix));
    }
    /**
     * Set the name for the store - this will be used to identify your store.
     *
     * @property name
     * @type {String}
     */


    _this.name = name;
    /**
     * Set the data for the store - this should be an immutable object.
     *
     * @property data
     * @type {Object}
     */

    _this.data = data; // we either use a dispatcher passed through the options, or use the default one

    var dispatcher = opts.dispatcher || _flux.Dispatcher;
    /**
     * Store the dispatchToken after registering with the dispatcher, this will
     * allow us to use the waitFor API provided by flux
     * https://facebook.github.io/flux/docs/dispatcher.html#api
     *
     * @property dispatchToken
     * @type {String}
     */

    _this.dispatchToken = dispatcher.register(_this.dispatcherCallback);
    /**
     * Array to store the history, set with the initial data.
     *
     * @property history
     * @type {Array}
     */

    _this.history = [data];
    /**
     * Determines if the store should track data changes.
     *
     * @property trackHistory
     * @type {Boolean}
     */

    _this.trackHistory = !!opts.history;
    return _this;
  }
  /**
   * Adds a listener to the store, which calls a provided callback on change.
   *
   * @method addChangeListener
   * @param {Function} callback The function that is called in the view component.
   * @return {void}
   */


  _createClass(Store, [{
    key: "_triggerChange",

    /**
     * Emit the change event that the store is listening to so it can trigger
     * the callback provided from the view component.
     *
     * @method _triggerChange
     * @return {void}
     */
    value: function _triggerChange() {
      // we use the store name so the view component knows which store updated
      this.emit(CHANGE_EVENT, this.name);
    }
  }]);

  return Store;
}(_events.EventEmitter);

exports.default = Store;