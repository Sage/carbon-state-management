"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Higher order component
 *
 * Takes a variadic number of arguments where the leading arguments are
 * Stores and the the tail of those arguments is a function mapping from
 * store states to the props of the composed component.
 *
 * Usage like so:
 *
 *    function mapStateToProps(stateA, stateB, props) {
 *      return {
 *        propFromA: stateA.get('someProp') + props.someProp,
 *        propFromB: stateB.get('someProp')
 *      }
 *    }
 *
 *    const ConnectedComponent = connect(storeA, storeB, mapStateToProps)(TargetComponent)
 *
 * @function connect
 * @param {...Store} ...stores
 * @param {Function} mapStateToProps
 * @return {Function}
 */
var connect = function connect() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var stores = args.slice(0, args.length - 1);
    var mapToProps = args[args.length - 1];

    var mapStateToProps = function mapStateToProps(state) {
      var states = [];
      stores.forEach(function (store) {
        states.push(state[store.name]);
      });
      return mapToProps.apply(void 0, states);
    };

    var connectedComponent = (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
    connectedComponent.displayName = WrappedComponent.displayName || WrappedComponent.name;
    connectedComponent.displayName = "Connect(".concat(connectedComponent.displayName, ")");
    connectedComponent._requiresReduxStore = true;
    return connectedComponent;
  };
};

var _default = connect;
exports.default = _default;