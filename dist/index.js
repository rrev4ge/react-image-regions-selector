function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ramda = require('ramda');
var uuid = require('uuid');
var interact = _interopDefault(require('interactjs'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has;

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var styles = {"rmcIconContainer":"_Crop-module__rmcIconContainer__3ii3t","rmcRemove":"_Crop-module__rmcRemove__1VLkb","numberIcon":"_Crop-module__numberIcon__2LGDb","cropContent":"_Crop-module__cropContent__2f9oW","ordN":"_Crop-module__ordN__32hbj","ordNe":"_Crop-module__ordNe__2DKz5","ordNw":"_Crop-module__ordNw__zLj96","ordS":"_Crop-module__ordS__D5ObD","ordSe":"_Crop-module__ordSe__3C8Ja","ordSw":"_Crop-module__ordSw__1n3cS","ordE":"_Crop-module__ordE__im9Mj","ordW":"_Crop-module__ordW__3JqQh","ord-n":"_Crop-module__ord-n__1SfJq","ord-e":"_Crop-module__ord-e__3wqyx","ord-s":"_Crop-module__ord-s__TAnJz","ord-w":"_Crop-module__ord-w__2Mxhu"};

var CropDeleteIcon = function CropDeleteIcon(props) {
  return /*#__PURE__*/React__default.createElement("div", _extends({
    className: styles.rmcIconContainer
  }, props), /*#__PURE__*/React__default.createElement("div", {
    className: styles.rmcRemove
  }));
};
var NumberIcon = function NumberIcon(_ref) {
  var number = _ref.number;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.numberIcon
  }, number);
};
var CropContent = function CropContent(_ref2) {
  var content = _ref2.content;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.cropContent
  }, content);
};
var number = propTypes.number,
    string = propTypes.string;
NumberIcon.propTypes = {
  number: propTypes.oneOfType([number, string])
};
NumberIcon.defaultProps = {
  number: ''
};

var Crop = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Crop, _Component);

  function Crop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.cropStyle = function (coordinate) {
      var x = coordinate.x,
          y = coordinate.y,
          width = coordinate.width,
          height = coordinate.height;
      return {
        display: 'inline-block',
        position: 'absolute',
        transform: 'translate3d(0, 0, 0)',
        boxSizing: 'border-box',
        cursor: 'move',
        width: width,
        height: height,
        top: y,
        left: x,
        border: '1px solid',
        borderImageSource: 'url("data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==")',
        borderImageSlice: '1',
        borderImageRepeat: 'repeat',
        msTouchAction: 'none',
        touchAction: 'none',
        userSelect: 'none',
        background: "#262626",
        opacity: 0.5
      };
    };

    _this.prevCoordinate = {};
    _this.prevCoordinates = [];
    _this.isLeftBtnActive = false;
    _this.isRightBtnActive = false;

    _this.actionTrigger = function (pointer, event, action, interactable, element, interaction) {

      return action;
    };

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          coordinate = _this$props.coordinate,
          _this$props$coordinat = _this$props.coordinate,
          x = _this$props$coordinat.x,
          y = _this$props$coordinat.y,
          coordinates = _this$props.coordinates,
          onResize = _this$props.onResize,
          onDrag = _this$props.onDrag,
          onChange = _this$props.onChange;
      var dx = e.dx,
          dy = e.dy;
      var nextCoordinate = {};

      if (e.type === 'resizemove') {
        var _e$rect = e.rect,
            width = _e$rect.width,
            height = _e$rect.height;
        var _e$deltaRect = e.deltaRect,
            left = _e$deltaRect.left,
            top = _e$deltaRect.top;
        nextCoordinate = _extends({}, coordinate, {
          x: x + left,
          y: y + top,
          width: width,
          height: height
        });
      }

      if (e.type === 'dragmove') {
        nextCoordinate = _extends({}, coordinate, {
          x: x + dx,
          y: y + dy
        });
      }

      var nextCoordinates = ramda.update(index, nextCoordinate)(coordinates);

      if (ramda.is(Function, onResize) && e.type === 'resizemove') {
        onResize(nextCoordinate, index, nextCoordinates);
      }

      if (ramda.is(Function, onChange) && ['dragmove', 'resizemove'].includes(e.type)) {
        onChange(nextCoordinate, index, nextCoordinates);
      }

      if (ramda.is(Function, onDrag) && e.type === 'dragmove') {
        onDrag(nextCoordinate, index, nextCoordinates);
      }

      if (['dragend', 'resizeend'].includes(e.type)) {
        _this.props.isChange(e);

        document.removeEventListener('contextmenu', _this.onContextMenu, false);
      }
    };

    _this.changeStartPosition = function (e) {
      var _this$props2 = _this.props,
          index = _this$props2.index,
          coordinate = _this$props2.coordinate,
          coordinates = _this$props2.coordinates;

      if (['dragstart', 'resizestart'].includes(e.type)) {
        document.addEventListener('contextmenu', _this.onContextMenu, false);
        _this.prevCoordinate = _extends({}, coordinate);
        _this.prevCoordinates = [].concat(coordinates);
        _this.prevCoordinates = ramda.update(index, _this.prevCoordinate, coordinates);

        _this.props.isChange(e);
      }
    };

    _this.handleRestore = function (e) {
      var _this$props3 = _this.props,
          index = _this$props3.index,
          onRestore = _this$props3.onRestore;

      if (ramda.is(Function, onRestore)) {
        onRestore(_this.prevCoordinate, index, _this.prevCoordinates);
      }
    };

    _this.handleDelete = function (e) {
      var _this$props4 = _this.props,
          index = _this$props4.index,
          coordinate = _this$props4.coordinate,
          onDelete = _this$props4.onDelete,
          coordinates = _this$props4.coordinates;
      var nextCoordinates = ramda.remove(index, 1)(coordinates);

      if (ramda.is(Function, onDelete)) {
        onDelete(coordinate, index, nextCoordinates);
      }
    };

    _this.onContextMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.button === 2) {
        if (_this.isLeftBtnActive === false) {
          _this.handleDelete();
        }

        if (_this.isLeftBtnActive === true) {
          _this.handleRestore();

          _this.isLeftBtnActive = false;
        }
      }

      return false;
    };

    _this.onMouseDown = function (e) {
      if (e.button === 0) {
        _this.isLeftBtnActive = true;
      }

      if (e.button === 2) {
        _this.isRightBtnActive = true;
      }
    };

    _this.onMouseUp = function (e) {
      if (e.button === 0) {
        document.removeEventListener('mouseup', _this.outsideEvents, false);
        document.removeEventListener('keydown', _this.outsideEvents, false);
        document.removeEventListener('contextmenu', _this.onContextMenu, false);
        _this.isLeftBtnActive = false;
      }

      if (e.button === 2) {
        _this.isRightBtnActive = false;
      }
    };

    _this.onKeyDown = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.code === "Escape") {
        _this.handleRestore();

        _this.isLeftBtnActive = false;
      }
    };

    _this.onKeyUp = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    return _this;
  }

  var _proto = Crop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props$parentImg, _this$props$parentImg2;

    interact(this.crop).draggable({
      modifiers: [interact.modifiers.restrictRect({
        restriction: 'parent'
      })]
    }).resizable({
      edges: {
        left: true,
        right: true,
        bottom: true,
        top: true
      },
      modifiers: [interact.modifiers.restrict({
        restriction: 'parent'
      }), interact.modifiers.restrictSize({
        min: {
          width: 1,
          height: 1
        },
        max: {
          width: (_this$props$parentImg = this.props.parentImg) === null || _this$props$parentImg === void 0 ? void 0 : _this$props$parentImg.width,
          height: (_this$props$parentImg2 = this.props.parentImg) === null || _this$props$parentImg2 === void 0 ? void 0 : _this$props$parentImg2.height
        }
      })]
    }).on(['dragstart', 'resizestart'], this.changeStartPosition).on(['dragmove', 'dragend', 'resizemove', 'resizeend'], this.handleChange).actionChecker(this.actionTrigger);
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !ramda.equals(nextProps.coordinate, this.props.coordinate) || nextProps.index !== this.props.index;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    interact(this.crop).unset();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        coordinate = _this$props5.coordinate,
        index = _this$props5.index,
        numberIcon = _this$props5.numberIcon,
        cropContent = _this$props5.cropContent,
        deleteIcon = _this$props5.deleteIcon;
    return /*#__PURE__*/React__default.createElement("div", {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onContextMenu: this.onContextMenu,
      style: this.cropStyle(coordinate),
      ref: function ref(crop) {
        return _this2.crop = crop;
      },
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      tabIndex: "0"
    }, numberIcon && /*#__PURE__*/React__default.createElement(NumberIcon, {
      number: index + 1
    }), deleteIcon && /*#__PURE__*/React__default.createElement(CropDeleteIcon, {
      onClick: this.handleDelete
    }), cropContent && /*#__PURE__*/React__default.createElement(CropContent, {
      content: coordinate === null || coordinate === void 0 ? void 0 : coordinate.content
    }), [styles.ordN, styles.ordNe, styles.ordNw, styles.ordS, styles.ordSe, styles.ordSw, styles.ordE, styles.ordW].map(function (style, id) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: style,
        key: id
      });
    }));
  };

  return Crop;
}(React.Component);

var coordinateType = propTypes.shape({
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired
});
var number$1 = propTypes.number,
    string$1 = propTypes.string,
    bool = propTypes.bool,
    func = propTypes.func,
    array = propTypes.array,
    object = propTypes.object;
Crop.propTypes = {
  coordinate: coordinateType.isRequired,
  cropContent: bool,
  deleteIcon: bool,
  numberIcon: bool,
  index: propTypes.oneOfType([number$1, string$1]).isRequired,
  onResize: func,
  onDrag: func,
  onDelete: func,
  onChange: func,
  onComplete: func,
  onRestore: func,
  coordinates: array,
  isChange: func,
  styles: object
};
Crop.defaultProps = {
  styles: {},
  cropContent: false,
  deleteIcon: true,
  numberIcon: true
};

var styles$1 = {"multiCrops":"_MultiCrops-module__multiCrops__36Wl7"};

var addid = ramda.map(ramda.assoc('id', uuid.v4()));
var removeid = ramda.map(ramda.omit(['id']));

var isValidPoint = function isValidPoint(point) {
  if (point === void 0) {
    point = {};
  }

  var strictNumber = function strictNumber(number) {
    return ramda.both(ramda.is(Number), ramda.complement(ramda.equals(NaN)))(number);
  };

  return strictNumber(point.x) && strictNumber(point.y);
};

var MultiCrops = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MultiCrops, _Component);

  function MultiCrops() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.drawingIndex = -1;
    _this.pointA = {};
    _this.id = uuid.v4();
    _this.prevCoordinate = {};
    _this.prevCoordinates = [];
    _this.isEscBtnTarget = false;
    _this.isDragResize = false;
    _this.isLeftBtnTarget = false;
    _this.mouseLeave = false;

    _this.isChange = function (e) {
      if (['dragstart', 'resizestart'].includes(e.type)) {
        _this.isDragResize = true;
      }

      if (['dragend', 'resizeend'].includes(e.type)) {
        _this.isDragResize = false;
      }
    };

    _this.renderCrops = function (props) {
      var indexedMap = ramda.addIndex(ramda.map);
      return indexedMap(function (coor, index) {
        return /*#__PURE__*/React__default.createElement(Crop, _extends({
          key: coor.id || index,
          index: index,
          coordinate: coor,
          isChange: function isChange(e) {
            _this.isChange(e);
          },
          parentImg: _this.img
        }, props));
      })(props.coordinates);
    };

    _this.getCursorPosition = function (e) {
      var _this$container$getBo = _this.container.getBoundingClientRect(),
          left = _this$container$getBo.left,
          top = _this$container$getBo.top;

      if (e.type === 'touchstart' || e.type === 'touchmove') {
        return {
          x: e.touches[0].pageX - left,
          y: e.touches[0].pageY - top
        };
      }

      if (e.type === 'mousedown' || e.type === 'mousemove') {
        return {
          x: e.clientX - left,
          y: e.clientY - top
        };
      }
    };

    _this.handleMouseDown = function (e) {
      document.removeEventListener('mouseup', _this.outsideEvents, false);
      document.removeEventListener('keydown', _this.outsideEvents, false);
      document.removeEventListener('contextmenu', _this.onContextMenu, false);
      _this.isDragResize = false;
      var _this$props = _this.props,
          coordinates = _this$props.coordinates,
          maxCrops = _this$props.maxCrops;

      if (coordinates.length <= maxCrops && (e.button === 0 || e.type === 'touchstart')) {
        _this.isLeftBtnTarget = true;

        if (e.target === _this.img || e.target === _this.container) {
          var _this$getCursorPositi = _this.getCursorPosition(e),
              x = _this$getCursorPositi.x,
              y = _this$getCursorPositi.y;

          _this.drawingIndex = coordinates.length;
          _this.pointA = {
            x: x,
            y: y
          };
          _this.id = uuid.v4();
          _this.isLeftBtnTarget = true;
          _this.prevCoordinate = {};
          _this.prevCoordinates = ramda.clone(coordinates);
          _this.isEscBtnTarget = false;
        }
      }
    };

    _this.outsideEvents = function (e) {
      var _this$props2 = _this.props,
          onRestore = _this$props2.onRestore,
          coordinates = _this$props2.coordinates,
          coordinate = _this$props2.coordinate;

      if (e.button === 0) {
        if (_this.isEscBtnTarget === false) {
          if (ramda.is(Function, onRestore)) {
            onRestore(coordinate, _this.drawingIndex, coordinates);
          }

          _this.handleMouseUp(e);
        }

        if (_this.isEscBtnTarget === true && e.target !== _this.img) {
          _this.restoreCrops(e);

          _this.isEscBtnTarget = false;
        }

        document.removeEventListener('mouseup', _this.outsideEvents, false);
        document.removeEventListener('keydown', _this.outsideEvents, false);
        document.removeEventListener('contextmenu', _this.onContextMenu, false);
      }

      if (e.code === "Escape") {
        _this.isEscBtnTarget = true;
      }

      if (e.button === 2) {
        if (e.target !== _this.img) {
          _this.restoreCrops(e);
        }
      }

      return false;
    };

    _this.handleMouseMove = function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          _assertThisInitialize2 = _assertThisInitialize.props,
          onDraw = _assertThisInitialize2.onDraw,
          onChange = _assertThisInitialize2.onChange,
          coordinates = _assertThisInitialize2.coordinates,
          maxCrops = _assertThisInitialize2.maxCrops,
          pointA = _assertThisInitialize.pointA;

      if (coordinates.length <= maxCrops && (e.button === 0 || e.type === 'touchmove')) {
        if (isValidPoint(pointA) && e.target.offsetParent === _this.img.offsetParent) {
          var pointB = _this.getCursorPosition(e);

          var coordinate = {
            x: Math.min(pointA.x, pointB.x),
            y: Math.min(pointA.y, pointB.y),
            width: Math.abs(pointA.x - pointB.x),
            height: Math.abs(pointA.y - pointB.y),
            id: _this.id
          };
          var nextCoordinates = ramda.clone(coordinates);
          nextCoordinates[_this.drawingIndex] = coordinate;

          if (ramda.is(Function, onDraw)) {
            onDraw(coordinate, _this.drawingIndex, nextCoordinates);
          }

          if (ramda.is(Function, onChange)) {
            onChange(coordinate, _this.drawingIndex, nextCoordinates);
          }
        }
      }
    };

    _this.restoreCrops = function (e) {
      var onRestore = _this.props.onRestore;

      if (ramda.is(Function, onRestore)) {
        onRestore(_this.prevCoordinate, _this.drawingIndex - 1, _this.prevCoordinates);
      }

      _this.pointA = {};
      _this.isLeftBtnTarget = false;
      _this.isEscBtnTarget = false;
    };

    _this.handleMouseUp = function (e) {
      _this.pointA = {};
      _this.isLeftBtnTarget = false;
      _this.mouseLeave = false;
      _this.isEscBtnTarget = false;
    };

    _this.handleMouseLeave = function (e) {
      if (_this.isDragResize === false && _this.isLeftBtnTarget === true) {
        document.addEventListener('contextmenu', _this.onContextMenu, false);
        document.addEventListener('mouseup', _this.outsideEvents, false);
        document.addEventListener('keydown', _this.outsideEvents, false);
      }

      _this.mouseLeave = true;
    };

    _this.handleMouseEnter = function (e) {
      document.removeEventListener('mouseup', _this.outsideEvents, false);
      document.removeEventListener('keydown', _this.outsideEvents, false);
      document.removeEventListener('contextmenu', _this.onContextMenu, false);
      _this.mouseLeave = false;
    };

    _this.onKeyDown = function (e) {
      if (e.code === "Escape") {
        _this.isEscBtnTarget = true;
      }
    };

    _this.onContextMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    return _this;
  }

  var _proto = MultiCrops.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        src = _this$props3.src,
        onLoad = _this$props3.onLoad;
    return /*#__PURE__*/React__default.createElement("div", {
      className: styles$1.multiCrops,
      onTouchStart: this.handleMouseDown,
      onTouchMove: this.handleMouseMove,
      onTouchEnd: function onTouchEnd(e) {
        !_this2.isEscBtnTarget ? _this2.handleMouseUp(e) : _this2.restoreCrops(e);
      },
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onKeyDown: this.onKeyDown,
      onMouseUp: function onMouseUp(e) {
        !_this2.isEscBtnTarget ? _this2.handleMouseUp(e) : _this2.restoreCrops(e);
      },
      ref: function ref(container) {
        return _this2.container = container;
      },
      tabIndex: "0"
    }, /*#__PURE__*/React__default.createElement("img", {
      ref: function ref(img) {
        return _this2.img = img;
      },
      width: "100%",
      src: src,
      onLoad: onLoad,
      alt: "",
      draggable: false,
      onDragStart: function onDragStart(e) {
        e.preventDefault();
      }
    }), this.renderCrops(this.props));
  };

  return MultiCrops;
}(React.Component);

var string$2 = propTypes.string,
    arrayOf = propTypes.arrayOf,
    number$2 = propTypes.number,
    func$1 = propTypes.func,
    bool$1 = propTypes.bool;
MultiCrops.propTypes = {
  coordinates: arrayOf(coordinateType),
  src: string$2,
  cropContent: bool$1,
  deleteIcon: bool$1,
  numberIcon: bool$1,
  width: number$2,
  height: number$2,
  onDraw: func$1,
  onChange: func$1,
  onComplete: func$1,
  onRestore: func$1,
  onLoad: func$1,
  inProportions: bool$1,
  maxCrops: number$2
};
MultiCrops.defaultProps = {
  coordinates: [],
  src: '',
  cropContent: false,
  deleteIcon: true,
  numberIcon: true,
  maxCrops: Infinity
};

var styles$2 = {"canvasItem":"_Canvas-module__canvasItem__3GuKH","canvasImg":"_Canvas-module__canvasImg__1G6CZ","canvasDownloadButton":"_Canvas-module__canvasDownloadButton__1OeFn","canvasNumberIcon":"_Canvas-module__canvasNumberIcon__3TtV_"};

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(function (blob) {
    var previewUrl = window.URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.download = "canvas_" + crop.id + ".png";
    anchor.href = URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(previewUrl);
  }, 'image/png', 1);
}

var useCanvas = function useCanvas(props, callback) {
  var crop = props.crop,
      img = props.img;
  console.log({
    crop: crop
  });
  var canvasRef = React.useRef(null);
  var imgRef = React.useRef(null);
  imgRef.current = img;
  React.useEffect(function () {
    var image = imgRef.current;
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    callback([canvas, ctx, image]);
  }, [crop]);
  return canvasRef;
};

var Canvas = function Canvas(props) {
  var crop = props.crop;

  var _useState = React.useState(false),
      isHover = _useState[0],
      setIsHover = _useState[1];

  var canvasRef = useCanvas(props, function (_ref) {
    var canvas = _ref[0],
        ctx = _ref[1],
        image = _ref[2];
    var scaleX = image.naturalWidth / image.width;
    var scaleY = image.naturalHeight / image.height;
    var pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasItem,
    onMouseEnter: function onMouseEnter() {
      setIsHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      setIsHover(false);
    }
  }, isHover && /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasNumberIcon
  }, "Download"), /*#__PURE__*/React__default.createElement("canvas", {
    ref: canvasRef,
    className: styles$2.canvasImg
  }), isHover && /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasDownloadButton,
    onClick: function onClick() {
      return generateDownload(canvasRef.current, crop);
    }
  }, "Download"));
};

Canvas.propTypes = {
  crop: propTypes.object,
  img: propTypes.object
};
Canvas.defaultProps = {
  crop: null,
  img: null
};

var styles$3 = {"canvasList":"_CanvasList-module__canvasList__1oCyZ"};

var CanvasList = function CanvasList(props) {
  var canvas = props.canvas,
      img = props.img;
  return React__default.createElement("div", {
    className: styles$3.canvasList,
    style: props.style
  }, canvas.map(function (crop, i) {
    return React__default.createElement(Canvas, {
      key: crop.id || i,
      crop: crop,
      img: img
    });
  }));
};

var useDidMountEffect = function useDidMountEffect(func, deps) {
  var didMount = React.useRef(false);
  React.useEffect(function () {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

var styles$4 = {"regionSelector":"_RegionSelector-module__regionSelector__34_AE","multiCropsField":"_RegionSelector-module__multiCropsField__xBNbw"};

var RegionSelector = function RegionSelector(props) {
  var _imgRef$current;

  var _props$giveCompletedC = props.giveCompletedCrops,
      giveCompletedCrops = _props$giveCompletedC === void 0 ? null : _props$giveCompletedC,
      _props$completedCrops = props.completedCrops,
      completedCrops = _props$completedCrops === void 0 ? [] : _props$completedCrops,
      _props$src = props.src,
      src = _props$src === void 0 ? 'data:image/png;base64,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' : _props$src,
      _props$isProportions = props.isProportions,
      isProportions = _props$isProportions === void 0 ? false : _props$isProportions,
      _props$isShowCanvas = props.isShowCanvas,
      isShowCanvas = _props$isShowCanvas === void 0 ? true : _props$isShowCanvas,
      _props$width = props.width,
      width = _props$width === void 0 ? 600 : _props$width,
      _props$aspectRatio = props.aspectRatio,
      aspectRatio = _props$aspectRatio === void 0 ? 0.68 : _props$aspectRatio;
  var imgRef = React.useRef();

  var _useState = React.useState([]),
      crops = _useState[0],
      setCrops = _useState[1];

  var _useState2 = React.useState([]),
      canvas = _useState2[0],
      setCanvas = _useState2[1];

  var _useState3 = React.useState(false),
      didMount = _useState3[0],
      setDidMount = _useState3[1];

  var completed = function completed(crops) {
    setCanvas(crops);

    if (giveCompletedCrops && ramda.is(Function, giveCompletedCrops)) {
      if (isProportions) {
        giveCompletedCrops && giveCompletedCrops(function () {
          return crops.map(function (crop) {
            return calcProportions(crop);
          });
        });
      }

      if (!isProportions) {
        giveCompletedCrops && giveCompletedCrops(crops);
      }
    }
  };

  var calcPosition = function calcPosition(crop) {
    var _ref = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    },
        width = _ref.width,
        height = _ref.height;

    return _extends({}, crop, {
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10)
    });
  };

  var calcProportions = function calcProportions(crop) {
    var _ref2 = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    },
        width = _ref2.width,
        height = _ref2.height;

    var proportions = _extends({}, crop, {
      x: (crop.x / width).toFixed(2),
      y: (crop.y / height).toFixed(2),
      height: (crop.height / height).toFixed(2),
      width: (crop.width / width).toFixed(2)
    });

    return proportions;
  };

  useDidMountEffect(function () {
    if (didMount) {
      if (isProportions) {
        setCrops(function () {
          return completedCrops.map(function (crop) {
            return calcPosition(crop);
          });
        });
      }

      if (!isProportions) {
        setCrops(completedCrops);
      }
    }
  }, [completedCrops]);
  var onLoad = React.useCallback(function (img) {
    imgRef.current = img.target;
    setDidMount(true);

    if (isProportions) {
      setCrops(function () {
        return completedCrops.map(function (crop) {
          return calcPosition(crop);
        });
      });
      setCanvas(function () {
        return completedCrops.map(function (crop) {
          return calcPosition(crop);
        });
      });
    }

    if (!isProportions) {
      setCrops(completedCrops);
      setCanvas(completedCrops);
    }
  }, [completedCrops, isProportions]);
  var onChange = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  var onDelete = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  var onRestore = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  var onComplete = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  return React__default.createElement("div", {
    className: styles$4.regionSelector
  }, React__default.createElement("div", {
    style: {
      width: width
    },
    className: styles$4.multiCrops,
    onTouchEnd: function onTouchEnd() {
      completed(crops);
    },
    onMouseUp: function onMouseUp(e) {
      if (e.button === 0) {
        completed(crops);
      }
    }
  }, React__default.createElement(MultiCrops, Object.assign({
    src: src,
    coordinates: crops,
    onChange: onChange,
    onDelete: onDelete,
    onRestore: onRestore,
    onComplete: onComplete,
    onLoad: onLoad,
    width: width,
    aspectRatio: aspectRatio
  }, props))), isShowCanvas && React__default.createElement(CanvasList, {
    canvas: canvas,
    img: imgRef.current,
    style: {
      width: width,
      height: ((_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 ? void 0 : _imgRef$current.height) || 0
    }
  }));
};

exports.RegionSelector = RegionSelector;
//# sourceMappingURL=index.js.map
