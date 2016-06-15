/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/6/30.
	 */
	
	// Ionic Starter App
	var appModule = module.exports = angular.module(
	    'app',
	    [
	        'ionic',
	        __webpack_require__(6).name,
	        __webpack_require__(74).name,
	        __webpack_require__(80).name,
	        __webpack_require__(1).name,
	        __webpack_require__(85).name,
	        __webpack_require__(132).name
	
	    ])
	    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
	
	        $ionicConfigProvider.tabs.position('bottom');
	        $ionicConfigProvider.tabs.style('standard');
	        $ionicConfigProvider.backButton.previousTitleText(false);
	        $ionicConfigProvider.backButton.icon('iconfont icon-return return-size');
	        $ionicConfigProvider.navBar.alignTitle('center');
	        $ionicConfigProvider.views.transition('platform');
	        $ionicConfigProvider.views.maxCache(10);
	        $ionicConfigProvider.form.checkbox('circle');
	    }])
	    .run(['$rootScope', function ($rootScope) {
	
	        // 默认先隐藏底部 Tabs
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	            $rootScope.showTabs = false;
	        });
	
	        // 根据实际情况 toState.data.showTabs 来决定是否显示 Tabs
	        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	            $rootScope.showTabs = toState.data && toState.data.showTabs;
	        });
	    }])
	    .run(['$ionicHistory','Constants' , 'JSTransport', 'JSCache', '$state', '$rootScope', '$ionicTabsDelegate',
	        function ($ionicHistory, Constants, JSTransport, JSCache, $state, $rootScope, $ionicTabsDelegate) {
	
	        window.YHAndroidToJs = {
	            sendToJS: function (message) {
	                var json = JSON.parse(message);
	                JSTransport.receive(json);
	
	                var what = json['what'];
	                if(what == Constants.YHWhat.app.sendToolPage){
	                    var title = json['title'];
	                    var total = json['total'];
	                    if(total > 0){
	                        $ionicHistory.goback(-1);
	                        //if(title == null || title == ''){
	                        //    $ionicHistory.goback(-1);
	                        //}
	                        //else{
	                        //    $state.go(title);
	                        //}
	                    }
	                }
	                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_BEKICKED){
	                    console.log("用户在其他地方登录.");
	                    $state.go('tab.tool');
	                    JSCache.remove(Constants.YHCache.loginInfo);
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST) {
	                    $ionicTabsDelegate.$getByHandle('my-handle').select(2);
	                    // $state.go("tab.conversations.conversation-list");
	                    setTimeout(function () {
	                        $rootScope.$broadcast('YHRemote', json);
	                    }, 50);
	                }
	                console.log('接收到APP发来指令为', message);
	            }
	        };
	    }])
	
	    .run(['$state', function ($state) {
	        // 默认跳转到技师圈模块
	        $state.go('tab.tool');
	    }])
	    .run(['$rootScope', '$state', '$ionicHistory', function ($rootScope, $state, $ionicHistory) {
	
	        $rootScope.__goToViewAsTop = function (stateName, params, options) {
	
	            params = params || {};
	            options = options || {};
	
	            $ionicHistory.nextViewOptions({
	                //disableBack: false,
	                historyRoot: true
	            });
	
	            $state.go(stateName, params, options);
	        };
	
	    }]);
	
	ionic.Platform.ready(function () {
	
	    // 延迟 500ms 加载启动应用
	    // 以便浏览器有足够的时间加载 sourceMap 文件
	    //angular.bootstrap(window.document.body, [appModule.name], {
	    //    strictDi: true
	    //});
	    // 延迟 500ms 加载启动应用
	    // 以便浏览器有足够的时间加载 sourceMap 文件
	    setTimeout(function () {
	        angular.bootstrap(window.document.body, [appModule.name], {
	            strictDi: true
	        });
	    }, 500);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/8/31.
	 */
	var _ = __webpack_require__(5);
	
	module.exports = angular.module('app.tabs.circle', [
	    'ionic', 'ngMessages', 'ngCookies',
	    __webpack_require__(6).name])
	
	    .config([
	        '$stateProvider',
	        function ($stateProvider) {
	
	            $stateProvider
	
	                .state('tab.circle', {
	                    abstract: true,
	                    url: '/circle',
	                    // cache : false,  // 放开这个会导致重复进入子页面
	                    views: {
	                        'tab-circle': __webpack_require__(39)
	                    }
	                })
	                .state('tab.circle.friends', {
	                    url: '',
	                    data: {
	                        showTabs: true
	                    },
	                    title : 'tab.circle',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(41)
	                    }
	                })
	                .state('tab.circle.new-friends', {
	                    url: '/new-friends',
	                    data: {
	                        showTabs: false
	                    },
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(44)
	                    }
	                })
	
	                .state('tab.circle.contact-compare', {
	                    url: '/contact-compare',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(50)
	                    }
	                })
	
	                .state('tab.circle.groups', {
	                    url: '/groups',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(2)
	                    }
	                })
	
	                // 创建群
	                .state('tab.circle.groups-create', {
	                    url: '/groups/create',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(53)
	                    }
	                })
	
	                .state('tab.circle.find', {
	                    url: '/find',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(58)
	                    }
	                })
	
	                .state('tab.circle.find-filter', {
	                    url: '/find/filter',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(61)
	                    }
	                })
	
	                .state('tab.circle.user-detail', {
	                    url: '/user-detail/{id:int}',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(69)
	                    }
	                })
	                .state('tab.circle.search-result', {
	                    url: '/find/filter/search-result:result',
	                    cache : false,
	                    resolve: {},
	                    views: {
	                        '': __webpack_require__(72)
	                    }
	                });
	
	        }
	    ]);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(3),
	    controller: __webpack_require__(4)
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"群列表\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <a class=\"button button-icon\" ui-sref=\"tab.circle.groups-create\">\r\n            <i class=\"iconfont icon-add menu-size\"></i>\r\n        </a>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <p class=\"item-divider-empty search-results-describe\" ng-show=\"groupList.length > 0\">群聊</p>\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <ion-item class=\"item item-friends-head-portrait\" collection-repeat=\"group in groupList\"\r\n                          ui-sref=\"tab.conversations.conversation.GROUP({targetId: group.id, conversationType: 'GROUP'})\">\r\n                    <img ng-src=\"{{ group.icon | prefixSrc }}\">\r\n\r\n                    <p class=\"item-friends-description\">{{ group.groupName }}</p>\r\n                </ion-item>\r\n            </div>\r\n        </div>\r\n        <p class=\"list-number\" ng-if=\"groupList.length>0\">{{ groupList.length }}个群聊</p>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/9/14.
	 */
	var ContactGroupList = function ($scope,
	                                 $state,
	                                 JSUtils,
	                                 JSCommand,
	                                 Constants) {
	
	    console.log('enter the contact group controller...');
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	
	        try{
	            console.log('jsonResult.data.groupList',jsonResult.data.groupList);
	            var what = jsonResult.what;
	
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUP) {
	
	                var status = jsonResult.status;
	
	                if (status === Constants.status.success) {
	                    $scope.$apply(function(){
	                        $scope.groupList = jsonResult.data.groupList;
	                    });
	                }else{
	                    console.log("Login fail:" + jsonResult["reason"])
	                }
	            }
	
	
	        }catch(error){
	
	        }
	
	    });
	
	    /*
	       ������ȡȺ�б�������
	     */
	    JSCommand.ccdp.queryGroupList();
	
	};
	
	ContactGroupList.$inject = [
	    '$scope',
	    '$state',
	    'JSUtils',
	    'JSCommand',
	    'Constants'
	];
	
	module.exports = ContactGroupList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/7/1.
	 */
	
	module.exports = angular.module('app.common', ['ab-base64','ngCookies'])
	
	    // constants
	    .constant('Constants', __webpack_require__(7))
	
	    //ģ������
	   /* .constant('SimulatedData',require('./simulated-data'))
	    .constant('homePageData',require('./homePageData'))*/
	    //.constant('conversationData',require('./conversationData'))
	
	    //
	
	    // directives
	    .directive('adjustBottomBy', __webpack_require__(8))
	    .directive('changeBackgroundDiagnosis', __webpack_require__(9))
	    .directive('changeBackgroundProgramming', __webpack_require__(10))
	    .directive('changeBackgroundReset', __webpack_require__(11))
	    .directive('changeBackgroundEncodSet', __webpack_require__(12))
	    .directive('changeBackgroundTrial', __webpack_require__(13))
	    .directive('changeBackgroundSystemSetting', __webpack_require__(14))
	    .directive('isShowTabs', __webpack_require__(15))
	    .directive('indexFontSize', __webpack_require__(16))
	    .directive('indexList', __webpack_require__(17))
	    .directive('assiScrollHeight', __webpack_require__(18))
	    .directive('chatMenu', __webpack_require__(19))
	    .directive('checkNickName', __webpack_require__(20))
	    .directive('hourDirective', __webpack_require__(21))
	    .directive('hoursDirective', __webpack_require__(22))
	    .directive('minuteDirective', __webpack_require__(23))
	    .directive('minutesDirective', __webpack_require__(24))
	    .directive('startEndDirective', __webpack_require__(25))
	    .directive('formTextFocus', __webpack_require__(26))
	    .directive('homePage', __webpack_require__(27))
	
	    // filters
	    .filter('prefixSrc', __webpack_require__(28))
	    .filter('formatSecond', __webpack_require__(29))
	    .filter('searchUser', __webpack_require__(30))
	
	    // managers
	    .factory('PromiseManager', __webpack_require__(31))
	    .factory('FriendRelationManager', __webpack_require__(32))
	
	    // models
	
	    // services
	    .factory('JSTransport', __webpack_require__(33))
	    .factory('JSCommand', __webpack_require__(34))
	    .factory('JSCache', __webpack_require__(35))
	    .factory('JSUtils', __webpack_require__(37))
	    .factory('JSMock', __webpack_require__(38));

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by tapes on 2015/7/17.
	 */
	
	module.exports = {
	    encoding: 'utf-8',
	    status: {
	        success: 0x00,
	        fail: 0x01
	    },
	    YHCache: {
	        userName : "--!userName!--",    // 这个变量存储的是用户名，在用户登录成功之后会把用户名存储在这个变量中
	        loginInfo: '--!loginInfo!--',
	        personData: '--!personData!--',
	        brandListData:'--!brandListData!--',
	        ServeListData:'--!ServeListData!--',
	        assistListData:'--!assistListData!--',
	        unRead:'--!unRead--'
	    },
	    YHWhat: {
	        rongcloud: {
	            sendTestMessage: 0x9001,
	            sendVoiceMessage: 0x9002,
	            sendImageMewssage:0x9003,
	            getConversation: 0x9004,
	            getConversationList: 0x9005,
	            clearConversation: 0x9006,
	            getHistoryMessages: 0x9006,
	            getLatestMessages: 0x9009,
	            exitConversation: 0xA008,
	            totalContacts:0x9010,
	            personalUnreadMessages:0x900A
	        },
	        ccdp: {
	             CCDP_LOGIN : 0x00A40001,    // ,"CCDP-登录","CCDP"),
	             CCDP_SEND_CAPTCHA : 0x00A40002,    // ,"CCDP-发送验证码","CCDP"),
	             CCDP_LOGOUT : 0x00A40003,    // ,"CCDP-注销","CCDP"),
	             CCDP_HEARTBEAT : 0x00A40004,    // ,"CCDP-心跳","CCDP"),
	             CCDP_ADD_ACTIVEINFO : 0x00A40005,    // ,"CCDP-激活","CCDP"),
	             CCDP_ADD_JUDGEACTIVEINFO : 0x00A40006,    // ,"CCDP-判断激活","CCDP"),
	             CCDP_UPLOAD_IMAGE : 0x00A40007,    // ,"CCDP-图片上传","CCDP"),
	             CCDP_QUERY_BRANDLIST : 0x00A40008,    // ,"CCDP-查询品牌列表","CCDP"),
	             CCDP_QUERY_SERVELIST : 0x00A40009,    // ,"CCDP-查询服务列表","CCDP"),
	             CCDP_QUERY_USERDETAILINFO : 0x00A4000A,    // ,"CCDP-查询用户详情","CCDP"),
	             CCDP_MODIFY_USERINFO : 0x00A4000C,    // ,"CCDP-修改用户信息","CCDP"),
	             CCDP_QUERY_USERINFO : 0x00A4000D,    // ,"CCDP-查询用户个人资料","CCDP"),
	             CCDP_QUERY_USERBYCONDITIONS : 0x00A4000E,    // ,"CCDP-按条件查询用户","CCDP"),
	             CCDP_ADD_USERAUTHENTICATION : 0x00A4000F,    // ,"CCDP-申请实名认证","CCDP"),
	             CCDP_GET_RONG_TOKEN : 0x00A40010,    // ,"CCDP-获取融云token","CCDP"),
	
	             CCDP_REQ_ASSIST : 0x00A40011,    // ,"CCDP-请求远程协助","CCDP"),
	             CCDP_ACCEPT_ASSIST : 0x00A40012,    // ,"CCDP-接受远程协助","CCDP"),
	             CCDP_END_ASSIST : 0x00A40013,    // ,"CCDP-结束远程协助","CCDP"),
	             CCDP_PUSHDEVICEID : 0x00A40014,    // ,"CCDP-推送设备连接ID","CCDP"),
	             CCDP_PUSHREMOTECONTROL : 0x00A40015,    // ,"CCDP-推送远程控制信息","CCDP"),
	             CCDP_QUERY_ASSISTMETO : 0x00A40016,    // ,"CCDP-查询我协助的记录列表","CCDP"),
	             CCDP_QUERY_ASSISTTOME : 0x00A40017,    // ,"CCDP-查询协助我的记录列表","CCDP"),
	             CCDP_UPDATE_ASSISTREPORT : 0x00A40018,    // ,"CCDP-填写协助报告","CCDP"),
	             CCDP_ADD_EVALUATE : 0x00A40019,    // ,"CCDP-评价","CCDP"),
	             CCDP_QUERY_REASON : 0x00A4001A,    // ,"CCDP-查询原因列表","CCDP"),
	
	             CCDP_QUERY_FILTERLIST : 0x00A4001B,    // ,"CCDP-筛选条件选项列表","CCDP"),
	             CCDP_QUERY_MYFRIEND : 0x00A4001C,    // ,"CCDP-查询好友列表","CCDP"),
	             CCDP_QUERY_CONTACTSFRIEND : 0x00A4001D,    // ,"CCDP-查询通讯录好友列表","CCDP"),
	             CCDP_ADD_FRIEND : 0x00A4001E,    // ,"CCDP-添加好友","CCDP"),
	             CCDP_ACCEPT_FRIEND : 0x00A4001F,    // ,"CCDP-接受好友","CCDP"),
	             CCDP_DELETE_FRIEND : 0x00A40020,    // ,"CCDP-删除好友","CCDP"),
	             CCDP_QUERY_GROUP : 0x00A40021,    // ,"CCDP-查找群列表","CCDP"),
	             CCDP_ADD_GROUP : 0x00A40022,    // ,"CCDP-新建群组","CCDP"),
	             CCDP_QUERY_GROUPINFO : 0x00A40023,    // ,"CCDP-查询群信息","CCDP"),
	             CCDP_QUITORDELETE_GROUP : 0x00A40024,    // ,"CCDP-退出或解散群组","CCDP"),
	             CCDP_UPDATE_GROUP : 0x00A40025, // "CCDP-更新群组", "CCDP"),
	             CCDP_ADD_REPORTGROUP : 0x00A40026,    // ,"CCDP-添加举报群组","CCDP"),
	             CCDP_QUERY_REPORTREASON : 0x00A40027,    // ,"CCDP-查询举报原因列表","CCDP"),
	             CCDP_DELETE_ASSISTTOMERECORD : 0x00A40028,    // ,"CCDP-删除协助我的记录","CCDP"),
	             CCDP_DELETE_ASSISTMETORECORD : 0x00A40029,    // ,"CCDP-删除我协助的记录","CCDP"),
	             CCDP_QUERY_FRIENDRELATION : 0x00A4002A,    // ,"CCDP-查询好友关系列表","CCDP"),
	
	             CCDP_PUSH_REQASSIST : 0x00A40030,    // ,"CCDP-推送请求远程协助信息","CCDP"),
	             CCDP_PUSH_ACCEPTASSIST : 0x00A40031,    // ,"CCDP-推送接受远程协助信息","CCDP"),
	             CCDP_PUSH_CONNECTID : 0x00A40032,    // ,"CCDP-推送设备连接ID","CCDP"),
	             CCDP_PUSH_CONTROLCMD : 0x00A40033,    // ,"CCDP-推送控制命令信息","CCDP"),
	             CCDP_PUSH_ENDASSIST : 0x00A40034,    // ,"CCDP-推送结束远程协助","CCDP"),
	             CCDP_PUSH_DISMISSGROUPMSG : 0x00A40035,    // ,"CCDP-推送退出或解散群组消息","CCDP"),
	             CCDP_PUSH_FRIENDRELATION : 0x00A40036,    // ,"CCDP-推送好友关系","CCDP"),
	             CCDP_PUSH_USERSTATUS : 0x00A40037,   // "CCDP-用户状态推送", "CCDP"),
	             CCDP_PUSH_BEKICKED : 0x00A40037 // 这个命令同   CCDP_PUSH_USERSTATUS   一样，是作为被踢下线的命令处理的
	
	            /*CCDP_GET_FILES:0x00A40039,
	            CCDP_SEND_FILES:0x00A4002B   //文件消息成功*/
	        },
	        app: {
	            network : {
	                linked : 0xC101,
	                down : 0xC102
	            },
	            sendToolPage:0x0003,
	            goBack : 0xC103,
	            startRecord : 0x1001,
	            stopRecord : 0x1002,
	            playVoice : 0x2001,
	            getContacts : 0xC010,
	            switchPage : 0xC020,
	            callChatFunction : 0xC030,
	            takeImage: 0x4001,
	            previewImage: 0x4002,
	            CCDPBusinessVehicleDiagnosis: 0xB001,
	            CCDPBusinessSecurityMatching: 0xB002,
	            CCDPBusinessMaintenanceReset: 0xB003,
	            CCDPBusinessModuleProgramming: 0xB004,
	            CCDPBusinessEncodingSettings: 0xB005,
	            CCDPBusinessSimulationTrial: 0xB006,
	            CCDPBusinessWifiSetting: 0xB007,
	            CCDPBusinessCheckDevConnect: 0xB008,
	            CCDPBusinessSystemSetting:0xB012,
	            getCCDPBusinessList: 0xC001,
	            CCDPBusinessAPP2PC: 0xC009,
	            settingNetCont: 0xB009,
	            SettingDevCont: 0xB010,
	            loadIndexPage : 0xB011,
	            sendVehicleInformation:0x900F,
	            sendPic:0x9003,
	            sendFiles:0x900B,
	            downFiles:0X900C
	        }
	    },
	    what_pages: {
	        vehicleDiagnosis: 0xA001,
	        securityMatching: 0xA002,
	        maintenanceReset: 0xA003,
	        moduleProgramming: 0xA004,
	        encodingSettings: 0xA005,
	        simulationTrial: 0xA006,
	        wifiSetting: 0xA007,
	        checkDevConnect: 0xA008,
	        systemSetting: 0xA011
	    },
	    what_fun4chat: {
	        rmt_pc: 0xA001,
	        rmt_phone: 0xA002,
	        takeImage: 0xA003,
	        video: 0xA004,
	        voice: 0xA005
	    },
	    events: {
	        pushPrefix: 'pushPrefix-!-!-!',
	        yhAppCallJs: 'yhAppCallJs-!-!-!',
	        onReceiveMessage: 'onReceiveMessage',
	        connectionStatusChanged: 'connectionStatusChanged',
	        onStateEnter: '-!-!-onEnter-!-!-',
	        onStateExit: '-!-!-onExit-!-!-',
	        onStateExitLogin: '-!-!-ExitLogin-!-!-',
	        onStateIsLogin: '-!-!-isLogin-!-!-',
	        refreshData: 'refreshData-!-!'
	    },
	
	    //imgUrlPrefix: 'http://192.168.13.196:8099/file/api-git/img.get?fn=',
	    imgUrlPrefix: 'http://112.124.26.243:8099/file/api-git/img.get?fn=',
	
	    questionState: {
	        1: '未解决',
	        2: '已解决',
	        3: '已失效'
	    },
	    answersType: {
	        1: '追问:',
	        2: '追答:'
	    },
	    questionTypeState: {
	        1: '追问：',
	        2: '追答：',
	        3: '感谢：',
	        4: '采纳'
	    },
	    acceptStatus: {
	        accept: 0,
	        isAccept: 1
	    },
	    comprehensive: {
	        question: 1,
	        answers: 2,
	        collection: 3
	    },
	    questionDetail: {
	        supplementaryQuestions: '补充问题',
	        ToAnswers: '我要回答'
	    },
	    evaluationState: {
	        1: '未评价',
	        2: '未评价',
	        3: '未评价',
	        4: '未评价',
	        5: '已评价'
	    },
	    operationType: {
	        generalAnswer: 0,
	        ask: 1,
	        chatAnswer: 2,
	        thanks: 3,
	        Adopt: 4
	    },
	    answerContent: {
	        Adopt: '太给力了,您的回答完美的解决了我的问题,谢谢!',
	        thanks: '谢谢您细致的解答,我的问题已解决'
	    },
	    filterType: {
	        brand: 0,
	        service: 1,
	        expertLevel: 2,
	        praise: 3,
	        ranger: 4,
	        online: 5
	    },
	    relation: {
	        applied: 1,
	        accepted: 2,
	        removed: 3,
	        refused: 4
	    },
	    rongCloud: {
	        appKey: 'lmxuhwagxy2ed',
	        ConversationType: {
	            NONE: 0,
	            PRIVATE: 1,
	            DISCUSSION: 2,
	            GROUP: 3,
	            CHATROOM: 4,
	            CUSTOMER_SERVICE: 5,
	            SYSTEM: 6,
	            APP_PUBLIC_SERVICE: 7,
	            PUBLIC_SERVICE: 8
	        }
	    },
	
	    //修改技师设置获取键值
	    modifyTechnicianSetup: {
	        userName: 1, //用户名
	        userSex: 2,  //性别
	        userIcon: 3, //头像
	        userNickname: 4, //昵称
	        userServiceBrand: 5,  //擅长处理
	        userServiceTime: 6, //服务时间
	        userRemark: 7, // 服务介绍
	        userServiceProject: 8
	    },
	
	    // 區別遠程協助發送至App 是否為請求方 與其 接受方.
	    differenceRemoteRequest: {
	        initiator: 0,  //發起
	        receivingParty: 1 //接受
	    }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	var adjustBottomBy = function ($ionicScrollDelegate) {
	
	    return {
	        restrict: 'EA',
	        scope   : false,
	        link    : link
	    };
	
	    function link(scope, element, attrs) {
	        var el    = element[0];
	        var major = el.querySelector('[data-perspect="major"]');
	        var minor = el.querySelector('[data-perspect="minor"]');
	
	        scope.$watch(attrs.adjustBottomBy, function () {
	
	            setTimeout(function () {
	                console.log('adjustBottomBy');
	
	                var height = major.clientHeight;
	
	                angular.element(minor).css('bottom', height + 'px');
	
	                $ionicScrollDelegate.scrollBottom();
	            }, 100);
	
	        });
	
	        console.log('major: ', major);
	        console.log('minor: ', minor);
	    }
	};
	
	adjustBottomBy.$inject = [
	    '$ionicScrollDelegate'
	];
	
	module.exports = adjustBottomBy;
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/12/4.
	 */
	
	var _ = __webpack_require__(5);
	
	var changeBackgroundDiagnosis = function ($timeout, Constants, JSCommand) {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	
	    function link(scope, element, attrs) {
	
	        //车辆诊断
	        scope.changeBackgroundDiagnosis = function () {
	            element.css('background', '#CED3D9');
	        };
	        scope.goToVehicleDiagnosis = function () {
	            //console.log('vehicleDiagnosis');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                JSCommand.app.switchPages(Constants.what_pages.vehicleDiagnosis);
	            }, 300)
	        };
	    }
	};
	
	changeBackgroundDiagnosis.$inject = [
	    '$timeout',
	    'Constants',
	    'JSCommand'
	];
	
	module.exports = changeBackgroundDiagnosis;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/12/5.
	 */
	
	var changeBackgroundProgramming = function (JSCommand,
	                                            Constants,
	                                            $timeout) {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	
	    function link(scope, element, attrs) {
	        scope.changeBackgroundProgramming = function () {
	            element.css('background', '#CED3D9');
	        };
	        scope.goToModuleProgramming = function () {
	            console.log('goToVehicleDiagnosis');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                //根据产品要求将模块编程的链接和设码配置一样,所以交换了指令
	                //CCDPBusinessModuleProgramming模块编程指令
	                //var moduleProgramming = Constants.APP_CMD.request.CCDPBusinessModuleProgramming;
	                JSCommand.app.switchPages(Constants.what_pages.moduleProgramming);
	            }, 300)
	        };
	    }
	};
	
	changeBackgroundProgramming.$inject = [
	    'JSCommand',
	    'Constants',
	    '$timeout'
	];
	
	module.exports = changeBackgroundProgramming;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/12/5.
	 */
	var changeBackgroundCodSet= function (JSCommand,Constants,$timeout) {
	    return{
	        restrict:'EA',
	        scope:false,
	        link:link
	    };
	    function link(scope, element){
	        scope.changeBackgroundReset = function () {
	            element.css('background', '#CED3D9');
	        };
	        //保养复位
	        scope.goToMaintenanceReset = function () {
	            console.log('goToEncodingSettings');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                JSCommand.app.switchPages(Constants.what_pages.maintenanceReset);
	            }, 300)
	        };
	
	    }
	};
	changeBackgroundCodSet.$inject=[
	    'JSCommand',
	    'Constants',
	    '$timeout'
	];
	module.exports=changeBackgroundCodSet;

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/12/5.
	 */
	var changeBackgroundEncodSet= function (JSCommand,Constants,$timeout) {
	    return{
	        restrict:'EA',
	        scope:false,
	        link:link
	    };
	    function link(scope, element){
	        scope.changeBackgroundEncodSet = function () {
	            element.css('background', '#CED3D9');
	        };
	        //设码配置
	        scope.goToEncodingSettings = function () {
	            console.log('goToEncodingSettings');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                JSCommand.app.switchPages(Constants.what_pages.encodingSettings);
	            }, 300)
	        };
	
	    }
	};
	changeBackgroundEncodSet.$inject=[
	    'JSCommand',
	    'Constants',
	    '$timeout'
	];
	module.exports=changeBackgroundEncodSet;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/12/5.
	 */
	var changeBackgroundTrial= function (JSCommand,Constants,$timeout) {
	    return{
	        restrict:'EA',
	        scope:false,
	        link:link
	    };
	    function link(scope, element){
	        scope.changeBackgroundTrial = function () {
	            element.css('background', '#CED3D9');
	        };
	        //ģ������
	        scope.goToSimulationTrial = function () {
	            console.log('goToEncodingSettings');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                JSCommand.app.switchPages(Constants.what_pages.simulationTrial);
	            }, 300)
	        };
	
	    }
	};
	changeBackgroundTrial.$inject=[
	    'JSCommand',
	    'Constants',
	    '$timeout'
	];
	module.exports=changeBackgroundTrial;

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/12/5.
	 */
	var changeBackgroundSystemSetting= function (JSCommand,Constants,$timeout) {
	    return{
	        restrict:'EA',
	        scope:false,
	        link:link
	    };
	    function link(scope, element){
	        scope.changeBackgroundSystemSetting = function () {
	            element.css('background', '#CED3D9');
	        };
	        //设置
	        scope.goToSystemSetting = function () {
	            console.log('changeBackgroundSystemSetting');
	            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
	            $timeout(function () {
	                JSCommand.app.switchPages(Constants.what_pages.SystemSetting);
	            }, 300)
	        };
	
	    }
	};
	changeBackgroundSystemSetting.$inject=[
	    'JSCommand',
	    'Constants',
	    '$timeout'
	];
	module.exports=changeBackgroundSystemSetting;

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/7.
	 */
	var isShowTabs = function ($rootScope){
	    return{
	        restrict : 'A',
	        scope : false,
	        link : link
	    };
	
	    function link (scope,element,attrs){
	        scope.isShowTabs = function (){
	            $rootScope.showTabs = false;
	        };
	
	    }
	};
	
	isShowTabs.$inject = [
	    '$rootScope'
	];
	
	module.exports = isShowTabs;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/12/4.
	 */
	
	var _ = __webpack_require__(5);
	
	var homePage = function () {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	    function link(scope,element){
	        var docEl = document.documentElement;
	        var clientWidth = docEl.clientWidth;
	        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	        console.log("html",docEl.style.fontSize);
	
	    }
	};
	
	
	    homePage.$inject = [
	
	    ];
	
	    module.exports = homePage;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by lianghaicheng on 2016/1/22.
	 */
	
	var _ = __webpack_require__(5);
	
	var indexList = function () {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	    function link(scope,element){
	        var height= window.innerHeight+'px';
	        element.css('height',height);
	        var width=window.innerWidth;
	        console.log("width:",width);
	        console.log("height:",height);
	    }
	};
	
	
	indexList.$inject = [
	
	];
	
	module.exports = indexList;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by haicheng on 2016/1/27.
	 */
	
	var _ = __webpack_require__(5);
	
	var assiScrollHeight = function ($ionicSlideBoxDelegate,$ionicScrollDelegate) {
	    return {
	        restrict: 'EA',
	        link: link
	    };
	    function link(scope, elm, attr){
	        var raw = elm[0];
	        var _index=$ionicSlideBoxDelegate.$getByHandle('hand-viewer')._instances[0].currentIndex();
	        elm.bind('scroll', function() {
	            console.log(raw);
	                if($ionicSlideBoxDelegate.$getByHandle('hand-viewer')._instances[0].currentIndex()!==_index){
	                    $ionicScrollDelegate.scrollTop();
	                }
	        });
	    }
	};
	
	
	assiScrollHeight.$inject = [
	"$ionicSlideBoxDelegate",
	    '$ionicScrollDelegate'
	];
	
	module.exports = assiScrollHeight;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/12/8.
	 */
	var _ = __webpack_require__(5);
	
	var chatMenu = function () {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	    function link(scope,element){
	        function elementNo(){
	            for(var i=0;i<element.children().length;i++){
	                element.children()[i].className='';
	            }
	        }
	        element.children().on('click',function(){
	            elementNo();
	            this.className='on';
	            setTimeout(function(){
	                elementNo();
	            },500);
	        });
	
	    }
	};
	
	
	chatMenu.$inject = [
	];
	
	module.exports = chatMenu;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var checkNickName =  function (){
	    return {
	        require: 'ngModel',
	        scope: {
	            someProperty: '@'
	        },
	        link: function (scope, element, attrs, ngModel) {
	            var flag;
	            var time=sessionStorage.getItem("updataTime");
	            flagNickNameTiemStamp(time);
	            ngModel.$parsers.push(function (value) {
	                var isError = flagNickNameTiemStamp(time);
	                if (isError > 0) {
	                    ngModel.$setValidity('nickNameTime', true);
	                    return value;
	                } else if (isError < 0) {
	                    ngModel.$setValidity('nickNameTime', false);
	                    return value;
	                }
	            });
	            function flagNickNameTiemStamp(timeUp) {
	                    var nickNameTime = new Date(timeUp.replace(/-/g, '/').substring(0, 19));
	                    nickNameTime.setHours(24);
	                    nickNameTime.setUTCMinutes(0);
	                    nickNameTime.setSeconds(0);
	                    var nowTime = new Date();
	                    var updateZeroTime = new Date(nickNameTime);
	                    var nowTimeStamp = nowTime.getTime();
	                    var updateZeroTimeStamp = updateZeroTime.getTime();
	                    if (nowTime > updateZeroTime) {
	                        flag = 1;
	                    } else {
	                        flag = -1;
	                    }
	                return flag
	            }
	        }
	    };
	};
	
	checkNickName.$inject = [
	
	];
	
	module.exports = checkNickName;

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var hourDirective = function ($ionicScrollDelegate){
	    return {
	        restrict: 'A',
	
	        link: function (scope, element, attrs, model) {
	            //element[0].children[0].style.transform = "translate3d(0px," + -Number(sessionStorage.getItem('hourFlag1')) * 50 + "px,0px) scale(1)";
	            //console.log(element[0].children[0].style.transform);
	            scope.anchorScroll = function () {
	                for (var i = 0; i < element[0].children[0].children.length; i++) {
	                    element[0].children[0].children[i].style.color = "#000";
	                }
	                $ionicScrollDelegate.$getByHandle('hourScroll');
	                //Math.ceil($ionicScrollDelegate.$getByHandle('hourScroll').getScrollPosition().top = 0);
	                var num = Math.round(Math.ceil($ionicScrollDelegate.$getByHandle('hourScroll').getScrollPosition().top) / 50);
	                var double = Math.ceil($ionicScrollDelegate.$getByHandle('hourScroll').getScrollPosition().top) / 50;
	                var index;
	                //$ionicScrollDelegate.$getByHandle('hourScroll').scrollTo(0, num * 50, false);
	                if (double >= num - 0.5 && double < num + 0.5) {
	                    element[0].children[0].style.transform = "translate3d(0px," + -num * 50 + "px,0px) scale(1)";
	                }
	                if (num < 0) {
	                    index = 0;
	                }
	                else if (num > element[0].children[0].children.length - 3) {
	                    index = element[0].children[0].children.length - 3;
	                }
	                else {
	                    index = num;
	                }
	                element[0].children[0].children[index + 1].style.color = "#ff9c00";
	                if (!sessionStorage.getItem('timeFlag')) {
	                    sessionStorage.setItem('timeFlag', 0);
	                }
	                if (sessionStorage.getItem('timeFlag') == 0) {
	                    sessionStorage.setItem('hourFlag1', (Number(num) < 10 ? '0' + num : num));
	                }
	                else {
	                    sessionStorage.setItem('hourFlag2', (Number(num) < 10 ? '0' + num : num));
	                }
	            };
	        }
	    }
	};
	
	hourDirective.$inject =[
	    '$ionicScrollDelegate'
	];
	
	module.exports =hourDirective;

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var hoursDirective = function (){
	    return {
	        restrict: 'EA',
	
	        template: '<span ng-repeat="hour in hourArr" ng-class={"quesolg":hour.hourClass}>{{hour.hour}}</span>',
	
	        replace: true,
	
	        link: function (scope, element, attrs, model) {
	            var loopHourArr = [{
	                begin: 00,
	                end: 24
	            }];
	            scope.hourArr = [];
	            var j;
	            //var hourFlag = (Number(sessionStorage.getItem('timeFlag')) === 0) ? (sessionStorage.getItem('hourFlag1')) : (sessionStorage.getItem('hourFlag2'));
	
	            for (var i = loopHourArr[0].begin; i < loopHourArr[0].end; i++) {
	                if (i === 0) {
	                    j = "0" + i;
	                    scope.hourArr.push({hour: j, hourClass: true})
	                } else if (i < 10) {
	                    j = "0" + i;
	                    //if (Number(i) === Number(hourFlag)) {
	                    //    scope.hourArr.push({hour: j, hourClass: true})
	                    //}
	                    //else {
	                    scope.hourArr.push({hour: j, hourClass: false});
	                    //}
	                }
	                else {
	                    //if (Number(i) === Number(hourFlag)) {
	                    //    scope.hourArr.push({hour: i, hourClass: true})
	                    //}
	                    //else {
	                    scope.hourArr.push({hour: i, hourClass: false});
	                    //}
	                }
	            }
	            if (!sessionStorage.getItem('timeFlag')) {
	                sessionStorage.setItem('timeFlag', 0);
	            }
	            if (Number(sessionStorage.getItem('timeFlag')) === 0) {
	                sessionStorage.setItem('hourFlag1', '00');
	            }
	            if (Number(sessionStorage.getItem('timeFlag')) === 1) {
	                sessionStorage.setItem('hourFlag2', '00');
	            }
	            //element[0].parentElement.style.transform = "translate3d(0px," + -Number(hourFlag) * 50 + "px,0px) scale(1)";
	            //console.log(element[0].parentElement);
	        }
	    }
	};
	
	hoursDirective.$inject =[
	
	];
	
	module.exports =hoursDirective;

/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var minuteDirective = function ($ionicScrollDelegate){
	    return {
	        restrict: 'A',
	
	        link: function (scope, element, attrs, model) {
	            scope.anchorScroll = function () {
	                for (var i = 0; i < element[0].children[0].children.length; i++) {
	                    element[0].children[0].children[i].style.color = "#000";
	                }
	                $ionicScrollDelegate.$getByHandle('minuteScroll');
	                //Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top = 0);
	                num = Math.round(Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top) / 50);
	                double = Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top) / 50;
	                var index;
	                //$ionicScrollDelegate.$getByHandle('hourScroll').scrollTo(0, num * 50, false);
	                if (double >= num - 0.5 && double < num + 0.5) {
	                    element[0].children[0].style.transform = "translate3d(0px," + -num * 50 + "px,0px) scale(1)";
	                }
	                if (num < 0) {
	                    index = 0;
	                }
	                else if (num > element[0].children[0].children.length - 3) {
	                    index = element[0].children[0].children.length - 3;
	                }
	                else {
	                    index = num;
	                }
	                element[0].children[0].children[index + 1].style.color = "#ff9c00";
	                if (!sessionStorage.getItem('timeFlag')) {
	                    sessionStorage.setItem('timeFlag', 0);
	                }
	                if (sessionStorage.getItem('timeFlag') == 0) {
	                    sessionStorage.setItem('minuteFlag1', (Number(num) < 10 ? '0' + num : num));
	                }
	                else {
	                    sessionStorage.setItem('minuteFlag2', (Number(num) < 10 ? '0' + num : num));
	                }
	            };
	        }
	    }
	};
	
	minuteDirective.$inject =[
	    '$ionicScrollDelegate'
	];
	
	module.exports =minuteDirective;

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var minutesDirective = function (){
	    return{
	        restrict: 'EA',
	
	        template: '<span ng-repeat="minute in minuteArr" ng-class={"quesolg":minute.minuteClass}>{{minute.minute}}</span>',
	
	        replace: true,
	
	        link: function (scope, element, attrs, model) {
	            var loopminuteArr = [{
	                begin: 00,
	                end: 60
	            }];
	            scope.minuteArr = [];
	            var j;
	
	            for (var i = loopminuteArr[0].begin; i < loopminuteArr[0].end; i++) {
	                if (i === 0) {
	                    j = "0" + i;
	                    scope.minuteArr.push({minute: j, minuteClass: true});
	                } else if (i < 10) {
	                    j = "0" + i;
	                    scope.minuteArr.push({minute: j, minuteClass: false});
	                }
	                else {
	                    scope.minuteArr.push({minute: i, minuteClass: false});
	                }
	            }
	            if (Number(sessionStorage.getItem('timeFlag')) === 0) {
	                sessionStorage.setItem('minuteFlag1', '00');
	            }
	            if (Number(sessionStorage.getItem('timeFlag')) === 1) {
	                sessionStorage.setItem('minuteFlag2', '00');
	            }
	        }
	    }
	};
	
	minutesDirective.$inject =[
	
	];
	
	module.exports =minutesDirective;

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Created by vip on 2015/12/10.
	 */
	var startEndDirective = function () {
	
	    return {
	        restrict: 'EA',
	        link: function (scope, element, attrs, model) {
	            scope.currentTimeTab = "currentTimeTab1";
	            scope.selectTimeTab = function (timeTab) {
	                scope.currentTimeTab = timeTab;
	                if (timeTab == 'currentTimeTab1') {
	                    sessionStorage.setItem('timeFlag', 0);
	                }
	                else {
	                    sessionStorage.setItem('timeFlag', 1);
	                }
	            }
	        }
	    }
	
	};
	
	startEndDirective.$inject = [
	
	];
	
	module.exports = startEndDirective;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by vip on 2015/12/23.
	 */
	var _ = __webpack_require__(5);
	
	var formTextFocus = function ($timeout) {
	    return {
	        restrict: "EA",
	
	        link: function (scope, element, attrs, model) {
	            element.find('i').eq(2).bind('click', function () {
	                $timeout(function () {
	                    element.find('input')[0].focus();
	                }, 10);
	            });
	        }
	    }
	};
	
	formTextFocus.$inject = [
	    '$timeout'
	];
	
	module.exports = formTextFocus;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/12/4.
	 */
	
	var _ = __webpack_require__(5);
	
	var homePage = function () {
	    return {
	        restrict: 'EA',
	        scope: false,
	        link: link
	    };
	    function link(scope,element){
	        var height= window.innerHeight -260+'px';
	        element.css('height',height);
	        var width=window.innerWidth;
	        console.log("width:",width);
	        console.log("height:",height);
	
	
	        var docEl = document.documentElement;
	        var clientWidth = docEl.clientWidth;
	        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	        console.log("html",docEl.style.fontSize);
	
	
	       /* console.log('document',document);
	        console.log('window',window);
	            var docEl = document.documentElement,
	                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	                recalc = function () {
	                    var clientWidth = docEl.clientWidth;
	                    if (!clientWidth) return;
	                    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	                };
	            console.log("html~~~~~~~~~~~",docEl);
	            if (!document.addEventListener) return;
	        window.addEventListener(resizeEvt, recalc, false);
	        document.addEventListener('DOMContentLoaded', recalc, false);*/
	
	    }
	};
	
	
	    homePage.$inject = [
	
	    ];
	
	    module.exports = homePage;

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Created by tapes on 2015/9/15.
	 */
	
	var prefixSrc = function (Constants) {
	    return function (icon) {
	        return Constants.imgUrlPrefix + (icon || 'avatar.jpg');
	    }
	};
	
	prefixSrc.$inject = [
	    'Constants'
	];
	
	module.exports = prefixSrc;

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Created by tapes on 2015/10/22.
	 */
	
	var formatSecond = function () {
	    return function (input) {
	        return Math.round(input / 1000);
	    }
	};
	
	formatSecond.$inject = [];
	
	module.exports = formatSecond;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	var _ = __webpack_require__(5);
	
	module.exports = function () {
	    // 比较fiter
	    return function (input, args) {
	
	        var filterArr = [];
	        _.forEach(input, function (categoryInAlpha) {
	
	            var nPos = comPare(args, categoryInAlpha.nickName);
	            if (nPos >= 0) {
	                filterArr.push(categoryInAlpha);
	            }
	            if (categoryInAlpha.contactName) {
	                var cNamePos = comPare(args, categoryInAlpha.contactName);
	                if (cNamePos >= 0 && cNamePos != nPos) {
	                    filterArr.push(categoryInAlpha);
	                }
	            }
	            if (categoryInAlpha.phoneNumber) {
	                var pNumberPos = comPare(args, categoryInAlpha.phoneNumber);
	                if (pNumberPos >= 0 && (pNumberPos != nPos && pNumberPos != cNamePos )) {
	                    filterArr.push(categoryInAlpha);
	                }
	            }
	        });
	        return filterArr;
	    };
	
	    function comPare(sFind, sObj) {
	        var nSize = sFind.length;
	        var nLen = sObj.length;
	        var sCompare;
	
	        if (nSize <= nLen) {
	            for (var i = 0; i <= nLen - nSize + 1; i++) {
	                sCompare = sObj.substring(i, i + nSize);
	                if (sCompare == sFind) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Created by tapes on 2015/9/6.
	 */
	
	var PromiseManager = function ($q, Constants) {
	
	    var _increasedId = 1;
	    var _promiseMap = {};
	
	    return {
	        request: request,
	        response: response
	    };
	
	    function request(func) {
	        var deferred = $q.defer();
	        var promiseId = promiseId();
	
	        _promiseMap[promiseId] = deferred;
	
	        func(promiseId);
	
	        return deferred.promise;
	    }
	
	    function response(promiseId, func) {
	        var deferred = _promiseMap[promiseId];
	
	        _promiseMap[promiseId] = null;
	
	        func(deferred);
	    }
	
	    function promiseId() {
	
	        if (_increasedId >= 0xFFFFFFFF) {
	            _increasedId = 1;
	        }
	
	        return _increasedId++;
	    }
	
	};
	
	PromiseManager.$inject = [
	    '$q',
	    'Constants'
	];
	
	module.exports = PromiseManager;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/15.
	 */
	
	var _ = __webpack_require__(5);
	
	var FriendRelationManager = function ($rootScope) {
	
	    var prefix = '!!-FriendRelation-!!';
	
	    $rootScope.__userList__ = [];
	
	    function getKey() {
	        //var currentUser = UCenterService.getProfile();
	        //
	        //var currentUserId = currentUser.id;
	        //
	        //return prefix + currentUserId;
	    }
	
	    return {
	
	        loadUserListFromLocalStorage: function () {
	            //var userListStr = localStorage.getItem(getKey());
	            //var __userList__ = JSON.parse(userListStr) || [];
	            //
	            //// 插入
	            //Array.prototype.splice.apply($rootScope.__userList__, [$rootScope.__userList__.length, 0].concat(__userList__));
	            //console.log('loadUserListFromLocalStorage');
	            //
	            //$rootScope.$watch('__userList__', function (__userList__) {
	            //    console.log('同步 FriendRelation', __userList__);
	            //
	            //    var userListStr = JSON.stringify(__userList__);
	            //
	            //    localStorage.setItem(getKey(), userListStr);
	            //}, true);
	        },
	
	        refresh: function (newUser) {
	            //if (newUser.relation === Constants.relation.removed) {
	            //    this.removeUser(newUser.id);
	            //} else {
	            //    var user = this.getUser(newUser.id);
	            //
	            //    if (user) {
	            //        this.updateUser(newUser);
	            //    } else {
	            //        $rootScope.__userList__.unshift(newUser);
	            //    }
	            //}
	
	        },
	
	        onRefresh: function (cb) {
	            return $rootScope.$watch('__userList__', cb, true);
	        },
	
	        getUserList: function () {
	
	
	            return $rootScope.__userList__;
	        },
	
	        getUser: function (id) {
	            return _.findWhere($rootScope.__userList__, {
	                id: id
	            });
	        },
	
	        updateUser: function (newUser) {
	            //var user = this.getUser(newUser.id);
	            //
	            //if (user) {
	            //    _.extend(user, newUser);
	            //}
	
	        },
	
	        refused : function(id){
	            //var user = _.findWhere($rootScope.__userList__, {
	            //    id: id
	            //});
	            //
	            //if(user){
	            //    user.relation =Constants.relation.refused;
	            //}
	            //
	            //console.log('$rootScope.__userList__',$rootScope.__userList__);
	        },
	
	        removeUser: function (id) {
	            //var user = this.getUser(id);
	            //var index;
	            //
	            //if (user) {
	            //    index = $rootScope.__userList__.indexOf(user);
	            //    $rootScope.__userList__.splice(index, 1);
	            //}
	
	        }
	    };
	};
	
	FriendRelationManager.$inject = [
	    '$rootScope',
	    'Constants',
	    'JSCache'
	
	];
	
	module.exports = FriendRelationManager;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2016/1/6.
	 */
	var JSTransport = function ($rootScope) {
	
	    return {
	        send: function (message) {
	            try {
	                 window.YHJavascriptToApp.sendToApp(message);
	                 console.log('发送指令为',message,"到App");
	            }
	            catch (error) {
	                console.error(error);
	            }
	        },
	
	        sendEx : function(map){
	            try{
	                var message = JSON.stringify(map);
	                return this.send(message);
	            }
	            catch(error){
	                console.error(error);
	            }
	        },
	
	        receive : function(json){
	            $rootScope.$broadcast('YHJSReceiver', json);
	        }
	    }
	
	};
	
	JSTransport.$inject = [
	    '$rootScope'
	];
	
	module.exports = JSTransport;

/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2016/1/6.
	 */
	var JSCommand = function (JSTransport, Constants) {
	
	    return {
	        rongcloud: {
	            // 发送文本消息
	            sendTextMessage: function (targetId, text, conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.sendTestMessage;
	                message["message"] = text;
	                message["conversationType"] = conversationType;
	                message["targetId"] = targetId;
	                return JSTransport.sendEx(message);
	            },
	            // 发送文本消息语音
	            sendVoiceMessage: function (target, voiceURL, conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.sendVoiceMessage;
	                message["message"] = text;
	                message["conversationType"] = conversationType;
	                message["targetId"] = targetId;
	                return JSTransport.sendEx(message);
	            },
	            // 获取会话信息
	            getConversation: function (targetId, conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.getConversation;
	                message["conversationType"] = conversationType;
	                message["targetId"] = targetId;
	                return JSTransport.sendEx(message);
	            },
	            //  获取会话列表
	            getConversationList: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.getConversationList;
	                return JSTransport.sendEx(message);
	            },
	            // 清除会话
	            clearConversations: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.clearConversation;
	                return JSTransport.sendEx(message);
	            },
	            // 获取历史消息
	            getHistoryMessages: function (targetId, conversationType, oldestMessageId, count) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.getHistoryMessages;
	                message["targetId"] = targetId;
	                message["conversationType"] = conversationType;
	                message["oldestMessageId"] = oldestMessageId;
	                message["count"] = count;
	                return JSTransport.sendEx(message);
	            },
	            // 获取最新的消息
	            getLatestMessages: function (targetId, conversationType, count) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.getLatestMessages;
	                message["targetId"] = targetId;
	                message["conversationType"] = conversationType;
	                message["count"] = count;
	                return JSTransport.sendEx(message);
	            },
	            // 退出会话
	            exitConversation: function (targetId, conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.exitConversation;
	                message["targetId"] = targetId;
	                message["conversationType"] = conversationType;
	                return JSTransport.sendEx(message);
	            },
	            // 新建 或者 修改 群
	            /*createOrRefreshGroup: function (group) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.createOrRefreshGroup;
	                message["group"] = group;
	                return JSTransport.sendEx(message);
	            },*/
	            //获取消息总数
	            getTotalContacts: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.totalContacts;
	                return JSTransport.sendEx(message);
	            },
	            //获取单根未读消息总数
	            getPersonalUnreadMessages: function (targetId,conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.rongcloud.personalUnreadMessages;
	                message["targetId"] = targetId;
	                message["conversationType"] = conversationType;
	                return JSTransport.sendEx(message);
	            }
	        },
	        ccdp: {
	            // 通过用户名和密码登录
	            login: function (username, password) {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGIN;
	                message["username"] = username;
	                message["password"] = password;
	                return JSTransport.sendEx(message);
	            },
	            // 通过token登录
	            loginEx: function (token) {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGIN;
	                message["token"] = token;
	                return JSTransport.sendEx(message);
	            },
	            // 发送验证码
	            sendVerificationCode: function (userName) {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_SEND_CAPTCHA;
	                message["userName"] = userName;
	                return JSTransport.sendEx(message);
	            },
	            // 登出
	            logout: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGOUT;
	                return JSTransport.sendEx(message);
	            },
	            // 心跳, 在JS端这个函数不会用到
	            heartbeat : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_HEARTBEAT;
	                return JSTransport.sendEx(message);
	            },
	            // 激活设备
	            activeDevice : function(userId, deviceId, alias, address, phone, company, qq){
	                // 0x00A40005
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_ACTIVEINFO;
	                message["userId"] = userId;
	                message["deviceId"] = deviceId;
	                message["alias"] = alias;
	                message["address"] = address;
	                message["phone"] = phone;
	                message["company"] = company;
	                message["qq"] = qq;
	                return JSTransport.sendEx(message);
	            },
	            // 判读设备是否激活
	            judgeDevice : function(deviceId){
	                // 0x00A40006
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_JUDGEACTIVEINFO;
	                message["deviceId"] = deviceId;
	                return JSTransport.sendEx(message);
	            },
	            // 图片上传
	            uploadImage : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_UPLOAD_IMAGE;
	                return JSTransport.sendEx(message);
	            },
	            // 查询品牌列表
	            queryBrandList : function(brandId){
	                // 0x00A40008
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_BRANDLIST;
	                message["brandId"] = brandId;
	                return JSTransport.sendEx(message);
	            },
	            // 查询服务列表
	            queryServeList : function(seriesId){
	                // 0x00A40009
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_SERVELIST;
	                message["seriesId"] = seriesId;
	                return JSTransport.sendEx(message);
	            },
	            // 查询用户详情
	            queryUserDetail : function(userId){
	                // 0x00A4000A
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO;
	                message["userId"] = userId;
	                return JSTransport.sendEx(message);
	            },
	            // 修改用户信息
	            modifyUser : function(key, value, imgName){
	                // 0x00A4000C
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO;
	                message["key"] = key;
	                message["value"] = value;
	                message["imgName"] = imgName;
	                return JSTransport.sendEx(message);
	            },
	            // 查询用户个人资料
	            queryUser : function(){
	                // 0x00A4000D
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERINFO;
	                return JSTransport.sendEx(message);
	            },
	            // 按条件查询用户
	            queryUserByCondition : function(pageNum, pageSize, filter){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS;
	                message["pageNum"] = pageNum;
	                message["pageSize"] = pageSize;
	                message["filter"] = filter;
	                return JSTransport.sendEx(message);
	            },
	            // 申请实名认证
	            authenticationUser : function(realName,cardId,frontPhotoName,backPhotoName ){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_USERAUTHENTICATION;
	                message["realName"] = realName;
	                message["cardId"] = cardId;
	                message["frontPhotoName"] = frontPhotoName;
	                message["backPhotoName"] = backPhotoName;
	                return JSTransport.sendEx(message);
	            },
	            // 获取融云token, js应该不会调用，有android调用
	            getRongCloudToken : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_GET_RONG_TOKEN;
	                return JSTransport.sendEx(message);
	            },
	            // 请求远程协助
	            requestRemoteAssist : function(minor){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
	                message["minor"] = minor;
	                return JSTransport.sendEx(message);
	            },
	            // 接受远程协助
	            acceptRemoteAssist : function(major){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST;
	                message["major"] = major;
	                return JSTransport.sendEx(message);
	            },
	            // 结束远程协助
	            finishRemoteAssist : function(minor, assistId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_END_ASSIST;
	                message["minor"] = minor;
	                message["assistId"] = assistId;
	                return JSTransport.sendEx(message);
	            },
	            // 查询我协助的记录列表
	            queryAssistFromMe : function(pageNum){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTMETO;
	                message["pageNum"] = pageNum;
	                return JSTransport.sendEx(message);
	            },
	            // 查询协助我的记录列表
	            queryAssistToMe : function(pageNum){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTTOME;
	                message["pageNum"] = pageNum;
	                return JSTransport.sendEx(message);
	            },
	            // 填写协助报告
	            generateAssistReport : function(assistId, major, minor, resolved, reason, solution){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_UPDATE_ASSISTREPORT;
	                message["assistId"] = assistId;
	                message["major"] = major;
	                message["minor"] = minor;
	                message["resolved"] = resolved;
	                message["reason"] = reason;
	                message["solution"] = solution;
	                return JSTransport.sendEx(message);
	            },
	            // 评价
	            evaluate : function(assistId, major, minor, resolved){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_EVALUATE;
	                message["assistId"] = assistId;
	                message["major"] = major;
	                message["minor"] = minor;
	                message["resolved"] = resolved;
	                return JSTransport.sendEx(message);
	            },
	            // 查询原因列表
	            queryReasonList : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_REASON;
	                return JSTransport.sendEx(message);
	            },
	            // 筛选条件选项列表: 条件类型，数字，0：品牌列表; 1: 服务项目列表; 2: 专家等级列表; 3: 专家好评列表; 4: 距离列表 5: 是否在线列表
	            queryFilterList : function(type){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST;
	                message["type"] = type;
	                return JSTransport.sendEx(message);
	            },
	            // 查询好友列表
	            queryMyFriends : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND;
	                return JSTransport.sendEx(message);
	            },
	            // 查询通讯录好友列表:手机通讯录的号码列表,应序列化为JSON字符串，结构如下[‘18866662222’,’13300004444’]
	            queryContactsFriends : function(userList){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_CONTACTSFRIEND;
	                message["userList"] = userList;
	                return JSTransport.sendEx(message);
	            },
	            // 添加好友
	            addFriend : function(friendId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_FRIEND;
	                message["friendId"] = friendId;
	                return JSTransport.sendEx(message);
	            },
	            // 接受好友
	            acceptFriend : function(friendId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND;
	                message["friendId"] = friendId;
	                return JSTransport.sendEx(message);
	            },
	            // 拒绝或者删除好友
	            deleteFriend : function(friendId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND;
	                message["friendId"] = friendId;
	                return JSTransport.sendEx(message);
	            },
	            // 查找群列表
	            queryGroupList : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_GROUP;
	                return JSTransport.sendEx(message);
	            },
	            // 新建群组
	            /*
	             {
	                 'name': '群123',
	                 'icon': 'abc.def',
	                 'groupNickName': '群456456',
	                 'isAllowStranger': 0,
	                 'isAllowSearch': 0,
	                 'isNoDisturb': 0,
	                 'userIdList': [1, 2, 3, 4, 5]
	             }
	             */
	            addGroup : function(group){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_GROUP;
	                message["group"] = group;
	                return JSTransport.sendEx(message);
	            },
	            // 查询群信息
	            queryGroupDetail : function(groupId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO;
	                message["groupId"] = groupId;
	                return JSTransport.sendEx(message);
	            },
	            // 退出或解散群组
	            quit_deleteGroup : function(groupId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUITORDELETE_GROUP;
	                message["groupId"] = groupId;
	                return JSTransport.sendEx(message);
	            },
	            // 更新群组
	            /*
	                key:（1-增加群成员，2-删除群成员，3-修改群头像，4-修改群名称，5-修改用户群昵称，6-修改是否免打扰，7-修改是否允许陌生人加群，8-修改是否允许被搜索）
	                value : 要修改的字段的值，byte[]，其中当增加群成员时，回传的数据应序列化为JSON字符串，格式为：["33","12","3321"]
	                imgName_or_userId: 当更新群头像时该值传群头像文件名（字符串类型），否则传用户id（数字）
	             */
	            updateGroup : function(groupId, key, value, imgName_or_userId){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP;
	                message["groupId"] = groupId;
	                message["key"] = key;
	                message["value"] = value;
	                if(key==3){
	                    message["imgName"] = imgName_or_userId;
	                }
	                else{
	                    message["userId"] = imgName_or_userId;
	                }
	
	                return JSTransport.sendEx(message);
	            },
	            // 添加举报群组
	            /*
	             reportReason:举报原因，字符串
	             chatLog:聊天记录，字符串
	             imgEvidence:图片证据，应序列化为JSON字符串再以 String 填入 	pkg，结构如下[‘18866662222.jpg’,’13300004444.jpg’]
	             */
	            reportGroup : function(reportedId, reportReason, chatLog, imgEvidence){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_REPORTGROUP;
	                message["reportedId"] = reportedId;
	                message["reportReason"] = reportReason;
	                message["chatLog"] = chatLog;
	                message["imgEvidence"] = imgEvidence;
	                return JSTransport.sendEx(message);
	            },
	            // 查询举报原因列表
	            queryReportReason : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_REPORTREASON;
	                return JSTransport.sendEx(message);
	            },
	            // 删除协助我的记录
	            deleteAssistToMe : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_ASSISTTOMERECORD;
	                return JSTransport.sendEx(message);
	            },
	            // 删除我协助的记录
	            deleteAssistFromMe : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_ASSISTMETORECORD;
	                return JSTransport.sendEx(message);
	            },
	            // 查询好友关系列表
	            queryFriendRelation : function(){
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_FRIENDRELATION;
	                return JSTransport.sendEx(message);
	            },
	            //监听好友推送关系
	            getNewFriendTotal: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_FRIENDRELATION;
	                return JSTransport.sendEx(message);
	            }
	            //监听发送文件消息成功
	            /*getNewFilesMessage: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.ccdp.CCDP_SEND_FILES;
	                return JSTransport.sendEx(message);
	
	            }*/
	        },  // RPC 相关
	        app: {
	            // 读取首页数据
	            loadIndexPage: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.loadIndexPage;
	                return JSTransport.sendEx(message);
	            },
	            // 开始录音
	            startRecord: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.startRecord;
	                return JSTransport.sendEx(message);
	            },
	            // 停止录音
	            stopRecord: function (targetId,conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.stopRecord;
	                message["targetId"] = targetId;
	                message["conversationType"] = conversationType;
	                return JSTransport.sendEx(message);
	            },
	
	            // 播放语音
	            playVoice: function (filePath) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.playVoice;
	                message["filePath"] = filePath;
	
	                return JSTransport.sendEx(message);
	            },
	
	            // 页面跳转
	            switchPages: function (page) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.switchPage;
	                message["page"] = page;
	                return JSTransport.sendEx(message);
	            },
	            // 调用聊天界面的功能
	            callChatFunction: function (func) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.callChatFunction;
	                message["func"] = func;
	                return JSTransport.sendEx(message);
	            },
	            homePageAuthorizationNotice: function () {
	                var message = {};
	                //APPService.request(Constants.APP_CMD.request.homePageAuthorizationNotice,params);
	            },
	            subPageFrameAuthorizationNotice: function () {
	                var message = {};
	                //APPService.request(Constants.APP_CMD.request.subPageAuthorizationNotice,params);
	            },
	            getPreviewImage: function (id, cmd, key) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.previewImage;
	                message["id"] = id;
	                message["cmd"] = cmd;
	                message["key"] = key;
	                //message["Params"] = JSON.stringify(Params);
	                return JSTransport.sendEx(message);
	            },
	            CCDPBusinessAPP2PC: function (Params) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.CCDPBusinessAPP2PC;
	                message["Params"] = JSON.stringify(Params);
	                return JSTransport.sendEx(message);
	            },
	            getCCDPBusinessList: function (Params) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.getCCDPBusinessList;
	                message["Params"] = Params;
	                return JSTransport.sendEx(message);
	            },
	            sendCarInfoMessage: function (conversationType, targetId, content, pushContent, pushData) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.sendVehicleInformation;
	                message["conversationType"] = conversationType;
	                message["targetId"] = targetId;
	                message["content"] = content;
	                message["targetId"] = pushContent;
	                message["targetId"] = pushData;
	                return JSTransport.sendEx(message);
	            },
	            //系统设置
	            getCCDPBusinessSystemSetting: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.CCDPBusinessSystemSetting;
	                return JSTransport.sendEx(message);
	            },
	            //wifi连接状态
	            getSettingNetCont: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.settingNetCont;
	                return JSTransport.sendEx(message);
	            },
	            //设备连接状态
	            getSettingDevCont: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.SettingDevCont;
	                return JSTransport.sendEx(message);
	            },
	            getCCDPBusinessCheckDevConnect: function () {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.CCDPBusinessCheckDevConnect;
	                return JSTransport.sendEx(message);
	            },
	            //发送给app所处位置
	            sendToolPage: function (page, title) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.sendToolPage;
	                message["page"] = page;
	                message['title'] = title;
	                return JSTransport.sendEx(message);
	            },
	             //发送图片
	            sendPicCont: function (targetId,conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.sendPic;
	                message["targetId"] = targetId;
	                message['conversationType'] = conversationType;
	                return JSTransport.sendEx(message);
	            },
	            //文件传输
	            sendFilesCont: function (targetId,conversationType) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.sendFiles;
	                message["targetId"] = targetId;
	                message['conversationType'] = conversationType;
	                return JSTransport.sendEx(message);
	            },
	            //文件下载
	            downFilesCont: function (senderId,url,fileName) {
	                var message = {};
	                message["what"] = Constants.YHWhat.app.downFiles;
	                message["senderId"] = senderId;
	                message['url'] = url;
	                message['fileName'] = fileName;
	                return JSTransport.sendEx(message);
	            }
	        }
	    }
	
	};
	
	JSCommand.$inject = [
	    'JSTransport',
	    'Constants'
	];
	
	module.exports = JSCommand;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/1/8.
	 */
	
	var lscache = __webpack_require__(36);
	var JSCache = function () {
	
	    return {
	        put : function(key, value, time){
	            lscache.set(key, value, time);
	        },
	        get : function(key){
	            return lscache.get(key);
	        },
	        remove : function(key){
	            lscache.remove(key);
	        }
	    }
	
	};
	
	JSCache.$inject = [
	
	];
	
	module.exports = JSCache;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * lscache library
	 * Copyright (c) 2011, Pamela Fox
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *       http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/* jshint undef:true, browser:true, node:true */
	/* global define */
	
	(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== "undefined" && module.exports) {
	        // CommonJS/Node module
	        module.exports = factory();
	    } else {
	        // Browser globals
	        root.lscache = factory();
	    }
	}(this, function () {
	
	  // Prefix for all lscache keys
	  var CACHE_PREFIX = 'lscache-';
	
	  // Suffix for the key name on the expiration items in localStorage
	  var CACHE_SUFFIX = '-cacheexpiration';
	
	  // expiration date radix (set to Base-36 for most space savings)
	  var EXPIRY_RADIX = 10;
	
	  // time resolution in minutes
	  var EXPIRY_UNITS = 60 * 1000;
	
	  // ECMAScript max Date (epoch + 1e8 days)
	  var MAX_DATE = Math.floor(8.64e15/EXPIRY_UNITS);
	
	  var cachedStorage;
	  var cachedJSON;
	  var cacheBucket = '';
	  var warnings = false;
	
	  // Determines if localStorage is supported in the browser;
	  // result is cached for better performance instead of being run each time.
	  // Feature detection is based on how Modernizr does it;
	  // it's not straightforward due to FF4 issues.
	  // It's not run at parse-time as it takes 200ms in Android.
	  function supportsStorage() {
	    var key = '__lscachetest__';
	    var value = key;
	
	    if (cachedStorage !== undefined) {
	      return cachedStorage;
	    }
	
	    try {
	      setItem(key, value);
	      removeItem(key);
	      cachedStorage = true;
	    } catch (e) {
	        if (isOutOfSpace(e)) {    // If we hit the limit, then it means we have support, 
	            cachedStorage = true; // just maxed it out and even the set test failed.
	        } else {
	            cachedStorage = false;
	        }
	    }
	    return cachedStorage;
	  }
	
	  // Check to set if the error is us dealing with being out of space
	  function isOutOfSpace(e) {
	    if (e && e.name === 'QUOTA_EXCEEDED_ERR' || 
	            e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || 
	            e.name === 'QuotaExceededError') {
	        return true;
	    }
	    return false;
	  }
	
	  // Determines if native JSON (de-)serialization is supported in the browser.
	  function supportsJSON() {
	    /*jshint eqnull:true */
	    if (cachedJSON === undefined) {
	      cachedJSON = (window.JSON != null);
	    }
	    return cachedJSON;
	  }
	
	  /**
	   * Returns the full string for the localStorage expiration item.
	   * @param {String} key
	   * @return {string}
	   */
	  function expirationKey(key) {
	    return key + CACHE_SUFFIX;
	  }
	
	  /**
	   * Returns the number of minutes since the epoch.
	   * @return {number}
	   */
	  function currentTime() {
	    return Math.floor((new Date().getTime())/EXPIRY_UNITS);
	  }
	
	  /**
	   * Wrapper functions for localStorage methods
	   */
	
	  function getItem(key) {
	    return localStorage.getItem(CACHE_PREFIX + cacheBucket + key);
	  }
	
	  function setItem(key, value) {
	    // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	    localStorage.setItem(CACHE_PREFIX + cacheBucket + key, value);
	  }
	
	  function removeItem(key) {
	    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
	  }
	
	  function eachKey(fn) {
	    var prefixRegExp = new RegExp('^' + CACHE_PREFIX + cacheBucket + '(.*)');
	    // Loop in reverse as removing items will change indices of tail
	    for (var i = localStorage.length-1; i >= 0 ; --i) {
	      var key = localStorage.key(i);
	      key = key && key.match(prefixRegExp);
	      key = key && key[1];
	      if (key && key.indexOf(CACHE_SUFFIX) < 0) {
	        fn(key, expirationKey(key));
	      }
	    }
	  }
	
	  function flushItem(key) {
	    var exprKey = expirationKey(key);
	
	    removeItem(key);
	    removeItem(exprKey);
	  }
	
	  function flushExpiredItem(key) {
	    var exprKey = expirationKey(key);
	    var expr = getItem(exprKey);
	
	    if (expr) {
	      var expirationTime = parseInt(expr, EXPIRY_RADIX);
	
	      // Check if we should actually kick item out of storage
	      if (currentTime() >= expirationTime) {
	        removeItem(key);
	        removeItem(exprKey);
	        return true;
	      }
	    }
	  }
	
	  function warn(message, err) {
	    if (!warnings) return;
	    if (!('console' in window) || typeof window.console.warn !== 'function') return;
	    window.console.warn("lscache - " + message);
	    if (err) window.console.warn("lscache - The error was: " + err.message);
	  }
	
	  var lscache = {
	    /**
	     * Stores the value in localStorage. Expires after specified number of minutes.
	     * @param {string} key
	     * @param {Object|string} value
	     * @param {number} time
	     */
	    set: function(key, value, time) {
	      if (!supportsStorage()) return;
	
	      // If we don't get a string value, try to stringify
	      // In future, localStorage may properly support storing non-strings
	      // and this can be removed.
	      if (typeof value !== 'string') {
	        if (!supportsJSON()) return;
	        try {
	          value = JSON.stringify(value);
	        } catch (e) {
	          // Sometimes we can't stringify due to circular refs
	          // in complex objects, so we won't bother storing then.
	          return;
	        }
	      }
	
	      try {
	        setItem(key, value);
	      } catch (e) {
	        if (isOutOfSpace(e)) {
	          // If we exceeded the quota, then we will sort
	          // by the expire time, and then remove the N oldest
	          var storedKeys = [];
	          var storedKey;
	          eachKey(function(key, exprKey) {
	            var expiration = getItem(exprKey);
	            if (expiration) {
	              expiration = parseInt(expiration, EXPIRY_RADIX);
	            } else {
	              // TODO: Store date added for non-expiring items for smarter removal
	              expiration = MAX_DATE;
	            }
	            storedKeys.push({
	              key: key,
	              size: (getItem(key) || '').length,
	              expiration: expiration
	            });
	          });
	          // Sorts the keys with oldest expiration time last
	          storedKeys.sort(function(a, b) { return (b.expiration-a.expiration); });
	
	          var targetSize = (value||'').length;
	          while (storedKeys.length && targetSize > 0) {
	            storedKey = storedKeys.pop();
	            warn("Cache is full, removing item with key '" + key + "'");
	            flushItem(storedKey.key);
	            targetSize -= storedKey.size;
	          }
	          try {
	            setItem(key, value);
	          } catch (e) {
	            // value may be larger than total quota
	            warn("Could not add item with key '" + key + "', perhaps it's too big?", e);
	            return;
	          }
	        } else {
	          // If it was some other error, just give up.
	          warn("Could not add item with key '" + key + "'", e);
	          return;
	        }
	      }
	
	      // If a time is specified, store expiration info in localStorage
	      if (time) {
	        setItem(expirationKey(key), (currentTime() + time).toString(EXPIRY_RADIX));
	      } else {
	        // In case they previously set a time, remove that info from localStorage.
	        removeItem(expirationKey(key));
	      }
	    },
	
	    /**
	     * Retrieves specified value from localStorage, if not expired.
	     * @param {string} key
	     * @return {string|Object}
	     */
	    get: function(key) {
	      if (!supportsStorage()) return null;
	
	      // Return the de-serialized item if not expired
	      if (flushExpiredItem(key)) { return null; }
	
	      // Tries to de-serialize stored value if its an object, and returns the normal value otherwise.
	      var value = getItem(key);
	      if (!value || !supportsJSON()) {
	        return value;
	      }
	
	      try {
	        // We can't tell if its JSON or a string, so we try to parse
	        return JSON.parse(value);
	      } catch (e) {
	        // If we can't parse, it's probably because it isn't an object
	        return value;
	      }
	    },
	
	    /**
	     * Removes a value from localStorage.
	     * Equivalent to 'delete' in memcache, but that's a keyword in JS.
	     * @param {string} key
	     */
	    remove: function(key) {
	      if (!supportsStorage()) return;
	
	      flushItem(key);
	    },
	
	    /**
	     * Returns whether local storage is supported.
	     * Currently exposed for testing purposes.
	     * @return {boolean}
	     */
	    supported: function() {
	      return supportsStorage();
	    },
	
	    /**
	     * Flushes all lscache items and expiry markers without affecting rest of localStorage
	     */
	    flush: function() {
	      if (!supportsStorage()) return;
	
	      eachKey(function(key) {
	        flushItem(key);
	      });
	    },
	
	    /**
	     * Flushes expired lscache items and expiry markers without affecting rest of localStorage
	     */
	    flushExpired: function() {
	      if (!supportsStorage()) return;
	
	      eachKey(function(key) {
	        flushExpiredItem(key);
	      });
	    },
	
	    /**
	     * Appends CACHE_PREFIX so lscache will partition data in to different buckets.
	     * @param {string} bucket
	     */
	    setBucket: function(bucket) {
	      cacheBucket = bucket;
	    },
	
	    /**
	     * Resets the string being appended to CACHE_PREFIX so lscache will use the default storage behavior.
	     */
	    resetBucket: function() {
	      cacheBucket = '';
	    },
	
	    /**
	     * Sets whether to display warnings when an item is removed from the cache or not.
	     */
	    enableWarnings: function(enabled) {
	      warnings = enabled;
	    }
	  };
	
	  // Return the module
	  return lscache;
	}));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/7/17.
	 */
	
	var _ = __webpack_require__(5);
	
	var JSUtils = function ($rootScope,
	                            Constants) {
	
	    /*window.reloadWebView = function () {
	        window.yhJsCallApp.process(0xA001, '', 0);
	    };*/
	
	    var slice = Array.prototype.slice;
	
	    return {
	
	        validString : function(string){
	              if(string != null && string != undefined && string != ''){
	                  return true;
	              }
	
	            return false;
	        },
	
	        getDateTime: function (timeStamp) {
	            var now = new Date();
	            var time = new Date(timeStamp);
	            var now0 = new Date();
	            now0.setHours(0);
	            now0.setMinutes(0);
	            now0.setSeconds(0);
	            var value;
	            if (now.getDate() === time.getDate()) {
	                value = (time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours()) + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes());
	            }
	            else if ((parseInt(Math.abs(now0.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) === 0) || ((parseInt(Math.abs(now0.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) === 1) && (parseInt(Math.abs(now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) <= 1))) {
	                value = "昨天";
	            }
	            else {
	                value = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
	            }
	            return value;
	        },
	
	        getUsernameByJID: function (jid) {
	            return jid.slice(0, jid.indexOf('@'));
	        },
	
	        argsToArr: argsToArr,
	
	        // 0 对应 true
	        // 1 对应 false
	        transformBooleanToInt: function (boolean) {
	            if (boolean === true) {
	                return 0;
	            } else if (boolean === false) {
	                return 1;
	            } else {
	                console.error('你输入的不是 Boolean 类型');
	            }
	        },
	
	        // 0 对应 true
	        // 1 对应 false
	        transformIntToBoolean: function (int) {
	            if (int === 0) {
	                return true;
	            } else if (int === 1) {
	                return false;
	            } else {
	                console.error('你输入的既不是 1 也不是 0');
	            }
	        },
	
	        getParamsDataStr: function () {
	            var args = argsToArr(arguments);
	
	            return JSON.stringify(args);
	        },
	
	        parseInt: function (value) {
	            return window.parseInt(value, 10);
	        },
	
	        parseString: function (value) {
	            return '' + value;
	        },
	
	        bindOnEnter: function (stateName, onEnter, $scope) {
	            bindEvent(stateName + Constants.events.onStateEnter, onEnter, $scope);
	        },
	
	        bindOnExit: function (stateName, onExit, $scope) {
	            bindEvent(stateName + Constants.events.onStateExit, onExit, $scope);
	        },
	
	        triggerOnEnter: function (stateName) {
	            var args = argsToArr(arguments);
	
	            //console.warn('triggerOnEnter: ', stateName);
	            triggerEvent.apply(null, [stateName + Constants.events.onStateEnter].concat(args.slice(1)));
	        },
	
	        triggerOnExit: function (stateName) {
	            var args = argsToArr(arguments);
	
	            console.warn('triggerOnExit: ', stateName);
	            triggerEvent.apply(null, [stateName + Constants.events.onStateExit].concat(args.slice(1)));
	        },
	        rankingAccording: function (arr) {
	            var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
	            /* 品牌拼音首字母排序*/
	            // clone
	            arr = JSON.parse(JSON.stringify(arr));
	
	            var userNameMap = {};
	            var userNameList = [];
	            angular.forEach(arr, function (userName, index) {
	                var initial = userName.initial;
	                if (angular.isArray(userNameMap[initial])) {
	                    userNameMap[initial].push(userName);
	                } else {
	                    userNameMap[initial] = [userName];
	                }
	            });
	
	            angular.forEach(ALPHABET, function (initial) {
	                if (userNameMap[initial]) {
	                    userNameList.push({
	                        initial: initial,
	                        userList: userNameMap[initial]
	                    });
	                }
	            });
	            return userNameList;
	        }
	    };
	
	    function argsToArr(args) {
	        return slice.apply(args);
	    }
	
	    function bindEvent(event, listener, $scope) {
	        var off = $rootScope.$on(event, listener);
	
	        $scope.$on('$destroy', function () {
	
	            console.warn('destroy: ', event);
	            off();
	        });
	    }
	
	    function triggerEvent() {
	        $rootScope.$broadcast.apply($rootScope, argsToArr(arguments));
	    }
	
	    function createCurryCMDJudge(cmdMap) {
	        var cmdList = _.values(cmdMap);
	
	        return function (cmd) {
	            return cmdList.indexOf(cmd) > -1;
	        }
	    }
	};
	
	JSUtils.$inject = [
	    '$rootScope',
	    'Constants'
	];
	
	module.exports = JSUtils;

/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2016/1/11.
	 *
	 * This service is used to mock some result
	 */
	
	var JSMock = function (Constants) {
	    if (window.navigator.platform === 'Win32') {
	        return {
	
	            rpc: {
	                login: function () {
	                    var message = {};
	                    message["what"] = Constants.YHWhat.rpc.login;
	                    message["status"] = Constants.status.success;
	                    message["token"] = "fdfefe";
	                    message["userName"] = "userName";
	                    message["token"] = "fdfefe";
	                    var sMessage = JSON.stringify(message);
	                    window.YHJavascript.sendToJS(sMessage);
	                },
	                sendVerificationCode: function () {
	                    var message = {};
	                    message["what"] = Constants.YHWhat.rpc.sendVerificationCode;
	                    message["status"] = Constants.status.success;
	                    var sMessage = JSON.stringify(message);
	                    window.YHJavascript.sendToJS(sMessage);
	                },
	                logout: function () {
	                    var message = {};
	                    message["what"] = Constants.YHWhat.rpc.logout;
	                    message["status"] = Constants.status.success;
	                    var sMessage = JSON.stringify(message);
	                    window.YHJavascript.sendToJS(sMessage);
	                },
	
	                Circle: {
	                    getUserList: function () {
	                        var message = SimulatedData.userListMessage;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    getUserDetail: function () {
	                        var message = SimulatedData.userDetail;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    searchResult: function () {
	                        var message = SimulatedData.findTechnicianMessage;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage)
	                    },
	                    getFiltrationCondition: function (type) {
	                        if (type === Constants.filterType.brand) {
	                            var message = SimulatedData.findFilterBrandMessage;
	                        }
	                        else if (type === Constants.filterType.service) {
	                            var message = SimulatedData.findFilterServiceMessage;
	                        }
	                        else if (type === Constants.filterType.expertLevel) {
	                            var message = SimulatedData.findFilterExpertLevelMessage;
	                        }
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage)
	                    },
	                    getGroupList: function () {
	                        var message = SimulatedData.getGroupListData;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage)
	                    },
	                    createOrRefreshGroup: function () {
	
	                        var message = SimulatedData.getGroupListData;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage)
	                    },
	                    getRelationList: function () {
	
	                        var message = SimulatedData.relationList;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    applyFriend: function () {
	                        var message = SimulatedData.applyFriend;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    acceptFriend: function () {
	                        var message = SimulatedData.acceptFriend;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    removeApplyFriendToServer: function () {
	                        var message = SimulatedData.removeApplyFriendToServer;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    removeApplyFriendToAppCache: function () {
	                        var message = SimulatedData.removeApplyFriendToAppCache;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    inviteFriend: function () {
	                        var message = SimulatedData.inviteFriend;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    }
	                },
	                Homepage: {
	                    //����������ҳ
	                    getPersonHomeData: function () {
	                        var message = homePageData.personHomeMessage;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //��������
	                    getPersonData: function () {
	                        var message = homePageData.personData;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //�޸ĸ���������Ϣ�����ӿ�
	                    modifySex: function () {
	                        var message = {};
	                        message["what"] = Constants.YHWhat.rpc.modifyPersonData;
	                        message["status"] = Constants.status.success;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //��������--ʵ�����������ӿ�
	                    realNameData: function () {
	                        var message = {};
	                        message["what"] = Constants.YHWhat.rpc.realNameData;
	                        message["status"] = Constants.status.success;
	                        message["success"] = "success";
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //��������--��������
	                    getExpertSettingData: function () {
	                        var message = homePageData.expertSettingData;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //��ʦ����--�ӿ�����
	                    getFiltrationCondition: function (type) {
	                        var message;
	                        if (type == Constants.filterType.brand) {
	
	                            message = homePageData.filtBrandList;
	
	                        } else if (type == Constants.filterType.service) {
	
	                            message = homePageData.filtServiceList;
	
	                        }
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	
	                    },
	                    //��ѯЭ���ҵ�
	                    getAssistTheRecordIsHelped: function () {
	                        var message = homePageData.assistList;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    //��ѯ��Э����
	                    getAssistTheRecordHelped: function () {
	                        var message = homePageData.toAssistList;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    }
	
	                },
	                Conversation: {
	                    getEditGroupChatList: function () {
	                        var message = conversationData.getEditGroupChatList;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    createOrRefreshGroup: function () {
	                        var message = conversationData.createOrRefreshGroup;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    getGroupReportData: function () {
	                        var message = conversationData.getGroupReportData;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    }
	                }
	            },
	            rongcloud: {
	                Conversation: {
	                    getConversationList: function () {
	                        var message = conversationData.getConversationList;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    },
	                    getConversation: function () {
	                        var message = conversationData.getConversation;
	                        var sMessage = JSON.stringify(message);
	                        window.YHJavascript.sendToJS(sMessage);
	                    }
	                }
	            },
	            app: {
	                getContacts: function () {
	                    var message = SimulatedData.getContacts;
	                    var sMessage = JSON.stringify(message);
	                    window.YHJavascript.sendToJS(sMessage);
	                },
	                loadIndexPage : function(){
	                    var msg = {};
	                    msg["what"] = Constants.YHWhat.app.loadIndexPage;
	                    msg["data"] = '';
	                    var sMessage = JSON.stringify(message);
	                    window.YHAndroidToJs.sendToJS(sMessage);
	                }
	            }
	
	        }
	    } else {
	        return {};
	    }
	};
	
	JSMock.$inject = [
	    'Constants'
	];
	
	module.exports = JSMock;
	


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/29.
	 */
	
	module.exports = {
	    template: __webpack_require__(40)
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-view></ion-nav-view>"

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(42),
	    controller: __webpack_require__(43)
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"技师圈\" ng-view>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input type=\"text\" class=\"find-text\" placeholder=\"查找好友\" ng-model=\"form.condition\">\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <!--添加好友没开发完暂时屏蔽-->\r\n                <ion-item class=\"item item-action-head-portrait\" ng-click=\"viewNewFriendClick()\" ui-sref=\"tab.circle.new-friends\">\r\n                    <!--<img src=\"img/js-add-friend.jpg\">-->\r\n                    <span class=\"function-module-ion-block new-friend-function-independent-bg\">\r\n                        <i class=\"iconfont icon-Add-friends personal-ion function-module-ion\"></i>\r\n                    </span>\r\n                    <span class=\"friends-message-location\" ng-show=\"newFirends.friendApplyCount>0\">{{newFirends.friendApplyCount}}</span>\r\n                    <p class=\"item-friends-description\">新的朋友</p>\r\n                </ion-item>\r\n                <ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.groups\">\r\n                    <span class=\"function-module-ion-block group-function-independent-bg\">\r\n                        <i class=\"iconfont icon-friends personal-ion function-module-ion\"></i>\r\n                    </span>\r\n                    <!--<span class=\"friends-badge-message\">3</span>-->\r\n\r\n                    <p class=\"item-friends-description\">群聊</p>\r\n                </ion-item>\r\n                <ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.find\">\r\n                     <span class=\"function-module-ion-block search-function-independent-bg\">\r\n                        <i class=\"iconfont icon-Search-friends personal-ion function-module-ion\"></i>\r\n                    </span>\r\n\r\n                    <p class=\"item-friends-description\">查找技师</p>\r\n                </ion-item>\r\n            </div>\r\n        </div>\r\n        <div style=\"background-color: #0000fe\" ng-if=\"showTheMessage\">\r\n            <p>您目前还没有好友,请在查找技师添加好友</p>\r\n        </div>\r\n        <div ng-repeat=\"userGroup in userList track by $index\">\r\n            <p class=\"item-divider-empty letter-results-describe\">{{userGroup.initial}}</p>\r\n\r\n            <div class=\"list\">\r\n                <div class=\"item-friends-box\">\r\n                    <ion-item class=\"item item-friends-head-portrait\" ng-repeat=\"user in userGroup.userList\"\r\n                              ui-sref=\"tab.circle.user-detail({id: user.id})\">\r\n                        <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                        <!--<span class=\"badge friends-badge-level\">J{{user.grade}}</span>-->\r\n\r\n                        <p class=\"item-friends-description\">{{user.nickName}}</p>\r\n                    </ion-item>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <p class=\"list-number\" ng-if=\"userListCount.length > 0\">{{userListCount.length}}个联系好友</p>\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/8/31.
	 */
	
	var _ = __webpack_require__(5);
	
	var ContactFriendListCtrl = function ($scope,
	                                      $state,
	                                      JSUtils,
	                                      JSCommand,
	                                      $filter,
	                                      $rootScope,
	                                      Constants,
	                                      JSCache) {
	
	    console.log('enter the contact friend list controller...');
	
	    $scope.form = {
	        condition: ''
	    };
	    $scope.showTheMessage=false;
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	
	                    console.log("获取好友列表成功.");
	
	                    $scope.$apply(function(){
	                        var friendList = json.data.friendList;
	                        var condition = $scope.form.condition;
	                        var searchUserList = $filter('searchUser')(friendList, condition);
	                        $scope.userList = JSUtils.rankingAccording(searchUserList);
	                    });
	                    $scope.userListCount = [];
	                    _.forEach($scope.userList, function (allUserList) {
	                        _.forEach(allUserList, function (userList) {
	                            _.forEach(userList, function (user) {
	                                if (user.id != undefined) {
	                                    $scope.userListCount.push(user);
	                                }
	                            });
	                        });
	
	                    });
	                    console.log("$scope.userListCount",$scope.userListCount.length);
	                }
	                else {
	                    console.log("获取好友列表失败：" + json["reason"] );
	                    $scope.showTheMessage=true;
	                }
	            }
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	    $scope.newFirends=JSCache.get(Constants.YHCache.loginInfo);
	    console.log("请求好友总数~~",$scope.newFirends);
	
	    $scope.viewNewFriendClick= function () {
	        $state.go('tab.circle.new-friends');
	        $scope.newFirends.friendApplyCount=0;
	        JSCache.put(Constants.YHCache.loginInfo);
	    };
	
	
	    $scope.$watch('form.condition', function (condition) {
	        if(angular.isDefined($scope.form.condition)){
	            JSCommand.ccdp.queryMyFriends();
	        }
	    });
	};
	
	ContactFriendListCtrl.$inject = [
	    '$scope',
	    '$state',
	    'JSUtils',
	    'JSCommand',
	    '$filter',
	    '$rootScope',
	    'Constants',
	    'JSCache'
	];
	
	module.exports = ContactFriendListCtrl;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(45),
	    controller: __webpack_require__(46)
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"新的朋友\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <a class=\"button button-icon\" ui-sref=\"tab.circle.find\">添加好友</a>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input class=\"find-text\" placeholder=\"昵称/姓名\" type=\"text\" ng-model=\"searchNewFriend.friend\">\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n\r\n        <!--//此版本暂时不添加此功能,先注释-->\r\n        <!--<div class=\"list\">\r\n            <ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.contact-compare\">\r\n                 <span class=\"function-module-ion-block add-newFriend-function-independent-bg\">\r\n                        <i class=\"iconfont icon-phone personal-ion function-module-ion\"></i>\r\n                 </span>\r\n\r\n                <p class=\"item-friends-description\">添加手机联系人</p>\r\n            </ion-item>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>-->\r\n        <!--//Loading加载-->\r\n        <!--<div class=\"addFriendSpinner\">\r\n            <div class=\"spinner-container container1\">\r\n                <div class=\"circle1\"></div>\r\n                <div class=\"circle2\"></div>\r\n                <div class=\"circle3\"></div>\r\n                <div class=\"circle4\"></div>\r\n            </div>\r\n            <div class=\"spinner-container container2\">\r\n                <div class=\"circle1\"></div>\r\n                <div class=\"circle2\"></div>\r\n                <div class=\"circle3\"></div>\r\n                <div class=\"circle4\"></div>\r\n            </div>\r\n            <div class=\"spinner-container container3\">\r\n                <div class=\"circle1\"></div>\r\n                <div class=\"circle2\"></div>\r\n                <div class=\"circle3\"></div>\r\n                <div class=\"circle4\"></div>\r\n            </div>\r\n        </div>-->\r\n        <div style=\"text-align: center;color: #999 ;padding-top: 20px;\" ng-if=\"showTheMessage\">\r\n            <p>您目前还没有好友,请点击<span style=\"color: #007aff\">添加好友</span>进行添加好友</p>\r\n        </div>\r\n        <ion-list>\r\n            <ion-item class=\"item item-friends-head-portrait\" collection-repeat=\"user in userList\">\r\n                <img ng-src=\"{{ user.icon | prefixSrc }}\"\r\n                     ui-sref=\"tab.circle.user-detail({id: user.id})\">\r\n\r\n                <span class=\"badge friends-badge-level\">J{{ user.grade }}</span>\r\n\r\n                <h2 class=\"new-friend-nickname\">{{ user.nickName }}</h2>\r\n\r\n                <p>{{user.userName}}</p>\r\n\r\n                <p class=\"new-friends-state-right\">\r\n\r\n                    <button ng-if=\"user.relation==4\" ng-click=\"showAddPrompt($event, user)\"\r\n                            class=\"button new-friend-button-small button-balanced\"> 接受\r\n                    </button>\r\n                    <button ng-if=\"user.relation==4\" ng-click=\"showRefusedPrompt($event, user)\"\r\n                            class=\"button new-friend-button-small button-assertive\"> 拒绝\r\n                    </button>\r\n                    <span ng-if=\"user.relation==2\" class=\"new-friend-state\">已添加</span>\r\n                    <span ng-if=\"user.relation==1\" class=\"new-friend-state\">等待验证</span>\r\n                    <!--<span ng-if=\"user.relation==3\" class=\"new-friend-state\">已拒绝</span>-->\r\n\r\n                </p>\r\n\r\n               <!-- <ion-option-button class=\"button-assertive\"\r\n                                   ng-click=\"removeApplyFriend($event, user)\">\r\n                    删除\r\n                </ion-option-button>-->\r\n                <ion-option-button class=\"button-assertive\"\r\n                                   ng-click=\"showPrompt($event, user)\">\r\n                    删除\r\n                </ion-option-button>\r\n\r\n            </ion-item>\r\n\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/9/1.
	 */
	
	var _ = __webpack_require__(5);
	
	var ContactNewFriendsCtrl = function ($scope,
	                                      Constants,
	                                      JSCache,
	                                      $filter,
	                                      JSCommand,
	                                      $ionicModal) {
	
	    console.log('enter the contact new friends controller...');
	
	    //提示框
	    var showAddPromptModal = $ionicModal.fromTemplate(__webpack_require__(47), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    var showPromptModal = $ionicModal.fromTemplate(__webpack_require__(48), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    var showRefusedPromptModal = $ionicModal.fromTemplate(__webpack_require__(49), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.searchNewFriend = {
	        "friend": ''
	    };
	    $scope.showTheMessage=false;
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_FRIENDRELATION) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    var friendList = jsonResult.data.friendList;
	                    var condition = $scope.searchNewFriend.friend;
	                    $scope.userList = $filter('searchUser')(friendList, condition);
	                    console.log('$scope.userList~~~~~~',$scope.userList);
	                } else {
	                    $scope.showTheMessage=true;
	                }
	            }
	
	            else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    showAddPromptModal.hide();
	                    $scope.queryRelation();
	                   /* //拿到缓存个人信息推送过来的好友总数做处理
	                    var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
	                    countNewFirends.friendApplyCount--;
	                    JSCache.put(Constants.YHCache.loginInfo,countNewFirends);*/
	                } else {
	
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    $scope.queryRelation();
	                    showPromptModal.hide();
	                    showRefusedPromptModal.hide();
	                   /* //拿到缓存个人信息推送过来的好友总数做处理
	                    var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
	                    countNewFirends.friendApplyCount--;
	                    JSCache.put(Constants.YHCache.loginInfo,countNewFirends);*/
	                } else {
	
	                }
	            }
	        } catch (error) {
	
	        }
	    });
	
	
	
	
	    // $scope.userList = FriendRelationManager.getUserList();
	    //搜索查询
	    $scope.$watch('searchNewFriend.friend', function (newValue, oldValue) {
	        if(angular.isDefined($scope.searchNewFriend.friend)){
	            $scope.queryRelation();
	        }
	
	    });
	
	    $scope.queryRelation = function(){
	        // 发送重新获取好友关系列表
	        JSCommand.ccdp.queryFriendRelation();
	
	    };
	
	
	
	    $scope.showAddPrompt= function ($event, user) {
	        $scope.curremtName=user.nickName;
	        $scope.curremId=user.id;
	        showAddPromptModal.show();
	    };
	    $scope.showPrompt= function ($event, user) {
	        $scope.curremtName=user.nickName;
	        $scope.curremId=user.id;
	        showPromptModal.show();
	
	    };
	    $scope.showRefusedPrompt= function ($event, user) {
	        $scope.curremtName=user.nickName;
	        $scope.curremId=user.id;
	        showRefusedPromptModal.show();
	    };
	    $scope.closePromptModal= function () {
	        showPromptModal.hide();
	        showRefusedPromptModal.hide();
	        showAddPromptModal.hide();
	    };
	
	    $scope.acceptFriend = function ($event, userId) {
	        $event.preventDefault();
	        $event.stopPropagation();
	
	        JSCommand.ccdp.acceptFriend(userId);
	
	    };
	    $scope.removeApplyFriend = function (userId) {
	        JSCommand.ccdp.deleteFriend(userId)
	    };
	
	};
	
	ContactNewFriendsCtrl.$inject = [
	    '$scope',
	    'Constants',
	    'JSCache',
	    '$filter',
	    'JSCommand',
	    '$ionicModal'
	];
	
	module.exports = ContactNewFriendsCtrl;

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closePromptModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <div class=\"change-name-content\">\r\n        <h4 class=\"tipbox-title\">添加联系人</h4>\r\n\r\n        <p>将添加<span style=\"color: #157EFB\">{{curremtName}}</span>成为你的好友</p>\r\n    </div>\r\n    <div class=\"button-bar individual-set-button-bar\">\r\n        <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"\r\n           ng-click=\"closePromptModal()\">取消</a>\r\n        <a class=\"button chat-tipbox-button individual-set-button-confirm\" href=\"#\" ng-click=\"acceptFriend($event,curremId)\">确定</a>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closePromptModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <div class=\"change-name-content\">\r\n        <h4 class=\"tipbox-title\">删除联系人</h4>\r\n\r\n        <p>将联系人<span style=\"color: #157EFB\">{{curremtName}}</span>删除</p>\r\n    </div>\r\n    <div class=\"button-bar individual-set-button-bar\">\r\n        <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"\r\n           ng-click=\"closePromptModal()\">取消</a>\r\n        <a class=\"button chat-tipbox-button individual-set-button-confirm\" href=\"#\" ng-click=\"removeApplyFriend(curremId)\">确定</a>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closePromptModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <div class=\"change-name-content\">\r\n        <h4 class=\"tipbox-title\">拒绝联系人</h4>\r\n\r\n        <p>您确定拒绝<span style=\"color: #157EFB\">{{curremtName}}</span>成为你的好友?</p>\r\n    </div>\r\n    <div class=\"button-bar individual-set-button-bar\">\r\n        <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"\r\n           ng-click=\"closePromptModal()\">取消</a>\r\n        <a class=\"button chat-tipbox-button individual-set-button-confirm\" href=\"#\" ng-click=\"removeApplyFriend(curremId)\">确定</a>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(51),
	    controller: __webpack_require__(52)
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"通讯录朋友\">\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input class=\"find-text\" placeholder=\"手机号/昵称/姓名\" type=\"text\" ng-model=\"search.myCellPhoneFriend\">\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n\r\n        <ion-list>\r\n            <div ng-repeat=\"alphabeticalItem in alphabeticalList\">\r\n                <p class=\"item-divider-empty letter-results-describe\">{{alphabeticalItem.initial}}</p>\r\n                <ion-item class=\"item item-friends-head-portrait\" ng-repeat=\"user in alphabeticalItem.friendList\"\r\n                          ui-sref=\"tab.circle.user-detail({id: user.id})\">\r\n                    <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                    <span class=\"badge friends-badge-level\">J{{ user.grade }}</span>\r\n\r\n                    <h2 class=\"new-friend-nickname\">{{ user.contactName }}</h2>\r\n\r\n                    <p>技师圈：{{ user.nickName }}</p>\r\n\r\n                    <p class=\"new-friends-state-right\">\r\n                        <button ng-if=\"hasNoRelation(user)&&!user.isRegister\" ng-click=\"applyFriend($event, user)\"\r\n                                class=\"button new-friend-button-small button-stable\">添加\r\n                        </button>\r\n                        <button ng-if=\"!user.relation&&user.isRegister\" ng-click=\"inviteFriend($event, user)\"\r\n                                class=\"button new-friend-button-small button-stable\">邀请\r\n                        </button>\r\n                        <span ng-if=\"isApplied(user)\" class=\"new-friend-state\">等待验证</span>\r\n                        <span ng-if=\"isAccepted(user)\" class=\"new-friend-state\">已添加</span>\r\n                    </p>\r\n\r\n                    <!--<button ng-if=\"isApplied(user)\" class=\"button-balanced\"\r\n                                       ng-click=\"reApplyFriend($event, user)\">\r\n                        添加\r\n                    </button>-->\r\n\r\n                   <!-- <ion-option-button class=\"button-assertive\"\r\n                                       ng-click=\"removeApplyFriend($event, user)\">\r\n                        取消\r\n                    </ion-option-button>-->\r\n                </ion-item>\r\n\r\n            </div>\r\n        </ion-list>\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/9.
	 */
	
	var _ = __webpack_require__(5);
	var ContactCompareCtrl = function ($scope,
	                                   $ionicListDelegate,
	                                   Constants,
	                                   JSCache,
	                                   JSCommand,
	                                   $filter,
	                                   JSUtils
	                                   ) {
	
	    console.log('enter the contact compare controller...');
	
	    var me = JSCache.get(Constants.YHCache.isLogin);
	
	    $scope.userList='';
	    $scope.search = {
	        myCellPhoneFriend: ''
	    };
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_CONTACTSFRIEND) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    $scope.userList = jsonResult.data.friendList;
	                    var myCell=$scope.search.myCellPhoneFriend;
	                    var friendList = $filter('searchUser')($scope.userList, myCell);
	                    $scope.alphabeticalList = JSUtils.rankingAccording(friendList);
	                    console.log("$scope.userList", $scope.userList);
	                    console.log("userList", friendList);
	                    console.log("$scope.alphabeticalList", $scope.alphabeticalList);
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    _.forEach($scope.alphabeticalList, function (alphabeticalItem) {
	                        _.forEach(alphabeticalItem.userList,function(user){
	                            if(user.id === jsonResult.user.id){
	                                user.relation = jsonResult.user.relation;
	                                user.initiator = jsonResult.user.initiator;
	                            }
	                        })
	                    });
	                } else {
	
	                }
	            }
	        } catch (error) {
	
	        }
	    });
	
	    $scope.$watch('search.myCellPhoneFriend', function (newValue, oldValue) {
	        if(angular.isDefined($scope.search.myCellPhoneFriend)) {
	            JSCommand.ccdp.queryContactsFriends();
	
	            /*var userList = $filter('searchUser')($scope.userList, newValue);
	            $scope.alphabeticalList = JSUtils.rankingAccording(userList);
	            console.log("$scope.alphabeticalList", $scope.alphabeticalList);*/
	        }
	    });
	
	    $scope.hasNoRelation = function (user) {
	        return _.isUndefined(user.relation);
	    };
	
	    $scope.isApplied = function (user) {
	        return user.relation === Constants.relation.applied && user.initiator === me.id;
	    };
	
	    $scope.isAccepted = function (user) {
	        return user.relation === Constants.relation.accepted;
	    };
	
	    $scope.isRemoved = function (user) {
	        return user.relation === Constants.relation.removed;
	    };
	
	    $scope.applyFriend = function ($event, user) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        JSCommand.ccdp.addFriend(user.id);
	    };
	
	    //$scope.inviteFriend = function ($event, user) {
	    //    $event.preventDefault();
	    //    $event.stopPropagation();
	    //
	    //    JSCommand.ccdp.inviteFriend(user.id);
	    //
	    //};
	    /* $scope.removeApplyFriend = function ($event, user) {
	     $event.preventDefault();
	     $event.stopPropagation();
	
	     JSCommand.removeApplyFriend(user.id).then(function (result) {
	     $ionicListDelegate.closeOptionButtons();
	
	     user.relation = result.user.relation;
	     user.initiator = result.user.initiator;
	     });
	     };*/
	
	    // 再次发起加为好友申请
	    /* $scope.reApplyFriend = function ($event, user) {
	     $scope.applyFriend($event, user).then(function () {
	     $ionicListDelegate.closeOptionButtons();
	     });
	     };*/
	};
	
	ContactCompareCtrl.$inject = [
	    '$scope',
	    '$ionicListDelegate',
	    'Constants',
	    'JSCache',
	    'JSCommand',
	    '$filter',
	    'JSUtils'
	];
	
	module.exports = ContactCompareCtrl;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(54),
	    controller: __webpack_require__(55)
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"群设置\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <button class=\"button button-icon\" ng-click=\"save()\">确定</button>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\" ng-click=\"isShowInitial()\">\r\n        <!--<p class=\"item-divider-empty\"></p>-->\r\n\r\n        <div class=\"list\">\r\n\r\n            <ul class=\"item-friends-box friend-message-box clearfix\">\r\n\r\n                <li class=\"friend-message\">\r\n                    <img ng-src=\"{{currentUser.icon| prefixSrc }}\">\r\n\r\n                    <p class=\"friend-message-nikeName\">{{currentUser.nickName}}</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\" ng-repeat=\"item in userList | filter :{'isChecked':true}\">\r\n                    <a>\r\n                        <span><img ng-src=\"{{ item.icon | prefixSrc }}\" ng-click=\"ViewsDetails(item.id)\" ></span>\r\n                    <span class=\"delete-friends-btn-ion\" ng-click=\"removeFriend(evt,item)\" ng-show=\"voiceShow\">\r\n                        <!--<i class=\"ion-minus \"></i>-->\r\n                        <i class=\"iconfont icon-minus minus-btn-ion\"></i>\r\n                    </span>\r\n                    <span class=\"delete-friends-hidden\" ng-hide=\"voiceShow\">\r\n                         <i class=\"iconfont icon-minus minus-btn-ion\"></i>\r\n                    </span>\r\n                    </a>\r\n\r\n                    <p class=\"friend-message-nikeName\">{{item.nickName}}</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\" ng-show=\"isShowAddFriend\">\r\n                    <button type=\"button\" class=\"friend-message-ion\" ng-click=\"addFriend()\"><i class=\"ion-plus\"></i>\r\n                    </button>\r\n                    <p class=\"friend-message-nikeName function-text-details\">添加成员</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\" ng-show=\"isShowRemoveFriend\">\r\n                    <button type=\"button\" class=\"friend-message-ion\" ng-click=\"removeFriendState()\">\r\n                        <i class=\"ion-minus \"></i>\r\n                    </button>\r\n                    <p class=\"friend-message-nikeName function-text-details\">删除成员</p>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n        <p class=\"item-divider-empty-group\"></p>\r\n\r\n        <div class=\"list\">\r\n            <a class=\"item item-toggle item-group-avatar\">\r\n                群头像\r\n                <img src=\"img/BMW_png.png\">\r\n            </a>\r\n            <li class=\"item item-toggle set-group-name\">\r\n                群名称\r\n                <input type=\"text\" class=\"input-text-tight-to-left\" placeholder=\"请输入群名称\"\r\n                       ng-model=\"group.name\" readonly ng-click=\"createGroupName()\">\r\n            </li>\r\n\r\n        </div>\r\n        <p class=\"item-divider-empty-group\"></p>\r\n        <ul class=\"list\">\r\n\r\n            <li class=\"item item-toggle\">\r\n                允许陌生人加入群\r\n                <label class=\"toggle toggle-balanced\" ng-click=\"isStrangerJoin()\">\r\n                    <input type=\"checkbox\">\r\n\r\n                    <div class=\"track\">\r\n                        <div class=\"handle\"></div>\r\n                    </div>\r\n                </label>\r\n            </li>\r\n            <li class=\"item item-toggle\">\r\n                群可被用户搜索\r\n                <label class=\"toggle toggle-balanced\" ng-click=\"isCanBeSearch()\">\r\n                    <input type=\"checkbox\">\r\n\r\n                    <div class=\"track\">\r\n                        <div class=\"handle\"></div>\r\n                    </div>\r\n                </label>\r\n            </li>\r\n        </ul>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Cheng on 2015/9/10.
	 */
	
	var _ = __webpack_require__(5);
	
	var ContactSetGroupCtrl = function ($scope,
	                                    $state,
	                                    $stateParams,
	                                    $ionicModal,
	                                    JSCache,
	                                    $filter,
	                                    $ionicPopup,
	                                    JSCommand,
	                                    Constants,
	                                    JSUtils) {
	
	    console.log('enter the contact set group controller...');
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	
	                    $scope.userResult = jsonResult.data.friendList;
	                    getUserList($scope.userResult);
	
	                } else {
	                    console.log("Login fail:" + jsonResult["reason"])
	                }
	            }
	            else if(what === Constants.YHWhat.ccdp.CCDP_ADD_GROUP){
	                var status = jsonResult.status;
	
	                if (status === Constants.status.success) {
	
	                    $state.go('tab.conversations.conversation.GROUP', {
	                        targetId: jsonResult.data.id,
	                        conversationType: 'GROUP'
	                    });
	
	                } else {
	                    console.log("Login fail:" + jsonResult["reason"])
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    /*
	        在建群的时候，首先获取好友列表
	     */
	    JSCommand.ccdp.queryMyFriends();
	
	    //获取当前用户信息
	    var isLoginUser = JSCache.get(Constants.YHCache.loginInfo);
	    console.log("user:",isLoginUser);
	    $scope.isShowAddFriend = true;
	    $scope.voiceShow = false;
	
	    var flag = false;
	    var id = isLoginUser.id;
	    $scope.currentUser = isLoginUser;
	
	    function getUserList(Arr) {
	        var userListArr = [];
	        var searchUser = $filter('searchUser')(Arr, $scope.SearchUser.nickName);
	        $scope.userListCategoryInAlpha = JSUtils.rankingAccording(searchUser);
	
	        _.forEach($scope.userListCategoryInAlpha, function (userItem) {
	            _.forEach(userItem.userList, function (userObj, index) {
	                userListArr.push(userObj)
	            })
	        });
	        return userListArr;
	    }
	
	//********************************************
	
	    /****允许陌生人加入群*****/
	    $scope.isStrangerJoinClickBoolean = false;
	    $scope.isCanBeSearchClickBoolean = false;
	    $scope.$watch('isStrangerJoinClickBoolean', function () {
	        if ($scope.isStrangerJoinClickBoolean) {
	            $scope.group.isAllowStranger = 0;
	        } else {
	            $scope.group.isAllowStranger = 1;
	        }
	    });
	    $scope.$watch('isCanBeSearchClickBoolean', function () {
	        if ($scope.isCanBeSearchClickBoolean) {
	            $scope.group.isAllowSearch = 0;
	        } else {
	            $scope.group.isAllowSearch = 1;
	        }
	    });
	
	
	    $scope.isStrangerJoin = function () {
	
	        $scope.isStrangerJoinClickBoolean = !$scope.isStrangerJoinClickBoolean;
	
	    };
	    $scope.isCanBeSearch = function () {
	
	        $scope.isCanBeSearchClickBoolean = !$scope.isCanBeSearchClickBoolean;
	
	    };
	    /****允许陌生人加入群结束*****/
	
	
	    $scope.group = {
	        icon: "engineer-Zhao.png",
	        isAllowStranger: 1,
	        isAllowSearch: 1,
	        name: ""
	    };
	    $scope.$watch('group', function () {
	        console.log('group: ', $scope.group);
	    }, true);
	
	    $scope.goBackGroupList = function () {
	
	        $scope.userList = _.uniq($scope.saveSelectUser);
	        if ($scope.userList.length == 0) {
	            $state.go('tab.circle.groups');
	            $scope.newGroupModal.hide();
	        } else {
	            $scope.newGroupModal.hide();
	        }
	    };
	    /*弹窗，选择好友方法*/
	    $scope.newGroupModal = $ionicModal.fromTemplate(__webpack_require__(56), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    function showGroupModal() {
	        $scope.newGroupModal.show();
	    }
	
	    showGroupModal();
	
	
	    $scope.saveSelectUser = [];
	
	    //激活确定按钮
	    $scope.activateSave = function () {
	        var activateSaveArry = [];
	        var endActiArry = [];
	        _.forEach($scope.userListCategoryInAlpha, function (categoryInAlpha) {
	            _.forEach(categoryInAlpha.userList, function (user) {
	                if (user.isChecked) {
	                    activateSaveArry.push(user);
	                }
	                $scope.actiUserList = _.uniq(activateSaveArry);
	            });
	        });
	        _.forEach($scope.actiUserList, function (actiUser) {
	            //console.log("activateSaveArry:",actiUser );
	            if (actiUser.isChecked) {
	                endActiArry.push(actiUser);
	            }
	        });
	        if (endActiArry.length == 0) {
	            return true
	        }
	    };
	
	    //TODO 保存已选的数据
	    $scope.saveSelected = function () {
	        $scope.newGroupModal.hide();
	        _.forEach($scope.userListCategoryInAlpha, function (categoryInAlpha) {
	            _.forEach(categoryInAlpha.userList, function (user) {
	                if (user.isChecked) {
	                    user['selected'] = 1;
	                    $scope.saveSelectUser.push(user);
	                }
	                $scope.userList = _.uniq($scope.saveSelectUser);
	                //console.log(user);
	                if ($scope.userList.length > 0) {
	                    $scope.isShowRemoveFriend = true;
	                }
	            });
	        });
	
	        $scope.group.userIdList = _.compact(_.map($scope.userList, function (user) {
	            if (user.isChecked) {
	                return user.id;
	            }
	        }))
	    };
	
	
	    $scope.ViewsDetails = function (id) {
	        if (!$scope.voiceShow) {
	            $state.go('tab.circle.user-detail', {id: id})
	        }
	    };
	
	    $scope.SearchUser = {
	        nickName: ''
	    };
	
	    //TODO 监听输入框的变化进行搜索
	    $scope.$watch('SearchUser.nickName', function () {
	        if (!flag) {
	            var userListArr = getUserList($scope.userResult);
	            $scope.userListArr = userListArr.length;
	            flag = true;
	        } else {
	            var userListArr = getUserList($scope.userResult);
	            $scope.userListArr = userListArr.length;
	        }
	
	    }, true);
	
	
	    /***阻止事件冒泡机制*******/
	    $scope.stopEventBubble = function (event) {
	        var e = event || window.event;
	
	        if (e && e.stopPropagation) {
	            e.stopPropagation();
	        }
	        else {
	            e.cancelBubble = true;
	        }
	    };
	
	    $scope.voiceShow = false;
	
	    $scope.removeFriendState = function (evt) {
	        $scope.voiceShow = !$scope.voiceShow;
	        $scope.isShowAddFriend = false;
	        $scope.isShowRemoveFriend = false;
	        $scope.stopEventBubble(evt);
	    };
	
	
	    $scope.hideDeleteBtn = function () {
	        $scope.voiceShow = false;
	    };
	
	    /****继续添加*****/
	    $scope.addFriend = function (evt) {
	        showGroupModal();
	        $scope.stopEventBubble(evt);
	    };
	    /**删除群成员***/
	    $scope.removeFriend = function (evt, item) {
	        item.isChecked = false;
	        $scope.stopEventBubble(evt);
	        item.selected = 0;
	        $scope.$watch('userList', function () {
	            $scope.eventEvery = _.every($scope.userList, function (userItem) {
	                return !userItem.isChecked;
	            });
	            if ($scope.eventEvery) {
	                $scope.isShowAddFriend = true;
	                $scope.isShowRemoveFriend = false;
	            }
	            //console.log($scope.eventEvery);
	        });
	    };
	    //TODO  单击空白让增加删除回到最初状态
	
	    $scope.isShowInitial = function () {
	        $scope.voiceShow = false;
	        if ($scope.eventEvery) {
	            $scope.isShowAddFriend = true;//显示添加按钮
	            $scope.isShowRemoveFriend = false;//不显示删除按钮
	        } else {
	            $scope.isShowAddFriend = true;//显示添加按钮
	            $scope.isShowRemoveFriend = true;//显示删除按钮
	        }
	    };
	
	    //modify groupName
	    var groupName = $ionicModal.fromTemplate(__webpack_require__(57), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.createGroupName = function () {
	        groupName.show();
	    };
	
	    $scope.closeModifyGroupName = function () {
	        groupName.hide();
	    };
	    /***end***/
	
	    //判断obj 是否为空
	    function isEmptyObject(obj) {
	        for (var key in obj) {
	            return false;
	        }
	        return true;
	    }
	
	    $scope.groupModal = {
	        name: ''
	    };
	
	    $scope.groupNameSubmit = function (error) {
	        console.log(error);
	        if (isEmptyObject(error)) {
	            $scope.group.name = $scope.groupModal.name;
	            //console.log('$scope.group.name',$scope.group.name);
	            groupName.hide();
	        }
	    };
	
	
	    //弹窗
	    var alertPopup;
	    $scope.save = function () {
	        var group = $scope.group;
	
	
	        if (!group.name) {
	            console.log("请输入群名称:");
	            alertPopup = $ionicPopup.alert({
	                template: '请输入群名称',
	                buttons: [{
	                    text: '确定',
	                    type: 'button-positive',
	                    onTap: function () {
	                        return true;
	                    }
	                }]
	            });
	            alertPopup.then(function (res) {
	                console.log("res:", res);
	            });
	        } else {
	            JSCommand.ccdp.addGroup(group);
	        }
	    };
	
	    /*$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	        //console.log('arguments',arguments)
	        $scope.newGroupModal.remove();
	        groupName.hide();
	        if (alertPopup) {
	            alertPopup.close();
	        }
	    });*/
	
	    $scope.$on('$destroy', function () {
	        $scope.newGroupModal.remove();
	        groupName.hide();
	    });
	};
	
	ContactSetGroupCtrl.$inject = [
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$ionicModal',
	    'JSCache',
	    '$filter',
	    '$ionicPopup',
	    'JSCommand',
	    'Constants',
	    'JSUtils'
	];
	
	module.exports = ContactSetGroupCtrl;


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"goBackGroupList()\">\r\n                <i class=\"iconfont icon-return return-size-pop\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">选择群成员</h1>\r\n\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\"  ng-disabled=\"activateSave()\" ng-click=\"saveSelected()\">\r\n                确定\r\n            </button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input type=\"text\" name=\"text\" class=\"find-text\" placeholder=\"搜索好友\" ng-model=\"SearchUser.nickName\" >\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <div ng-repeat=\"category in userListCategoryInAlpha\">\r\n            <p class=\"item-divider-empty letter-results-describe\">{{category.initial}}</p>\r\n\r\n            <div class=\"list\">\r\n                <div class=\"item-friends-box\" >\r\n                    <div class=\"group-chat-block remove-top-bottom-border\" ng-repeat=\"user in category.userList\">\r\n                        <div class=\"remove-bottom-border\">\r\n                            <!--<ion-checkbox class=\"item-checkbox-technician__circle\" ng-model=\"user.isChecked\"\r\n                                          ng-disabled=\"user.selected===1&&user.isChecked\">\r\n                                <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                                <span class=\"item-checkbox-technician__circle-text\">{{ user.nickName }}</span>\r\n                            </ion-checkbox>-->\r\n                            <p class=\"item item-checkbox checkbox-img-block\">\r\n                                <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                                <label class=\"checkbox clearfix\">\r\n                                    <input class=\"checkbox-input-locat\" type=\"checkbox\" ng-model=\"user.isChecked\"\r\n                                           ng-disabled=\"user.selected===1&&user.isChecked\">\r\n                                </label>\r\n                                <span class=\"friends-checkbox-nikename\">{{ user.nickName }}</span>\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <p class=\"list-number\" ng-if=\"userListArr>0\">{{userListArr}}个联系好友</p>\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\">\r\n    <div class=\"tipbox-content\" style=\"width:80%;\">\r\n        <form name=\"modifyGroupName\" ng-submit=\"groupNameSubmit(modifyGroupName.$error)\" novalidate>\r\n            <div class=\"change-name-content\">\r\n                <h4 class=\"tipbox-title\">群名称</h4>\r\n                <label><input check-group-name class=\"change-name-input\" type=\"text\"  ng-model=\"groupModal.name\"  ng-maxlength=\"20\" required  name=\"name\"/></label>\r\n                <div class=\"error\" ng-messages=\"modifyGroupName.name.$error\">\r\n                    <p class=\"change-name-tips\" ng-message=\"required\">请输入群名称</p>\r\n                    <p class=\"change-name-tips\" ng-message=\"maxlength\">不能大于20个字</p>\r\n                    <p class=\"change-name-tips\" ng-message=\"groupName\">只能包含中文、下划线、数字、字母</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"button-bar individual-set-button-bar\">\r\n                <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"  ng-click=\"closeModifyGroupName()\">取消</a>\r\n                <input type=\"submit\"  class=\"button chat-tipbox-button individual-set-button-confirm\" value=\"确定\">\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(59),
	    controller: __webpack_require__(60)
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"查找技师\" ng-view>\r\n\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input class=\"find-text\" placeholder=\"请输入关键字\" ng-model=\"filter.fuzzy\"\r\n                           type=\"text\"/>\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <!--<ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.friends\">-->\r\n                    <!--&lt;!&ndash;<img src=\"img/js-add-friend.jpg\">&ndash;&gt;-->\r\n                    <!--<span class=\"function-module-ion-block sameTechnician-function-independent-bg\">-->\r\n                        <!--<i class=\"iconfont icon-Add-friends personal-ion function-module-ion\"></i>-->\r\n                    <!--</span>-->\r\n                    <!--<p class=\"item-friends-description\">同城技师</p>-->\r\n                <!--</ion-item>-->\r\n                <!--<ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.friends\">-->\r\n                   <!--<span class=\"function-module-ion-block nearTechnician-function-independent-bg\">-->\r\n                        <!--<i class=\"iconfont icon-navigation personal-ion function-module-ion\"></i>-->\r\n                    <!--</span>-->\r\n\r\n                    <!--<p class=\"item-friends-description\">附近技师</p>-->\r\n                <!--</ion-item>-->\r\n                <ion-item class=\"item item-action-head-portrait\" ui-sref=\"tab.circle.find-filter\">\r\n                   <span class=\"function-module-ion-block screening-function-independent-bg\">\r\n                        <i class=\"iconfont icon-label personal-ion function-module-ion\"></i>\r\n                    </span>\r\n                    <p class=\"item-friends-description\">条件筛选</p>\r\n                </ion-item>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty search-results-describe\">所有技师</p>\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <ion-item class=\"item item-friends-head-portrait\" ng-repeat=\"user in userList\"\r\n                   ui-sref=\"tab.circle.user-detail({id: user.id})\">\r\n                    <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                    <!--<span class=\"badge friends-badge-level\">J{{ user.grade }}</span>-->\r\n\r\n                    <p class=\"item-friends-description\">{{ user.nickName }}</p>\r\n                </ion-item>\r\n            </div>\r\n        </div>\r\n        <p class=\"list-number\" ng-if=\"allUserList.length==0&&userList.length>0\">共{{userList.length}}个技师</p>\r\n        <ion-infinite-scroll\r\n                icon=\"ion-loading-d\"\r\n                ng-if=\"moreDataCanBeLoaded\"\r\n                distance=\"5%\"\r\n                on-infinite=\"loadMoreData()\">\r\n        </ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/8/31.
	 */
	var exports = function ($scope,
	                        JSCommand,
	                        Constants) {
	
	    console.log('enter the find friend controller...');
	
	    $scope.allUserList='';
	    $scope.filter = {
	        "fuzzy": ""
	    };
	    $scope.userList = [];
	    $scope.moreDataCanBeLoaded = true;
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            //var userList =jsonResult.data.userList;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	
	                    $scope.$apply(function () {
	                        $scope.userList=jsonResult.data.userList;
	                    });
	                    console.log("$userList:::",jsonResult);
	
	
	                }else{
	                    console.log("Login fail:" + json["reason"]);
	                    $scope.moreDataCanBeLoaded = false;
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	   /* $scope.pageNum = 1;
	    var pageSize = 10;*/
	    $scope.$watch('filter.fuzzy', function () {
	        $scope.pageNum = 0;
	        $scope.moreDataCanBeLoaded = true;
	        $scope.userList.length = 0;
	        $scope.loadMoreData();
	    });
	
	    $scope.loadMoreData = function () {
	        var filterString = JSON.stringify($scope.filter);
	        JSCommand.ccdp.queryUserByCondition(-1, -1, filterString);
	    };
	};
	
	exports.$inject = [
	    '$scope',
	    'JSCommand',
	    'Constants'
	];
	
	module.exports = exports;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(62),
	    controller: __webpack_require__(63)
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"技师列表筛选\">\r\n    <!--<ion-nav-bar class=\"bar-technician__circle\">\r\n        <ion-nav-back-button></ion-nav-back-button>\r\n\r\n        <ion-nav-buttons side=\"right\">\r\n            <button class=\"button button-clear\" ng-click=\"stopConsult()\">结束咨询</button>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>-->\r\n    <ion-nav-buttons side=\"secondary\">\r\n        <button class=\"button button-clear\" ng-click=\"searchResult()\">查找</button>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n\r\n        <div class=\"search-filter-item\">\r\n            <div class=\"item item-full-height\" ng-click=\"showBrandModal()\">\r\n\r\n                <span class=\"item-name\"> 擅长品牌</span>\r\n\r\n                <a href=\"javascript:\" class=\"item-note item-note-layout\">\r\n                    <!--span ng-repeat=\"brand in brandList\">{{ brand.id }}: {{ brand.isChecked}} || </span>-->\r\n\r\n                    <span class=\"item-note-has-text\" ng-show=\"isShowNotChoice\">\r\n                        未选择\r\n                    </span>\r\n\r\n\r\n                    <span class=\"item-note-has-text\" ng-show=\"isShowSelectIcon\">\r\n                        <img ng-repeat=\"brand in brandList | filter :{'isChecked':true}\" width=\"17px\"\r\n                             ng-src=\"{{brand.icon_ur | prefixSrc}}\"\r\n                             alt=\"\" class=\"brand-icon\" ng-show=\"brand.isChecked && $index < 3\"/>\r\n                    </span>\r\n\r\n                    <span class=\"more-and-more\" ng-show=\"brandselected.length > 3\">...</span>\r\n                    <i class=\"ion-chevron-right\"></i>\r\n\r\n                </a>\r\n            </div>\r\n            <div class=\"list\">\r\n                <div class=\"top-border-ex\">\r\n                    <a class=\" item item-icon-right\" ng-click=\"showServiceModal()\">\r\n                        擅长处理\r\n                <span class=\"list-first-description \">\r\n                    <ul class=\"clearfix\">\r\n                        <li class=\"with-i\" ng-repeat=\" service in serviceList | filter :{'isChecked':true}\"\r\n                            ng-show=\"service.isChecked && isShowSelectSerivce && $index < 3\">\r\n                            {{service.name}}\r\n                        </li>\r\n                        <li class=\"with-i\" ng-show=\"serviceSelected.length > 3\">\r\n                            ...\r\n                        </li>\r\n                    </ul>\r\n                 </span>\r\n                        <span class=\"no-choose-text\" ng-show=\"isShowNotChoiceService\">未选择</span>\r\n                        <i class=\"icon ion-chevron-right ion-good-chevron-style\"></i>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"search-filter-item\">\r\n            <div class=\"item item-full-height\" ng-click=\"showPraiseModal()\">\r\n\r\n                <span class=\"item-name\">专家等级</span>\r\n\r\n                <a href=\"javascript:\" class=\"item-note\">\r\n                    <span class=\"item-note-has-text\" ng-show=\"selectedPraiseId==null\">\r\n                        未选择\r\n                    </span>\r\n                    <span class=\"item-note-has-text\" ng-show=\"selectedPraiseId>0\">\r\n                        {{selectedPraisename}}\r\n                    </span>\r\n                    <i class=\"ion-chevron-right\"></i>\r\n                </a>\r\n\r\n            </div>\r\n            <div class=\"item item-full-height\">\r\n                <span class=\"item-name\">专家好评</span>\r\n\r\n                <a href=\"#\" class=\"item-note\">\r\n                    <span class=\"item-note-has-text\">\r\n                        &gt;80%\r\n                    </span>\r\n                    <i class=\"ion-chevron-right\"></i>\r\n\r\n                </a>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"search-filter-item\">\r\n            <div class=\"item item-full-height\">\r\n                <span class=\"item-name\">距离</span>\r\n\r\n                <a href=\"#\" class=\"item-note\">\r\n                    <span class=\"item-note-has-text\">\r\n                       不限\r\n                    </span>\r\n                    <i class=\"ion-chevron-right\"></i>\r\n\r\n                </a>\r\n\r\n            </div>\r\n            <div class=\"item item-full-height\" ng-click=\"showOnlineModal()\">\r\n                <span class=\"item-name\">是否在线</span>\r\n\r\n                <a href=\"#\" class=\"item-note\">\r\n                    <span class=\"item-note-has-text\" ng-show=\"onLineId===null&&onLineId!=1||0\">\r\n                       未选择\r\n                    </span>\r\n                    <span class=\"item-note-has-text\" ng-show=\"onLineId==1\">\r\n                       {{isOnLineState}}\r\n                    </span>\r\n                    <span class=\"item-note-has-text\" ng-show=\"onLineId==0\">\r\n                       {{isOnLineState}}\r\n                    </span>\r\n                    <i class=\"ion-chevron-right\"></i>\r\n\r\n                </a>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Andy on 2015/8/31.
	 */
	var _ = __webpack_require__(5);
	
	var SearchFilterCtrl = function ($scope,
	                                 JSCommand,
	                                 $state,
	                                 $ionicModal,
	                                 Constants,
	                                 JSUtils) {
	
	    console.log('enter the search filter controller...');
	
	    $scope.brandList='';
	    $scope.serviceList='';
	    $scope.onLineId = null;  //是否在線
	
	    $scope.$on('YHJSReceiver', function (event,jsonResult) {
	        try{
	            var what = jsonResult.what;
	            if(what === Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST){
	                var status = jsonResult.status;
	                var type = jsonResult.data.type;
	
	                console.log("jsonResult",jsonResult);
	                if(status === Constants.status.success){
	                   switch (type){
	                       case 0:
	                           $scope.$apply(function(){
	                               $scope.brandList = jsonResult.data.itemList;
	                           });
	                           break;
	                       case 1:
	                           $scope.serviceList = jsonResult.data.itemList;
	                           break;
	                       case 2:
	                           $scope.PraiseList = jsonResult.data.itemList;
	                           break;
	
	                   }
	                }
	            }
	        }
	        catch(error){
	
	        }
	    });
	
	    //选择品牌
	    JSCommand.ccdp.queryFilterList(Constants.filterType.brand);
	
	    //专家好评等级
	    JSCommand.ccdp.queryFilterList(Constants.filterType.expertLevel);
	
	    //选择擅长处理
	    var service;
	    JSCommand.ccdp.queryFilterList(Constants.filterType.service);
	
	
	
	    function isShowSelectIcon(Arr) {
	        return _.some(Arr, function (item) {
	            return item.isChecked;
	        });
	    }
	
	    function isAllSelected(Arr) {
	        return _.every(Arr, function (item) {
	            console.log(Arr);
	            return item.isChecked
	        })
	    }
	
	    function isOnline(type) {
	        switch (type) {
	            case 0:
	                $scope.isOnlineType = '不在线';
	                break;
	            case 1:
	                $scope.isOnlineType = '在线';
	        }
	
	        return $scope.isOnlineType;
	    }
	
	    $scope.isShownotChoice = true;
	
	
	    $scope.brandModal = $ionicModal.fromTemplate(__webpack_require__(65), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.serviceModal = $ionicModal.fromTemplate(__webpack_require__(66), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.praiseModal = $ionicModal.fromTemplate(__webpack_require__(64), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.onLineModal = $ionicModal.fromTemplate(__webpack_require__(67), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.sreachResultModal = $ionicModal.fromTemplate(__webpack_require__(68), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    //点击到好友详情后,隐藏筛选后的结果列表
	    $scope.showFriendData = function () {
	        $scope.sreachResultModal.hide();
	    };
	
	
	    var result;
	    $scope.showBrandModal = function () {
	        $scope.brandselected = [];
	        $scope.brandselectedIcon = [];
	        $scope.brandListCategoryInAlpha = JSUtils.rankingAccording(JSON.parse(JSON.stringify($scope.brandList)));
	
	        $scope.brandModal.show();
	        console.log('brandListCategoryInAlpha', $scope.brandListCategoryInAlpha);
	        result = Array.prototype.concat.apply([], _.map($scope.brandListCategoryInAlpha, function (category) {
	            return category.userList;
	        }));
	
	    };
	
	    $scope.goBackSearchFilter = function () {
	        $scope.brandModal.hide();
	        $scope.serviceModal.hide();
	        $scope.sreachResultModal.hide();
	    };
	
	    $scope.backTechnicianCircle = function () {
	        $scope.sreachResultModal.hide();
	        $scope.__goToViewAsTop('tab.circle.friends');
	    };
	
	    $scope.sureSelect = function () {
	        //TODO: 保存数据;
	
	        _.forEach($scope.brandListCategoryInAlpha, function (categoryInAlpha) {
	            _.forEach(categoryInAlpha.userList, function (brandTmp) {
	                var brand = _.findWhere($scope.brandList, {
	                    id: brandTmp.id
	                });
	
	                if (brand) {
	                    brand.isChecked = brandTmp.isChecked;
	                }
	                if (brand.isChecked) {
	                    $scope.brandselected.push(brand.id);
	                    $scope.brandselectedIcon.push({icon_ur: brand.icon_ur});
	                }
	                console.log("$scope.brandselected:",$scope.brandselected)
	            })
	        });
	        $scope.brandModal.hide();
	    };
	
	
	    $scope.$watch('brandListCategoryInAlpha', function () {
	        if (result != 'undefined')
	        //$scope.limitedSelected = limitedSelect(result); //记录已经选好的 id
	
	            $scope.flag.isAllSelectedFlag = isAllSelected(result);
	    }, true);
	
	    $scope.$watch('brandList', function () {
	        $scope.isShowSelectIcon = isShowSelectIcon(result);
	        if (!$scope.isShowSelectIcon) {
	            $scope.isShowNotChoice = true;
	        } else {
	            $scope.isShowNotChoice = false;
	        }
	    }, true);
	
	    $scope.flag = {
	        isAllSelectedFlag: false,
	        isAllSelectedServiceFlag: false
	    };
	
	    $scope.showServiceModal = function () {
	        $scope.serviceSelected = [];
	        $scope.serviceSelectedName = [];
	        $scope.serviceModal.show();
	        $scope.copyServiceList = JSON.parse(JSON.stringify($scope.serviceList));
	
	        service = Array.prototype.concat.apply([], _.map($scope.copyServiceList, function (service) {
	            return service;
	        }));
	    };
	
	    $scope.$watch('copyServiceList', function () {
	
	        //$scope.limitedSelected = limitedSelect(service); // 记录已经选好的id
	
	        $scope.flag.isAllSelectedServiceFlag = isAllSelected(service)
	    }, true);
	
	    $scope.$watch('serviceList', function () {
	        $scope.isShowSelectSerivce = isShowSelectIcon(service);
	        if (!$scope.isShowSelectSerivce) {
	            $scope.isShowNotChoiceService = true;
	        } else {
	            $scope.isShowNotChoiceService = false;
	        }
	    }, true);
	
	    //擅长处理数据提交
	    $scope.sureSelectService = function () {
	        //TODO 保存选择服务数据
	        _.forEach($scope.copyServiceList, function (serviceList) {
	            var service = _.findWhere($scope.serviceList, {
	                id: serviceList.id
	            });
	            if (service) {
	                service.isChecked = serviceList.isChecked;
	            }
	            if (service.isChecked) {
	                $scope.serviceSelected.push(service.id);
	                $scope.serviceSelectedName.push(service.name);
	            }
	            console.log($scope.serviceSelectedName);
	        });
	        $scope.serviceModal.hide()
	    };
	
	    $scope.showPraiseModal = function () {
	        $scope.praiseModal.show();
	    };
	
	    $scope.selectedPraise = function (id, name) {
	        $scope.selectedPraiseId = id;
	        $scope.selectedPraisename = name;
	        console.log('selectedPraiseName', $scope.selectedPraisename);
	        $scope.praiseModal.hide();
	    };
	
	    $scope.notSelectedPraise = function () {
	        $scope.selectedPraiseId = null;
	        $scope.selectedPraisename = '';
	        $scope.praiseModal.hide();
	    };
	
	
	    //是否在线
	    $scope.showOnlineModal = function () {
	        $scope.onLineModal.show();
	        $scope.onLineState = '在线';
	        $scope.notOnLineState = '不在线';
	    };
	
	    $scope.isOnLine = function (id) {
	        $scope.onLineId = id;
	        $scope.onLineModal.hide();
	        $scope.isOnLineState = isOnline(id);
	    };
	
	    $scope.searchResult = function () {
	        var searchResultJsonObj =
	        {
	            "professionalBrandList": $scope.brandselected,
	            "professionalProjectList": $scope.serviceSelected,
	            "grade": $scope.selectedPraiseId,
	            "isOnline": $scope.onLineId
	        };
	        var searchResultJsonString = JSON.stringify(searchResultJsonObj);
	        $state.go('tab.circle.search-result', {result: searchResultJsonString});
	    };
	
	    $scope.$on('$destroy', function () {
	        $scope.brandModal.remove();
	        $scope.serviceModal.remove();
	        $scope.sreachResultModal.remove();
	    });
	
	    /*$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	        //console.log('arguments',arguments)
	        $scope.brandModal.remove();
	        $scope.serviceModal.remove();
	        $scope.sreachResultModal.remove();
	        $scope.praiseModal.remove();
	        $scope.onLineModal.remove();
	    })*/
	};
	
	SearchFilterCtrl.$inject = [
	    '$scope',
	    'JSCommand',
	    '$state',
	    '$ionicModal',
	    'Constants',
	    'JSUtils'
	];
	
	module.exports = SearchFilterCtrl;

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <h1 class=\"title\">请选择等级</h1>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <div class=\"remove-bottom-border\">\r\n                    <ion-item class=\"item\" ng-click=\"notSelectedPraise()\">\r\n                        <p class=\"item-friends-description\">不选</p>\r\n                    </ion-item>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <ion-item class=\"item item-friends-head-portrait\" ng-repeat=\"praise in PraiseList\"\r\n                          ng-click=\"selectedPraise(praise.id,praise.name)\">\r\n                    <p class=\"item-friends-description\">{{praise.name}}</p>\r\n                </ion-item>\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"goBackSearchFilter()\">\r\n                <i class=\"icon ion-ios-arrow-back\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">请选择品牌</h1>\r\n\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"sureSelect()\">\r\n                确定\r\n            </button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <!--<input class=\"\" type=\"checkbox\" ng-checked=\"flag.isAllSelectedFlag\" ng-click=\"selectAll($event)\">全选/全不选(据说往后业务需要增加此功能暂时不做UI效果)\r\n-->\r\n        <div ng-repeat=\"categoryInAlpha in brandListCategoryInAlpha\">\r\n            <p class=\"item-divider-empty letter-results-describe\">{{categoryInAlpha.initial}}</p>\r\n\r\n            <div class=\"list\">\r\n                <div class=\"item-friends-box\">\r\n\r\n                    <div class=\"group-chat-block remove-top-bottom-border\" ng-repeat=\"brand in categoryInAlpha.userList\">\r\n                        <div class=\"remove-bottom-border\">\r\n                            <ion-checkbox class=\"item-checkbox-technician__circle\"  ng-model=\"brand.isChecked\">\r\n                                <img ng-src=\"{{ brand.icon_ur | prefixSrc }}\">\r\n                                <span class=\"item-checkbox-technician__circle-text\">{{ brand.name }}</span>\r\n                            </ion-checkbox>\r\n                        </div>\r\n                        <!--<ion-item class=\"item item-friends-head-portrait\">\r\n                            <img ng-src=\"{{brand.icon | prefixSrc}}\">\r\n\r\n                            <p class=\"item-friends-description\">{{brand.name}}</p>\r\n                        </ion-item>\r\n                        <label class=\"group-chat-checkbox checkbox\">\r\n                            <input type=\"checkbox\" ng-model=\"brand.isChecked\">\r\n                        </label>-->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"goBackSearchFilter()\">\r\n                <i class=\"icon ion-ios-arrow-back\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">请选择服务</h1>\r\n\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"sureSelectService()\">\r\n                确定\r\n            </button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <!--<input class=\"\" type=\"checkbox\" ng-disabled=\"true\" ng-checked=\"flag.isAllSelectedServiceFlag\" ng-click=\"AllSelectService($event) \">\r\n        全选/全不选(据说往后业务需要增加此功能暂时不做UI效果)-->\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n\r\n                <div class=\"group-chat-block remove-top-bottom-border\"  ng-repeat=\"service in copyServiceList\">\r\n                    <div class=\"remove-bottom-border\">\r\n                        <ion-checkbox class=\"item-checkbox-technician__circle portrait-pad\" ng-model=\"service.isChecked\">\r\n                            <!--<img ng-src=\"{{ brand.icon | prefixSrc }}\">-->\r\n                            <span class=\"item-checkbox-technician__circle-text\">{{ service.name }}</span>\r\n                        </ion-checkbox>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <h1 class=\"title\">请选择是否在线</h1>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <div class=\"group-chat-block remove-top-bottom-border\">\r\n                    <div class=\"remove-bottom-border\">\r\n                        <ion-item class=\"item item-friends-head-portrait\" ng-click=\"isOnLine(id=null)\">\r\n                            <p class=\"item-friends-description\">不选</p>\r\n                        </ion-item>\r\n                    </div>\r\n                </div>\r\n                <div class=\"group-chat-block remove-top-bottom-border\">\r\n                    <div class=\"remove-bottom-border \">\r\n                        <ion-item class=\"item item-friends-head-portrait\" ng-click=\"isOnLine(id=1)\">\r\n                            <p class=\"item-friends-description\">{{onLineState}}</p>\r\n                        </ion-item>\r\n                    </div>\r\n                </div>\r\n                <div class=\"group-chat-block remove-top-bottom-border\">\r\n                    <div class=\"remove-bottom-border\">\r\n                        <ion-item class=\"item item-friends-head-portrait\" ng-click=\"isOnLine(id=0)\">\r\n                            <p class=\"item-friends-description\">{{notOnLineState}}</p>\r\n                        </ion-item>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"找到的技师\">\r\n\r\n    <ion-content class=\"item-bg\">\r\n        <div  ng-show=\"searchResultData.length<=0\">\r\n            <div class=\"item-divider-empty  filtering-results-gutter\">\r\n                <span>为您查找到0位技师，请变更搜索条件重新查询。</span>\r\n            </div>\r\n        </div>\r\n        <div ng-show=\"searchResultData.length>0\">\r\n            <div class=\"item-divider-empty  filtering-results-gutter\">\r\n                <span>为您查找到{{userCount}}位技师</span>\r\n                <!--<span class=\"good-at-text\">擅长</span>\r\n                <ul class=\"technician-good-at\">\r\n                    <li ng-repeat=\"brand  in filtrationCondition.filterBrandList\">\r\n                        <img ng-src=\"{{brand.icon | prefixSrc}}\">\r\n                    </li>\r\n                </ul>\r\n                <p>\r\n                    <span ng-repeat=\"service  in filtrationCondition.filterServiceList\">{{service}}&nbsp;</span>&nbsp;\r\n                    <span>好评率>80%，</span>\r\n                    <span>距离5公里以内</span>\r\n                    <span>{{filtrationCondition.isOnline}}的{{filtrationCondition.grade}}</span>\r\n                    技师查找如下：</p>-->\r\n            </div>\r\n            <div class=\"list\">\r\n                <div class=\"list\">\r\n                    <div class=\"item-friends-box\">\r\n                        <ion-item class=\"item item-friends-head-portrait\"  ng-click=\"showFriendData()\" ng-repeat=\"user in searchResultData\"\r\n                                  ui-sref=\"tab.circle.user-detail({id: user.id})\">\r\n                            <!--<img src=\"{{user.icon}}\">-->\r\n                            <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                            <!--<span class=\"badge friends-badge-level\">J{{user.grade}}</span>-->\r\n\r\n                            <p class=\"item-friends-description\">{{user.nickName}}</p>\r\n                        </ion-item>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <ion-infinite-scroll\r\n                icon=\"ion-loading-d\"\r\n                distance=\"5%\"\r\n                on-infinite=\"loadMoreData()\">\r\n        </ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(70),
	    controller: __webpack_require__(71)
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"好友详情\" ng-view>\r\n    <ion-nav-buttons side=\"secondary\">\r\n        <button class=\"button button-clear\" ng-click=\"deleteFriend(user.id)\" ng-show=\"user.relation===2\">删除好友</button>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"has-footer item-bg\">\r\n        <div class=\"hand\">\r\n            <div class=\"hand-more\">\r\n                <div class=\"hand-more-avatar\">\r\n                    <div class=\"avatar-border-trans\"></div>\r\n                    <img class=\"avatar-img\" ng-src=\"{{ user.icon | prefixSrc }}\">\r\n\r\n                    <div class=\"personal-class clearfix\">\r\n                        <span>{{ user.grade }}级技师</span>\r\n                    </div>\r\n                </div>\r\n                <p class=\"personal-name\">\r\n                    <span class=\"the-personal-name ellipsis\">\r\n                        {{ user.nickName }}\r\n                        <span class=\"iconfont icon-man expert-icon-man\" ng-show=\"user.sex===2\"></span>\r\n                        <span class=\"iconfont icon-woman expert-icon-man\" ng-show=\"user.sex===1\"></span>\r\n                    </span>\r\n\r\n                </p>\r\n            </div>\r\n            <div class=\"hand-index\">\r\n                <span class=\"hand-index-settlement\">\r\n                    <i class=\"hand-index-value ellipsis\">{{ user.resolvedCount }}</i>\r\n                    <em class=\"hand-index-title\">解决数</em>\r\n                </span>\r\n                <span class=\"vertical-line\"></span>\r\n                <span class=\"hand-index-popularity sentiment-location-block clearfix\">\r\n                    <i class=\"hand-index-value ellipsis\">{{ user.popularity }}</i>\r\n                    <em class=\"hand-index-title clearfix\">人气</em>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n\r\n        <div class=\"content-expert\">\r\n            <div class=\"list\">\r\n                <ul class=\"item\">\r\n                    擅长处理：\r\n                    <!--<img class=\"list-first-img\" ng-repeat=\"brand in user.brandList\"\r\n                         ng-src=\"{{ brand.icon | prefixSrc }}\">-->\r\n                    <span class=\"list-first-description set-des-color\">\r\n                     <ul class=\"clearfix\">\r\n                         <img class=\"list-first-img\" ng-repeat=\"brand in user.brandList\"\r\n                              ng-src=\"{{ brand.icon | prefixSrc }}\">\r\n                     </ul>\r\n                     </span>\r\n                </ul>\r\n                <ul class=\"item\">\r\n                    服务项目：\r\n                <span class=\"list-first-description set-des-color\">\r\n                     <ul class=\"clearfix\">\r\n                         <li class=\"with-i\" ng-repeat=\"project in user.serveList\">\r\n                             {{ project.serveName }}\r\n                         </li>\r\n                     </ul>\r\n                </span>\r\n                </ul>\r\n                <ul class=\"item  description-white-space\">\r\n                    服务介绍：\r\n                <span class=\"list-first-description set-des-color\">\r\n                    <p>{{ user.description }}</p>\r\n                </span>\r\n                </ul>\r\n                <ul class=\"item\">\r\n                    在线时间：\r\n                <span class=\"list-first-description set-text-desc-color\">\r\n                    {{ user.serveStartTime }} - {{ user.serveEndTime }}\r\n                </span>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===2\">\r\n        <button ui-sref=\"tab.conversations.conversation.PRIVATE({targetId: user.id, conversationType: 'PRIVATE'})\"\r\n                class=\"button button-full button-positive clear-white-space font-relation\">发送信息\r\n        </button>\r\n    </ion-footer-bar>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===1\">\r\n        <button class=\"button button-full button-positive-relation clear-white-space font-relation\">等待对方回应...</button>\r\n    </ion-footer-bar>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===0||user.relation===3\">\r\n        <button  ng-disabled=\"disabledNewFriend \"  class=\"button button-full button-positive clear-white-space font-relation\" ng-click=\"addMyFriend(user.id)\">\r\n            加为好友\r\n        </button>\r\n    </ion-footer-bar>\r\n\r\n\r\n    <ion-footer-bar   class=\"clear-white-space\" ng-if=\"user.relation===4\">\r\n        <button ng-disabled=\"disabledNewFriend \" class=\"button button-small button-assertive button-half\" ng-click=\"refuse(user.id)\">\r\n            拒绝\r\n        </button>\r\n        <button ng-disabled=\"disabledNewFriend \" class=\"button button-large button-positive button-half\" ng-click=\"acceptFriend(user.id)\">\r\n            加为好友\r\n        </button>\r\n    </ion-footer-bar>\r\n</ion-view>"

/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Created by Andy on 2015/9/6.
	 */
	var UserDetailCtrl = function ($scope,
	                               Constants,
	                               JSCommand,
	                               JSCache,
	                               $state,
	                               $stateParams,
	                               $rootScope) {
	
	    console.log('enter the user detail controller...');
	
	    // first to get user detail
	    var id = $stateParams.id;
	    JSCommand.ccdp.queryUserDetail(id);
	
	    // listen the message and process my interest
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            var status = jsonResult.status;
	            if (status == Constants.status.success) {
	
	                var userDetail = jsonResult.data.user;
	                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
	                    $scope.user = userDetail;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
	                    $scope.user.relation = userDetail.relation;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
	                    $scope.user.relation = userDetail.relation;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
	                    $state.go('tab.circle.friends')
	                }
	
	            } else {
	
	            }
	
	        } catch (error) {
	            console.log("process user detail message fail:", error);
	        }
	    });
	
	    $scope.disabledNewFriend=false;
	    $scope.addMyFriend = function (id) {
	        JSCommand.ccdp.addFriend(id);
	    };
	
	    $scope.refuse = function (id) {
	        $scope.disabledNewFriend=true;
	        JSCommand.ccdp.deleteFriend(id);
	
	        console.log("start to broadcast my new friend count");
	        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
	        if(countNewFriends){
	            countNewFriends.friendApplyCount--;
	            JSCache.put(Constants.YHCache.loginInfo,countNewFriends);
	
	            $rootScope.$broadcast("YHNewFriend", '');
	        }
	    };
	
	    $scope.acceptFriend = function (id) {
	        $scope.disabledNewFriend=true;
	        JSCommand.ccdp.acceptFriend(id);
	
	        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
	        if(countNewFriends){
	            countNewFriends.friendApplyCount--;
	            JSCache.put(Constants.YHCache.loginInfo,countNewFriends);
	
	            $rootScope.$broadcast("YHNewFriend", '');
	        }
	    };
	
	    $scope.deleteFriend = function (id) {
	        JSCommand.ccdp.deleteFriend(id)
	    }
	
	};
	
	UserDetailCtrl.$inject = [
	    '$scope',
	    'Constants',
	    'JSCommand',
	    'JSCache',
	    '$state',
	    '$stateParams',
	    '$rootScope'
	];
	
	module.exports = UserDetailCtrl;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/6.
	 */
	module.exports = {
	    template: __webpack_require__(68),
	    controller: __webpack_require__(73)
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/6.
	 */
	var searchResult = function ($scope,
	                             JSCommand,
	                             $stateParams,
	                             Constants) {
	
	    console.log('enter the search result controller...');
	
	    // define the parameter to store the result
	    $scope.searchResultData = [];
	
	    //
	    $scope.pageNum = -1;  //分頁
	    $scope.pageSize = -1;
	
	    JSCommand.ccdp.queryUserByCondition($scope.pageNum, $scope.pageSize, $stateParams.result);
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	
	        try {
	            var what = jsonResult.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS) {
	                var status = jsonResult.status;
	                if (status === Constants.status.success) {
	                    if (jsonResult.data.userList.length === 0) {
	                        return;
	                    } else {
	                        $scope.searchResultData = $scope.searchResultData.concat(jsonResult.data.userList);
	                        $scope.userCount=$scope.searchResultData.length;
	
	                        if ($scope.searchResultData.length != 0) {
	                            $scope.filtrationCondition = {
	                                filterBrandList: $scope.brandselectedIcon,
	                                filterServiceList: $scope.serviceSelectedName,
	                                grade: $scope.selectedPraisename
	                            };
	                            $scope.$broadcast('scroll.infiniteScrollComplete');
	                        }
	                    }
	                } else {
	                    console.log("Login fail:" + json["reason"]);
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	 /*   $scope.loadMoreData = function () {
	        $scope.pageNum += 1;
	        JSCommand.ccdp.queryUserByCondition($scope.pageNum, $scope.pageSize , $stateParams.result);
	    };*/
	};
	
	searchResult.$inject = [
	    '$scope',
	    'JSCommand',
	    '$stateParams',
	    'Constants'
	];
	
	module.exports = searchResult;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = angular.module('app.tabs', [
	    'ionic', 'ngCookies',
	    __webpack_require__(6).name])
	
	    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	
	        $stateProvider
	
	            .state('tab', {
	                url: "/tab",
	                abstract: true,
	                views: {
	                    '': __webpack_require__(75)
	                }
	            });
	
	        // $urlRouterProvider.otherwise('/tab/circle/contact-list');
	
	    }]);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template  : __webpack_require__(76),
	    controller: __webpack_require__(77)
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab's child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<!--<i class=\"iconfont icon-search placeholder-icon search-icon\"></i>-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\" ng-class=\"{'tabs-item-hide': !showTabs}\"\n          delegate-handle=\"my-handle\">\n\n    <!--<ion-tab title=\"CCDP\" icon-off=\"ion-ios-box-outline\" icon-on=\"ion-ios-box\" ui-sref=\"tab.tool\">-->\n    <ion-tab title=\"修车宝\" icon-off=\"iconfont icon-tool-off index-icon-menu-size\"\n             icon-on=\"iconfont icon-tool-on index-icon-menu-size\"   ui-sref=\"tab.tool\">\n        <ion-nav-view name=\"tab-tool\"></ion-nav-view>\n    </ion-tab>\n    <!--ion-ios-gear,ion-ios-information,ion-ios-more--->\n    <!--<span class=\"badge badge-assertive friends-badge-message message-location-jsquan\" ng-show=\"hasNewFriend()\">{{newFriendCount}}</span>-->\n    <ion-tab title=\"技师圈\" icon-off=\"iconfont icon-technician-off index-icon-menu-size\"\n             icon-on=\"iconfont icon-technician-on index-icon-menu-size\"   on-select=\"returnCircle()\">\n        <ion-nav-view name=\"tab-circle\"></ion-nav-view>\n    </ion-tab>\n\n\n    <!--<ion-tab title=\"协助\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" ui-sref=\"tab.assistance\">\n        <ion-nav-view name=\"tab-assistance\"></ion-nav-view>\n    </ion-tab>-->\n\n    <ion-tab title=\"消息\" icon-off=\"iconfont icon-talk-off index-icon-menu-size\"\n             icon-on=\"iconfont icon-talk-on index-icon-menu-size\"\n             ui-sref=\"tab.conversations.conversation-list\">\n        <ion-nav-view name=\"tab-conversations\"></ion-nav-view>\n    </ion-tab>\n    <!--消息模块,消息提示-->\n    <!--<span class=\"badge badge-assertive friends-badge-message message-location\">4</span>-->\n    <span class=\"badge badge-assertive friends-badge-message message-location\" ng-show=\"isShowNoReadMessage\">{{NoReadMessageNum}}</span>\n    <ion-tab title=\"我的\" icon-off=\"iconfont icon-mine-off index-icon-menu-size\"\n             icon-on=\"iconfont icon-mine-on index-icon-menu-size\" ui-sref=\"tab.home\">\n        <ion-nav-view name=\"tab-home\"></ion-nav-view>\n    </ion-tab>\n\n</ion-tabs>\n"

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	var _ = __webpack_require__(5);
	
	var Main = function ($scope,
	                     $rootScope,
	                     $state,
	                     $timeout,
	                     $ionicModal,
	                     $interval,
	                     $ionicTabsDelegate,
	                     $cookies,
	                     $ionicNavBarDelegate,
	                     $ionicHistory,
	                     $ionicPopup,
	                     FriendRelationManager,
	                     Constants,
	                     JSCache,
	                     JSCommand,
	                     JSUtils) {
	
	    console.log("enter the login page...");
	
	    // global parameters
	    var user_name = JSCache.get(Constants.YHCache.userName);
	    $scope.user = {
	        username: user_name ? user_name : '',
	        captcha: '',
	        acceptLicense: true
	    };
	
	    // 是否后台登录
	    $scope.loginbackground = true;
	    // 记录跳转页面-to
	    $scope.toState;
	    // 记录跳转页面参数-to
	    $scope.toParams;
	    // 记录跳转页面-from
	    $scope.fromState;
	    // 记录跳转页面参数-from
	    $scope.fromParams;
	    // 正在登录提示框
	    $scope.isLoading = false;
	
	    // 监听android iOS发送过来的消息
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_LOGIN) {
	
	                // 登录的回复
	                var status = json["status"];
	                console.log("登录状态:",status);
	                if (status == Constants.status.success) {
	
	                    console.log("登录成功！");
	
	                    // 登录成功
	                    $scope.isLoading = false;
	                    JSCache.put(Constants.YHCache.loginInfo, json.data);
	
	                    // 关闭登录对话框
	                    $scope.modalLogin.hide().then(function(){
	                        if ($scope.toState && $scope.toParams) {
	                            $state.go($scope.toState.name, $scope.toParams);
	                        }
	                    });
	
	                    // 保存用户名
	                    JSCache.put(Constants.YHCache.userName, $scope.user.username);
	                }
	                else {
	                    /*
	                     登录失败
	                     */
	                    console.log("登录失败:" + json["reason"]);
	                    $scope.modalLogin.hide();
	                    // 如果是后台登录，在接收到登录失败后，需要弹出这个对话框给用户
	                    if($scope.loginbackground){
	                        $rootScope.showTabs = true;
	                        $scope.modalLogin.show();
	                        $scope.loginbackground = false;
	                    }
	                    else{
	                        // 清除用户信息
	                        JSCache.remove(Constants.YHCache.loginInfo);
	                        // 关闭用户正在登录提示框
	                        $scope.isLoading = false;
	                        // 验证码为空
	                        $scope.user.captcha = "";
	                        // 用户名获得焦点
	
	                        // 提示用户登录失败
	                        var m = 3;
	                        $scope.LoginFailedPrompt=true;
	                        $scope.promptTime = $interval(function () {
	                            m--;
	                            if (m <= 0) {
	                                $interval.cancel($scope.promptTime);
	                                $scope.LoginFailedPrompt=false;
	                            }
	                        }, 1000);
	                    }
	                }
	            }
	            if(what == Constants.YHWhat.app.network.down){
	                console.log("网络已经断开");
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_SEND_CAPTCHA) {
	                // 获取验证码的回复
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 成功
	                    console.log("获取验证码成功!");
	                }
	                else {
	                    // 失败
	                    console.log("获取验证码失败:" + json["reason"]);
	
	                }
	            }
	            else if (what == Constants.YHWhat.app.sendToolPage) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 成功
	                    console.log("成功!");
	                }
	                else {
	                    // 失败
	                    console.log("失败:" + json["reason"]);
	
	                }
	            }
	            else if (what == Constants.YHWhat.rongcloud.totalContacts) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 成功
	                    var totalMessges=json.data;
	                    console.log("消息总数~~",totalMessges[0]);
	                    if(totalMessges[0]==0){
	                        $scope.isShowNoReadMessage = false;
	                    }else {
	                        $scope.isShowNoReadMessage = true;
	                    }
	                    if(totalMessges[0]>99){
	                        $scope.NoReadMessageNum='99﹢'
	                    }
	                    else{
	                        $scope.NoReadMessageNum=totalMessges[0];
	                    }
	                }
	                else {
	                    // 失败
	                    console.log("失败:" + json["reason"]);
	
	                }
	            }
	
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	/*    $rootScope.$on('YHUserInfoMessages', function (event, json) {
	        try{
	            $scope.$broadcast('YHUserInfoMessages', json);
	        }
	        catch(error){
	        }
	        console.log("!!!!!!!!!!!!!!!",json);
	    });*/
	    $scope.isShowNoReadMessage = false;
	    JSCommand.rongcloud.getTotalContacts();
	
	    $scope.newFriendCount = 0;
	    $scope.updateNewFriendCount = function(){
	        console.log("update my friend count...");
	        var myself = JSCache.get(Constants.YHCache.loginInfo);
	        if(myself){
	            $scope.newFriendCount = myself.friendApplyCount;
	        }
	
	        console.log("update my friend count:",  $scope.newFriendCount);
	    };
	    $scope.updateNewFriendCount();
	
	    $scope.hasNewFriend = function(){
	        return !($scope.newFriendCount == 0);
	    };
	
	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	
	        console.log("change state from " + fromState.name + " to " + toState.name);
	
	        $scope.toState = toState;
	        $scope.toParams = toParams;
	        $scope.fromState = fromState;
	        $scope.fromParams = fromParams;
	
	        // 如果是修车宝页面，则不需要登录
	        if (toState.data && toState.data.didNotNeedLogin) {
	            // 参考tab.tool/index.js
	            var title = "tab.tool";
	            if(toState.title){
	                title = toState.title;
	            }
	            JSCommand.app.sendToolPage(0, title);
	            console.log('这是跳转到修车宝的页面，不需要登录。');
	
	        } else {
	            if(toState.title){
	                JSCommand.app.sendToolPage(0, toState.title);
	            }
	            else{
	                JSCommand.app.sendToolPage(1, '');
	            }
	
	            console.log('需要登录');
	            var isLogin = JSCache.get(Constants.YHCache.loginInfo);
	            if (!isLogin) {
	
	                console.log('但是没有登录');
	
	                event.preventDefault();
	
	                var backgroudUserName = JSCache.get(Constants.YHCache.userName);
	                console.log("backgroudUserName is " + backgroudUserName);
	                if(JSUtils.validString(backgroudUserName)){
	
	                    console.log("login with username...");
	                    JSCommand.ccdp.login(backgroudUserName, '');
	                    $scope.loginbackground = true;
	                }
	                else{
	                    console.log("show login dialog...");
	                    $scope.loginbackground = false;
	                    $rootScope.showTabs = true;
	                    $scope.modalLogin.show();
	                }
	            }
	            else {
	                console.log('且已经登陆');
	            }
	        }
	    });
	
	
	    // dead code for test, you should delete when you publish this apk
	    // login
	     /*$scope.user.username = '15296576299';
	     $scope.user.captcha = '8888';*/
	    /*$scope.user.username = '13737725200';
	    $scope.user.captcha = '1111';*/
	    $scope.login = function () {
	
	        // 开始登录
	        var username = $scope.user.username;
	        var captcha = $scope.user.captcha;
	        JSCommand.ccdp.login(username, captcha);
	
	        // 提示用户正在登录
	        $scope.isLoading = true;
	        
	        // 这里需要把原来的登录数据清掉
	        JSCache.remove(Constants.YHCache.loginInfo);
	    };
	
	    //请求验证码接口
	    $scope.requestCaptcha = function () {
	        document.getElementById('J-buttonCalm').innerHTML = '';
	
	        // 通知服务器再次发送验证码
	        JSCommand.ccdp.sendVerificationCode($scope.user.username);
	
	        // 更新重新发送验证码的时间间隔
	        $scope.countdown = 60;
	        $scope.myTime = $interval(function () {
	            $scope.countdown--;
	            if ($scope.countdown <= 0) {
	                $interval.cancel($scope.myTime);
	                document.getElementById('J-buttonCalm').innerHTML = '发送验证码';
	            }
	        }, 1000);
	
	    };
	
	
	    $scope.modalLogin = $ionicModal.fromTemplate(__webpack_require__(78), {
	        scope: $scope,
	        animation: 'slide-in-up'
	    });
	
	    $scope.modalLicense = $ionicModal.fromTemplate(__webpack_require__(79), {
	        scope: $scope,
	        animation: 'slide-in-up'
	    });
	
	    $scope.openLicense = function () {
	        $scope.modalLicense.show();
	    };
	
	    $scope.backFromLicense = function () {
	        $scope.modalLicense.hide();
	    };
	
	    $scope.closeModal = function () {
	        console.log("close login modal...");
	        $scope.modalLogin.hide().then(function () {
	            // $state.go("tab.tool");
	            // $scope.modalLogin.remove();
	            $ionicTabsDelegate.$getByHandle('my-handle').select(0);
	        });
	    };
	
	    $scope.returnCircle = function () {
	        $ionicHistory.clearHistory();
	        $state.go('tab.circle.friends');
	    };
	
	    function valiUserName () {
	        if (angular.isDefined($scope.user.username)) {
	            if($scope.user.username.length < 12){
	                $scope.flag = false;
	                var regex = /^[0-9]*$/;  // ^[0-9]*$
	                if(!regex.test($scope.user.username)){
	                    $scope.user.username = $scope.user.username.replace(/[^\d]/g,'')
	                }
	                if($scope.user.username.length == 11){
	                    var regex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	                    $scope.flag = !!regex.test($scope.user.username);
	                }
	            }
	
	        }
	    }
	
	    // 对手机号码进行监控，使之必须符合手机号码格式
	    $scope.$watch('user.username', function () {
	        //正确获取字符串长度
	        if (typeof $scope.user.username != "string"){
	            $scope.user.username += "";
	        }
	        console.log('$user.userName',$scope.user.username.length);
	        valiUserName ();
	    }, true);
	
	
	    // 对验证码进行监控，使之必须符合数字要求格式
	    $scope.$watch('user.captcha', function () {
	
	        if (angular.isDefined($scope.user.captcha)) {
	            if($scope.user.captcha.length < 5){
	                $scope.captchaFlag = false;
	                var regex = /^[0-9]*$/;  // ^[0-9]*$
	                if(!regex.test($scope.user.captcha)){
	                    $scope.user.captcha = $scope.user.captcha.replace(/[^\d]/g,'')
	                }
	                if($scope.user.captcha.length  == 4){
	                    var regex = /^\d{4}$/;
	                    $scope.captchaFlag = !!regex.test($scope.user.captcha);
	                }
	            }
	        }
	    });
	
	    $scope.beAbleToRequestCaptcha = function (countdown) {
	
	        return !(!$scope.flag == true || countdown > 0)
	
	    };
	
	    $scope.beAbleToLogin = function () {
	
	        var username = $scope.user.username;
	        var captcha = $scope.user.captcha;
	        var isAccepted = $scope.user.acceptLicense;
	
	        return (_.isBoolean(isAccepted) && isAccepted) &&
	            (_.isString(username) && username.trim().length > 0) &&
	            (_.isString(captcha) && captcha.trim().length > 0);
	    };
	
	    $scope.beErrorMessage = function () {
	        var username = $scope.user.username;
	        return (_.isString(username) && username.trim().length > 0);
	    };
	
	
	    //监听是否是主页面 通知Android;
	    $rootScope.$watch('showTabs', function (newValue) {
	        if (newValue) {
	            JSCommand.app.homePageAuthorizationNotice();
	        } else if (!newValue) {
	            JSCommand.app.subPageFrameAuthorizationNotice();
	        }
	    }, true);
	
	    $rootScope.$watch('showTabs', function (newValue) {
	        if (newValue) {
	            JSCommand.app.homePageAuthorizationNotice();
	        } else if (!newValue) {
	            JSCommand.app.subPageFrameAuthorizationNotice();
	        }
	    }, true);
	
	    $scope.safeApply = function(fn) {
	        var phase = this.$root.$$phase;
	        if (phase == '$apply' || phase == '$digest') {
	            if (fn && (typeof(fn) === 'function')) {
	                fn();
	            }
	        } else {
	            this.$apply(fn);
	        }
	    };
	
	    $rootScope.$on('YHNewFriend', function (event, json) {
	        console.log("receive the broadcast message YHNewFriend.");
	        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
	        if(countNewFriends){
	            $scope.safeApply(function(){
	                $scope.newFriendCount = countNewFriends.friendApplyCount;
	                console.log("apply new friends count to parameter: ", $scope.newFriendCount);
	            });
	        }
	    });
	};
	
	Main.$inject = [
	    '$scope',
	    '$rootScope',
	    '$state',
	    '$timeout',
	    '$ionicModal',
	    '$interval',
	    '$ionicTabsDelegate',
	    '$cookies',
	    '$ionicNavBarDelegate',
	    '$ionicHistory',
	    '$ionicPopup',
	    'FriendRelationManager',
	    'Constants',
	    'JSCache',
	    'JSCommand',
	    'JSUtils'
	];
	
	module.exports = Main;

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button\" ng-click=\"closeModal()\">\r\n                <i class=\"iconfont icon-close\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">一键登录</h1>\r\n    </ion-header-bar>\r\n    <ion-content class=\"has-header scroll-bg-color\">\r\n\r\n        <!--<div class=\"one-click-hand\">\r\n            <img src=\"img/one-login.jpg\">\r\n        </div>-->\r\n\r\n        <div>\r\n            <div class=\"one-click-input\">\r\n                <div style=\"width:100%;height: 135px;\">\r\n                    <input class=\"one-click-input-mobile full\"\r\n                           type=\"text\"\r\n                           placeholder=\"手机号（限中国大陆）\"\r\n                           ng-model=\"user.username\"\r\n                           maxlength=\"11\">\r\n                    <span class=\"mobile-error-message \" ng-if=\"!flag\">请输入正确的手机号码</span>\r\n                    <input class=\"one-click-input-mobile half-width one-code-distances\"\r\n                           type=\"text\"\r\n                           placeholder=\"验证码\"\r\n                           ng-model=\"user.captcha\"\r\n                           maxlength=\"4\"\r\n                           required>\r\n\r\n                    <button class=\"button button-positive one-code-button-calm\"\r\n                            ng-disabled=\" !beAbleToRequestCaptcha(countdown) \" id=\"J-buttonCalm\" ng-click=\"requestCaptcha(element)\">发送验证码\r\n                    </button>\r\n\r\n                    <span class=\"code-prompt-text\" ng-if=\"countdown>0\">{{countdown}}秒</span>\r\n                    <span class=\"cod-error-message error-message-color\"\r\n                                    ng-show=\"!captchaFlag || !flag || iscaptchaError && captcha.length==4\">请输入正确的四位纯数字验证码</span>\r\n                    <!--<span class=\"cod-error-message error-message-color\"\r\n                          ng-show=\"iscaptchaError && user.captcha.length==4\">请输入正确的验证码</span>-->\r\n                </div>\r\n\r\n                <button class=\"button button-energized one-code-button-login\"\r\n                        ng-class=\"{ 'disabled':  !beAbleToLogin() }\" ng-click=\"login()\">登录\r\n                </button>\r\n\r\n                <div class=\"one-click-checkbox\">\r\n                    <label>\r\n                        <input name=\"Fruit\" type=\"checkbox\" value=\"true\" ng-model=\"user.acceptLicense\"\r\n                               ng-checked=\"user.acceptLicense\"/>\r\n                        <span class=\"one-click-agr\">阅读并同意</span>\r\n                    </label>\r\n                    <a class=\"one-click-other-clo\" ng-click=\"openLicense()\">软件许可与服务协议</a>\r\n                </div>\r\n\r\n                <!--//Loading加载-->\r\n                <div class=\"spinner\" ng-show=\"isLoading\">\r\n                    <div class=\"spinner-container container1\">\r\n                        <div class=\"circle1\"></div>\r\n                        <div class=\"circle2\"></div>\r\n                        <div class=\"circle3\"></div>\r\n                        <div class=\"circle4\"></div>\r\n                    </div>\r\n                    <div class=\"spinner-container container2\">\r\n                        <div class=\"circle1\"></div>\r\n                        <div class=\"circle2\"></div>\r\n                        <div class=\"circle3\"></div>\r\n                        <div class=\"circle4\"></div>\r\n                    </div>\r\n                    <div class=\"spinner-container container3\">\r\n                        <div class=\"circle1\"></div>\r\n                        <div class=\"circle2\"></div>\r\n                        <div class=\"circle3\"></div>\r\n                        <div class=\"circle4\"></div>\r\n                    </div>\r\n                </div>\r\n                <!--登录失败提示框-->\r\n                <div class=\"index-Loading\" ng-show=\"LoginFailedPrompt\">\r\n                    <p> 登录失败</p>\r\n                </div>\r\n                <!--//Loading====end-->\r\n            </div>\r\n        </div>\r\n\r\n\r\n    </ion-content>\r\n</ion-modal-view>"

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <button class=\"button button-icon\" ng-click=\"backFromLicense()\">返回</button>\r\n        <h1 class=\"title\">软件许可与服务协议</h1>\r\n    </ion-header-bar>\r\n    <ion-content class=\"has-header scroll-bg-color\">\r\n        <p class=\"agreement-text\">\r\n            软件许可与服务协议具体内容.软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容\r\n        </p>\r\n        <p class=\"agreement-text\">\r\n            软件许可与服务协议具体内容.软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容软件许可与服务协议具体内容\r\n        </p>\r\n    </ion-content>\r\n</ion-modal-view>"

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/6/30.
	 */
	
	module.exports = angular.module('app.tool', ['ngMessages', __webpack_require__(6).name])
	
	
	    .config([
	        '$stateProvider',
	        function ($stateProvider) {
	            $stateProvider
	
	                .state('tab.tool', {
	                    url: '/tool',
	                    data: {
	                        didNotNeedLogin: true,
	                        showTabs: true
	                    },
	                    title : 'tab.tool',
	                    // cache : false, // 如果不注释掉这个参数，在弹出登录对话框后，这个页面的缓存将清掉，但是这是首页，如果清掉这个缓存将导致页面无法载入的后果
	                    views: {
	                        'tab-tool': {
	                            template: __webpack_require__(81),
	                            controller: 'IndexCtrl'
	                        }
	                    }
	                })
	
	                .state('tab.tool-active', {
	                    url: '/tool/active:equipmentId',
	                    views: {
	                        'tab-tool': {
	                            template: __webpack_require__(82),
	                            controller: 'ActiveCtrl'
	                        }
	                    }
	                });
	        }
	    ])
	    .controller('IndexCtrl', __webpack_require__(83))
	    .controller('ActiveCtrl', [
	        '$scope',
	        '$ionicModal',
	        'JSCommand',
	        '$stateParams',
	        'JSCache',
	        __webpack_require__(84)
	    ])
	    /*验证汉字指令*/
	    .directive('checkName', [function () {
	        return {
	            require: 'ngModel',
	            link: function (scope, element, attrs, ngModel) {
	                ngModel.$parsers.push(function (value) {
	                    if (/[\u4E00-\u9FA5]/g.test(value)) {
	                        ngModel.$setValidity('evenNum', true);
	                        return value;
	                    } else {
	                        ngModel.$setValidity('evenNum', false);
	                        return value;
	                    }
	                });
	            }
	        }
	    }])
	
	    /*验证联系方式*/
	    .directive('contactInformation', [function () {
	        return {
	            require: 'ngModel',
	            link: function (scope, element, attrs, ngModel) {
	                ngModel.$parsers.push(function (value) {
	                    var fixedTelephone = value.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
	                    var mobilePhone = value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	                    if (fixedTelephone != null || mobilePhone != null) {
	                        ngModel.$setValidity('Contact', true);
	                        return value;
	                    } else {
	                        ngModel.$setValidity('Contact', false);
	                        return value;
	                    }
	
	                });
	            }
	        }
	    }])
	    /*验证腾讯QQ格式*/
	    .directive('qciqFormat', [function () {
	        return {
	            require: 'ngModel',
	            link: function (scope, element, attrs, ngModel) {
	                ngModel.$parsers.push(function (value) {
	                    // var check =value.match(/^[1-9]d{4,8}$/);
	                    var reg = /^[1-9][0-9]{4,9}$/;
	                    var qq_Flag = reg.test(value);
	                    console.log(qq_Flag);
	                    if (qq_Flag) {
	                        ngModel.$setValidity('Format', true);
	                        return value;
	                    } else {
	                        ngModel.$setValidity('Format', false);
	                        return value;
	                    }
	                });
	            }
	        }
	    }])
	
	    //验证只能输入字母,下划线,数字 ,中文
	    .directive('checkGroupName', function () {
	        return {
	            require: 'ngModel',
	            link: function (scope, element, attrs, ngModel) {
	                ngModel.$parsers.push(function (value) {
	                    var reg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,20}$/;
	                    var groupName_Flag = reg.test(value);
	
	                    if (groupName_Flag) {
	                        ngModel.$setValidity('groupName', true);
	                        return value;
	                    } else {
	                        ngModel.$setValidity('groupName', false);
	                        {
	                            return value;
	                        }
	                    }
	                })
	            }
	        }
	    })
	;

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = "<!--<div class=\"bar-index-nav\"></div>-->\r\n\r\n<ion-view view-title=\"修车宝\" index-font-size> <!--修车宝 -->\r\n    <ion-nav-buttons side=\"left\">\r\n        <a class=\"button button-icon\"  ng-click=\"clickCCDPBusinessSystemSetting()\">\r\n            <i class=\"iconfont icon-set-line menu-size\"></i>\r\n        </a>\r\n    </ion-nav-buttons>\r\n    <ion-nav-buttons side=\"right\">\r\n        <a class=\"button button-icon\" ng-click=\"clickLinkSet()\">\r\n            <i class=\"iconfont icon-link menu-size\" ng-show=\"wifiSettingStatus==0 && DevSettingStatus==0\"></i>\r\n            <i class=\"iconfont icon-unlink menu-size\" ng-show=\"wifiSettingStatus==1 || DevSettingStatus==1\"></i>\r\n        </a>\r\n    </ion-nav-buttons>\r\n    <div id=\"mainPages\"></div>\r\n<div class=\"tipbox\" ng-show=\"isActive\">\r\n    <div class=\"tipbox-content\">\r\n        <span class=\"tipbox-span\">感谢您对我们的信赖，首次使用修车宝需要激活!</span>\r\n        <button class=\"tipbox-button\">\r\n            <a class=\"tipbox-back-text\" ng-click=\"goToActive()\">前往激活</a>\r\n            <i class=\"ion-chevron-right\"></i>\r\n        </button>\r\n    </div>\r\n</div>\r\n<script>\r\n\r\n</script>\r\n"

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"激活修车宝\">\r\n    <ion-content class=\"car-padding-top scroll-content ionic-scroll  has-header has-tabs\">\r\n        <div class=\"activate-text activate-text-color\" >\r\n            <p>\r\n                请认真填写您的真实信息，当您的设备出现问题时，这些信息能帮助我们及时与您取得联系。\r\n            </p>\r\n        </div>\r\n        <form name=\"activeForm\" novalidate ng-submit=\"sigupForm(activeForm.$error)\">\r\n            <div>\r\n                <div class=\"activate-table-id\">\r\n                    <span class=\"activate-title-name activate-left-style activate-text-color\">姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>\r\n\r\n                    <div class=\"activate-right-style\">\r\n                        <label class=\"item item-input activate-input-border activate-input90\">\r\n                            <input  check-name class=\"\" type=\"text\" placeholder=\"1-4个中文\" ng-model=\"active.name\" ng-maxlength=\"4\" ng-minlength=\"1\" required name=\"name\"/>\r\n                        </label>\r\n                        <font class=\"activate-red\">*</font>\r\n                    </div>\r\n                    <div class=\"error\" ng-messages=\"activeForm.name.$error\" ng-if=\"isShowFormError\">\r\n                        <div ng-message=\"required\">请输入姓名</div>\r\n                        <div ng-message=\"evenNum\">姓名限中文格式</div>\r\n                        <div ng-message=\"minlength\">姓名字符太短(大于1位或小于4位)</div>\r\n                        <div ng-message=\"maxlength\">姓名字符太长(大于1位或小于4位)</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"activate-table-id\">\r\n                    <span class=\"activate-title-name activate-left-style activate-text-color\">地&nbsp;&nbsp;&nbsp;&nbsp;址：</span>\r\n\r\n                    <div class=\"activate-right-style\">\r\n                        <label class=\"item item-input activate-input-border activate-input90\">\r\n                            <input  class=\"\" type=\"text\" placeholder=\"最多40个字\" ng-model=\"active.address\" ng-maxlength=\"40\" required name=\"address\"/>\r\n                        </label>\r\n                        <font class=\"activate-red\">*</font>\r\n                    </div>\r\n                    <div class=\"error\" ng-messages=\"activeForm.address.$error\" ng-if=\"isShowFormError\">\r\n                        <div ng-message=\"required\">请输入地址</div>\r\n                        <div ng-message=\"maxlength\">地址字符太长(小于40位)</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"activate-table-id\">\r\n                    <span class=\"activate-title-name activate-left-style activate-text-color\"> 联系方式：</span>\r\n\r\n                    <div class=\"activate-right-style\">\r\n                        <label class=\"item item-input activate-input-border activate-input90\">\r\n                            <input contact-information  class=\"\" type=\"text\" placeholder=\"输入有效的固定电话或手机号码\" ng-model=\"active.mobilePhone\" required name=\"mobilephone\"/>\r\n                        </label>\r\n                        <font class=\"activate-red\">*</font>\r\n                    </div>\r\n                    <div class=\"error\" ng-messages=\"activeForm.mobilephone.$error\" ng-if=\"isShowFormError\">\r\n                        <div ng-message=\"required\">请输入联系方式</div>\r\n                        <div ng-message=\"Contact\">固定电话或者手机号码格式不正确</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"activate-table-id\">\r\n                    <span class=\"activate-title-name activate-left-style activate-text-color\">公司名称：</span>\r\n\r\n                    <div class=\"activate-right-style\">\r\n                        <label class=\"item item-input activate-input-border activate-input90\">\r\n                            <input  class=\"\" type=\"text\" placeholder=\"最多40个中文\" ng-model=\"active.companyName\" ng-maxlength=\"40\" required name=\"company\"/>\r\n                        </label>\r\n                        <font class=\"activate-red\">*</font>\r\n                    </div>\r\n                    <div class=\"error\" ng-messages=\"activeForm.company.$error\" ng-if=\"isShowFormError\">\r\n                        <div ng-message=\"required\">请输入公司名称</div>\r\n                        <div ng-message=\"maxlength\">公司名称字符太长(小于40位)</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"activate-table-id\">\r\n                    <span class=\"activate-title-name activate-left-style activate-text-color\">Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q：</span>\r\n\r\n                    <div class=\"activate-right-style\">\r\n                        <label class=\"item item-input activate-input-border activate-input90\">\r\n                            <input qciq-format type=\"text\" placeholder=\"4-11位数字，不能以0开头\" name=\"Oicq\"  ng-model=\"active.qicq\"/>\r\n                        </label>\r\n                    </div>\r\n                    <div class=\"error\" ng-messages=\"activeForm.Oicq.$error\">\r\n                        <div ng-message=\"Format\">QQ格式不正确</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <input class=\"button button-padding button-block button-blue-color car-text-color\" type=\"submit\" value=\"提交\"/>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/6/30.
	 */
	
	var _ = __webpack_require__(5);
	
	var IndexCtrl = function ($scope,
	                          $state,
	                          $ionicPopup,
	                          $rootScope,
	                          Constants,
	                          JSCache,
	                          JSCommand,
	                          base64) {
	
	    console.log("enter the ccdp main page...");
	    $scope.wifiSettingStatus = '';
	    $scope.DevSettingStatus = '';
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json.what;
	            if (what == Constants.YHWhat.app.loadIndexPage) {
	                console.log("got the index index page data...");
	                var encrypt = json.data;
	                //var encrypt = $scope.encryp_mock;
	                var html = "";
	                try {
	                    html = base64.decode(encrypt);
	                }
	                catch (e) {
	                    console.log("base 64 decode error:", e);
	                }
	
	                document.getElementById("mainPages").innerHTML = html;
	
	                setTimeout(function () {
	                    var navTab = document.getElementById('index_page_first_ccdp');
	                    var navTab_childNode = navTab != null ? navTab.getElementsByTagName('li') : [];
	                    var contents = document.getElementsByClassName('index-list');
	                    var contentsBox = contents[0].parentNode;
	
	                    //给所有标签页添加下标；
	                    for (var i = 0; i < navTab_childNode.length; i++) {
	                        navTab_childNode[i].index = i;
	                        contents[i].index = i;
	                    }
	                    bindClick();
	                    bindSlide();
	                    //tabNav点击事件
	                    function bindClick() {
	                        for (var i = 0; i < navTab_childNode.length; i++) {
	                            navTab_childNode[i].childNodes[1].onclick = function (el) {
	                                var curTarget = el.target.parentNode; //当前标签 curTarget == ‘li’
	                                //先清除class 'on'
	                                for (var k = 0; k < navTab_childNode.length; k++) {
	                                    navTab_childNode[k].className = "";
	                                }
	
	                                //当前元素添加class ‘on’
	                                navTab_childNode[curTarget.index].className = "on";
	
	                                //先清除class 'on'
	                                for (var j = 0; j < contents.length; j++) {
	                                    contents[j].style.display = 'none';
	                                }
	
	                                if (contents[curTarget.index])contents[curTarget.index].style.display = 'block';
	                            };
	                        }
	                    }
	
	                    /*addHandler(document, move, function (e) {
	                     var ev = 'ontouchmove' in document ? e.touches[0] : e;
	                     var x = ev.pageX; // 这样就能在PC 和 手机上都拿到坐标值了
	                     console.log(x);
	                     });*/
	
	
	                    //左右滑动会影响到滚动条，所以先不开放
	                   /* function bindSlide() {
	                        var downX = 0;
	                        var upX = 0;
	                        var moveX = 0;
	                        var tabIndex;
	
	                        //兼容 PC端鼠标事件 和 手机端触屏事件；
	                        var addHandler = function (element, type, handler) {
	                            if (element.addEventListener) {
	                                element.addEventListener(type, handler, false);
	                            } else if (element.attachEvent) {
	                                element.attachEvent("on" + type, handler);
	                            } else {
	                                element["on" + type] = handler;
	                            }
	                        };
	
	                        var move = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
	                        var down = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
	                        var up = 'ontouchend' in document ? 'touchend' : 'mouseup';
	
	                        addHandler(contentsBox, down, function (event) {
	                            event.preventDefault();             //解决touchmove只运行一次的问题
	                            var ev = 'ontouchstart' in document ? event.touches[0] : event;
	                            downX = ev.pageX;
	                            //console.log('down',downX);
	                            for (var i = 0; i < this.children.length; i++) {
	                                if (this.children[i].style.display !== 'none') {
	                                    tabIndex = i;
	                                }
	                            }
	                            console.log(this, tabIndex);
	
	                            //当按下事件触发time毫秒，自动触发停止事件
	                            setTimeout(function () {
	                                console.log('时间到了');
	                                contentsBox.removeEventListener('touchmove');
	                                contentsBox.removeEventListener('touchend');
	                            }, 1000);
	                        });
	
	                        addHandler(contentsBox, up, function (event) {
	                            var ev = 'ontouchend' in document ? (event.touches[0] ? event.touches[0] : event.changedTouches[0]) : event;
	                            upX = ev.pageX;
	                            //console.log('up',upX);
	                            if (upX - downX >= this.offsetWidth * 0.15) {
	                                console.log('向右划了', upX - downX);
	                                //todo  内容窗体应该向右移动,下标做减法
	
	                                slideRight(tabIndex);
	                                this.removeEventListener('touchmove');
	                                this.removeEventListener('touchend');
	                            }
	                            if (downX - upX >= this.offsetWidth * 0.15) {
	                                console.log('向左划了', downX - upX);
	                                //todo 内容窗体应该向左移动,下标做加法
	
	                                slideLeft(tabIndex);
	                                this.removeEventListener('touchmove');
	                                this.removeEventListener('touchend');
	                            }
	                        });
	
	                        addHandler(contentsBox, move, function (event) {
	                            var ev = 'ontouchmove' in document ? event.touches[0] : event;
	                            moveX = ev.pageX;
	                            //console.log('move',moveX);
	                            if (moveX >= this.offsetWidth - this.offsetWidth * 0.05 || moveX <= this.offsetWidth * 0.05) {
	                                if (moveX - downX >= this.offsetWidth * 0.15) {
	                                    console.log("向右滑动了20%,并且超出了屏幕");
	                                    //todo  内容窗体应该向右移动,下标做减法
	
	                                    slideRight(tabIndex);
	                                    this.removeEventListener('touchmove');
	                                    this.removeEventListener('touchend');
	
	                                }
	                                if (downX - moveX >= this.offsetWidth * 0.15) {
	                                    console.log("向左滑动了20%,并且超出了屏幕");
	                                    //todo 内容窗体应该向左移动,下标做加法
	
	                                    slideLeft(tabIndex);
	                                    this.removeEventListener('touchmove');
	                                    this.removeEventListener('touchend');
	                                }
	
	                            }
	
	                        });
	
	                        function slideLeft(index) {
	                            var tabIndex = index;
	                            if (tabIndex == contents.length - 1) {
	                                //tabIndex = -1;        //循环滑动
	                                return;                 //非循环
	                            }
	                            for (var i = 0; i < contents.length; i++) {
	                                contents[i].style.display = 'none';
	                                navTab_childNode[i].className = "";
	
	                            }
	
	                            var tempElem = contents[++tabIndex];
	                            var val = 0;
	                            tempElem.style.opacity = val / 100;
	                            tempElem.style.display = 'block';
	
	                            var timer = setInterval(function () {
	                                val += 20;
	                                tempElem.style.opacity = val / 100;
	                                if (val >= 100) {
	                                    val = 0;
	                                    clearInterval(timer);
	                                }
	                            }, 50);
	
	                            //contents[++tabIndex].style.display = 'block';
	                            navTab_childNode[tabIndex].className = "on";
	
	                        }
	
	                        function slideRight(index) {
	                            var tabIndex = index;
	                            if (tabIndex == 0) {
	                                //tabIndex = contents.length;               //循环滑动
	                                return;                                     //非循环
	                            }
	                            for (var i = 0; i < contents.length; i++) {
	                                contents[i].style.display = 'none';
	                                navTab_childNode[i].className = "";
	                            }
	
	                            var tempElem = contents[--tabIndex];
	                            var val = 0;
	                            tempElem.style.opacity = val / 100;
	                            tempElem.style.display = 'block';
	                            var timer = setInterval(function () {
	                                val += 20;
	                                tempElem.style.opacity = val / 100;
	                                if (val >= 100) {
	                                    val = 0;
	                                    clearInterval(timer);
	                                }
	                            }, 50);
	
	                            //contents[--tabIndex].style.display = 'block';
	                            navTab_childNode[tabIndex].className = "on";
	
	                        }
	
	                    }*/
	
	
	                }, 50);
	
	
	            }
	            else if (what === Constants.YHWhat.app.settingNetCont) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	                    $scope.$apply(function () {
	                        $scope.wifiSettingStatus = json.data;
	                    });
	                    console.log('wifi连接状态:', $scope.wifiSettingStatus);
	                }
	            }
	            else if (what === Constants.YHWhat.app.SettingDevCont) {
	                $scope.$apply(function () {
	                    $scope.DevSettingStatus = json.data;
	                });
	
	                console.log('设备连接状态:', $scope.DevSettingStatus);
	            }
	            else if (what === Constants.YHWhat.app.CCDPBusinessSystemSetting) {
	
	            }
	            else if (what === Constants.YHWhat.app.CCDPBusinessCheckDevConnect) {
	                //$scope.DevSettingStatus = json;
	
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_PUSH_FRIENDRELATION) {
	                //监听添加好友
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    console.log("json.data", json.data.msgs[0].value.user.relation);
	                    if (json.data.msgs[0].value.user.relation === 1) {
	                        $scope.countNewFirends = JSCache.get(Constants.YHCache.loginInfo);
	                        if ($scope.countNewFirends.friendApplyCount > 99) {
	                            $scope.countNewFirends.friendApplyCount = '99﹢';
	                        } else {
	                            $scope.countNewFirends.friendApplyCount = $scope.countNewFirends.friendApplyCount + 1;
	                        }
	                        JSCache.put(Constants.YHCache.loginInfo, $scope.countNewFirends);
	                        //$rootScope.$broadcast('YHUserInfoMessages', $scope.countNewFirends);
	                    }
	
	
	                }
	                else {
	                    // 失败
	                    console.log("失败:" + json["reason"]);
	
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	    JSCommand.ccdp.getNewFriendTotal();
	    /* JSCommand.app.getSettingNetCont();
	     JSCommand.app.getSettingDevCont();*/
	    $scope.clickLinkSet = function () {
	        JSCommand.app.getCCDPBusinessCheckDevConnect();
	    };
	    $scope.loadIndexPage = function () {
	        //$http({
	        //    method: 'get',
	        //    url: '/pages/Index.html',
	        //    data: "",  // pass in data as strings
	        //    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	        //}).success(function (data) {
	        //    document.getElementById("mainPages").innerHTML = data;
	        //});
	        JSCommand.app.loadIndexPage();
	
	        /*console.log("start to load index page...");
	         var msg = {};
	         msg["what"] = Constants.YHWhat.app.loadIndexPage;
	         var html = "";
	         var data = base64.encode(html);
	         msg["data"] = data;
	         var sMessage = JSON.stringify(msg);
	         window.YHAndroidToJs.sendToJS(sMessage);*/
	    };
	    $scope.loadIndexPage();
	
	    var equipmentID1 = "24001D000D00E1005ACD000001AAE811";  //已激活
	    var equipmentID2 = "24001D000D00E1005ACD000001AAE807";  //黑名单
	    var equipmentID3 = "24001D000D00E1005ACD000001AAE805";  //入库未确认
	    var equipmentID4 = "24001D000D00E1005ACD000001AAE803";  //已销售
	
	    $scope.goToActive = function () {
	        $state.go('tab.tool-active', {equipmentId: equipmentID1});
	    };
	
	    $scope.conversationItemList = Constants.rongCloud.ConversationType;
	
	    $scope.form = {
	        conversationType: Constants.rongCloud.ConversationType.PRIVATE,
	        targetId: 13,
	        text: 'Hello World'
	    };
	
	    $scope.sendMessage = function () {
	
	        console.log($scope.form);
	
	        var conversationType = parseInt($scope.form.conversationType, 10);
	        var targetId = $scope.form.targetId;
	        var content = $scope.form.text;
	        var pushContent = '';
	        var pushData = '';
	
	        JSCommand.sendMessage(conversationType, targetId, content, pushContent, pushData, {
	            // 发送消息成功
	            onSuccess: function () {
	                console.log('sendMessage success');
	            },
	            onError: function (errorCode) {
	
	                console.log('onError: ', arguments);
	
	                var info = '';
	                switch (errorCode) {
	                    case RongIMClient.callback.ErrorCode.TIMEOUT:
	                        info = '超时';
	                        break;
	                    case RongIMClient.callback.ErrorCode.UNKNOWN_ERROR:
	                        info = '未知错误';
	                        break;
	                    case RongIMClient.SendErrorStatus.REJECTED_BY_BLACKLIST:
	                        info = '在黑名单中，无法向对方发送消息';
	                        break;
	                    case RongIMClient.SendErrorStatus.NOT_IN_DISCUSSION:
	                        info = '不在讨论组中';
	                        break;
	                    case RongIMClient.SendErrorStatus.NOT_IN_GROUP:
	                        info = '不在群组中';
	                        break;
	                    case RongIMClient.SendErrorStatus.NOT_IN_CHATROOM:
	                        info = '不在聊天室中';
	                        break;
	                    default :
	                        info = x;
	                        break;
	                }
	
	                console.log('发送失败:' + info);
	            }
	        }, {
	            onSuccess: function () {
	                console.log('resultCallback onSuccess');
	            },
	            onError: function (errorCode) {
	                console.log('resultCallback onError: ', arguments);
	            }
	        });
	    };
	
	    $scope.getConversationList = function () {
	        JSCommand.getConversationList({
	            onSuccess: function (conversationList) {
	                console.log('conversationList: ', conversationList);
	
	                _.forEach(conversationList, function (conversation) {
	                    JSCommand.getHistoryMessages(Constants.rongCloud.ConversationType[conversation.conversationType], conversation.targetId, conversation.latestMessageId, 50, {
	                        onSuccess: function (messageList) {
	                            console.log('getHistoryMessages:', conversation.conversationType, ':', conversation.targetId, ' ', messageList);
	                        },
	
	
	                        onError: function (errorCode) {
	
	                        }
	                    });
	                });
	                debugger;
	            },
	
	            onError: function (errorCode) {
	
	            }
	        });
	    };
	
	    $scope.clearConversations = function () {
	        JSCommand.clearConversations({
	            onSuccess: function (isSuccess) {
	                console.log('clearConversations: ', isSuccess);
	            },
	
	            onError: function (errorCode) {
	
	            }
	        }, Constants.rongCloud.ConversationType.CHATROOM, Constants.rongCloud.ConversationType.GROUP);
	    };
	
	    $scope.startRecord = function () {
	        console.log('startRecord');
	        RecordService.startRecord();
	    };
	
	    $scope.stopRecord = function () {
	        console.log('stopRecord');
	        RecordService.stopRecord({
	            onSuccess: function (voiceEntity) {
	                console.log('stopRecord onSuccess: ', voiceEntity);
	            },
	
	            onError: function () {
	                console.log('stopRecord onError');
	            }
	        });
	    };
	
	
	    $scope.playVoice = function () {
	        console.log('playVoice');
	        VoiceService.playVoice();
	    };
	
	    //设置
	    $scope.clickCCDPBusinessSystemSetting = function () {
	        console.log("进入设置~");
	        JSCommand.app.getCCDPBusinessSystemSetting();
	    };
	
	    /*
	     //防盗匹配
	     $scope.goToSecurityMatching = function () {
	     var securityMatching = Constants.APP_CMD.request.CCDPBusinessSecurityMatching;
	     JSCommand.goToCCDPBusiness(securityMatching);
	     };
	
	     //wifi 设置
	     $scope.goToWifiSetting = function () {
	     var wifiSetting = Constants.APP_CMD.request.CCDPBusinessWifiSetting;
	     JSCommand.goToCCDPBusiness(wifiSetting);
	     };
	
	
	     // 设备连接
	     $scope.goToCheckDevConnect = function () {
	     var checkDevConnect = Constants.APP_CMD.request.CCDPBusinessCheckDevConnect;
	     JSCommand.goToCCDPBusiness(checkDevConnect);
	     };
	     */
	
	    ////监听事件传播 wifi 是否连接 1为连接  0为断开
	    /*    $scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.settingNetCont, function (event, result) {
	     console.log('result', result);
	     $scope.$apply(function () {
	     $scope.wifiSettingStatus = result;
	     });
	
	     if (result === 0) {
	     $rootScope.showTabs = true;
	     }
	
	     });*/
	    //
	    ////监听事件传播 设备是否连接
	    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.CCDPBusinessSettingDevCont, function (event, result) {
	    //    console.log('result', result);
	    //    $scope.$apply(function () {
	    //        $scope.DevSettingStatus = result;
	    //    });
	    //});
	
	
	};
	
	IndexCtrl.$inject = [
	    '$scope',
	    '$state',
	    '$ionicPopup',
	    '$rootScope',
	    'Constants',
	    'JSCache',
	    'JSCommand',
	    'base64'
	];
	
	module.exports = IndexCtrl;

/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/8/3.
	 */
	module.exports=function($scope,$ionicModal,JSCommand,$stateParams,JSCache){
	
	    function isEmptyObject(obj) {
	        for(var key in obj) {
	            return false;
	        }
	        return true;
	    }
	    var userProfile = JSCache.getProfile();
	    var userId = userProfile.get('id');
	    console.log(userId);
	    $scope.isShowFormError=false;
	    $scope.active={
	        name:'',
	        address:'',
	        mobilePhone:'',
	        companyName:'',
	        qicq:''
	    };
	
	    $scope.sigupForm = function(isValid){
	        $scope.isShowFormError = true;
	        console.log(isValid);
	        if(isEmptyObject(isValid)) {
	            var alias = $scope.active.name;
	            var address = $scope.active.address;
	            var mobilePhone = $scope.active.mobilePhone;
	            var companyName = $scope.active.companyName;
	            var qicq = $scope.active.qicq;
	            var equipmentId = $stateParams.equipmentId;
	            console.log(equipmentId);
	            console.log(alias);
	            JSCommand.getActiveResult(userId,equipmentId,alias,address,mobilePhone,companyName,qicq,function(status,result){
	                console.log(result)
	            });
	        }
	    }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/7/17.
	 */
	
	var _ = __webpack_require__(5);
	
	module.exports = angular.module('app.tabs.conversations', ['ionic', 'ngMessages', 'ngCookies', __webpack_require__(6).name])
	
	    .config([
	        '$stateProvider',
	        function ($stateProvider) {
	
	            $stateProvider
	                .state('tab.conversations', {
	                    abstract: true,
	                    url: '/conversations',
	                    // cache : false, // �ſ������ᵼ���ظ�������ҳ��
	                    views: {
	                        'tab-conversations': __webpack_require__(89)
	                    }
	                })
	                .state('tab.conversations.conversation-list', {
	                    url: '',
	                    data: {
	                        showTabs: true
	                    },
	                    title : 'tab.conversations',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(91)
	                    }
	                })
	                .state('tab.conversations.conversation', {
	                    abstract: true,
	                    url: '/{targetId}/?conversationType',
	                    views: {
	                        '': __webpack_require__(96)
	                    },
	                    cache : false
	                   /* resolve: {
	                        targetId: ['$stateParams', function ($stateParams) {
	                            return '' + $stateParams.targetId;
	                        }],
	                        conversationType: ['$stateParams', 'Constants', function ($stateParams, Constants) {
	                            return Constants.rongCloud.ConversationType[$stateParams.conversationType]
	                        }]
	                    }*/
	                })
	                .state('tab.conversations.conversation.PRIVATE', {
	                    url: '',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(100)
	                    }
	                })
	                .state('tab.conversations.conversation.GROUP', {
	                    url: '',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(105)
	                    }
	                })
	                .state('tab.conversations.group-edit', {
	                    url: 'group/{id}/edit',
	                    cache : false,
	                    /*resolve: {
	                        group: ['$stateParams', 'JSCommand', 'JSUtils', function ($stateParams, JSCommand, JSUtils) {
	                            return JSCommand.getEditGroupChatList(parseInt($stateParams.id, 10)).then(function (result) {
	
	                                result.group.isAllowStrangerBoolean = JSUtils.transformIntToBoolean(result.group.isAllowStranger);
	                                result.group.isAllowSearchBoolean = JSUtils.transformIntToBoolean(result.group.isAllowSearch);
	                                result.group.isNoDisturbBoolean = JSUtils.transformIntToBoolean(result.group.isNoDisturb);
	
	                                _.forEach(result.group.members, function (member) {
	                                    if (!member.id) {
	                                        member.id = member.userId;
	
	                                        member.isChecked = true;
	                                        member.selected = 1;
	
	                                        member.userId = undefined;
	                                    }
	                                });
	
	                                console.log("getEditGroupChatList:", result);
	                                return result.group;
	                            });
	                        }]
	                    },*/
	                    views: {
	                        '': __webpack_require__(108)
	                    }
	                })
	                .state('tab.conversations.group-message-history', {
	                    url: 'group/{targetId}/message-history',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(115)
	                    }
	                })
	                .state('tab.conversations.group-report', {
	                    url: 'group/{targetId}/report',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(118)
	                    }
	                })
	                .state('tab.conversations.group-report-evidence', {
	                    url: 'group/{targetId}/report-evidence',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(86)
	                    }
	                })
	
	                //������ϢƷ��
	                .state('tab.conversations.vehicleInformation', {
	                    url: 'conversations/vehicleInformation:targetId:conversationType',
	                    cache : false,
	                    //resolve: {
	                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
	                    //
	                    //        return ConversationService.getVehicleInformation().then(function (result) {
	                    //            return result;
	                    //        })
	                    //    }]
	                    //},
	                    views: {
	                        '': __webpack_require__(122)
	                    }
	                })
	
	                //��ϵ
	                .state('tab.conversations.vehicleInformation-cars', {
	                    url: 'conversations/vehicleInformation-cars:brandId',
	                    cache : false,
	                    //resolve: {
	                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
	                    //        var branId = parseInt($stateParams.brandId);
	                    //        return ConversationService.getVehicleInformation(branId, -1).then(function (result) {
	                    //            console.log('vehicleInformation', result);
	                    //            return result;
	                    //        })
	                    //    }]
	                    //},
	                    views: {
	                        '': {
	                            template: __webpack_require__(125),
	                            controller: __webpack_require__(124)
	                        }
	                    }
	                })
	
	                //����
	                .state('tab.conversations.vehicleInformation-year-type', {
	                    url: 'conversations/vehicleInformation-year-type:brandId:carsSeriesId',
	                    cache : false,
	                    //resolve: {
	                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
	                    //        var branId = parseInt($stateParams.brandId);
	                    //        var carsSeriesId = parseInt($stateParams.carsSeriesId);
	                    //        return ConversationService.getVehicleInformation(branId, carsSeriesId).then(function (result) {
	                    //            console.log('vehicleInformation', result);
	                    //            return result;
	                    //        })
	                    //    }]
	                    //},
	                    views: {
	                        '': {
	                            template: __webpack_require__(126),
	                            controller: __webpack_require__(124)
	                        }
	                    }
	                })
	
	                .state('tab.conversations.vehicle-fault', {
	                    url: 'conversations/vehicleInformation-fault:brandId:carsSeriesId:faultId',
	                    cache : false,
	                    //resolve: {
	                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
	                    //        var branId = parseInt($stateParams.brandId);
	                    //        var carsSeriesId = parseInt($stateParams.carsSeriesId);
	                    //        var faultId = parseInt($stateParams.faultId);
	                    //        return ConversationService.getVehicleInformation(branId, carsSeriesId).then(function (result) {
	                    //            _.forEach(result.type, function (yearTypeObj) {
	                    //                if (faultId === yearTypeObj.id) {
	                    //                    yearTypeObj.selected = true;
	                    //                }
	                    //            });
	                    //            return result;
	                    //        })
	                    //    }]
	                    //},
	                    views: {
	                        '': {
	                            template: __webpack_require__(127),
	                            controller: __webpack_require__(124)
	                        }
	                    },
	                    onEnter: ['JSUtils', 'vehicleInformation', function (JSUtils, vehicleInformation) {
	                        JSUtils.triggerOnEnter('tab.conversations.vehicleInformation-fault', vehicleInformation);
	                    }]
	                })
	
	            //Ⱥ���ϲ鿴Ⱥ��������
	                .state('tab.conversations.user-detail',{
	                    url : 'conversations/user-detail:id',
	                    cache : false,
	                   /* resolve: {
	                        user: ['$stateParams', 'JSCommand', function ($stateParams, JSCommand) {
	                            return JSCommand.getUserDetail(parseInt($stateParams.id), true).then(function (result) {
	                                return result.user;
	                            });
	                        }]
	                    },*/
	                    views:{
	                        '': __webpack_require__(128)
	                    }
	                });
	        }
	    ])
	    .factory('ConversationService', __webpack_require__(131));


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by userName on 2015/11/24.
	 */
	module.exports = {
	    template: __webpack_require__(87),
	    controller: __webpack_require__(88)
	
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"选择原因\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <a class=\"button button-icon\" ng-click=\"sendReason()\">发送</a>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <p class=\"item-divider-empty search-results-describe report-why-text\">请举证（选填）</p>\r\n\r\n        <div class=\"list\">\r\n            <a class=\"item\" ng-click=\"getChooseChatRecord()\">\r\n                聊天记录\r\n                <span class=\"item-note item-note-has-text-report\"\r\n                      ng-show=\"groupReport.chatEvidence == ''\">\r\n                        未选择\r\n                </span>\r\n                <span class=\"item-note item-note-has-text-report\"\r\n                      ng-show=\"groupReport.chatEvidence !== ''\">\r\n                        1条消息\r\n                </span>\r\n            </a>\r\n            <a class=\"item\" ng-click=\"getChoosePic()\">\r\n                图片证据\r\n                <span class=\"item-note item-note-has-text-report\"\r\n                      ng-show=\"picEvidence.length == 0\">\r\n                        未选择\r\n                </span>\r\n                <span class=\"item-note item-note-has-text-report\"\r\n                      ng-show=\"picEvidence.length > 0\">\r\n                        {{picEvidence.length}}张图片\r\n                </span>\r\n            </a>\r\n        </div>\r\n        <div class=\"picList\">\r\n            <ul class=\"report-evidence-pic-list\">\r\n                <li class=\"report-evidence-pic\" ng-repeat=\"pic in picEvidence\">\r\n                    <img class=\"evidence-pic-img\"  ng-src=\"{{pic.accessory |prefixSrc}}\">\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by haicheng on 2015/11/24.
	 */
	var _ = __webpack_require__(5);
	var ContactReportEvidence = function ($scope,
	                                      $state,
	                                      $ionicModal,
	                                      $stateParams,
	                                      $ionicPopup,
	                                      JSCommand,
	                                      JSUtils,
	                                      JSCache,
	                                      Constants) {
	
	    console.log('enter the contact report evidence controller...');
	
	    $scope.groupReport = {
	        groupId: "",
	        specificReasons: "",
	        chatEvidence: ""
	    };
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json.what;
	            if (what === Constants.YHWhat.app.previewImage) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	
	                    $scope.picEvidence.push({accessory: json.pictureResult});
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_ADD_REPORTGROUP) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	
	                    JSCache.remove('reportReason');
	                    $state.go('tab.conversations.group-edit', {
	                        id: $scope.groupReport.groupId
	                    });
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    $scope.groupReport.groupId = $stateParams.targetId;
	    //$scope.groupReport.specificReasons = sessionStorage.getItem('reason');
	    $scope.groupReport.specificReasons = JSCache.get('reportReason');
	
	
	    //聊天记录获取-----写这里~~~
	    $scope.getChooseChatRecord = function () {
	        $scope.groupReport.chatEvidence = "this a message";
	    };
	    //图片获取-----写这里~~~
	    $scope.picEvidence = [];
	
	    $scope.getChoosePic = function () {
	        //AlbumService.getHeadPortrait({
	        //    onSuccess: function (pictureResult) {
	        //        $scope.picEvidence.push({accessory: pictureResult});
	        //    },
	        //    onError: function (errorMessage) {
	        //
	        //    }
	        //});
	        var key = -1;
	        JSCommand.app.getPreviewImage($scope.groupReport.groupId, key)
	    };
	
	    //提交数据
	    var confirmPopup;
	    $scope.sendReason = function () {
	        //当聊天记录和图片其中一项存在的时候,执行-----并提交数据
	        if ($scope.picEvidence.length > 0 || $scope.groupReport.chatEvidence !== "") {
	            var groupId = $scope.groupReport.groupId;
	            var reason = $scope.groupReport.specificReasons;
	            var chatEvidence = $scope.groupReport.chatEvidence;
	            var picEvidence = $scope.picEvidence;
	
	            //ConversationService.groupReportRequest(parseInt(groupId), reason, chatEvidence, picEvidence).then(function (result) {
	            //    $state.go('tab.conversations.group-edit', {
	            //        id: groupId
	            //    });
	            //});
	            JSCommand.ccdp.reportGroup(groupId, reason, chatEvidence, picEvidence);
	        }
	        //当聊天记录和图片都为空的时候,就执行如下操作并提交数据
	        if ($scope.picEvidence.length == 0 && $scope.groupReport.chatEvidence == "") {
	
	            confirmPopup = $ionicPopup.confirm({
	                template: '没有聊天记录会影响审核结果，是否继续提交？',
	                buttons: [{
	                    text: '取消',
	                    type: 'button-default',
	                    onTap: function () {
	                        return false;
	                    }
	                }, {
	                    text: '确定',
	                    type: 'button-positive',
	                    onTap: function () {
	                        return true;
	                    }
	                }]
	            });
	            confirmPopup.then(function (res) {
	                if (res) {
	                    var groupId = $scope.groupReport.groupId;
	                    var reason = $scope.groupReport.specificReasons;
	                    var chatEvidence = $scope.groupReport.chatEvidence;
	                    var picEvidence = $scope.picEvidence;
	
	                    JSCommand.ccdp.reportGroup(groupId, reason, chatEvidence, picEvidence);
	                    //ConversationService.groupReportRequest(parseInt(groupId), reason, chatEvidence, picEvidence).then(function (result) {
	                    //    $state.go('tab.conversations.group-edit', {
	                    //        id: groupId
	                    //    });
	                    //});
	                } else {
	
	                }
	            });
	        }
	    };
	
	    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	    //    //console.log('arguments',arguments)
	    //    if(confirmPopup){
	    //        confirmPopup.close();
	    //    }
	    //});
	
	
	};
	ContactReportEvidence.$inject = [
	    '$scope',
	    '$state',
	    '$ionicModal',
	    '$stateParams',
	    '$ionicPopup',
	    'JSCommand',
	    'JSUtils',
	    'JSCache',
	    'Constants'
	];
	
	module.exports = ContactReportEvidence;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/29.
	 */
	
	module.exports = {
	    template: __webpack_require__(90)
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-view></ion-nav-view>"

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/27.
	 */
	
	module.exports = {
	    template  : __webpack_require__(92),
	    controller: __webpack_require__(93)
	};

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"消息\">\r\n    <ion-nav-buttons side=\"secondary\">\r\n        <button class=\"button button-clear\" ng-click=\"showOrHideSearch()\"><i class=\"iconfont icon-search menu-size\"></i>\r\n        </button>\r\n        <span class=\"button-clear-ionic\"></span>\r\n        <button class=\"button button-clear\" ng-click=\"showMenuModal()\"><i class=\"iconfont icon-add menu-size\"></i></button>\r\n    </ion-nav-buttons>\r\n\r\n    <ion-content class=\"item-bg\">\r\n        <div ng-if=\"isShowSearch\">\r\n            <p class=\"item-divider-empty\"></p>\r\n\r\n            <div class=\"bar bar-header item-input-inset\">\r\n                <label class=\"item-input-wrapper\">\r\n                    <i class=\"iconfont icon-search placeholder-icon\"></i>\r\n                    <input type=\"search\" ng-model=\"search.keyword\" placeholder=\"请输入关键字\">\r\n                </label>\r\n                <button class=\"button button-clear\" ng-click=\"showOrHideSearch()\">\r\n                    取消\r\n                </button>\r\n            </div>\r\n\r\n            <p class=\"item-divider-empty\"></p>\r\n        </div>\r\n\r\n        <ion-list ng-show=\"isShowConversationList\">\r\n            <ion-item class=\"item item-avatar message-item-a\"\r\n                      ng-repeat=\"conversation in conversationList\"\r\n                      ui-sref=\"{{ 'tab.conversations.conversation.' + conversation.conversationType + '({targetId: conversation.targetId, conversationType: conversation.conversationType})' }}\">\r\n\r\n                <img class=\"message-item-img\"  ng-src=\"{{ conversation.__detail__.icon | prefixSrc }}\">\r\n\r\n                <!--<span class=\"badge message-badge-level\">J{{ conversation.__detail__.grade }}</span>-->\r\n                <span class=\"badge message-badge-assertive\" ng-if=\"conversation.unreadMessageCount > 0\">{{ conversation.unreadMessageCount }}</span>\r\n\r\n                <h2 ng-if=\"conversation.conversationType === 'PRIVATE'\">{{ conversation.__detail__.nickName }}</h2>\r\n\r\n                <h2 ng-if=\"conversation.conversationType === 'GROUP'\">{{ conversation.__detail__.groupName }}</h2>\r\n\r\n                <p ng-if=\"conversation.objectName === 'RC:TxtMsg'\">{{ conversation.latestMessage.content}}</p>\r\n\r\n                <p ng-if=\"conversation.objectName === 'RC:VcMsg'\">[语音]</p>\r\n\r\n                <div class=\"message-search-results-time\">\r\n                    <span class=\"new-friend-state\">{{conversation.receivedTime}}</span>\r\n                </div>\r\n            </ion-item>\r\n        </ion-list>\r\n\r\n        <ion-list ng-show=\"isShowSearchConversationList\">\r\n            <ion-item class=\"item item-avatar message-item-a\"\r\n                      ng-repeat=\"conversation in searchConversationList\"\r\n                      ui-sref=\"{{ 'tab.conversations.conversation.' + conversation.conversationType + '({targetId: conversation.targetId, conversationType: conversation.conversationType})' }}\">\r\n\r\n                <img class=\"message-item-img\"  ng-src=\"{{ conversation.__detail__.icon | prefixSrc }}\">\r\n\r\n                <!--<span class=\"badge message-badge-level\">J{{ conversation.__detail__.grade }}</span>-->\r\n                <span class=\"badge message-badge-assertive\" ng-if=\"conversation.unreadMessageCount > 0\">{{ conversation.unreadMessageCount }}</span>\r\n\r\n                <h2 ng-if=\"conversation.conversationType === 'PRIVATE'\">{{ conversation.__detail__.nickName }}</h2>\r\n\r\n                <h2 ng-if=\"conversation.conversationType === 'GROUP'\">{{ conversation.__detail__.name }}</h2>\r\n\r\n                <p style=\"color: #E87870;\">{{ conversation.searchContent }}</p>\r\n\r\n                <div class=\"message-search-results-time\">\r\n                    <span class=\"new-friend-state\">{{conversation.receivedTime}}</span>\r\n                </div>\r\n            </ion-item>\r\n        </ion-list>\r\n\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/23.
	 */
	
	var _ = __webpack_require__(5);
	
	/*  会话列表的信息
	[
	    {
	        "conversationTitle": "",
	        "conversationType": "PRIVATE",
	        "draft": "",
	        "isTop": false,
	        "latestMessage": {
	            "content": "他咯哦YY"
	        },
	        "latestMessageId": 2,
	        "objectName": "RC:TxtMsg",
	        "receivedStatus": {
	            "flag": 1,
	            "isDownload": false,
	            "isListened": false,
	            "isRead": true
	        },
	        "receivedTime": 1455941397742,
	        "senderUserId": "30",
	        "sentStatus": "SENT",
	        "sentTime": 1455941398574,
	        "targetId": "19",
	        "unreadMessageCount": 0
	    },
	    {
	        "conversationTitle": "",
	        "conversationType": "PRIVATE",
	        "draft": "",
	        "isTop": false,
	        "latestMessage": {
	            "content": "all他啊"
	        },
	        "latestMessageId": 1,
	        "objectName": "RC:TxtMsg",
	        "receivedStatus": {
	            "flag": 1,
	            "isDownload": false,
	            "isListened": false,
	            "isRead": true
	        },
	        "receivedTime": 1455941377323,
	        "senderUserId": "30",
	        "sentStatus": "SENT",
	        "sentTime": 1455941378563,
	        "targetId": "33",
	        "unreadMessageCount": 0
	    }
	]
	*/
	
	/* 这是用户详情的信息
	"user": {
	    "attentionCount": null,
	        "attento": null,
	        "brandList": [
	        {
	            "brandName": "马萨拉蒂",
	            "desc_c": null,
	            "icon": "masaladi.png",
	            "id": 1,
	            "initial": null
	        },
	        {
	            "brandName": "宝马",
	            "desc_c": null,
	            "icon": "BMW_png.png",
	            "id": 2,
	            "initial": null
	        },
	        {
	            "brandName": "江淮",
	            "desc_c": null,
	            "icon": "jh.png",
	            "id": 4,
	            "initial": null
	        }
	    ],
	        "description": "林中的小熊",
	        "gold": 1,
	        "grade": 1,
	        "icon": "84_avatar_middle.jpg",
	        "id": 33,
	        "initial": "B",
	        "isAuthentication": null,
	        "mobile": null,
	        "nickName": "坂上智代",
	        "nickNameUpdateTime": null,
	        "notEvaluateCount": 0,
	        "popularity": 650,
	        "relation": 2,
	        "resolvedCount": 0,
	        "serveEndTime": "18:00",
	        "serveList": [
	        {
	            "classId": 2,
	            "description": "服务描述4",
	            "id": 4,
	            "recommendGoldHigh": null,
	            "recommendGoldLow": null,
	            "serveName": "发动机维修",
	            "updateTime": null
	        },
	        {
	            "classId": 1,
	            "description": "服务描述5",
	            "id": 5,
	            "recommendGoldHigh": null,
	            "recommendGoldLow": null,
	            "serveName": "报废",
	            "updateTime": null
	        }
	    ],
	        "serveStartTime": "9:00",
	        "sex": 2,
	        "skilledList": [
	        {
	            "brandId": 1,
	            "description": "描述1",
	            "id": 1,
	            "img": null,
	            "skilledName": "技能1",
	            "stype": 1,
	            "updateTime": null
	        },
	        {
	            "brandId": 2,
	            "description": "描述2",
	            "id": 2,
	            "img": null,
	            "skilledName": "技能2",
	            "stype": 1,
	            "updateTime": null
	        },
	        {
	            "brandId": 4,
	            "description": "描述4",
	            "id": 4,
	            "img": null,
	            "skilledName": "技能4",
	            "stype": 1,
	            "updateTime": null
	        }
	    ],
	        "state": null,
	        "userName": "13737725239"
	}
	*/
	
	/* 群信息
	{
	    "group": {
	        "advocateId": 20,
	        "groupName": "测试一群",
	        "groupNickName": "",
	        "icon": "1420538614536.jpeg",
	        "id": 38,
	        "isAllowSearch": true,
	        "isAllowStranger": true,
	        "isNoDisturb": true,
	        "members": [
	        {
	            "groupId": 38,
	            "icon": "84_avatar_middle.jpg",
	            "isNoDisturb": true,
	            "nickName": "坂上智代",
	            "userId": 33,
	            "userName": "13737725239"
	        },
	        {
	            "groupId": 38,
	            "icon": "1420538614536.jpeg",
	            "isNoDisturb": true,
	            "nickName": "测试-男♂",
	            "userId": 129,
	            "userName": "18249988914"
	        },
	        {
	            "groupId": 38,
	            "icon": "34.gif",
	            "isNoDisturb": true,
	            "nickName": "大家好，我是昵称111",
	            "userId": 96,
	            "userName": "15507898501"
	        },
	        {
	            "groupId": 38,
	            "icon": "engineer-Zhao.png",
	            "isNoDisturb": true,
	            "nickName": "猪1号",
	            "userId": 41,
	            "userName": "13077714217"
	        },
	        {
	            "groupId": 38,
	            "icon": "84_avatar_middle.jpg",
	            "isNoDisturb": true,
	            "nickName": "111",
	            "userId": 114,
	            "userName": "13737725203"
	        },
	        {
	            "groupId": 38,
	            "icon": "01.png",
	            "isNoDisturb": true,
	            "nickName": "测试-女♀",
	            "userId": 20,
	            "userName": "18577826091"
	        }
	    ],
	        "state": 1,
	        "updateTime": 1454396527000
	}
	*/
	
	var ConversationList = function ($scope,
	                                 $rootScope,
	                                 $state,
	                                 $ionicModal,
	                                 Constants,
	                                 JSUtils,
	                                 JSCache,
	                                 JSCommand,
	                                 $ionicTabsDelegate) {
	
	    console.log("enter the conversation list controller...");
	
	    //这里存储的是会话列表的信息,可以参考上面的信息
	    $scope.conversationList = [];
	    $scope.remoteMinor = [];
	    $scope.getPerUnrMessageList=[];
	
	    $scope.safeApply = function(fn) {
	        var phase = this.$root.$$phase;
	        if (phase == '$apply' || phase == '$digest') {
	            if (fn && (typeof(fn) === 'function')) {
	                fn();
	            }
	        } else {
	            this.$apply(fn);
	        }
	    };
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            console.log("conversation list receiver....");
	            var status = json["status"];
	            if (status == Constants.status.success) {
	                // 成功
	                var what = json['what'];
	                if (what === Constants.YHWhat.rongcloud.getConversationList) {
	                    console.log("json data is " + json.data);
	                    // 获取会话列表的回复
	                    $scope.conversationList = json.data;
	                    // $scope.conversationList = JSON.parse(json.data);
	
	                    _.forEach($scope.conversationList, function (conversationObj) {
	
	                        if (conversationObj.conversationType === "PRIVATE") {
	                            JSCommand.ccdp.queryUserDetail(parseInt(conversationObj.targetId, 10));
	                        }
	                        else if (conversationObj.conversationType === 'GROUP') {
	                            JSCommand.ccdp.queryGroupDetail(parseInt(conversationObj.targetId, 10));
	                        }
	
	                        conversationObj.receivedTime = JSUtils.getDateTime(conversationObj.receivedTime)
	
	                    });
	                }
	                else if (what == Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
	                    var user_json = json.data.user;
	                    var user_id = user_json["id"];
	                    _.forEach($scope.conversationList, function (conversation) {
	                        var targetId = conversation["targetId"];
	                        if(targetId == user_id){
	                            conversation.__detail__ = json.data.user;
	                        }
	                    });
	
	                    $scope.$apply(function () {
	                        $scope.conversationList = $scope.conversationList;
	                    })
	
	                }
	                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST){
	
	                    /*
	                     {
	                     "msgs":[
	                     {
	                     "id":0,
	                     "value":[
	                         {
	                             "id":114,
	                             "icon":"1456455960271.png",
	                             "sex":1,
	                             "nickName":"111记性不大好",
	                             "userName":"13737725203"
	                         }
	                     ],
	                     "type":1,
	                     "msg":"请求远程协助的人"
	                     }
	                     ]
	                     }
	                     */
	                    try{
	                        var data = json['data'];
	                        var firstMessage = [];
	                        try{
	                            var msgs = JSON.parse(data);
	                            firstMessage = msgs['msgs'][0];
	                        }
	                        catch(error){
	                            console.log("not json format data:" + json);
	                        }
	                        if(firstMessage.length == 0){
	                            firstMessage = data['msgs'][0];
	                        }
	                        var val = firstMessage['value'];
	                        $scope.remoteMinor = val[0];
	                        showModal();
	                        // $scope._modalRequestedRemoteAssistance.show();
	                    }
	                    catch(error){
	
	                        console.log("解析远程协助数据失败,", error);
	                    }
	                }
	                else if(what == Constants.YHWhat.ccdp.CCDP_END_ASSIST){
	                    // $scope._modalRequestRemoteAssistance.hide();
	                    hideModal();
	                }
	                else if(what == Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST){
	                    // 我接收到服务器的接收远程协助的指令
	                    /*
	                     {
	                     "assistId":2
	                     "major":20
	                     }
	                     */
	                    var data = json['data'];
	                    if(data != null){
	                        var major = 0;
	                        try{
	                            var jsondata = JSON.parse(data);
	                            major = jsondata['major'];
	                        }
	                        catch(error){
	                            console.log("not json format data:" + json);
	                        }
	                        if(major == 0){
	                            major = data['major'];
	                        }
	                        var Params = {
	                            id: major,
	                            value: Constants.differenceRemoteRequest.receivingParty
	                        };
	                        JSCommand.app.getCCDPBusinessList(Params);
	                        // $scope._modalRequestRemoteAssistance.hide();
	                        hideModal();
	                    }
	                    else{
	                        console.log("wrong data for accept assist.");
	                        // $scope._modalRequestRemoteAssistance.hide();
	                        hideModal();
	                    }
	                }
	                else if (what == Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {
	                    var group_json = json.data.group;
	                    var group_id = group_json["id"];
	                    _.forEach($scope.conversationList, function (conversation) {
	                        var targetId = conversation["targetId"];
	                        if(targetId == group_id) {
	                            conversation.__detail__ = json.data.group;
	                        }
	                       /* var conversationType=conversation["conversationType"];
	                        switch (conversationType) {
	                            case 'GROUP':
	                                conversationType = 3;
	                                break;
	                            case 'PRIVATE':
	                                conversationType = 1;
	                                break;
	                        }
	
	                        var getPerUnrMessages={
	                            targetId:'',
	                            conversationType:''
	                        };
	                        getPerUnrMessages.targetId=targetId;
	                        getPerUnrMessages.conversationType=conversationType;
	                        $scope.getPerUnrMessageList.push(getPerUnrMessages);*/
	                        //JSCommand.rongcloud.getPersonalUnreadMessages(targetId, conversationType);
	                        //console.log("targetId~~~~~~~~~",targetId);
	                    });
	                    $scope.$apply(function () {
	                        $scope.conversationList = $scope.conversationList;
	                    })
	                }
	                else if (what == Constants.YHWhat.rongcloud.personalUnreadMessages) {
	                    $scope.perUnrMessages=json.data;
	                }
	                else if (what === Constants.YHWhat.rongcloud.getLatestMessages) {
	                    // 实时更新消息
	                    _.forEach(json.data, function (messageObj) {
	                        var targetId = messageObj.targetId;
	                        _.forEach($scope.conversationList, function (conversation) {
	                            if(targetId == conversation.targetId) {
	                                conversation.unreadMessageCount++;
	                                conversation.latestMessage.content=messageObj.content.content;
	                                $scope.safeApply(function(){
	                                    $scope.conversationList = $scope.conversationList;
	                                });
	                            }
	                        });
	                    });
	                }
	            }
	
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	
	
	    //JSCommand.rongcloud.getPersonalUnreadMessages(targetId, conversationType);
	    $scope.getConversationList = function(){
	        /*
	         首先获取消息列表
	         */
	        // 首先获取会话列表
	        JSCommand.rongcloud.getConversationList();
	
	        //// 模拟融云数据回复
	        //var message = {};
	        //message["what"] = Constants.YHWhat.rongcloud.getConversationList;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '[{"conversationTitle":"","conversationType":"PRIVATE","draft":"","isTop":false,"latestMessage":{"content":"他咯哦YY"},"latestMessageId":2,"objectName":"RC:TxtMsg","receivedStatus":{"flag":1,"isDownload":false,"isListened":false,"isRead":true},"receivedTime":1455941397742,"senderUserId":"30","sentStatus":"SENT","sentTime":1455941398574,"targetId":"19","unreadMessageCount":0},{"conversationTitle":"","conversationType":"PRIVATE","draft":"","isTop":false,"latestMessage":{"content":"all他啊"},"latestMessageId":1,"objectName":"RC:TxtMsg","receivedStatus":{"flag":1,"isDownload":false,"isListened":false,"isRead":true},"receivedTime":1455941377323,"senderUserId":"30","sentStatus":"SENT","sentTime":1455941378563,"targetId":"33","unreadMessageCount":0}]';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	        //
	        //
	        // 模拟数据回复
	        //var message = {};
	        //message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
	        //// message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '{"msgs":[{"id":0,"value":[{"id":114,"icon":"1456455960271.png","sex":1,"nickName":"111记性不大好","userName":"13737725203"}],"type":1,"msg":"请求远程协助的人"}]}';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	    $scope.getConversationList();
	
	
	    function showModal(){
	        $scope.modalRequestedRemoteAssistance = $ionicModal.fromTemplate(__webpack_require__(94), {
	            scope: $scope,
	            animation: 'slide-right-left'
	        });
	        $scope.modalRequestedRemoteAssistance.show();
	    }
	
	    function hideModal(){
	        if(angular.isDefined($scope.modalRequestedRemoteAssistance)){
	            $scope.modalRequestedRemoteAssistance.hide();
	            $scope.modalRequestedRemoteAssistance.remove();
	        }
	    }
	
	    function getSearchConversationList(searchTargetId, searchContent) {
	        $scope.searchConversationList = [];
	        JSCommand.rongcloud.getConversationList({
	            onSuccess: function (searchConversationList) {
	                $scope.searchResult = null;
	                _.forEach(searchConversationList, function (conversation, i) {
	                    console.log(i, searchConversationList[i].targetId);
	                    if (searchConversationList[i].targetId === searchTargetId) {
	
	                        if (conversation.conversationType === 'PRIVATE') {
	                            JSCommand.ccdp.queryUserDetail(parseInt(Number(searchTargetId), 10)).then(function (result) {
	                                conversation.__detail__ = result.user;
	                            });
	                        } else if (conversation.conversationType === 'GROUP') {
	                            JSCommand.ccdp.queryGroupDetail(parseInt(Number(searchTargetId), 10)).then(function (result) {
	                                conversation.__detail__ = result.group;
	                            });
	                        }
	                        conversation.searchContent = searchContent;
	                        conversation.receivedTime = JSUtils.getDateTime(conversation.receivedTime);
	                        $scope.searchResult = _.extend(searchConversationList[i]);
	                    }
	                });
	
	                $scope.searchConversationList.push($scope.searchResult);
	            },
	
	            onError: function (errorCode) {
	
	            }
	        })
	    }
	
	    var _menuModal_ = $ionicModal.fromTemplate(__webpack_require__(95), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.showMenuModal = function () {
	        _menuModal_.show();
	    };
	
	    $scope.hideMenuModal = function () {
	        _menuModal_.hide();
	    };
	    $scope.gotoAddFriend= function () {
	        $ionicTabsDelegate.$getByHandle('my-handle').select(1);
	        $state.go('tab.circle.find');
	        _menuModal_.hide();
	    };
	
	    //搜索是否显示
	    $scope.isShowSearch = false;
	
	    $scope.showOrHideSearch = function () {
	        $scope.isShowSearch = !$scope.isShowSearch;
	        $scope.search.keyword = '';
	    };
	
	    //检测是否为数字
	    function isNumber(num) {
	        var re = /^[0-9]+.?[0-9]*$/;
	        if (!re.test(num)) {
	            return false;
	        }
	        else {
	            return true;
	        }
	    }
	
	    //过滤对话内容
	    function filterContent(keyword, obj) {
	        if (obj.indexOf(keyword) >= 0) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	
	    //进行搜索
	    $scope.search = {
	        "keyword": ""
	    };
	
	    //对话列表是否显示
	    $scope.isShowConversationList = true;
	
	    //搜索结果是否显示
	    $scope.isShowSearchConversationList = false;
	
	    $scope.$watch('search.keyword', function () {
	
	        if ($scope.search.keyword.toString().trim() === '') {
	            $scope.isShowConversationList = true;
	            $scope.isShowSearchConversationList = false;
	            return false;
	        }
	        $scope.isShowConversationList = false;
	        $scope.isShowSearchConversationList = true;
	        $scope.searchConversationList = null;
	        for (var i = 0; i < localStorage.length; i++) {
	            if (isNumber(Number(localStorage.key(i)))) {
	                for (var j = 0; j < JSON.parse(localStorage.getItem(localStorage.key(i))).length; j++) {
	                    if (filterContent($scope.search.keyword, JSON.parse(localStorage.getItem(localStorage.key(i)))[j].content.content)) {
	                        //getSearchConversationList(localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i)))[j].content.content);
	                        break;
	                    }
	                }
	            }
	        }
	    });
	
	    //***********************************监听消息推送*********************
	    $scope.$on(Constants.events.onReceiveMessage, function (event, message) {
	        console.log('message', message);
	        getConversationList();
	    });
	
	//=========================================远程协助 监听 ==============================================================
	    $scope.refuseAssistance = function (id) {
	        JSCommand.ccdp.finishRemoteAssist(parseInt(id));
	        hideModal();
	    };
	
	    //发送接收协助请求
	    $scope.receivingRequest = function (id) {
	        JSCommand.ccdp.acceptRemoteAssist(parseInt(id));
	        hideModal();
	
	        //// 模拟数据回复
	        //var message = {};
	        //message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '{"assistId":2,"major":20}';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	
	
	    $rootScope.$on('YHRemote', function(event, json){
	        try{
	            $scope.$broadcast('YHJSReceiver', json);
	        }
	        catch(error){
	
	        }
	    });
	
	    $rootScope.$on('YHPushMessages', function (event, json) {
	        try{
	            $scope.$broadcast('YHJSReceiver', json);
	        }
	        catch(error){
	
	        }
	    });
	
	    
	};
	
	ConversationList.$inject = [
	    '$scope',
	    '$rootScope',
	    '$state',
	    '$ionicModal',
	    'Constants',
	    'JSUtils',
	    'JSCache',
	    'JSCommand',
	    '$ionicTabsDelegate'
	];
	
	module.exports = ConversationList;

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view>\r\n    <ion-content class=\"item-request-bg\">\r\n        <div class=\"request-person-block\">\r\n            <p class=\"request-prompt-text\">向你请求远程协助...</p>\r\n            <div class=\"item-request-head-portrait\">\r\n                <img class=\"request-head-portrait\" ng-src=\"{{remoteMinor.icon}}\">\r\n            </div>\r\n            <p class=\"request-nickname\">{{remoteMinor.nickName}}</p>\r\n        </div>\r\n        <div class=\"request-accept-and-refused refused-padding-path clearfix\">\r\n            <div class=\"request-refused-block\">\r\n                <div class=\"item-request-refused-head-portrait\" ng-click=\"refuseAssistance(remoteMinor.id)\">\r\n                    <img class=\"request-accept-head-portrait\" src=\"img/request-refused.png\">\r\n                </div>\r\n                <p class=\"request-refused-text-describe\">拒绝</p>\r\n            </div>\r\n            <div class=\"request-accept-block\" ng-click=\"receivingRequest(remoteMinor.id)\">\r\n                <div class=\"item-request-accept-head-portrait\">\r\n                    <img class=\"request-accept-head-portrait\" src=\"img/request-accept.png\">\r\n                </div>\r\n                <p class=\"request-accept-text-describe\">接受</p>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>"

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = "<div id=\"task-view\" class=\"menu-modal\">\r\n    <div class=\"list menu-list-last-no-border\">\r\n        <a class=\"item item-icon-left\" href=\"#\" ng-click=\"gotoAddFriend()\">\r\n            <i class=\"iconfont icon-Search-friends icon icon-menu\"></i>\r\n            查找技师\r\n        </a>\r\n       <!-- <a class=\"item item-icon-left\" href=\"#\">\r\n            <i class=\"iconfont icon-message-point-Solid icon icon-menu\"></i>\r\n            发起请求\r\n        </a>-->\r\n        <a class=\"item item-icon-left\" href=\"#\" ng-click=\"gotoAddFriend()\">\r\n            <i class=\"iconfont icon-Add-friends icon icon-menu\"></i>\r\n            添加朋友\r\n        </a>\r\n       <!-- <a class=\"item item-icon-left\" href=\"#\">\r\n            <i class=\"iconfont icon-friends icon icon-menu\"></i>\r\n            发起群聊\r\n        </a>\r\n        <a class=\"item item-icon-left\" href=\"#\">\r\n            <i class=\"iconfont icon-txt-Help icon icon-menu\"></i>\r\n            帮助与反馈\r\n        </a>-->\r\n\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/27.
	 */
	
	module.exports = {
	    template  : __webpack_require__(97),
	    controller: __webpack_require__(98)
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-view></ion-nav-view>"

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/23.
	 */
	
	var _ = __webpack_require__(5);
	
	/*
	[
	    {
	        "content": {
	            "content": "他咯哦YY"
	        },
	        "conversationType": "PRIVATE",
	        "extra": "",
	        "messageDirection": "SEND",
	        "messageId": 2,
	        "objectName": "RC:TxtMsg",
	        "receivedStatus": {
	            "flag": 1,
	            "isDownload": false,
	            "isListened": false,
	            "isRead": true
	        },
	        "receivedTime": 1455941397742,
	        "senderUserId": "30",
	        "sentStatus": "SENT",
	        "sentTime": 1455941398574,
	        "targetId": "19"
	    },
	    {
	        "content": {
	            "content": "啦咯啦咯啦咯了"
	        },
	        "conversationType": "PRIVATE",
	        "extra": "",
	        "messageDirection": "SEND",
	        "messageId": 3,
	        "objectName": "RC:TxtMsg",
	        "receivedStatus": {
	            "flag": 1,
	            "isDownload": false,
	            "isListened": false,
	            "isRead": true
	        },
	        "receivedTime": 1455951345045,
	        "senderUserId": "30",
	        "sentStatus": "SENT",
	        "sentTime": 1455951345689,
	        "targetId": "19"
	    }
	]*/
	
	var Conversation = function ($scope,
	                             $ionicScrollDelegate,
	                             $stateParams,
	                             Constants,
	                             JSUtils,
	                             JSCache,
	                             JSCommand,
	                             $ionicModal) {
	
	
	    console.log('enter the conversation controller...');
	    var targetId = $stateParams.targetId;
	    $scope.targetId = targetId;
	    console.log("$scope.targetId",$scope.targetId);
	    $scope.status = {
	        typing: 1,
	        waitForRecord: 2,
	        showingSelectFeatures: 3,
	        recording: 4
	    };
	    $scope.currentStatus = $scope.status.typing;
	    $scope.form = {
	        text: ''
	    };
	
	    var text; //发送消息
	    var conversationType = $stateParams.conversationType;
	    switch (conversationType) {
	        case 'GROUP':
	            conversationType = 3;
	            break;
	        case 'PRIVATE':
	            conversationType = 1;
	            break;
	    }
	
	    /*
	       在这里声明消息队列
	     */
	    $scope.messageList = [];
	
	    var textMessage = {};
	
	    $scope.safeApply = function(fn) {
	        var phase = this.$root.$$phase;
	        if (phase == '$apply' || phase == '$digest') {
	            if (fn && (typeof(fn) === 'function')) {
	                fn();
	            }
	        } else {
	            this.$apply(fn);
	        }
	    };
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	
	            var status = json.status;
	            if (status === Constants.status.success) {
	                var what = json.what;
	                if (what === Constants.YHWhat.rongcloud.getConversation) {
	                    console.log("conversation got the history message");
	                    // 这里获取到最新的消息列表，包含所有未读消息，如果未读消息不超过20条，则会包含历史消息。
	                    $scope.messageList = json.data;
	                    console.log("个人未读消息:",$scope.messageList);
	                }
	
	                else if (what === Constants.YHWhat.rongcloud.sendTestMessage) {
	                    // 如果发生消息成功，则会把消息存入到消息列表中
	                        $scope.safeApply(function () {
	                        $scope.messageList.push(json.data);
	                            console.log("消息：",$scope.messageList);
	                        });
	                    //if ($scope.targetId === json.data.targetId) {
	                    //    $scope.safeApply(function () {
	                    //        $scope.messageList.push(textMessage);
	                    //    });
	                    //}
	
	
	                    //if ($scope.targetId === json.data.targetId && angular.isDefined($scope.messageList)) {
	                    //    $scope.$apply(function () {
	                    //        $scope.messageList.push(json.data);
	                    //    });
	                    //} else {
	                    //    $scope.$apply(function () {
	                    //        $scope.messageList = [];
	                    //        $scope.messageList.push(json.data)
	                    //    });
	                    //}
	                }else if(what === Constants.YHWhat.rongcloud.sendImageMewssage){
	                    $scope.safeApply(function () {
	                        $scope.messageList.push(json.data);
	                    });
	                }else if(what === Constants.YHWhat.rongcloud.sendVoiceMessage){
	                    $scope.safeApply(function () {
	                        $scope.messageList.push(json.data);
	                    });
	                }
	                /*else if(what === Constants.YHWhat.ccdp.CCDP_SEND_FILES){
	                    console.log("文件发送成功！");
	                    $scope.safeApply(function () {
	                        console.log("files data：",json.data);
	                    });
	                }
	                else if(what === Constants.YHWhat.ccdp.CCDP_GET_FILES){
	                    console.log("监听到文件！");
	                    $scope.safeApply(function () {
	                        //$scope.messageList.push(json.data);
	                        console.log("files data!!!!：",json.data);
	                    });
	                }*/
	                else if(what === Constants.YHWhat.app.sendFiles){
	                    // 发送文件
	                    console.log("发送文件成功~~~~~~~~~");
	                    $scope.safeApply(function () {
	                        $scope.messageList.push(json.data);
	                        console.log("files data：",json.data);
	                    });
	                }
	                else if (what === Constants.YHWhat.rongcloud.getLatestMessages) {
	                    // 这个接口在 新版-2016-02-20 中间暂时没有用到，先注释掉
	                    _.forEach(json.data, function (messageObj) {
	                        if ($scope.targetId === messageObj.targetId) {
	                            $scope.$apply(function () {
	                                $scope.messageList.push(messageObj);
	                            });
	                        }
	                    });
	                }
	            } else {
	                console.log("Login fail:" + json["reason"])
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	
	    $scope.listHistoryMessage = function(){
	        /*
	         首先获取消息列表
	         */
	        JSCommand.rongcloud.getConversation(targetId, conversationType);
	    };
	    $scope.listHistoryMessage();
	
	
	    $scope.switchStatusTo = function (status) {
	        $scope.currentStatus = status;
	    };
	
	    $scope.handleRecord = function () {
	        console.log('handleRecord');
	
	        if ($scope.currentStatus === $scope.status.waitForRecord) {
	            console.log("点击开始");
	            JSCommand.app.startRecord();
	            $scope.switchStatusTo($scope.status.recording);
	        } else if ($scope.currentStatus === $scope.status.recording) {
	            JSCommand.app.stopRecord(targetId,conversationType);
	            console.log("点击结束");
	            $scope.switchStatusTo($scope.status.waitForRecord);
	        }
	
	    };
	
	    $scope.playVoice = function (message) {
	        //console.log('message::',message);
	        JSCommand.app.playVoice(message.content.mUri.path.decoded);
	    };
	
	    var checkImgModal = $ionicModal.fromTemplate(__webpack_require__(99), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.checkImg=function (message) {
	        $scope.localUriString=message.content.mLocalUri.uriString;
	        console.log('message::',$scope.localUriString);
	        checkImgModal.show();
	    };
	    $scope.closeModal=function(){
	        checkImgModal.hide();
	    };
	    $scope.handleClickConversationArea = function () {
	        if ($scope.currentStatus == $scope.status.showingSelectFeatures) {
	            $scope.switchStatusTo($scope.status.typing);
	        }
	    };
	
	    $scope.sendMessage = function () {
	        text = $scope.form.text.trim();
	        console.log('text: ', text);
	        // 空字符串不发送
	        if (text.length <= 0) {
	            return;
	        }
	
	        //textMessage = {
	        //    "content": {
	        //        "content": text
	        //    },
	        //    "conversationType": "PRIVATE",
	        //    "extra": "",
	        //    "messageDirection": "SEND",
	        //    "messageId": 2,
	        //    "objectName": "RC:TxtMsg",
	        //    "receivedStatus": {
	        //        "flag": 1,
	        //        "isDownload": false,
	        //        "isListened": false,
	        //        "isRead": true
	        //    },
	        //    "receivedTime": 0,
	        //    "senderUserId": "30",
	        //    "sentStatus": "SENT",
	        //    "sentTime": 0,
	        //    "targetId": targetId
	        //};
	
	        JSCommand.rongcloud.sendTextMessage(targetId, text, conversationType);
	        $scope.form.text = '';
	
	        //var message = {};
	        //message["what"] = Constants.YHWhat.rongcloud.sendTestMessage;
	        //message["status"] = Constants.status.success;
	        //message["data"] = {"targetId":19};
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	
	
	    var offReceiveMessage = $scope.$on(Constants.events.onReceiveMessage, function (event, message) {
	        if ($scope.conversation && message.senderUserId === targetId) {
	
	            $scope.$apply(function () {
	                $scope.messageList.push(message);
	            });
	        } else {
	            getConversation();
	        }
	    });
	
	    $scope.$on('$destroy', function () {
	        //offReceiveMessage();
	        JSCommand.rongcloud.exitConversation(targetId, conversationType);
	    });
	
	    $scope.$watchCollection('messageList', function () {
	        $ionicScrollDelegate.scrollBottom();
	        localStorage.setItem(targetId, JSON.stringify($scope.messageList));
	    });
	
	
	    /*function getHistoryMessages(resultCallback) {
	     JSCommand.getHistoryMessages(
	     Constants.rongCloud.ConversationType[$scope.conversation.conversationType],
	     $scope.conversation.targetId,
	     $scope.conversation.latestMessageId,
	     50,
	     resultCallback);
	     }*/
	
	    function getLatestMessages() {
	        JSCommand.rongcloud.getLatestMessages(targetId, conversationType, 20);
	    }
	};
	
	Conversation.$inject = [
	    '$scope',
	    '$ionicScrollDelegate',
	    '$stateParams',
	    'Constants',
	    'JSUtils',
	    'JSCache',
	    'JSCommand',
	    '$ionicModal'
	];
	
	module.exports = Conversation;

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "<!--<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>-->\r\n<div class=\"tipbox-content-img\"  ng-click=\"closeModal()\">\r\n    <table style=\"height: 100% ;width: 100% ;  text-align: center;\">\r\n        <tr>\r\n            <td>\r\n                <img  ng-src=\"{{localUriString}}\" >\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n"

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/27.
	 */
	
	module.exports = {
	    template  : __webpack_require__(101),
	    controller: __webpack_require__(102)
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = "<ion-view adjust-bottom-by=\"currentStatus\" view-title=\"{{minor.nickName}}\">\r\n    <ion-nav-bar class=\"bar-technician__circle\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <!--<button class=\"button button-clear\" ui-sref=\"tab.conversations.conversation-list\">-->\r\n            <button class=\"button button-clear\" ng-click=\"__goToViewAsTop('tab.conversations.conversation-list')\">\r\n                <i class=\"iconfont icon-return return-size-pop\"></i>\r\n            </button>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"chatBg\" data-perspect=\"minor\" ng-click=\"handleClickConversationArea()\">\r\n        <!--对话界面-->\r\n        <ul class=\"chat-box\">\r\n\r\n            <!--显示时间-->\r\n            <!--<li class=\"chat-now-date\">\r\n                    <span class=\"chat-now-date-bg\">\r\n                        <i class=\"chat-date\">2015-1-20</i>\r\n                        <i class=\"chat-time\">14:26:20</i>\r\n                    </span>\r\n            </li>-->\r\n\r\n            <li ng-repeat=\"message in messageList\"\r\n                    >\r\n\r\n                <div ng-if=\"message.objectName === 'RC:TxtMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n\r\n                    <img ng-src=\"{{ majorUser.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img ng-src=\"{{ minor.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        {{ message.content.content }}\r\n                    </p>\r\n                </div>\r\n\r\n                <div ng-if=\"message.objectName === 'RC:VcMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ majorUser.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ minor.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n\r\n                    <p class=\"chat-content\" ng-click=\"playVoice(message)\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time\">{{ message.content.mDuration | formatSecond }}\"</i>\r\n                </div>\r\n\r\n                <div ng-if=\"message.objectName === 'RC:ImgMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ majorUser.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ minor.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n                    <p class=\"chat-content\" ng-click=\"checkImg(message)\">\r\n                        <img ng-src=\"{{ message.content.mThumUri.uriString}}\" >\r\n                    </p>\r\n                </div>\r\n\r\n                <div ng-if=\"message.objectName === 'App:FileMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ majorUser.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ minor.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n                    <p class=\"chat-content\" ng-click=\"downFilesClick(message)\">\r\n                        <img src=\"img/wenjain.png\" style=\"max-width: 80px; height: auto\" >\r\n                        <span id=\"isDown\" style=\"display: block;color: #999;font-size: 12px;\" ng-if=\"message.messageDirection === 'RECEIVE' && !showDownFiles\">未下载</span>\r\n                        <span  style=\"display: block;color: #999;font-size: 12px;\" ng-if=\"message.messageDirection === 'RECEIVE'&& showDownFiles\">已下载</span>\r\n                        <span style=\"display: block; font-size: 12px;\" ng-if=\"message.messageDirection === 'SEND'\">发送成功</span>\r\n                        <!--<span style=\"display: block\">未下载</span>-->\r\n                    </p>\r\n                </div>\r\n\r\n            </li>\r\n\r\n            <!--<li>\r\n                <div class=\"chat-box-left\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        你好大街上电话卡说得好\r\n                    </p>\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-left\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time voice-unread\">28\"</i>&lt;!&ndash;voice-play-read&ndash;&gt;\r\n\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time  voice-read\">56\"</i>&lt;!&ndash;voice-play-unread&ndash;&gt;\r\n\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        你好大街上电话卡说得好dawd2第五大阿二份\r\n                        大概规范嘎时断时续出asdasdadasdasdasdasdasdaddawdawdawdawdawdawdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssss\r\n                    </p>\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <p class=\"chat-content\">\r\n                        <video class=\"chat-content-video\">\r\n                            <i class=\"ion-android-arrow-dropright-circle default-icon-style\"></i>\r\n                        </video>\r\n                    </p>\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n                </div>\r\n            </li>\r\n            <li class=\"clear\"></li>-->\r\n        </ul>\r\n\r\n\r\n    </ion-content>\r\n\r\n    <!-----------------底部按钮-------------------->\r\n    <div data-perspect=\"major\" class=\"feature-tabs\">\r\n        <ul class=\"enter-form\" form-text-focus=\"formTextFocus\">\r\n            <li class=\"enter-form-left\">\r\n                <i class=\"default-icon-style ion-android-apps add-button\"\r\n                   ng-show=\"\r\n                                currentStatus == status.waitForRecord ||\r\n                                currentStatus == status.recording\r\n                            \"\r\n                   ng-click=\"switchStatusTo(status.typing);\"></i>\r\n\r\n                <i class=\"default-icon-style ion-mic-a add-button\"\r\n                   ng-show=\"\r\n                                currentStatus == status.typing ||\r\n                                currentStatus == status.showingSelectFeatures\r\n                            \"\r\n                   ng-click=\"switchStatusTo(status.waitForRecord);\"></i>\r\n            </li>\r\n            <li class=\"enter-form-mid\">\r\n                <input type=\"text\" class=\"item-input chat-input\"\r\n                       ng-click=\"switchStatusTo(status.typing);\"\r\n                       ng-model=\"form.text\"\r\n                       ng-show=\"\r\n                                currentStatus == status.typing ||\r\n                                currentStatus == status.showingSelectFeatures\r\n                              \">\r\n                <button class=\"button keep-press-say-button\"\r\n                        ng-show=\"\r\n                            currentStatus == status.waitForRecord ||\r\n                            currentStatus == status.recording\r\n                        \"\r\n                        ng-click=\"handleRecord()\"\r\n                        >\r\n                    <span ng-if=\"currentStatus == status.waitForRecord\">按住&nbsp;说话</span>\r\n                    <span ng-if=\"currentStatus == status.recording\">松开&nbsp;结束</span>\r\n                </button>\r\n            </li>\r\n            <li class=\"enter-form-right\">\r\n                <i class=\"default-icon-style chat-send-btn add-button\"\r\n                   ng-show=\"\r\n                        currentStatus == status.typing &&\r\n                        form.text.length > 0\r\n                   \"\r\n                   ng-click=\"sendMessage();\">发送</i>\r\n\r\n                <i class=\"default-icon-style ion-ios-plus-outline add-button\"\r\n                   ng-show=\"\r\n                        (currentStatus == status.typing && form.text.length <= 0) ||\r\n                        currentStatus == status.waitForRecord ||\r\n                        currentStatus == status.showingSelectFeatures ||\r\n                        currentStatus == status.recording\r\n                   \"\r\n                   ng-click=\"switchStatusTo(status.showingSelectFeatures);\"></i>\r\n            </li>\r\n        </ul>\r\n        <!--//底部显示远程协助等按钮-->\r\n       <ul class=\"feature-tabs-list\" ng-show=\"currentStatus == status.showingSelectFeatures\" chat-menu>\r\n           <li>\r\n               <a ng-click=\"handleShowRequestRemoteAssistance()\"><i\r\n                       class=\"iconfont icon-zaixianxiezhu feature-zaixianxiezhu\"></i>\r\n                   <p>请求协助</p></a>\r\n\r\n           </li>\r\n             <li>\r\n                 <a href=\"\" ui-sref=\"tab.conversations.vehicleInformation({targetId:targetId,conversationType:conversationType})\"><i class=\"iconfont icon-cheliangxinxi feature-cheliangxinxi\"></i>\r\n\r\n                     <p>车辆信息</p></a>\r\n\r\n             </li>\r\n             <li>\r\n                 <a href=\"\" ng-click=\"APP2PCRequestRemoteAssistance()\"><i\r\n                         class=\"iconfont icon-shipin feature-APP2PC\"></i>\r\n\r\n                     <p> 链接PC</p></a>\r\n\r\n             </li>\r\n           <li>\r\n               <a ng-click=\"sendPicClick()\">\r\n                   <i class=\"iconfont icon-tupian feature-tupian\"></i>\r\n                   <p>图片</p>\r\n               </a>\r\n           </li>\r\n           <li>\r\n               <a ng-click=\"sendFilesClick()\">\r\n                   <i class=\"iconfont icon-tupian feature-wenjian\"></i>\r\n                   <p>文件</p>\r\n               </a>\r\n           </li>\r\n             <!--\r\n             <li>\r\n                 <a href=\"\"><i class=\"iconfont icon-shipin feature-shipin\"></i>\r\n\r\n                     <p>视频</p></a>\r\n             </li>\r\n             <li>\r\n                 <a href=\"\"><i class=\"iconfont icon-jiancebaogao feature-jiancebaogao\"></i>\r\n\r\n                     <p>检测报告</p></a>\r\n\r\n             </li>\r\n\r\n             <li>\r\n                 <a href=\"\"><i class=\"iconfont icon-ditu feature-ditu\"></i>\r\n\r\n                     <p>位置</p></a>\r\n             </li>-->\r\n\r\n             <li class=\"clear\">\r\n\r\n             </li>\r\n         </ul>\r\n    </div>\r\n\r\n</ion-view>"

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/23.
	 */
	
	var _ = __webpack_require__(5);
	
	var Conversation = function ($scope,
	                             $stateParams,
	                             $ionicHistory,
	                             $ionicScrollDelegate,
	                             $ionicModal,
	                             Constants,
	                             JSCommand,
	                             JSCache,
	                             $rootScope,
	                             $interval) {
	
	    console.log('enter the conversation private controller...');
	    $scope.showDownFiles=false;
	    // 这里就是与我对话的用户ID
	    $scope.targetId = $stateParams.targetId;
	
	    // 我自己的信息
	    $scope.majorUser = JSCache.get(Constants.YHCache.loginInfo);
	
	    // 与我对话的用户
	    $scope.minor = [];
	
	    // 设置会话类型为私聊
	    $scope.conversationType = Constants.rongCloud.ConversationType.PRIVATE;
	
	    // 本次协助ID
	    $scope.assistId = 0;
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var status = json.status;
	            if(status === Constants.status.success){
	                var what = json.what;
	                if(what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO){
	                    // 这个是我进入单聊界面时发起的查询用户详情后，服务器返回的对方用户资料，一般包含昵称，头像，等级等信息
	                    $scope.$apply(function(){
	                        $scope.minor = json.data.user;
	                        console.log("$scope.minor",$scope.minor);
	                    })
	                }
	                else if (what === Constants.YHWhat.app.CCDPBusinessAPP2PC) {
	
	                }
	                else if(what === Constants.YHWhat.ccdp.CCDP_REQ_ASSIST){
	                    // 我接收到服务器返回的发起远程协助的指令
	                    $scope.handleShowModal('RequestRemoteAssistance');
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_END_ASSIST) {
	                    // 我接收到的服务器返回的拒绝远程协助的指令
	                    $scope.handleHideModal('RequestRemoteAssistance');
	                    $rootScope._modalRequestedRemoteAssistance.hide();
	                }
	                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST){
	
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_PUSH_ENDASSIST) {
	                    // 我收到服务器推送给我的远程协助结束指令
	                    $scope.handleHideModal('RequestRemoteAssistance');
	                    $rootScope._modalRequestedRemoteAssistance.hide();
	                }
	                else if(what === Constants.YHWhat.ccdp.CCDP_PUSH_ACCEPTASSIST){
	                    // 我收到服务器推送给我的远程协助接受指令
	                    var Params = {
	                        id: parseInt($scope.targetId),
	                        value: Constants.differenceRemoteRequest.initiator
	                    };
	
	                    JSCommand.app.getCCDPBusinessList(Params);
	                    $scope.handleHideModal('RequestRemoteAssistance');
	                }
	                else if(what === Constants.YHWhat.app.sendPic){
	                    // 发送图片
	                    console.log("图片发送成功！");
	                }
	                else if(what === Constants.YHWhat.app.downFiles){
	                    // 发送文件
	                    console.log("文件下载成功!");
	                    $scope.downFilesMessage=json.data;
	                    console.log("$scope.downFilesMessage!",$scope.downFilesMessage);
	                    $scope._modalisDownFiles.show();
	                    var m = 10;
	                    $scope.promptTime = $interval(function () {
	                        m--;
	                        if (m <= 0) {
	                            $scope._modalisDownFiles.hide();
	                            $scope.showDownFiles=true;
	                        }
	                    }, 1000);
	                }
	
	            }else{
	                console.log("Login fail:" + json["reason"]);
	            }
	
	        } catch (error) {
	
	        }
	    });
	    
	    //发送图片
	    $scope.sendPicClick= function () {
	        JSCommand.app.sendPicCont($stateParams.targetId,parseInt(1));
	    };
	    console.log('$scope.majorUser',$scope.majorUser);
	    //文件传输
	    $scope.sendFilesClick= function () {
	        JSCommand.app.sendFilesCont($stateParams.targetId,parseInt(1));
	    };
	    //文件下载
	    $scope.downFilesClick= function (messages) {
	        var userId=$scope.majorUser.id;
	        if(userId != messages.senderUserId){
	            JSCommand.app.downFilesCont(messages.senderUserId,messages.content.content,messages.content.fileName);
	        }
	    };
	    $scope._modalisDownFiles = $ionicModal.fromTemplate(__webpack_require__(103), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.closeModal= function () {
	        $scope._modalisDownFiles.hide();
	    };
	    /*
	      查与我对话的用户详情
	     */
	    JSCommand.ccdp.queryUserDetail(parseInt( $scope.targetId, 10));
	
	    $scope._modalRequestRemoteAssistance = $ionicModal.fromTemplate(__webpack_require__(104), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.handleShowModal = function (modalName) {
	        var modal = $scope['_modal' + modalName];
	        if (modal && modal.show) {
	            modal.show();
	        } else {
	            console.log('modal: ', '_modal' + modalName, ' 不存在');
	        }
	    };
	
	    $scope.handleHideModal = function (modalName) {
	        var modal = $scope['_modal' + modalName];
	        if (modal && modal.hide) {
	            modal.hide();
	        } else {
	            console.log('modal: ', '_modal' + modalName, ' 不存在');
	        }
	    };
	
	    //var targetId;
	    //var getProfile =JSCache.getProfile();
	    $scope.handleShowRequestRemoteAssistance = function () {
	        JSCommand.ccdp.requestRemoteAssist($scope.targetId);
	
	        //// 模拟数据回复
	        //var message = {};
	        //// message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
	        //message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	
	    $scope.handleHideRequestRemoteAssistance = function () {
	        JSCommand.ccdp.finishRemoteAssist($scope.targetId);
	
	        //// 模拟数据回复
	        //var message = {};
	        //message["what"] = Constants.YHWhat.ccdp.CCDP_END_ASSIST;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	
	    $scope.APP2PCRequestRemoteAssistance = function () {
	
	        //JSCommand.CCDPBusinessAPP2PC({
	        //    onSuccess : function (successMessage){
	        //        console.log('successMessage',successMessage);
	        //    },
	        //    onError : function(){
	        //
	        //    }
	        //})
	        JSCommand.app.CCDPBusinessAPP2PC();
	    };
	
	    //监听返回键
	    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	    //    //console.log('arguments',arguments)
	    //    $scope._modalRequestRemoteAssistance.hide();
	    //
	    //});
	    $scope.$on('$destroy', function () {
	        $scope._modalRequestRemoteAssistance.remove();
	    });
	};
	
	Conversation.$inject = [
	    '$scope',
	    '$stateParams',
	    '$ionicHistory',
	    '$ionicScrollDelegate',
	    '$ionicModal',
	    'Constants',
	    'JSCommand',
	    'JSCache',
	    '$rootScope',
	    '$interval'
	];
	
	module.exports = Conversation;

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <h4 class=\"tipbox-title\">\r\n        下载成功\r\n    </h4>\r\n\r\n    <p class=\"down-files\">\r\n        存放路径：<br>\r\n        {{downFilesMessage}}\r\n    </p>\r\n</div>"

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view>\r\n    <ion-content class=\"item-request-bg\">\r\n        <div class=\"request-person-block\">\r\n            <p class=\"request-prompt-text prompt-text-location\">正在请求远程协助...</p>\r\n            <div class=\"item-request-head-portrait\">\r\n                <img class=\"request-head-portrait\" ng-src=\"{{userIcon | prefixSrc}}\">\r\n            </div>\r\n            <p class=\"request-nickname\">{{nickName}}</p>\r\n        </div>\r\n        <div class=\"request-accept-and-refused clearfix\">\r\n            <div class=\"requesting-refused-block\">\r\n                <div class=\"item-request-refused-head-portrait\" ng-click=\"handleHideRequestRemoteAssistance()\">\r\n                    <img class=\"request-accept-head-portrait\" src=\"img/request-refused.png\">\r\n                </div>\r\n                <p class=\"request-refused-text-describe\">取消</p>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>"

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/27.
	 */
	
	module.exports = {
	    template  : __webpack_require__(106),
	    controller: __webpack_require__(107)
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = "<ion-view adjust-bottom-by=\"currentStatus\" view-title=\"{{group.groupName}}\">\r\n    <ion-nav-bar class=\"bar-technician__circle\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <!--<button class=\"button button-clear\" ui-sref=\"tab.conversations.conversation-list\">-->\r\n            <button class=\"button button-clear\" ng-click=\"__goToViewAsTop('tab.conversations.conversation-list')\">\r\n                <i class=\"iconfont icon-return return-size-pop\"></i>\r\n            </button>\r\n        </ion-nav-buttons>\r\n        <ion-nav-buttons side=\"right\">\r\n            <button class=\"button button-icon\" ui-sref=\"tab.conversations.group-edit({id: group.id})\">\r\n            <!--<button class=\"button button-icon\" ng-click=\"__goToViewAsTop('tab.circleEditGroupChatDetail', {id: group.id})\">-->\r\n                <i class=\"iconfont icon-friends menu-set-size\"></i>\r\n            </button>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content  class=\"chatBg\" data-perspect=\"minor\">\r\n\r\n        <!--对话界面-->\r\n        <ul class=\"chat-box\">\r\n\r\n            <!--显示时间-->\r\n            <!--<li class=\"chat-now-date\">\r\n                    <span class=\"chat-now-date-bg\">\r\n                        <i class=\"chat-date\">2015-1-20</i>\r\n                        <i class=\"chat-time\">14:26:20</i>\r\n                    </span>\r\n            </li>-->\r\n\r\n            <li ng-repeat=\"message in messageList\"\r\n                    >\r\n\r\n                <div ng-if=\"message.objectName === 'RC:TxtMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ major.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img src=\"img/engineer-Zhao.png\"\r\n                         ng-src=\"{{ findGroupMemberById(message.senderUserId).icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        {{ message.content.content }}\r\n                    </p>\r\n                </div>\r\n\r\n                <div ng-if=\"message.objectName === 'RC:VcMsg'\"\r\n                     ng-class=\"{\r\n                        'chat-box-right': message.messageDirection == 'SEND',\r\n                        'chat-box-left': message.messageDirection == 'RECEIVE'\r\n                    }\">\r\n\r\n                    <img src=\"img/engineer-Zhao.png\" ng-src=\"{{ major.icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'SEND'\">\r\n                    <img src=\"img/engineer-Zhao.png\"\r\n                         ng-src=\"{{ findGroupMemberById(message.senderUserId).icon | prefixSrc }}\"\r\n                         ng-if=\"message.messageDirection === 'RECEIVE'\">\r\n\r\n                    <p class=\"chat-content\" ng-click=\"playVoice(message)\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time\">{{ message.content.mDuration | formatSecond }}\"</i>\r\n                </div>\r\n\r\n            </li>\r\n\r\n            <!--<li>\r\n                <div class=\"chat-box-left\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        你好大街上电话卡说得好\r\n                    </p>\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-left\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time voice-unread\">28\"</i>&lt;!&ndash;voice-play-read&ndash;&gt;\r\n\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        <i class=\"iconfont icon-voice3 icon-voice-wave\"></i>\r\n                    </p>\r\n                    <i class=\"chat-content-voice-time  voice-read\">56\"</i>&lt;!&ndash;voice-play-unread&ndash;&gt;\r\n\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"chat-content\">\r\n                        你好大街上电话卡说得好dawd2第五大阿二份\r\n                        大概规范嘎时断时续出asdasdadasdasdasdasdasdaddawdawdawdawdawdawdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssss\r\n                    </p>\r\n                </div>\r\n            </li>\r\n\r\n            <li>\r\n                <div class=\"chat-box-right\">\r\n                    <p class=\"chat-content\">\r\n                        <video class=\"chat-content-video\">\r\n                            <i class=\"ion-android-arrow-dropright-circle default-icon-style\"></i>\r\n                        </video>\r\n                    </p>\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n                </div>\r\n            </li>\r\n            <li class=\"clear\"></li>-->\r\n        </ul>\r\n\r\n    </ion-content>\r\n\r\n    <!-----------------底部按钮-------------------->\r\n    <div data-perspect=\"major\" class=\"feature-tabs\" form-text-focus=\"formTextFocus\">\r\n        <ul class=\"enter-form\">\r\n            <li class=\"enter-form-left\">\r\n                <i class=\"default-icon-style ion-android-apps add-button\"\r\n                   ng-show=\"\r\n                                currentStatus == status.waitForRecord ||\r\n                                currentStatus == status.recording\r\n                            \"\r\n                   ng-click=\"switchStatusTo(status.typing);\"></i>\r\n\r\n                <i class=\"default-icon-style ion-mic-a add-button\"\r\n                   ng-show=\"\r\n                                currentStatus == status.typing ||\r\n                                currentStatus == status.showingSelectFeatures\r\n                            \"\r\n                   ng-click=\"switchStatusTo(status.waitForRecord);\"></i>\r\n            </li>\r\n            <li class=\"enter-form-mid\">\r\n                <input type=\"text\" class=\"item-input chat-input\"\r\n                       ng-click=\"switchStatusTo(status.typing);\"\r\n                       ng-model=\"form.text\"\r\n                       ng-show=\"\r\n                                currentStatus == status.typing ||\r\n                                currentStatus == status.showingSelectFeatures\r\n                              \">\r\n                <button class=\"button keep-press-say-button\"\r\n                        ng-show=\"\r\n                            currentStatus == status.waitForRecord ||\r\n                            currentStatus == status.recording\r\n                        \"\r\n                        ng-click=\"handleRecord()\"\r\n                        >\r\n                    <span ng-if=\"currentStatus == status.waitForRecord\">按住&nbsp;说话</span>\r\n                    <span ng-if=\"currentStatus == status.recording\">松开&nbsp;结束</span>\r\n                </button>\r\n            </li>\r\n            <li class=\"enter-form-right\">\r\n                <i class=\"default-icon-style chat-send-btn add-button\"\r\n                   ng-show=\"\r\n                        currentStatus == status.typing &&\r\n                        form.text.length > 0\r\n                   \"\r\n                   ng-click=\"sendMessage();\">发送</i>\r\n\r\n                <i class=\"default-icon-style ion-ios-plus-outline add-button\"\r\n                   ng-show=\"\r\n                        (currentStatus == status.typing && form.text.length <= 0) ||\r\n                        currentStatus == status.waitForRecord ||\r\n                        currentStatus == status.showingSelectFeatures ||\r\n                        currentStatus == status.recording\r\n                   \"\r\n                   ng-click=\"switchStatusTo(status.showingSelectFeatures);\"></i>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"feature-tabs-list\" ng-show=\"currentStatus == status.showingSelectFeatures\">\r\n            <li>\r\n                <a ng-click=\"handleShowRequestRemoteAssistance()\"><i\r\n                        class=\"iconfont icon-zaixianxiezhu feature-zaixianxiezhu\"></i>\r\n\r\n                    <p>远程协助</p></a>\r\n\r\n            </li>\r\n            <li>\r\n                <a href=\"\"><i class=\"iconfont icon-cheliangxinxi feature-cheliangxinxi\"></i>\r\n\r\n                    <p>车辆信息</p></a>\r\n\r\n            </li>\r\n            <li>\r\n                <a href=\"\" ng-click=\"APP2PCRequestRemoteAssistance()\"><i\r\n                        class=\"iconfont icon-shipin feature-APP2PC\"></i>\r\n\r\n                    <p> 链接PC</p></a>\r\n\r\n            </li>\r\n            <li>\r\n                <a href=\"\"><i class=\"iconfont icon-tupian feature-tupian\"></i>\r\n\r\n                    <p>图片</p></a>\r\n            </li>\r\n            <li>\r\n                <a ng-click=\"sendFilesClick()\">\r\n                    <i class=\"iconfont icon-tupian feature-wenjian\"></i>\r\n                    <p>文件</p>\r\n                </a>\r\n            </li>\r\n            <!--\r\n            <li>\r\n                <a href=\"\"><i class=\"iconfont icon-shipin feature-shipin\"></i>\r\n\r\n                    <p>视频</p></a>\r\n            </li>\r\n            <li>\r\n                <a href=\"\"><i class=\"iconfont icon-jiancebaogao feature-jiancebaogao\"></i>\r\n\r\n                    <p>检测报告</p></a>\r\n\r\n            </li>\r\n            <li>\r\n                <a href=\"\"><i class=\"iconfont icon-ditu feature-ditu\"></i>\r\n\r\n                    <p>位置</p></a>\r\n            </li>-->\r\n\r\n            <li class=\"clear\">\r\n\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n</ion-view>"

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/9/23.
	 */
	
	var _ = __webpack_require__(5);
	
	var Conversation = function ($scope,
	                             $stateParams,
	                             $ionicHistory,
	                             $ionicScrollDelegate,
	                             $ionicModal,
	                             Constants,
	                             JSCache,
	                             JSCommand) {
	
	    console.log('enter the conversation group controller...');
	
	    var targetId = $stateParams.targetId;
	
	    $scope.targetId = targetId;
	    $scope.group="";
	
	    $scope.conversationType = Constants.rongCloud.ConversationType.GROUP;
	
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	
	        try {
	
	            var status = jsonResult.status;
	            if (status === Constants.status.success) {
	
	                var what = jsonResult.what;
	
	                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {
	
	                    $scope.group = jsonResult.data.group;
	                    JSCache.put(Constants.YHCache.groupInfo, jsonResult.data.group);
	                }
	            } else {
	                console.log("Login fail:" + jsonResult["reason"])
	            }
	
	
	        } catch (error) {
	
	        }
	
	    });
	
	    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));
	    $scope.major = JSCache.get(Constants.YHCache.loginInfo);
	    console.log("$scope.major",$scope.major);
	
	    $scope.findGroupMemberById = function (id) {
	        id = parseInt(id, 10);
	
	        return _.findWhere($scope.group.members, {
	            userId: id
	        });
	    };
	
	
	};
	
	Conversation.$inject = [
	    '$scope',
	    '$stateParams',
	    '$ionicHistory',
	    '$ionicScrollDelegate',
	    '$ionicModal',
	    'Constants',
	    'JSCache',
	    'JSCommand'
	];
	
	module.exports = Conversation;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(109),
	    controller: __webpack_require__(110)
	
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"群设置\">\r\n    <!--<ion-nav-buttons side=\"left\">\r\n        <button class=\"button button-clear\" ng-click=\"goBackGroup()\">\r\n            <i class=\"icon ion-ios-arrow-back\"></i>\r\n        </button>\r\n    </ion-nav-buttons>-->\r\n    <!--<ion-nav-buttons side=\"right\">-->\r\n        <!--<button class=\"button button-icon\" ng-click=\"save()\">确定</button>-->\r\n    <!--</ion-nav-buttons>-->\r\n    <ion-content class=\"item-bg\" ng-click=\"handleClickBlankArea()\">\r\n        <!--<p class=\"item-divider-empty-group\"></p>-->\r\n\r\n        <div class=\"list\">\r\n\r\n            <ul class=\"item-friends-box friend-message-box clearfix\">\r\n\r\n                <li class=\"friend-message\" ng-if=\"isShowMyIcon\">\r\n                    <img ng-src=\"{{currentUser.icon| prefixSrc }}\">\r\n\r\n                    <p class=\"friend-message-nikeName\">{{currentUser.nickName}}</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\"\r\n                    ng-repeat=\"member in group.members\">\r\n                    <a>\r\n                        <img data-id=\"{{ member.userId }}\" ng-src=\"{{member.icon | prefixSrc}}\" ng-click=\"ViewsDetails(member.userId)\">\r\n                        <span class=\"delete-friends-btn-ion\" ng-show=\"voiceShow\" ng-click=\"removeFriend(evt, member)\">\r\n                             <i class=\"iconfont icon-minus minus-btn-ion\"></i>\r\n                            <i></i>\r\n                        </span>\r\n                        <span class=\"delete-friends-hidden\">\r\n                            <i class=\"iconfont icon-minus minus-btn-ion \" ng-hide=\"voiceShow\"></i>\r\n                        </span>\r\n                    </a>\r\n\r\n                    <p class=\"friend-message-nikeName\">{{member.nickName}}</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\">\r\n                    <button type=\"button\" class=\"friend-message-ion\" ng-click=\"handleClickAddBtn()\"><i\r\n                            class=\"ion-plus\"></i>\r\n                    </button>\r\n                    <p class=\"friend-message-nikeName function-text-details\">添加成员</p>\r\n                </li>\r\n\r\n                <li class=\"friend-message\" ng-show=\"isShowRemoveFriend\">\r\n                    <button type=\"button\" class=\"friend-message-ion\" ng-click=\"handleClickRemoveBtn()\">\r\n                        <i class=\"ion-minus \"></i>\r\n                    </button>\r\n                    <p class=\"friend-message-nikeName function-text-details\">删除成员</p>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n        <p class=\"item-divider-empty-group\"></p>\r\n\r\n        <div class=\"list\">\r\n\r\n            <li class=\"item item-toggle set-group-name\">\r\n                群名称\r\n                <input type=\"text\" class=\"input-text-tight-to-left\" placeholder=\"{{ group.groupName }}\"\r\n                       ng-model=\"group.groupName\"  readonly ng-click=\"createGroupName()\">\r\n            </li>\r\n            <a class=\"item item-toggle item-group-avatar\" ng-click=\"selectAvatar()\">\r\n                群头像\r\n                <!--<img src=\"img/avatar.jpg\">-->\r\n                <img ng-src=\"{{group.icon | prefixSrc}}\">\r\n            </a>\r\n            <!--<a class=\"item item-toggle item-group-code\">\r\n                群二维码\r\n                &lt;!&ndash;<i class=\"ion-android-expand\"></i>&ndash;&gt;\r\n                <i class=\"iconfont icon-QR-code\"></i>\r\n            </a>-->\r\n            <li class=\"item item-toggle set-group-name\">\r\n                我的昵称\r\n                <input type=\"text\" class=\"input-text-tight-to-left\" placeholder=\"{{ group.groupNickName}}\"\r\n                       ng-model=\"group.groupNickName\"  readonly ng-click=\"createGroupNickName()\">\r\n            </li>\r\n\r\n        </div>\r\n        <p class=\"item-divider-empty-group\"></p>\r\n        <ul class=\"list\">\r\n            <!--<ion-toggle ng-model=\"group.isNoDisturbBoolean\" toggle-class=\"toggle toggle-balanced\">消息免打扰</ion-toggle>-->\r\n            <li class=\"item item-toggle\">\r\n                消息免打扰\r\n                <label class=\"toggle toggle-balanced\" ng-click=\"modifyIsNoDisturb()\">\r\n                    <input type=\"checkbox\" ng-model=\"group.isNoDisturb\">\r\n\r\n                    <div class=\"track\">\r\n                        <div class=\"handle\"></div>\r\n                    </div>\r\n                </label>\r\n            </li>\r\n           <!-- <a class=\"item item-toggle item-group-avatar\" ui-sref=\"tab.conversations.group-message-history({targetId: group.id})\">查看聊天记录</a>\r\n            <a class=\"item item-toggle item-group-avatar\">清空聊天记录</a>-->\r\n        </ul>\r\n        <p class=\"item-divider-empty-group\"></p>\r\n        <ul class=\"list\">\r\n            <li class=\"item item-toggle\">\r\n                允许陌生人加入群\r\n                <label class=\"toggle toggle-balanced\" ng-click=\"modifyIsAllowStranger()\">\r\n                    <input type=\"checkbox\" ng-model=\"group.isAllowStranger\">\r\n\r\n                    <div class=\"track\">\r\n                        <div class=\"handle\"></div>\r\n                    </div>\r\n                </label>\r\n            </li>\r\n            <li class=\"item item-toggle\">\r\n                群可被用户搜索\r\n                <label class=\"toggle toggle-balanced\" ng-click=\"modifyIsAllowSearch()\">\r\n                    <input type=\"checkbox\" ng-model=\"group.isAllowSearch\">\r\n\r\n                    <div class=\"track\">\r\n                        <div class=\"handle\"></div>\r\n                    </div>\r\n                </label>\r\n            </li>\r\n            <!--<a class=\"item item-toggle item-group-code\" ui-sref=\"tab.conversations.group-report({targetId: group.id})\">举报群</a>-->\r\n        </ul>\r\n        <div class=\"refund-group-btn\">\r\n            <button class=\"button button-block button-assertive\" ng-click=\"deleteSave()\">\r\n                删除并退出群\r\n            </button>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/9/30.
	 */
	
	var _ = __webpack_require__(5);
	
	var editGroupDetailCtrl = function ($scope,
	                                    $state,
	                                    JSCache,
	                                    $ionicModal,
	                                    $filter,
	                                    JSCommand,
	                                    JSUtils,
	                                    Constants,
	                                    $ionicPopup,
	                                    $stateParams,
	                                    $rootScope,
	                                    $ionicTabsDelegate) {
	
	    console.log('enter the conversation group edit controller...');
	
	    var targetId = $stateParams.id;
	    //var group = {};
	    $scope.group = '';
	    $scope.userListCategoryInAlpha='';
	    $scope.friendList='';
	    var typeagroupAvatarModal = $ionicModal.fromTemplate(__webpack_require__(111), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {
	
	                var status = json.status;
	
	                if (status === Constants.status.success) {
	                    $scope.$apply(function () {
	                        $scope.group = json.data.group;
	                        //未改动群昵称时显示自己的昵称.
	                        if ($scope.group.groupNickName === "") {
	                            $scope.group.groupNickName = JSCache.get(Constants.YHCache.loginInfo).nickName;
	                        }
	                        console.log("$scope.group", $scope.group);
	                    });
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	                    $scope.$apply(function () {
	                        $scope.friendList = _.map(json.data.friendList, function (friend) {
	                            var member = _.findWhere($scope.group.members, {
	                                userId: friend.id
	                            });
	
	                            if (member) {
	                                friend.isChecked = true;
	                                friend.selected = 1;
	                            }
	
	                            return friend;
	                        });
	                    });
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	                    typeagroupAvatarModal.hide();
	                    JSCommand.ccdp.queryMyFriends();
	                    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));
	
	                } else {
	                    typeagroupAvatarModal.hide();
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	            else if (what == Constants.YHWhat.app.previewImage) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	                    console.log("群头像设置成功");
	                    typeagroupAvatarModal.hide();
	
	                } else {
	
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	            else if (what === Constants.YHWhat.ccdp.CCDP_QUITORDELETE_GROUP) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	
	                    $state.go('tab.conversations.conversation-list');
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));
	    // 获取选择好友列表
	    JSCommand.ccdp.queryMyFriends();
	    function getUserList(Arr) {
	        var userListArr = [];
	        var searchUser = $filter('searchUser')(Arr, $scope.SearchUser.nickName);
	        $scope.userListCategoryInAlpha = JSUtils.rankingAccording(searchUser);
	        _.forEach($scope.userListCategoryInAlpha, function (userItem) {
	            _.forEach(userItem.userList, function (userObj, index) {
	                userListArr.push(userObj)
	            });
	        });
	        return userListArr;
	    }
	
	    $scope.goBackGroupList = function () {
	        $scope.selectFriendModal.hide();
	    };
	
	    $scope.groupResult = {};
	    $scope.SearchUser = {     //根据输入搜索
	        nickName: ''
	    };
	
	    $scope.isShowRemoveFriend = false; //删除成员
	
	
	    var userProfile = JSCache.get(Constants.YHCache.loginInfo);
	    var id = userProfile.id;
	    var groupId = JSCache.get(Constants.YHCache.groupInfo).id;//获取群id
	    var advocateId = (JSCache.get(Constants.YHCache.groupInfo).advocateId).toString();//获取群主id
	
	
	
	
	    $scope.selectFriendModal = $ionicModal.fromTemplate(__webpack_require__(112), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    //TODO 初始群设置信息
	    if (advocateId == userProfile.id) {
	        $scope.isShowMyIcon = true;
	        $scope.isShowRemoveFriend = true;
	        $scope.currentUser = userProfile;
	    } else {
	        $scope.isShowMyIcon = false;
	    }
	
	
	    $scope.$watch('SearchUser.nickName', function () {
	        getUserList($scope.friendList);
	    }, true);
	
	    //添加按钮
	    $scope.handleClickAddBtn = function () {
	        $scope.userListCategoryInAlpha = JSUtils.rankingAccording($scope.friendList);
	        $scope.selectFriendModal.show();
	    };
	
	    // 保存数据，新增群聊好友
	    $scope.saveSelected = function () {
	        _.forEach($scope.userListCategoryInAlpha, function (category) {
	            _.forEach(category.userList, function (user) {
	
	                if (user.isChecked && user.selected != 1) {
	                    // 把新选中的 user 放进 群成员列表中
	                    user.userId = user.id;
	                    $scope.group.members.push(user);
	
	                    var friend = _.findWhere($scope.friendList, {
	                        userId: user.id
	                    });
	
	                    if (friend) {
	                        friend.isChecked = true;
	                        friend.selected = 1;
	                    }
	                }
	            });
	        });
	
	        var userIdList = _.pluck($scope.group.members, "userId");
	        var value = JSON.stringify(userIdList);
	
	        $scope.selectFriendModal.hide();
	        JSCommand.ccdp.updateGroup(groupId, 1, value, id);
	    };
	
	
	    /***阻止事件冒泡机制*******/
	    $scope.stopEventBubble = function (event) {
	        var e = event || window.event;
	
	        if (e && e.stopPropagation) {
	            e.stopPropagation();
	        }
	        else {
	            e.cancelBubble = true;
	        }
	    };
	
	    /**删除群成员***/
	    $scope.removeFriend = function (evt, member) {
	        $scope.stopEventBubble();
	
	        // 需删除成员的索引
	        var memberIndex = $scope.group.members.indexOf(member);
	        // 删除该成员
	        $scope.group.members.splice(memberIndex, 1);
	
	        var value = member.userId;
	        JSCommand.ccdp.updateGroup(groupId, 2, value, id);
	
	        var friendToBeUnSelect = _.findWhere($scope.friendList, {
	            id: member.id
	        });
	
	        // 若被删除的群成员是自己的好友, 从好友列表中反选被删除的成员
	        if (friendToBeUnSelect) {
	            friendToBeUnSelect.isChecked = false;
	            friendToBeUnSelect.selected = 0;
	        }
	
	    };
	
	    $scope.voiceShow = false;
	    $scope.handleClickRemoveBtn = function (evt) {
	        $scope.voiceShow = !$scope.voiceShow;
	        $scope.isShowAddFriend = false;
	        $scope.isShowRemoveFriend = false;
	        $scope.stopEventBubble(evt);
	    };
	    $scope.hideDeleteBtn = function () {
	        $scope.voiceShow = false;
	    };
	
	    //TODO  单击空白让增加删除回到最初状态
	    $scope.handleClickBlankArea = function () {
	        $scope.voiceShow = false;
	
	        if (advocateId == id) {
	            $scope.isShowAddFriend = true;//显示添加按钮
	            $scope.isShowRemoveFriend = true;//显示删除按钮
	        } else {
	            $scope.isShowAddFriend = true;//显示添加按钮
	            $scope.isShowRemoveFriend = false;//不显示删除按钮
	        }
	    };
	
	//modify groupName
	    var groupName = $ionicModal.fromTemplate(__webpack_require__(113), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.createGroupName = function () {
	        groupName.show();
	    };
	
	    $scope.closeModifyGroupName = function () {
	        groupName.hide();
	    };
	
	    /***end***/
	
	        //点击成员头像进入好友详情页面
	    $scope.ViewsDetails = function (id) {
	        if (!$scope.voiceShow) {
	            console.log('id', id);
	            $state.go('tab.conversations.user-detail', {id: id});
	        }
	    };
	    //判断obj 是否为空
	    function isEmptyObject(obj) {
	        for (var key in obj) {
	            return false;
	        }
	        return true;
	    }
	
	    $scope.groupModal = {
	        name: '',
	        groupNickNameL: ''
	    };
	
	    $scope.groupNameSubmit = function (error) {
	        console.log(error);
	        if (isEmptyObject(error)) {
	            $scope.group.name = $scope.groupModal.name;
	            JSCommand.ccdp.updateGroup(groupId, 4, $scope.group.name, id);
	            groupName.hide();
	        }
	    };
	
	    //群昵称修改开始----弹窗
	    var groupNickName = $ionicModal.fromTemplate(__webpack_require__(114), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.createGroupNickName = function () {
	        groupNickName.show();
	    };
	    $scope.closeModifyNickName = function () {
	        groupNickName.hide();
	    };
	    $scope.groupNickNameSubmit = function () {
	        $scope.group.groupNickName = $scope.groupModal.groupNickName;
	        JSCommand.ccdp.updateGroup(groupId, 5, $scope.group.groupNickName, id);
	        groupNickName.hide();
	    };
	
	    //修改头像
	
	   $scope.selectAvatar = function () {
	        typeagroupAvatarModal.show();
	    };
	    $scope.modifyPersonalAvatar = function () {
	        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP;
	        console.log('Rpc_Cmd', Rpc_Cmd);
	        var groudId= targetId ;
	        var key = 3;
	        JSCommand.app.getPreviewImage(groudId,Rpc_Cmd, key);
	    };
	    $scope.closeModal = function () {
	        typeagroupAvatarModal.hide();
	    };
	
	    /*******************************
	     * 消息免打扰
	     */
	
	        //$scope.$watch('group.isNoDisturb', function () {
	        //    group.isNoDisturb = JSUtils.transformBooleanToInt($scope.group.isNoDisturb);
	        //}, true);
	    $scope.modifyIsNoDisturb = function () {
	        JSCommand.ccdp.updateGroup(groupId, 6, $scope.group.isNoDisturb, id);
	    };
	
	    /****
	     * 否允许陌生人加群
	     */
	        //$scope.$watch('group.isAllowStrangerBoolean',function(){
	        //    group.isAllowStranger = JSUtils.transformBooleanToInt(group.isAllowStrangerBoolean);
	        //},true);
	    $scope.modifyIsAllowStranger = function () {
	        JSCommand.ccdp.updateGroup(groupId, 7, $scope.group.isAllowStranger, id);
	    };
	
	    /****
	     * 否允许被搜索
	     */
	        //$scope.$watch('group.isAllowSearchBoolean',function(){
	        //    group.isAllowSearch = JSUtils.transformBooleanToInt(group.isAllowSearchBoolean);
	        //},true);
	    $scope.modifyIsAllowSearch = function () {
	        JSCommand.ccdp.updateGroup(groupId, 8, $scope.group.isAllowSearch, id);
	    };
	
	
	    //返回上一层按钮
	    $scope.goBackGroup = function () {
	        $scope.selectFriendModal.hide();
	
	        $state.go('tab.messageConversation', {
	            targetId: $stateParams.id,
	            conversationType: 'GROUP'
	        });
	
	    };
	    $scope.deleteSave = function () {
	
	        var userId = id;
	
	        //弹框提示似乎比较合理~~~~
	        var confirmPopup = $ionicPopup.confirm({
	            //title: 'Consume Ice Cream',
	            template: '删除并退出后，将不再接收此群聊信息',
	            buttons: [{
	                text: '取消',
	                type: 'button-default',
	                onTap: function () {
	                    return false;
	                }
	            }, {
	                text: '确定',
	                type: 'button-positive',
	                onTap: function () {
	                    return true;
	                }
	            }]
	        });
	        confirmPopup.then(function (res) {
	            if (res) {
	                JSCommand.ccdp.quit_deleteGroup(groupId);
	            } else {
	            }
	        });
	    };
	
	
	    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	    //    //console.log('arguments',arguments)
	    //    $scope.selectFriendModal.hide();
	    //    groupNickName.hide();
	    //    groupName.hide()
	    //});
	
	    $scope.$on('$destroy', function () {
	        $scope.selectFriendModal.remove();
	        groupNickName.remove();
	        groupName.remove()
	    });
	
	};
	editGroupDetailCtrl.$inject = [
	    '$scope',
	    '$state',
	    'JSCache',
	    '$ionicModal',
	    '$filter',
	    'JSCommand',
	    'JSUtils',
	    'Constants',
	    '$ionicPopup',
	    '$stateParams',
	    '$rootScope',
	    '$ionicTabsDelegate'
	];
	module.exports = editGroupDetailCtrl;

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <h4 class=\"tipbox-title\">\r\n        头像选择\r\n    </h4>\r\n    <!--<button  type=\"button\"  class=\"help-info-button individual-set-tips-button choose-avatar-type\" >相机拍摄</button>-->\r\n    <button  type=\"button\"  class=\"help-info-button individual-set-tips-button\" ng-click=\"modifyPersonalAvatar()\">从相册中选择</button>\r\n</div>"

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"goBackGroupList()\">\r\n                <i class=\"iconfont icon-return return-size-pop\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">选择群成员</h1>\r\n\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"saveSelected()\">\r\n                确定\r\n            </button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box\">\r\n                <label class=\"item-input find-item-input\">\r\n                    <i class=\"iconfont icon-search placeholder-icon search-icon\"></i>\r\n                    <input type=\"text\" class=\"find-text\" placeholder=\"搜索好友\" ng-model=\"SearchUser.nickName\" >\r\n                </label>\r\n            </div>\r\n        </div>\r\n\r\n        <div ng-repeat=\"category in userListCategoryInAlpha\">\r\n            <p class=\"item-divider-empty letter-results-describe\">{{category.initial}}</p>\r\n\r\n            <div class=\"list\">\r\n                <div class=\"item-friends-box\">\r\n                    <div class=\"group-chat-block remove-top-bottom-border\" ng-repeat=\"user in category.userList\">\r\n                        <div class=\"remove-bottom-border\">\r\n                            <!--<ion-checkbox class=\"item-checkbox-technician__circle\" ng-model=\"user.isChecked\"\r\n                                          ng-disabled=\"user.selected===1&&user.isChecked\">\r\n                                <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                                <span class=\"item-checkbox-technician__circle-text\">{{ user.nickName }}</span>\r\n                            </ion-checkbox>-->\r\n                            <p class=\"item item-checkbox checkbox-img-block\">\r\n                                <img ng-src=\"{{ user.icon | prefixSrc }}\">\r\n                                <label class=\"checkbox clearfix\">\r\n                                    <input class=\"checkbox-input-locat\" type=\"checkbox\"  ng-model=\"user.isChecked\"\r\n                                           ng-disabled=\"user.selected===1&&user.isChecked\">\r\n                                </label>\r\n                                <span class=\"friends-checkbox-nikename\">{{ user.nickName }}</span>\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <p class=\"list-number\" ng-if=\"friendList.length>0\">{{friendList.length}}个联系好友</p>\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\">\r\n    <div class=\"tipbox-content\" style=\"width:80%;\">\r\n        <form name=\"modifyGroupName\" ng-submit=\"groupNameSubmit(modifyGroupName.$error)\" novalidate>\r\n            <div class=\"change-name-content\">\r\n                <h4 class=\"tipbox-title\">群名称</h4>\r\n                <label><input check-group-name class=\"change-name-input\" type=\"text\"  ng-model=\"groupModal.name\" placeholder=\"{{ group.groupName }}\" ng-maxlength=\"20\" required  name=\"name\"/></label>\r\n                <div class=\"error\" ng-messages=\"modifyGroupName.name.$error\">\r\n                    <p class=\"change-name-tips\" ng-message=\"required\">请输入群名称</p>\r\n                    <p class=\"change-name-tips\" ng-message=\"maxlength\">不能大于20个字</p>\r\n                    <p class=\"change-name-tips\" ng-message=\"groupName\">只能包含中文、下划线、数字、字母</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"button-bar individual-set-button-bar\">\r\n                <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"  ng-click=\"closeModifyGroupName()\">取消</a>\r\n                <input type=\"submit\"  class=\"button chat-tipbox-button individual-set-button-confirm\" value=\"确定\">\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\">\r\n    <div class=\"tipbox-content\" style=\"width:80%;\">\r\n        <form name=\"modifyGroupName\" ng-submit=\"groupNickNameSubmit()\" novalidate>\r\n            <div class=\"change-name-content\">\r\n                <h4 class=\"tipbox-title\">我的名片</h4>\r\n                <label>\r\n                    <input check-group-name class=\"change-name-input\" type=\"text\"\r\n                              ng-model=\"groupModal.groupNickName\"   placeholder=\"{{ group.groupNickName}}\" required  name=\"name\"/>\r\n                </label>\r\n            </div>\r\n            <div class=\"button-bar individual-set-button-bar\">\r\n                <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"  ng-click=\"closeModifyNickName()\">取消</a>\r\n                <input type=\"submit\"  class=\"button chat-tipbox-button individual-set-button-confirm\" value=\"确定\">\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(116),
	    controller: __webpack_require__(117)
	};

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"消息记录\">\r\n    <ion-content class=\"item-bg\">\r\n        <p class=\"item-divider-empty\"></p>\r\n        <div class=\"bar bar-header item-input-inset\">\r\n            <label class=\"item-input-wrapper\">\r\n                <i class=\"icon ion-ios-search placeholder-icon\"></i>\r\n                <input type=\"search\" placeholder=\"搜索\">\r\n            </label>\r\n            <button class=\"button button-clear\">\r\n                取消\r\n            </button>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n        <div class=\"list\">\r\n            <a class=\"item item-avatar\">\r\n                <img src=\"img/avatar.jpg\">\r\n                <h2>Venkman</h2>\r\n                <p>Back off, man. I'm a scientist.</p>\r\n                <p class=\"message-search-results-time\">\r\n                    <span class=\"new-friend-state\">周三</span>\r\n                </p>\r\n            </a>\r\n            <a class=\"item item-avatar\">\r\n                <img src=\"img/avatar.jpg\">\r\n                <h2>Venkman</h2>\r\n                <p>Back off, man. I'm a scientist.</p>\r\n                <p class=\"message-search-results-time\">\r\n                    <span class=\"new-friend-state\">周二</span>\r\n                </p>\r\n            </a>\r\n            <a class=\"item item-avatar\">\r\n                <img src=\"img/avatar.jpg\">\r\n                <h2>Venkman</h2>\r\n                <p>Back off, man. I'm a scientist.</p>\r\n                <p class=\"message-search-results-time\">\r\n                    <span class=\"new-friend-state\">9月29日</span>\r\n                </p>\r\n            </a>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Created by userName on 2015/10/16.
	 */
	var ContactMessageRecord = function ($scope,$state,JSCommand) {
	
	
	};
	ContactMessageRecord.$inject = ['$scope','$state','JSCommand'];
	
	module.exports = ContactMessageRecord;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by haicheng on 2015/11/24.
	 */
	module.exports = {
	    template: __webpack_require__(119),
	    controller: __webpack_require__(120)
	
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"选择原因\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <!--<a class=\"button button-icon\" ui-sref=\"tab.conversations.group-report-evidence({targetId: group.id})\"\r\n           ng-disabled=\" !isActiveReport() \">下一步</a>-->\r\n        <a class=\"button button-icon\" ng-disabled=\"!beReportNext()\" ui-sref=\"tab.conversations.group-report-evidence({targetId: groupReport.groupId})\" ng-click=\"NextGroupEvidence()\">下一步</a>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <p class=\"item-divider-empty search-results-describe report-why-text\">请选择举报原因</p>\r\n\r\n        <div class=\"list\">\r\n            <label class=\"item item-radio\" ng-repeat=\"item in reportReason\">\r\n                <input type=\"radio\" name=\"group\" ng-click=\"serverSideChange(item)\">\r\n                <div class=\"item-content\">\r\n                    {{ item.reason }}\r\n                </div>\r\n                <i class=\"radio-icon iconfont icon-Hook hook-type\"></i>\r\n            </label>\r\n        </div>\r\n\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by haicheng on 2015/11/24.
	 */
	
	var _ = __webpack_require__(5);
	
	var ContactToReport = function ($scope,
	                                $state,
	                                $ionicModal,
	                                $stateParams,
	                                JSCommand,
	                                JSUtils,
	                                JSCache,
	                                Constants) {
	
	    console.log('enter the contact to report controller...');
	
	    //获取数据
	    $scope.groupReport = {
	        groupId: "",
	        specificReasons: ""
	    };
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json.what;
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_REPORTREASON) {
	                var status = json.status;
	                if (status === Constants.status.success) {
	                    console.log(json.data.reportReason);
	                    $scope.reportReason = json.data.reportReason;
	
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    $scope.groupReport.groupId = $stateParams.targetId;
	    console.log($stateParams.targetId);
	    //ConversationService.groupReportData().then(function (result) {
	    //    $scope.reportReason = result.reportReason;
	    //});
	
	    JSCommand.ccdp.queryReportReason();
	
	
	    $scope.otherReportModule = $ionicModal.fromTemplate(__webpack_require__(121), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    $scope.serverSideChange = function (item) {
	        $scope.groupReport.specificReasons = item.reportReason;
	        JSCache.put("reportReason", item.reason);
	        var reportReasonId = item.id;
	        if (reportReasonId == 6) {
	            $scope.otherReportModule.show();
	        }
	    };
	
	    $scope.closeOtherReportModule = function () {
	        $scope.otherReportModule.hide();
	    };
	
	    //其他原因输入框判断
	    function isEmptyObject(obj) {
	        for (var key in obj) {
	            return false;
	        }
	        return true;
	    }
	
	    $scope.groupReportSubmit = function (error) {
	        console.log(error);
	        if (isEmptyObject(error)) {
	            $scope.otherReportModule.hide();
	        }
	    };
	
	    $scope.$watch('groupReport', function () {
	        var reason = $scope.groupReport.specificReasons;
	    }, true);
	
	    //判断是否获取到原因,然后激活下一步按钮
	    $scope.beReportNext = function () {
	        return ($scope.groupReport.specificReasons !== "");
	    };
	
	    $scope.NextGroupEvidence = function () {
	        $state.go('tab.conversations.group-report-evidence', {
	            targetId: $scope.groupReport.groupId
	        });
	        $scope.closeOtherReportModule();
	    };
	
	    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
	    //    //console.log('arguments',arguments)
	    //    $scope.otherReportModule.hide();
	    //});
	
	    $scope.$on('$destroy', function () {
	        $scope.otherReportModule.remove();
	    });
	
	};
	ContactToReport.$inject = [
	    '$scope',
	    '$state',
	    '$ionicModal',
	    '$stateParams',
	    'JSCommand',
	    'JSUtils',
	    'JSCache',
	    'Constants'
	];
	
	module.exports = ContactToReport;

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\">\r\n    <div class=\"tipbox-content\" style=\"width:80%;\">\r\n        <form name=\"modifyGroupName\" ng-submit=\"groupReportSubmit(modifyGroupName.$error)\" novalidate>\r\n            <div class=\"change-name-content\">\r\n                <h4 class=\"tipbox-title\">举报原因</h4>\r\n                <label><input check-group-name class=\"change-name-input\" type=\"text\"  ng-model=\"groupReport.specificReasons\"\r\n                              placeholder=\"不能大于100个字\" ng-maxlength=\"100\" required  name=\"name\"/></label>\r\n                <div class=\"error\" ng-messages=\"modifyGroupName.name.$error\">\r\n                    <p class=\"change-name-tips\" ng-message=\"required\">请输入举报原因</p>\r\n                    <p class=\"change-name-tips\" ng-message=\"maxlength\">不能大于100个字</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"button-bar individual-set-button-bar\">\r\n                <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"  ng-click=\"closeOtherReportModule()\">取消</a>\r\n                <input type=\"submit\"  class=\"button chat-tipbox-button individual-set-button-confirm\" value=\"确定\">\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/17.
	 */
	module.exports = {
	    template : __webpack_require__(123),
	    controller:__webpack_require__(124)
	};

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"品牌\">\r\n    <ion-content class=\"item-bg\">\r\n\r\n        <div ng-repeat=\"item in brandList\">\r\n\r\n            <p class=\"item-divider-empty letter-results-describe\">{{item.initial}}</p>\r\n            <div class=\"list pic-height\" ng-repeat=\"brand in item.userList\" ui-sref=\"tab.conversations.vehicleInformation-cars({brandId:brand.id})\">\r\n                <a class=\"item item-avatar\">\r\n                    <img ng-src=\"{{ brand.icon_ur | prefixSrc }}\">\r\n\r\n                    <p class=\"\">{{ brand.name }}</p>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/17.
	 */
	var _ = __webpack_require__(5);
	
	var vehicleInformation = function ($scope,
	                                   $stateParams,
	                                   vehicleInformation,
	                                   JSCommand,
	                                   JSUtils) {
	
	    console.log('enter the vehicle information controller...');
	
	    $scope.selectedInformationList = [];
	
	    var valueObj = {};
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json.what;
	            if (what === Constants.YHWhat.app.sendVehicleInformation) {
	
	                var status = json.status;
	
	                if (status === Constants.status.success) {
	                    console.log('sendMessage onSuccess: ', json);
	                } else {
	                    console.log("Login fail:" + json["reason"])
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    $scope.brandList = JSUtils.rankingAccording(vehicleInformation.brand);
	
	    if ($stateParams.targetId && $stateParams.conversationType) {
	
	        $scope.targetId = parseInt($stateParams.targetId);
	
	        $scope.conversationType = parseInt($stateParams.conversationType);
	
	        valueObj.targetId = $scope.targetId;
	        valueObj.conversationType = $scope.conversationType;
	        //ConversationService.setReceivingParameters($scope.targetId, $scope.conversationType);
	
	        return valueObj;
	        //ConversationService.getReceivingParameters();
	
	    }
	
	    //选品牌时候的数据
	    if ($stateParams.brandId) {
	
	
	        $scope.brandId = parseInt($stateParams.brandId);
	
	        $scope.CarsSeries = vehicleInformation.series;
	
	    }
	
	    //选择车系的时候的数据
	    if ($stateParams.carsSeriesId) {
	
	        $scope.brandId = $stateParams.brandId;
	
	        $scope.carsSeriesId = $stateParams.carsSeriesId;
	
	        $scope.yearTypeList = vehicleInformation.type;
	
	    }
	
	    //选择年款后的数据
	    if ($stateParams.faultId) {
	
	        $scope.vehicleInformationObj = {};
	        _.forEach(vehicleInformation.brand, function (brandObj) {
	            if (brandObj.selected) {
	                $scope.vehicleInformationObj.brand = brandObj.name;
	            }
	        });
	
	        _.forEach(vehicleInformation.series, function (seriesObj) {
	            if (seriesObj.selected) {
	                $scope.vehicleInformationObj.series = seriesObj.name;
	            }
	        });
	
	        _.forEach(vehicleInformation.type, function (typeObj) {
	            if (typeObj.selected) {
	                $scope.vehicleInformationObj.type = typeObj.name;
	            }
	
	        });
	
	        var receivingParameters = valueObj;
	
	
	        $scope.selectedInformationList.push($scope.vehicleInformationObj);
	        var selectedInformationListStr = JSON.stringify($scope.selectedInformationList);
	
	        var content = selectedInformationListStr;
	        var pushContent = '';
	        var pushData = '';
	
	        $scope.sendVehicleInformationMessage = function () {
	            // vehicleInformationService.sendCarInfoMessage()
	            JSCommand.app.sendCarInfoMessage(receivingParameters.conversationType, receivingParameters.targetId, content, pushContent, pushData);
	        }
	
	    }
	
	};
	
	vehicleInformation.$inject = [
	    '$scope',
	    '$stateParams',
	    'vehicleInformation',
	    'JSCommand',
	    'JSUtils'
	];
	
	module.exports = vehicleInformation;

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"车系\">\r\n    <ion-content>\r\n        <div class=\"list\">\r\n\r\n          <!--  <div class=\"item item-divider\">\r\n                Candy Bars\r\n            </div-->\r\n\r\n            <a class=\"item\" href=\"#\" ng-repeat=\"cars in CarsSeries\" ui-sref=\"tab.conversations.vehicleInformation-year-type({brandId:brandId,carsSeriesId:cars.id})\">\r\n                {{cars.name}}\r\n            </a>\r\n\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"年款\">\r\n    <ion-content>\r\n        <div class=\"list\">\r\n\r\n            <!--  <div class=\"item item-divider\">\r\n                  Candy Bars\r\n              </div-->\r\n\r\n            <a class=\"item\" href=\"#\" ng-repeat=\"yearType in yearTypeList\"\r\n               ui-sref=\"tab.conversations.vehicle-fault({brandId:brandId,carsSeriesId:carsSeriesId,faultId:yearType.id})\">\r\n                {{yearType.name}}\r\n            </a>\r\n\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"车辆故障信息\">\r\n    <ion-content class=\"scroll-content ionic-scroll item-bg has-header\">\r\n        <p class=\"information-title\">请简述车辆主要故障，或车辆现状</p>\r\n        <form name=\"SolutionsText\">\r\n            <div class=\"fill-report-solution clearfix\">\r\n                <textarea ng-model=\"vehicleInformationObj.content\" class=\"solution-textarea-text\" required></textarea>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n    <ion-footer-bar class=\"clear-white-space\">\r\n        <button class=\"button button-full button-positive clear-white-space font-relation\" ng-click=\"sendVehicleInformationMessage()\">\r\n            确定\r\n        </button>\r\n    </ion-footer-bar>\r\n</ion-view>"

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/30.
	 */
	
	module.exports = {
	    template: __webpack_require__(129),
	    controller: __webpack_require__(130)
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"好友详情\" ng-view>\r\n    <ion-content class=\"has-footer item-bg\">\r\n        <div class=\"hand\">\r\n            <div class=\"hand-more\">\r\n                <div class=\"hand-more-avatar\">\r\n                    <div class=\"avatar-border-trans\"></div>\r\n                    <img class=\"avatar-img\" ng-src=\"{{ user.icon | prefixSrc }}\">\r\n\r\n                    <div class=\"personal-class clearfix\">\r\n                        <span>{{ user.grade }}级技师</span>\r\n                    </div>\r\n                </div>\r\n                <p class=\"personal-name\">\r\n                    <span class=\"the-personal-name ellipsis\">\r\n                        {{ user.nickName }}\r\n                        <span class=\"iconfont icon-man expert-icon-man\" ng-show=\"user.sex===2\"></span>\r\n                        <span class=\"iconfont icon-woman expert-icon-man\" ng-show=\"user.sex===1\"></span>\r\n                    </span>\r\n\r\n                </p>\r\n            </div>\r\n            <div class=\"hand-index\">\r\n                <span class=\"hand-index-settlement\">\r\n                    <i class=\"hand-index-value ellipsis\">{{ user.resolvedCount }}</i>\r\n                    <em class=\"hand-index-title\">解决数</em>\r\n                </span>\r\n                <span class=\"vertical-line\"></span>\r\n                <span class=\"hand-index-popularity sentiment-location-block clearfix\">\r\n                    <i class=\"hand-index-value ellipsis\">{{ user.popularity }}</i>\r\n                    <em class=\"hand-index-title clearfix\">人气</em>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <p class=\"item-divider-empty\"></p>\r\n        <div class=\"content-expert\">\r\n            <div class=\"list\">\r\n                <ul class=\"item\">\r\n                    擅长处理：\r\n                    <!--<img class=\"list-first-img\" ng-repeat=\"brand in user.professionalBrandList\"\r\n                         ng-src=\"{{ brand.icon | prefixSrc }}\">-->\r\n                    <span class=\"list-first-description set-des-color\">\r\n                     <ul class=\"clearfix\">\r\n                         <img class=\"list-first-img\" ng-repeat=\"brand in user.brandList\"\r\n                              ng-src=\"{{ brand.icon | prefixSrc }}\">\r\n                     </ul>\r\n                     </span>\r\n                </ul>\r\n                <ul class=\"item\">\r\n                    服务项目：\r\n                <span class=\"list-first-description set-des-color\">\r\n                     <ul class=\"clearfix\">\r\n                         <li class=\"with-i\" ng-repeat=\"project in user.serveList\">\r\n                             {{ project.serveName }}\r\n                         </li>\r\n                     </ul>\r\n                </span>\r\n                </ul>\r\n                <ul class=\"item  description-white-space\">\r\n                    服务介绍：\r\n                <span class=\"list-first-description set-des-color\">\r\n                    <p>{{ user.description }}</p>\r\n                </span>\r\n                </ul>\r\n                <ul class=\"item\">\r\n                    在线时间：\r\n                <span class=\"list-first-description set-text-desc-color\">\r\n                    {{ user.serveStartTime }} - {{ user.serveEndTime }}\r\n                </span>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    </ion-content>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===2\">\r\n        <button ui-sref=\"tab.conversations.conversation.PRIVATE({targetId: user.id, conversationType: 'PRIVATE'})\"\r\n                class=\"button button-full button-positive clear-white-space font-relation\">发送信息\r\n        </button>\r\n    </ion-footer-bar>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===1\">\r\n        <button class=\"button button-full button-positive-relation clear-white-space font-relation\">等待对方回应...</button>\r\n    </ion-footer-bar>\r\n    <ion-footer-bar class=\"clear-white-space\" ng-if=\"user.relation===0||user.relation===3\">\r\n        <button class=\"button button-full button-positive clear-white-space font-relation\" ng-click=\"addMyFriend()\">\r\n            加为好友\r\n        </button>\r\n    </ion-footer-bar>\r\n</ion-view>"

/***/ },
/* 130 */
/***/ function(module, exports) {

	/**
	 * Created by Andy on 2015/9/6.
	 */
	var UserDetailCtrl = function ($scope,
	                               $stateParams,
	                               Constants,
	                               JSCommand,
	                               $state,
	                               JSCache) {
	
	    console.log('enter the user detail controller...');
	    var id = $stateParams.id;
	    $scope.$on('YHJSReceiver', function (event, jsonResult) {
	        try {
	            var what = jsonResult.what;
	            var status = jsonResult.status;
	            if (status == Constants.status.success) {
	
	                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
	                    $scope.$apply(function () {
	                        $scope.user = jsonResult.data.user;
	                    });
	
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
	                    $scope.user.relation = jsonResult.user.relation;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
	                    $scope.user.relation = jsonResult.user.relation;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
	                    $scope.user.relation = jsonResult.user.relation;
	                }
	                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
	                    $state.go('tab.circle.friends')
	                }
	
	            } else {
	
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	    console.log(id);
	
	
	    $scope.disabledNewFriend=false;
	    JSCommand.ccdp.queryUserDetail(id);
	
	    $scope.addMyFriend = function (id) {
	        $scope.disabledNewFriend=true;
	        var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
	        countNewFirends.friendApplyCount--;
	        JSCache.put(Constants.YHCache.loginInfo,countNewFirends);
	        console.log("countNewFirends:",countNewFirends);
	        JSCommand.ccdp.addFriend(id);
	    };
	
	    $scope.refuse = function (id) {
	        JSCommand.ccdp.deleteFriend(id);
	    };
	
	    $scope.acceptFriend = function (id) {
	
	        JSCommand.ccdp.acceptFriend(id);
	
	    };
	
	    $scope.deleteFriend = function (id) {
	        JSCommand.ccdp.deleteFriend(id)
	    }
	
	};
	
	UserDetailCtrl.$inject = [
	    '$scope',
	    '$stateParams',
	    'Constants',
	    'JSCommand',
	    '$state',
	    'JSCache'
	];
	
	module.exports = UserDetailCtrl;

/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/11/13.
	 */
	var ConversationService = function (Constants,
	                                    BackendService) {
	
	    var valueObj = {};
	    return {
	        setReceivingParameters : function (targetId,conversationType){
	            valueObj.targetId = targetId;
	            valueObj.conversationType = conversationType;
	        },
	        getReceivingParameters : function (){
	            return valueObj;
	        },
	        requestAssistance: function (AssistanceId) {
	            var data = [
	                {
	                    type: 'int',
	                    value: AssistanceId
	                }
	            ];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.requestRemoteAssistance,
	                data: data
	            })
	        },
	        receiveRemoteAssistanceRequests: function (RecipientId) {
	            var data = [
	                {
	                    type: 'int',
	                    value: RecipientId
	                }
	            ];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.acceptRemoteAssistance,
	                data: data
	            })
	        },
	        refuseRemoteAssistance: function (rejectedPersonId) {
	            var data = [
	                {
	                    type: 'int',
	                    value: rejectedPersonId
	                }
	            ];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.refuseRemoteAssistance,
	                data: data
	            })
	        },
	        //Ⱥ�ٱ�
	        groupReportData:function(){
	            var data=[];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.groupReportData,
	                data: data
	            })
	        },
	        groupReportRequest:function(groupId,reason,chatEvidence,picEvidence){
	            var data=[
	                {
	                    type:'int',
	                    value:groupId
	                },
	                {
	                    type:'String',
	                    value:reason
	                },
	                {
	                    type:'String',
	                    value:chatEvidence
	                },
	                {
	                    type : 'String',
	                    value: JSON.stringify(picEvidence)
	                }
	            ];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.groupReportRequest,
	                data: data
	            })
	        },
	        getVehicleInformation : function (brandId,carId){
	            var data = [
	                {
	                    type:'int',
	                    value:brandId
	                },
	                {
	                    type:'int',
	                    value:carId
	                }
	            ];
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.vehicleInformation,
	                data: data
	            })
	        },
	        deleteFriend : function (friendId){
	            var data = [
	                {
	                    type:'int',
	                    value:friendId
	                }
	            ];
	
	            return BackendService.request({
	                cmd: Constants.RPC_CMD.request.deleteFriend,
	                data: data
	            })
	        }
	
	    }
	};
	
	ConversationService.$inject = [
	    'Constants',
	    'BackendService'
	];
	module.exports = ConversationService;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var _ = __webpack_require__(5);
	
	module.exports = angular.module('app.tabs.home', [
	    'ionic', __webpack_require__(6).name
	])
	    .config([
	        '$stateProvider',
	        function ($stateProvider) {
	
	            $stateProvider
	                .state('tab.home', {
	                    abstract: true,
	                    url: '/home',
	                    // cache : false, // �ſ������ᵼ���ظ�������ҳ��
	                    views: {
	                        'tab-home': __webpack_require__(133)
	                    }
	                })
	
	                .state('tab.home.my-home-page', {
	                    url: '',
	                    data: {
	                        showTabs: true
	                    },
	                    title : 'tab.home',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(135)
	                    }
	                })
	
	                .state('tab.home.person-data', {
	                    url: './home/person-data',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(138)
	                    }
	                })
	
	                .state('tab.home.real-name', {
	                    url: './home/person-data/real-name',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(144)
	                    }
	                })
	
	                .state('tab.home.expert-setting', {
	                    url: './home/expert-setting:userId',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(147)
	                    }
	                })
	
	                .state('tab.home.choose-brand', {
	                    url: './home/choose-brand:userId',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(152)
	                    }
	                })
	
	                .state('tab.home.choose-service-project', {
	                    url: '/home/choose-service-project:userId',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(155)
	                    }
	                })
	                .state('tab.home.assist-record', {
	                    url: '/home/assist-record',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(158)
	                    }
	                })
	
	                .state('tab.home.recent-consultation', {
	                    url: '/.home/recent-consultation:userId',
	                    cache : false,
	                    views: {
	                        '': __webpack_require__(161)
	                    }
	                })
	        }
	    ])
	
	
	    .directive('evaluationState', ['Constants', function (Constants) {
	        return {
	            restrict: 'E',
	            link: function (scope, element, attrs) {
	                var state = Constants.evaluationState[attrs.state];
	                element.html(state);
	            }
	        }
	    }]);


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by tapes on 2015/10/29.
	 */
	
	module.exports = {
	    template: __webpack_require__(134)
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-view></ion-nav-view>"

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	module.exports = {
	    template: __webpack_require__(136),
	    controller: __webpack_require__(137)
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"\">\r\n    <ion-content class=\"has-header item-bg\">\r\n        <div class=\"split-personal\">\r\n            <!--<span ui-sref=\"tab.more-my-messages({userId:id})\">我的消息</span>-->\r\n\r\n            <div class=\"hand\">\r\n\r\n                <div class=\"hand-more\" ui-sref=\"tab.home.person-data\">\r\n                    <div class=\"hand-more-avatar\">\r\n                        <div class=\"avatar-border-trans\"></div>\r\n                        <img class=\"avatar-img\"  ng-src=\"{{ userDetail.icon | prefixSrc }}\">\r\n                        <!-- <div class=\"personal-class\">\r\n                             <span>LV.{{userDetail.grade }}</span>\r\n                         </div>-->\r\n                        <div class=\"personal-class\">\r\n                            <span>{{ userDetail.grade }}级技师</span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p class=\"personal-name clearfix\">\r\n                        <span class=\"the-personal-name ellipsis\">\r\n                            {{ userDetail.nickName }}\r\n                            <span class=\"iconfont icon-man expert-icon-man\" ng-show=\"userDetail.sex===2\"></span>\r\n                            <span class=\"iconfont icon-woman expert-icon-man\" ng-show=\"userDetail.sex===1\"></span>\r\n                        </span>\r\n\r\n                    </p>\r\n                </div>\r\n                <div class=\"hand-more-index clearfix\">\r\n                    <span class=\"hand-more-index-settlement \">\r\n                        <i class=\"hand-index-value\">{{userDetail.resolvedCount}}</i>\r\n                        <i class=\"hand-index-title\">解决数</i>\r\n                    </span>\r\n                    <span class=\"hand-more-index-settlement the-last-settle-border\">\r\n                        <i class=\"hand-index-value\">{{userDetail.popularity}}</i>\r\n                        <i class=\"hand-index-title\">人气</i>\r\n                    </span>\r\n                    <!--金币功能暂时用不到,先注释-->\r\n                   <!-- <span class=\"hand-index-popularity\">\r\n                          <i class=\"hand-index-value\">{{userDetail.gold}}</i>\r\n                          <i class=\"hand-index-title\">金币</i>\r\n                    </span>-->\r\n                </div>\r\n            </div>\r\n            <div class=\"split-personal-other\">\r\n                <label class=\"item item-radio\" ui-sref=\"tab.home.assist-record\">\r\n                    <input type=\"radio\" name=\"group\">\r\n                    <a href=\"#\" class=\"\">\r\n                        <div class=\"item-content text-black-color\">\r\n                            <i class=\"iconfont icon-document personal-ion \"></i>\r\n                            协助记录\r\n                            <i class=\"ion-ios-arrow-forward car-ion-property\"></i>\r\n\r\n                        </div>\r\n                    </a>\r\n                </label>\r\n                <!--咨询记录能暂时用不到,先注释-->\r\n                <!--<label class=\"item item-radio\" ui-sref=\"tab.home.recent-consultation({userId:id})\">\r\n                    <input type=\"radio\" name=\"group\">\r\n                    <a href=\"#\" class=\"\">\r\n                        <div class=\"item-content text-black-color \">\r\n                            <i class=\"iconfont icon-consult personal-ion\"></i>\r\n                            咨询记录\r\n                            <i class=\"ion-ios-arrow-forward car-ion-property\"></i>\r\n\r\n                        </div>\r\n                    </a>\r\n                </label>-->\r\n            </div>\r\n\r\n            <div class=\"split-personal-other\">\r\n                <!--<label class=\"item item-radio\" ng-click=\"expertSetting()\">-->\r\n                <label class=\"item item-radio\" ui-sref=\"tab.home.expert-setting({userId: userDetail.userId})\">\r\n                    <input type=\"radio\" name=\"group\">\r\n                    <a href=\"#\">\r\n                        <div class=\"item-content text-black-color\">\r\n                            <i class=\"iconfont icon-tool-line personal-ion \"></i>\r\n                            技师设置\r\n                            <i class=\"ion-ios-arrow-forward car-ion-property\"></i>\r\n\r\n                        </div>\r\n                    </a>\r\n                </label>\r\n                <!--申请升级暂时用不到,先注释-->\r\n                <!--<label class=\"item item-radio\">\r\n                    <input type=\"radio\" name=\"group\">\r\n                    <a href=\"#\">\r\n                        <div class=\"item-content text-black-color\">\r\n                            <i class=\"iconfont icon-man-experts personal-ion \"></i>\r\n                            申请升级\r\n                            <i class=\"ion-ios-arrow-forward car-ion-property\"></i>\r\n\r\n                        </div>\r\n                    </a>\r\n                </label>-->\r\n            </div>\r\n\r\n            <div class=\"split-personal-other the-last-style\">\r\n                <label class=\"item item-radio\" ng-click=\"goToSetting()\">\r\n                    <input type=\"radio\" name=\"group\">\r\n                    <a href=\"#\" class=\"\">\r\n                        <div class=\"item-content text-black-color\">\r\n                            <i class=\"iconfont icon-set-line personal-ion \"></i>\r\n                            设置\r\n                            <i class=\"ion-ios-arrow-forward car-ion-property\"></i>\r\n                        </div>\r\n                    </a>\r\n                </label>\r\n            </div>\r\n            <div class=\"refund-group-btn\">\r\n                <button class=\"button button-block button-assertive\" ng-click=\"exitSign()\">\r\n                退 出\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var MyHomePageCtrl = function ($scope,
	                               $state,
	                               $rootScope,
	                               $ionicLoading,
	                               $ionicPopup,
	                               JSUtils,
	                               Constants,
	                               JSCache,
	                               JSCommand,
	                               $ionicTabsDelegate) {
	
	    console.log("enter the home page controller...");
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_USERINFO) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	
	                    $scope.$apply(function () {
	                        $scope.userDetail = json.data;
	                        JSCache.put(Constants.YHCache.personData,json.data);
	                    })
	
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_LOGOUT) {
	                var status = json["status"];
	                console.log("用户登出.");
	            }
	            else if (what === Constants.YHWhat.app.CCDPBusinessSystemSetting) {}
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	
	    var getUserDetail = function () {
	        JSCommand.ccdp.queryUser();
	
	        //// 模拟数据回复
	        //var message = {};
	        //message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
	        //// message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
	        //message["status"] = Constants.status.success;
	        //message["data"] = '{"msgs":[{"id":0,"value":[{"id":114,"icon":"1456455960271.png","sex":1,"nickName":"111记性不大好","userName":"13737725203"}],"type":1,"msg":"请求远程协助的人"}]}';
	        //var sMessage = JSON.stringify(message);
	        //window.YHAndroidToJs.sendToJS(sMessage);
	    };
	
	    getUserDetail();
	
	    //设置
	    $scope.goToSetting = function () {
	        console.log("进入设置~");
	        JSCommand.app.getCCDPBusinessSystemSetting();
	    };
	
	    $scope.exitSign = function () {
	
	        //弹框提示似乎比较合理~~~~
	        var confirmPopup = $ionicPopup.confirm({
	            //title: 'Consume Ice Cream',
	            template: '是否确定退出？',
	            buttons: [{
	                text: '取消',
	                type: 'button-default',
	                onTap: function () {
	                    return false;
	                }
	            }, {
	                text: '确定',
	                type: 'button-positive',
	                onTap: function () {
	                    return true;
	                }
	            }]
	        });
	        confirmPopup.then(function (res) {
	            if (res) {
	
	                $ionicLoading.show({
	                    template: '正在退出...'
	                });
	                JSCommand.ccdp.logout();
	
	                // 在发送完退出指令之后，这里直接退出用户登录状态
	                $ionicLoading.hide();
	                JSCache.remove(Constants.YHCache.loginInfo);
	                $ionicTabsDelegate.$getByHandle('my-handle').select(0);
	
	            } else {
	                console.log('你取消了退出');
	            }
	        });
	    }
	};
	
	MyHomePageCtrl.$inject = [
	    '$scope',
	    '$state',
	    '$rootScope',
	    '$ionicLoading',
	    '$ionicPopup',
	    'JSUtils',
	    'Constants',
	    'JSCache',
	    'JSCommand',
	    '$ionicTabsDelegate'
	];
	
	module.exports = MyHomePageCtrl;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	module.exports = {
	    template  : __webpack_require__(139),
	    controller: __webpack_require__(140)
	};

/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"个人资料\">\r\n    <ion-content class=\"scroll-content ionic-scroll item-bg has-header\">\r\n        <div class=\"scroll item-bg\" style=\"-webkit-transform: translate3d(0px, 0px, 0px) scale(1);\">\r\n\r\n            <button class=\"help-info-button individual-set-avatar\" ng-click=\"showTypeAvatarModal()\">\r\n                <span>头像</span>\r\n                <i class=\"ion-chevron-right\"></i>\r\n                <img class=\"individual-set-avatar-img\" ng-src=\"{{personData.icon| prefixSrc}}\" alt=\"\"/>\r\n            </button>\r\n\r\n            <button class=\"help-info-button individual-set-button set-border-top\" ng-click=\"showNickNameModal()\">\r\n                <span>昵称</span>\r\n                <i class=\"ion-chevron-right \"></i>\r\n                <span class=\"individual-set-name-show\">{{personData.nickName}}</span>\r\n            </button>\r\n            <!--ng-click=\"showSexModal()\"-->\r\n            <button class=\"help-info-button individual-set-button\" ng-click=\"showSexModal()\">\r\n                <span>性别</span>\r\n                <i class=\"ion-chevron-right \"></i>\r\n                <span class=\"individual-set-sexual-show\" ng-if=\"personData.sex==1\">男</span>\r\n                <span class=\"individual-set-sexual-show\" ng-if=\"personData.sex==2\">女</span>\r\n               <!-- <span class=\"individual-set-sexual-show\">{{personData.sex}}</span>-->\r\n            </button>\r\n\r\n            <!--实名认证暂时不开放-&#45;&#45;注释-->\r\n            <!--<button class=\"help-info-button individual-set-button\" ui-sref=\"tab.home.real-name\" >\r\n                <span>实名认证</span>\r\n                <i class=\"ion-chevron-right\"></i>\r\n                <span class=\"individual-set-sexual-show\">立即认证</span>\r\n            </button>-->\r\n        </div>\r\n        <div class=\"split-personal-other\">\r\n            <button class=\"help-info-button individual-set-button set-border-top\">\r\n                <span>电话号码</span>\r\n                <!--<i class=\"ion-chevron-right\"></i>-->\r\n                <span class=\"individual-set-sexual-show\">{{personData.userName}}</span>\r\n            </button>\r\n            <button class=\"help-info-button individual-set-button\">\r\n                <span>等级</span>\r\n                <span class=\"individual-set-level-show\">{{personData.grade}}</span>\r\n            </button>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var personDataCtrl = function ($scope,
	                               $state,
	                               $stateParams,
	                               $ionicModal,
	                               JSUtils,
	                               Constants,
	                               JSCache,
	                               JSCommand) {
	
	    console.log('enter the person data controller...');
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
	                // 回复
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 成功修改调用用户详情
	                    modifyNickNameModal.hide();
	                    modifySexModal.hide();
	                    if($scope.valueSex!=""){
	                        $scope.personData.sex= $scope.valueSex;
	                    }
	                    if($scope.valueName != undefined){
	                        $scope.personData.nickName=$scope.valueName;
	                    }
	                    JSCache.put(Constants.YHCache.personData,$scope.personData);
	                    console.log("$scope.personData.sex",$scope.personData);
	                }
	                else {
	                    // 失败
	                    //取消头像上传
	                    typeAvatarModal.hide();
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.app.previewImage) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    typeAvatarModal.hide();
	                    $scope.$apply(function () {
	                        $scope.personData.icon = json.data.icon;
	                        $scope.currUserInfo.icon = $scope.personData.icon;
	                    });
	                    //修改头像成功,需要将登陆个人信息缓存做改变
	                    JSCache.put(Constants.YHCache.personData,$scope.personData);
	                    JSCache.put(Constants.YHCache.loginInfo,$scope.currUserInfo);
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	
	    $scope.personData=JSCache.get(Constants.YHCache.personData);
	    $scope.currUserInfo = JSCache.get(Constants.YHCache.loginInfo);
	
	    console.log("$scope.personData",$scope.personData);
	    sessionStorage.setItem("updataTime", $scope.personData != null ? $scope.personData.nickNameUpdateTime : "");
	
	    $scope.Sexs = [
	        {sex: "男"},
	        {sex: "女"}
	    ];
	
	
	    // 修改弹框页
	    var modifyNickNameModal = $ionicModal.fromTemplate(__webpack_require__(141), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    var modifySexModal = $ionicModal.fromTemplate(__webpack_require__(142), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    var typeAvatarModal = $ionicModal.fromTemplate(__webpack_require__(143), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	    /*修改头像，类型选择*/
	    $scope.showTypeAvatarModal = function () {
	        typeAvatarModal.show();
	    };
	    //修改头像写这里
	    $scope.modifyPersonalAvatar = function () {
	        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO;
	        console.log('Rpc_Cmd', Rpc_Cmd);
	        var userPic=-1;
	        var key = 3;
	        JSCommand.app.getPreviewImage(userPic,Rpc_Cmd, key);
	    };
	
	
	
	
	    //显示弹框页面
	    $scope.showNickNameModal = function () {
	        modifyNickNameModal.show();
	    };
	    $scope.showSexModal = function () {
	        modifySexModal.show();
	    };
	    //隐藏弹框
	    $scope.closeNickNameModal = function () {
	        modifyNickNameModal.hide();
	    };
	
	
	    function isEmptyObject(Obj) {
	        var flag = true;
	        angular.forEach(Obj, function () {
	            flag = false;
	        });
	        return flag;
	    }
	
	    //提交修改nickName
	    $scope.submitModifyNickName = function (error) {
	
	        $scope.flag = isEmptyObject(error);
	        console.log("error~~~~~~~~",$scope.flag);
	        if ($scope.flag) {
	            var key = Constants.modifyTechnicianSetup.userNickname;
	            $scope.valueName = $scope.personData.nickName;
	            JSCommand.ccdp.modifyUser(key, $scope.valueName,"");
	        }
	
	    };
	
	    //提交需改sex
	
	    $scope.selectedSex = function (sex) {
	        var key = Constants.modifyTechnicianSetup.userSex;
	        $scope.valueSex = sex.toString();
	        JSCommand.ccdp.modifyUser(key,  $scope.valueSex,"");
	    };
	
	
	    //关闭弹框页面
	    $scope.closeModal = function () {
	        modifyNickNameModal.hide();
	        modifySexModal.hide();
	        typeAvatarModal.hide();
	    };
	
	
	};
	
	personDataCtrl.$inject = [
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$ionicModal',
	    'JSUtils',
	    'Constants',
	    'JSCache',
	    'JSCommand'
	];
	
	module.exports = personDataCtrl;

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>\r\n<div class=\"tipbox-content\" style=\"width:80%;\">\r\n\r\n    <form name=\"modifyName\" ng-submit=\"submitModifyNickName(modifyName.nickName.$error)\" novalidate>\r\n    <div class=\"change-name-content\">\r\n            <h4 class=\"tipbox-title\">昵称</h4>\r\n            <label><input check-nick-name some-property=\"{{userId}}{{personData}}\" class=\"change-name-input\" type=\"text\"\r\n                          ng-model=\"personData.nickName\" name=\"nickName\" required/></label>\r\n            <div ng-messages=\"modifyName.nickName.$error\">\r\n                <div class=\"change-name-tips\" ng-message=\"required\">请输入新昵称</div>\r\n                <div class=\"change-name-tips\" ng-message=\"nickNameTime\">昵称一天只能修改一次</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"button-bar individual-set-button-bar\">\r\n            <a class=\"button chat-tipbox-button individual-set-button-cancel\" href=\"#\"\r\n               ng-click=\"closeNickNameModal()\">取消</a>\r\n            <input type=\"submit\" class=\"button chat-tipbox-button individual-set-button-confirm\" value=\"确定\">\r\n        </div>\r\n    </form>\r\n\r\n\r\n</div>"

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <h4 class=\"tipbox-title\">\r\n        性别选择\r\n    </h4>\r\n    <button  ng-repeat=\"item in Sexs\" type=\"button\"  class=\"help-info-button individual-set-tips-button\"\r\n             ng-click=\"selectedSex($index+1)\">{{item.sex}}</button>\r\n</div>"

/***/ },
/* 143 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"display:block;\" on-touch=\"closeModal()\"></div>\r\n<div class=\"tipbox-content \" style=\"width:80%;\">\r\n    <h4 class=\"tipbox-title\">\r\n        头像选择\r\n    </h4>\r\n    <!--功能开发中-->\r\n    <!--<button  type=\"button\"  class=\"help-info-button individual-set-tips-button choose-avatar-type\" >相机拍摄</button>-->\r\n    <button  type=\"button\"  class=\"help-info-button individual-set-tips-button\" ng-click=\"modifyPersonalAvatar()\">从相册中选择</button>\r\n</div>"

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	
	module.exports = {
	    template  : __webpack_require__(145),
	    controller: __webpack_require__(146)
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"实名认证\">\r\n    <ion-content class=\" scroll-content ionic-scroll  has-header  scroll-width scroll-bg-color\">\r\n        <form role=\"form\" name=\"modelForm\" novalidate>\r\n            <div class=\"authen-inp clearfix\">\r\n                <span>名字</span>\r\n                <label class=\"item item-input authen-input\">\r\n                    <input type=\"text\"  placeholder=\"请输入真实姓名\"  ng-model=\"userData.trueName\" name=\"trueName\" ng-pattern=\"/^([\\u4e00-\\u9fa5]{1,20}|[a-zA-Z\\.\\s]{1,20})$/\" required>\r\n                </label>\r\n                <font class=\"activate-red\">*</font>\r\n            </div>\r\n            <!--<div class=\"error\" ng-messages=\"modelForm.trueName.$error\">\r\n                &lt;!&ndash;<span class=\"per-name-error\" ng-message=\"required\">请输入真实姓名</span>&ndash;&gt;\r\n                <span class=\"per-name-error\" ng-message=\"pattern\">请输入正确的姓名</span>\r\n            </div>-->\r\n            <div class=\"authen-inp clearfix\">\r\n                <span>身份证号</span>\r\n                <label class=\"item item-input authen-input\" required>\r\n                    <input type=\"text\" placeholder=\"请输入身份证号码\" ng-model=\"userData.idNumber\" name=\"idNumber\" required>\r\n                </label>\r\n                <font class=\"activate-red\">*</font>\r\n            </div>\r\n            <!--<div class=\"error\" ng-messages=\"modelForm.idNumber.$error\">\r\n                <span class=\"per-name-error\" ng-message=\"required\">请输入身份证号</span>\r\n            </div>-->\r\n            <div class=\"authen-example clearfix\">\r\n                <div class=\"authen-example-click\" ng-click=\"positiveClick()\">\r\n                    <button><i class=\"ion-plus-round\"></i></button>\r\n\r\n                    <span>点击上传(手持正面)</span>\r\n                </div>\r\n                <div class=\"authen-example-pic\">\r\n                    <img src=\" img/posiPhotoPath.jpg\" ng-show=\"posiPhotoName=='' \">\r\n                    <img ng-src=\"{{posiPhotoName | prefixSrc}}\" ng-show=\"posiPhotoName !=='' \">\r\n                </div>\r\n            </div>\r\n            <div class=\" authen-example-top clearfix\">\r\n                <div class=\"authen-example-click\" ng-click=\"reverseSideClick()\">\r\n                    <button><i class=\"ion-plus-round\"></i></button>\r\n                    <span>点击上传(手持反面)</span>\r\n                </div>\r\n                <div class=\"authen-example-pic\">\r\n                    <img src=\" img/reveSidePhotoPath.jpg\" ng-show=\"reveSidePhotoName=='' \">\r\n                    <img ng-src=\"{{reveSidePhotoName | prefixSrc}}\" ng-show=\"reveSidePhotoName !=='' \">\r\n                </div>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <input type=\"submit\" value=\"确认\" class=\"button button-padding button-block button-blue-color car-text-color\" ng-click=\"submitResult()\" >\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 146 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	var realNameCtrl = function ($scope,
	                             $state,
	                             JSUtils,
	                             JSCache,
	                             JSCommand,
	                             Constants) {
	
	    console.log('enter the real name controller...');
	
	    $scope.userData = {
	        trueName: '',
	        idNumber: ''
	    };
	    $scope.posiPhotoName="";
	    $scope.reveSidePhotoName="";
	    var picPath;
	
	    $scope.$on('YHJSReceiver',function(event,json){
	        try{
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_ADD_USERAUTHENTICATION) {
	                // 回复
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 成功
	                    console.log('是否成功:',json);
	                    $state.go('tab.home.person-data');
	                }
	                else {
	                    // 失败
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.app.previewImage) {
	                var status = json["status"];
	
	                if (status == Constants.status.success) {
	                    if(picPath){
	                        $scope.$apply(function () {
	                            $scope.posiPhotoName=json.data.imgName;
	                        });
	                    }
	                    if(!picPath){
	                        $scope.$apply(function () {
	                            $scope.reveSidePhotoName=json.data.imgName;
	                        });
	                    }
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	
	    //this pictures for
	    function getPicPath(){
	        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_UPLOAD_IMAGE;
	        console.log('Rpc_Cmd', Rpc_Cmd);
	        var userPic=-1;
	        var key = -1;
	        JSCommand.app.getPreviewImage(userPic,Rpc_Cmd, key);
	    }
	    $scope.positiveClick = function () {
	        //获取图片
	        picPath=true;
	        getPicPath();
	    };
	    $scope.reverseSideClick = function () {
	        //获取图片
	        picPath=false;
	        getPicPath();
	    };
	    $scope.submitResult = function () {
	        var trueName=$scope.userData.trueName;
	        var idNumber=$scope.userData.idNumber;
	        var posiPhotoName=$scope.posiPhotoName;
	        var reveSidePhotoName=$scope.reveSidePhotoName;
	        JSCommand.ccdp.authenticationUser(trueName, idNumber, posiPhotoName, reveSidePhotoName);
	    }
	
	
	};
	
	realNameCtrl.$inject = [
	    '$scope',
	    '$state',
	    'JSUtils',
	    'JSCache',
	    'JSCommand',
	    'Constants'
	
	];
	
	module.exports = realNameCtrl;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	
	module.exports = {
	    template: __webpack_require__(148),
	    controller: __webpack_require__(149)
	};

/***/ },
/* 148 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"技师设置\">\r\n    <ion-content class=\"item-bg\">\r\n        <div class=\"list\">\r\n            <a class=\"item  item-icon-right\"   ui-sref=\"tab.home.choose-brand({userId:userSetDetail.id})\">\r\n                擅长处理：\r\n                <span class=\"list-first-description \">\r\n                    <ul>\r\n                        <li class=\"fly-left\">\r\n                            <img  class=\"list-first-img\" ng-repeat=\"brand in brandList\" ng-src=\"{{brand.icon | prefixSrc}}\" ng-show=\"$index<3\">\r\n                        </li>\r\n                        <li class=\"fly-left\" ng-show=\"brandList.length >3\">\r\n                            ...\r\n                        </li>\r\n                    </ul>\r\n                 </span>\r\n                <i class=\"icon ion-ios-arrow-forward arrow-btn-details\"></i>\r\n            </a>\r\n            <a class=\"item item-icon-right\" ui-sref=\"tab.home.choose-service-project({userId:userSetDetail.id})\" >\r\n                服务项目：\r\n                <span class=\"list-first-description set-des-color\" >\r\n                     <ul class=\"clearfix\">\r\n                         <li class=\"with-i\" ng-repeat=\"service in originalServeList\" ng-show=\"$index < 3\">\r\n                             {{service.serveName}}\r\n                         </li>\r\n                         <li class=\"with-i\" ng-show=\"originalServeList.length >3\">\r\n                             ...\r\n                         </li>\r\n                     </ul>\r\n\r\n                     <!--<ul class=\"clearfix\">\r\n                        <li class=\"with-i\" ng-repeat=\"service in originalServeList\">\r\n                            {{service.serveName}}\r\n                        </li>\r\n                     </ul>-->\r\n                </span>\r\n                <i class=\"icon ion-ios-arrow-forward arrow-btn-details\"></i>\r\n            </a>\r\n            <!--<a class=\"item item-icon-right description-white-space\" ui-sref=\"tab.home.choose-introduction({userId:expertSettingData.id})\">-->\r\n            <a class=\"item item-icon-right description-white-space\" ng-click=\"showIntroductionModal()\">\r\n                服务介绍：\r\n                <span class=\"list-first-description set-des-color\">\r\n                    <p>{{userSetDetail.description}}</p>\r\n                </span>\r\n                <i class=\"icon ion-ios-arrow-forward arrow-btn-details\"></i>\r\n            </a>\r\n            <a class=\"item item-icon-right\" href=\"#\" ng-click=\"setConfirm()\">\r\n                在线时间：\r\n                <span class=\"list-first-description set-text-desc-color\">{{userSetDetail.serveStartTime}} -- {{userSetDetail.serveEndTime}}</span>\r\n\r\n                <i class=\"icon ion-ios-arrow-forward arrow-btn-details\"></i>\r\n            </a>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>\r\n</ion-view>"

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	/**
	 * Created by Weidongjian on 2015/8/7.
	 */
	
	var _ = __webpack_require__(5);
	
	var ExpertSettingCtrl = function ($scope,
	                                  $ionicModal,
	                                  $stateParams,
	                                  $state,
	                                  $ionicScrollDelegate,
	                                  JSUtils,
	                                  Constants,
	                                  JSCache,
	                                  JSCommand) {
	
	    console.log('enter the expert setting controller...');
	
	    var userId = $stateParams.userId;
	    $scope.userId = userId;
	    $scope.brandList='';
	    $scope.originalServeList='';
	    console.log("$scope.userId",$scope.userId);
	    $scope.$on('YHJSReceiver', function (event,json) {
	        try{
	            var what = json["what"];
	            if(what == Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO){
	                var status = json["status"];
	                if(status == Constants.status.success){
	                    $scope.$apply(function(){
	                        $scope.userSetDetail=json.data.user;
	                        //获取页面显示数据
	                        $scope.brandList=$scope.userSetDetail.brandList;
	                        $scope.originalServeList=$scope.userSetDetail.serveList;
	                        JSCache.put(Constants.YHCache.brandListData,$scope.brandList);
	                        JSCache.put(Constants.YHCache.ServeListData,$scope.originalServeList);
	                    });
	
	                    console.log("brandList:",json.data.user)
	                }
	                else{
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    IntroductionModal.hide();
	                    $state.go('tab.home.expert-setting', {userId: userId});
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	
	        }
	        catch(error){
	            alert("error" + error);
	        }
	    });
	
	    JSCommand.ccdp.queryUserDetail(-1);
	
	   var IntroductionModal = $ionicModal.fromTemplate(__webpack_require__(150), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	    $scope.setTime = $ionicModal.fromTemplate(__webpack_require__(151), {
	        scope: $scope,
	        animation: 'slide-right-left'
	    });
	
	
	
	
	    /*弹窗，服务介绍*/
	    $scope.showIntroductionModal = function () {
	        IntroductionModal.show();
	    };
	
	    $scope.Solutions = {
	        text: ''
	    };
	
	    $scope.ServiceIntroduction = function () {
	        IntroductionModal.hide();
	        var key = Constants.modifyTechnicianSetup.userRemark;
	        var value=$scope.Solutions.text;
	        JSCommand.ccdp.modifyUser(key, value);
	        $scope.userSetDetail.description = $scope.Solutions.text;
	    };
	    $scope.goBackSeting = function () {
	        IntroductionModal.hide();
	    };
	
	    //时间设计:
	    $scope.setConfirm = function () {
	        if(angular.isDefined($scope.userSetDetail)){
	            var str1 = $scope.userSetDetail.serveStartTime;
	            var str2 = $scope.userSetDetail.serveEndTime;
	            sessionStorage.setItem('hourFlag1', str1[0] + str1[1]);
	            sessionStorage.setItem('minuteFlag1', str1[3] + str1[4]);
	            sessionStorage.setItem('hourFlag2', str2[0] + str2[1]);
	            sessionStorage.setItem('minuteFlag2', str2[3] + str2[4]);
	            sessionStorage.setItem('timeFlag', 0);
	        }
	
	        $scope.setTime.show();
	    };
	
	    $scope.timeCancel = function () {
	        sessionStorage.removeItem('timeFlag');
	        $scope.setTime.hide();
	    };
	
	    $scope.timeConfirm = function () {
	        console.log(sessionStorage);
	        if (Number(sessionStorage.getItem('hourFlag1')) > Number(sessionStorage.getItem('hourFlag2'))) {
	            return false;
	        }
	        if ((Number(sessionStorage.getItem('hourFlag1')) === Number(sessionStorage.getItem('hourFlag2'))) && (Number(sessionStorage.getItem('minuteFlag1')) > Number(sessionStorage.getItem('minuteFlag2')))) {
	            return false;
	        }
	        var serveStartTime = sessionStorage.getItem('hourFlag1') + ":" + sessionStorage.getItem('minuteFlag1');
	        var serveEndTime = sessionStorage.getItem('hourFlag2') + ":" + sessionStorage.getItem('minuteFlag2');
	        $scope.Value = {
	            "serveStartTime": serveStartTime,
	            "serveEndTime": serveEndTime
	        };
	
	        var JsonValue = JSON.stringify($scope.Value);
	        var key = Constants.modifyTechnicianSetup.userServiceTime;
	        console.log("时间:",JsonValue);
	        JSCommand.ccdp.modifyUser(key, JsonValue);
	        $scope.userSetDetail.serveStartTime = $scope.Value.serveStartTime;
	        $scope.userSetDetail.serveEndTime = $scope.Value.serveEndTime;
	        sessionStorage.removeItem('timeFlag');
	        $scope.setTime.hide();
	    };
	
	
	
	
	};
	
	ExpertSettingCtrl.$inject = [
	    '$scope',
	    '$ionicModal',
	    '$stateParams',
	    '$state',
	    '$ionicScrollDelegate',
	    'JSUtils',
	    'Constants',
	    'JSCache',
	    'JSCommand'
	];
	
	module.exports = ExpertSettingCtrl;

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"服务介绍\">\r\n    <ion-header-bar class=\"bar-technician__circle\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"goBackSeting()\">\r\n                <i class=\"iconfont icon-return return-size-pop\"></i>\r\n            </button>\r\n        </div>\r\n        <h1 class=\"title\">服务介绍</h1>\r\n\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear\" ng-click=\"ServiceIntroduction()\">确定</button>\r\n        </div>\r\n    </ion-header-bar>\r\n\r\n    <ion-content class=\"scroll-content ionic-scroll item-bg has-header\">\r\n        <form name=\"SolutionsText\">\r\n            <div class=\"fill-report-solution clearfix\" ng-show=\"userSetDetail.description!=''\">\r\n                <textarea class=\"solution-textarea-text\" placeholder=\"{{userSetDetail.description}}\" ng-model=\"Solutions.text\"\r\n                          ng-maxlength=\"46\" name=\"nameNo\" required></textarea>\r\n            </div>\r\n            <div class=\"fill-report-solution clearfix\" ng-show=\"userSetDetail.description==''\">\r\n                <textarea class=\"solution-textarea-text\" placeholder=\"说说你擅长的\" ng-model=\"Solutions.text\"\r\n                          ng-maxlength=\"46\" name=\"name\" required></textarea>\r\n            </div>\r\n            <div class=\"error\">\r\n                <h5 class=\"solution-prompt\">最多写<span class=\"changecolor\">46</span>个字</h5>\r\n            </div>\r\n\r\n        </form>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 151 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tipbox\" style=\"\">\r\n    <div class=\"set-confirm\">\r\n        <div start-end-directive class=\"button-bar\" >\r\n            <a class=\"button star-time-btn\" ng-class=\"{'star-end-no-bg':currentTimeTab == 'currentTimeTab1'}\" ng-click=\"selectTimeTab('currentTimeTab1')\" href=\"#\">开始时间</a>\r\n            <a class=\"button end-time-btn\" ng-class=\"{'star-end-no-bg':currentTimeTab == 'currentTimeTab2'}\" ng-click=\"selectTimeTab('currentTimeTab2')\" href=\"#\">结束时间</a>\r\n        </div>\r\n        <div ng-if=\"currentTimeTab == 'currentTimeTab1'\" class=\"time-block\">\r\n            <!--<ion-scroll zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"> </ion-scroll>-->\r\n            <div class=\"time-block-left\">\r\n                <ion-scroll hour-directive=\"hourDirective\" zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"\r\n                            on-scroll=\"anchorScroll()\" scrollbar-y=\"false\" delegate-handle=\"hourScroll\">\r\n                    <span></span>\r\n                    <hours-directive></hours-directive>\r\n                    <span></span>\r\n                </ion-scroll>\r\n                <div class=\"middle-time\">\r\n                    <span class=\"middle-time-text\">时</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"time-block-right\">\r\n                <ion-scroll minute-directive=\"minuteDirective\" zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"\r\n                            on-scroll=\"anchorScroll()\" scrollbar-y=\"false\" delegate-handle=\"minuteScroll\">\r\n                    <span></span>\r\n                    <!--<span minutes-directive=\"minutesDirective\" ng-repeat=\"minute in minuteArr\">{{minute.minute}}</span>-->\r\n                    <minutes-directive></minutes-directive>\r\n                    <span></span>\r\n                </ion-scroll>\r\n                <div class=\"middle-time\">\r\n                    <span class=\"middle-time-text\">分</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div ng-if=\"currentTimeTab == 'currentTimeTab2'\" class=\"time-block\">\r\n            <!--<ion-scroll zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"> </ion-scroll>-->\r\n            <div class=\"time-block-left\">\r\n                <ion-scroll hour-directive=\"hourDirective\" zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"\r\n                            on-scroll=\"anchorScroll()\" scrollbar-y=\"false\" delegate-handle=\"hourScroll\">\r\n                    <span></span>\r\n                    <hours-directive></hours-directive>\r\n                    <span></span>\r\n                </ion-scroll>\r\n                <div class=\"middle-time\">\r\n                    <span class=\"middle-time-text\">时</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"time-block-right\">\r\n                <ion-scroll minute-directive=\"minuteDirective\" zooming=\"false\" direction=\"y\" class=\"ion-scroll-size\"\r\n                            on-scroll=\"anchorScroll()\" scrollbar-y=\"false\" delegate-handle=\"minuteScroll\">\r\n                    <span></span>\r\n                    <!--<span minutes-directive=\"minutesDirective\" ng-repeat=\"minute in minuteArr\">{{minute.minute}}</span>-->\r\n                    <minutes-directive></minutes-directive>\r\n                    <span></span>\r\n                </ion-scroll>\r\n                <div class=\"middle-time\">\r\n                    <span class=\"middle-time-text\">分</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"button-bar\">\r\n            <a class=\"button chat-tipbox-button\" href=\"#\" ng-click=\"timeCancel()\">取消</a>\r\n            <a class=\"button chat-tipbox-button\" href=\"#\" ng-click=\"timeConfirm()\">确定</a>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	
	module.exports = {
	    template: __webpack_require__(153),
	    controller: __webpack_require__(154)
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"请选择品牌\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <button class=\"button button-clear\" ng-click=\"sureModifyBrand()\">确定</button>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <!--<input class=\"\" type=\"checkbox\" ng-checked=\"flag.isAllSelectedFlag\" ng-click=\"selectAll($event)\">全选/全不选(据说往后业务需要增加此功能暂时不做UI效果)\r\n-->\r\n        <div ng-repeat=\"categoryInAlpha in brandListCategoryInAlpha\">\r\n            <p class=\"item-divider-empty letter-results-describe\">{{categoryInAlpha.initial}}</p>\r\n\r\n            <div class=\"list\">\r\n                <div class=\"item-friends-box\">\r\n\r\n                    <div class=\"group-chat-block remove-top-bottom-border\" ng-repeat=\"brand in categoryInAlpha.userList\">\r\n                        <div class=\"remove-bottom-border\">\r\n                            <ion-checkbox class=\"item-checkbox-technician__circle\"\r\n                                          ng-click=\"isSelectBrand($event,brand)\" ng-checked=\"brand.isChecked\">\r\n                                <img ng-src=\"{{ brand.icon_ur | prefixSrc }}\">\r\n                                <span class=\"item-checkbox-technician__circle-text\">{{ brand.name }}</span>\r\n                            </ion-checkbox>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	/**
	 * Created by Weidongjian on 2015/8/7.
	 *
	 */
	var _ = __webpack_require__(5);
	
	var MoreExpertSettingChooseBrandCtrl = function ($scope,
	                                                 $stateParams,
	                                                 $state,
	                                                 JSCommand,
	                                                 Constants,
	                                                 JSCache,
	                                                 JSUtils) {
	    console.log('enter the more expert setting choose brand controller...');
	
	    var userId = $stateParams.userId;
	    $scope.userId = userId;
	
	    $scope.selectedBrandList = '';
	    $scope.brandListCategoryInAlpha = '';
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 请求成功获取品牌数据
	                    $scope.$apply(function () {
	                        $scope.brandList = json.data.itemList;
	                        $scope.brandListCategoryInAlpha = JSUtils.rankingAccording(JSON.parse(JSON.stringify($scope.brandList)));
	                    });
	                    //获取品牌设置信息后做处理
	                    $scope.$watch('selectedBrandList', function () {
	                        _.forEach($scope.brandListCategoryInAlpha, function (CategoryInAlpha) {
	                            $scope.userList = CategoryInAlpha.userList;
	                            _.forEach(CategoryInAlpha.userList, function (userListObj) {
	                                var brand = _.findWhere($scope.selectedBrandList, {
	                                    id: userListObj.id
	                                });
	                                if (brand) {
	                                    userListObj.isChecked = true;
	                                }
	                                if (userListObj.isChecked) {
	                                    $scope.saveSelectBrandArray.push(userListObj.id);
	                                }
	                            });
	                            console.log("$scope.userList~~~", $scope.userList);
	                        });
	
	                    }, true);
	
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
	                // 回复
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 请求擅长处理成功
	                    console.log("success-----:");
	                    $state.go('tab.home.expert-setting', {userId: userId});
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	
	
	
	        }
	        catch (error) {
	            alert("error" + error);
	        }
	    });
	    $scope.selectedBrandList=JSCache.get(Constants.YHCache.brandListData);
	
	
	    /*
	        获取brand列表
	     */
	    JSCommand.ccdp.queryFilterList(Constants.filterType.brand);
	
	
	    // 删除数组中元素 方法.
	    Array.prototype.indexOf = function (value) {
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] == value) return i;
	        }
	        return -1;
	    };
	
	    Array.prototype.remove = function (value) {
	        var index = this.indexOf(value);
	        if (index > -1) {
	            this.splice(index, 1);
	        }
	    };
	
	    $scope.saveSelectBrandArray = [];
	    $scope.isSelectBrand = function (event, brandObj) {
	        var isChecked = event.target.checked;
	        if (isChecked) {
	            $scope.saveSelectBrandArray.push(brandObj.id);
	        }
	        if (!isChecked) {
	            $scope.saveSelectBrandArray.remove(brandObj.id)
	        }
	    };
	
	
	    //确定修改技师选择品牌设置
	    $scope.sureModifyBrand = function () {
	        var Value = {
	            serviceBrand: $scope.saveSelectBrandArray
	        };
	        var JsonStr = JSON.stringify(Value);
	        var key = Constants.modifyTechnicianSetup.userServiceBrand;
	        console.log("最后的数据:", JsonStr);
	        JSCommand.ccdp.modifyUser(key, JsonStr, "");
	    };
	
	};
	
	MoreExpertSettingChooseBrandCtrl.$inject = [
	    '$scope',
	    '$stateParams',
	    '$state',
	    'JSCommand',
	    'Constants',
	    'JSCache',
	    'JSUtils'
	];
	
	module.exports = MoreExpertSettingChooseBrandCtrl;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	
	module.exports = {
	    template: __webpack_require__(156),
	    controller: __webpack_require__(157)
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"请选择服务项目\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <button class=\"button button-clear\" ng-click=\"sureModifyService()\">确定</button>\r\n    </ion-nav-buttons>\r\n    <ion-content class=\"item-bg\">\r\n        <!--<input class=\"\" type=\"checkbox\" ng-disabled=\"true\" ng-checked=\"flag.isAllSelectedServiceFlag\" ng-click=\"AllSelectService($event) \">\r\n        全选/全不选(据说往后业务需要增加此功能暂时不做UI效果)-->\r\n        <div class=\"list\">\r\n            <div class=\"item-friends-box \">\r\n                <div class=\"group-chat-block remove-top-bottom-border\" ng-repeat=\"service in serviceCategoryInAlpha\">\r\n                    <div class=\"remove-bottom-border\">\r\n\r\n                        <!--<div class=\"group-chat-block item-border-top-line\">    </div>-->\r\n\r\n                        <ion-checkbox class=\"item-serve-left item-checkbox-technician__circle\" ng-checked=\"service.isChecked\" ng-click=\"isSelectService($event,service)\">\r\n                            <!--<img ng-src=\"{{ brand.icon | prefixSrc }}\">-->\r\n                            <span class=\"item-checkbox-technician__circle-text\">{{ service.name }}</span>\r\n                        </ion-checkbox>\r\n\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/9.
	 */
	
	var _ = __webpack_require__(5);
	
	var HomeChooseServiceProjectCtrl = function ($scope,
	                                             $stateParams,
	                                             $state,
	                                             JSCommand,
	                                             Constants,
	                                             JSCache,
	                                             JSUtils) {
	
	    console.log('enter the home choose service project controller...');
	
	    var userId = $stateParams.userId;
	    $scope.userId = userId;
	    $scope.selectedServiceList='';
	    $scope.serviceCategoryInAlpha='';
	    $scope.$on('YHJSReceiver', function (event,json) {
	        try{
	            var what = json["what"];
	            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST) {
	                // 回复
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    // 请求成功获取服务数据
	                    $scope.$apply(function () {
	                        $scope.serviceCategoryInAlpha=json.data.itemList;
	                    });
	                    $scope.$watch('selectedServiceList', function () {
	                        //$scope.saveSelectServiceArray = []; //记录已经选取的品牌id
	                        _.forEach($scope.serviceCategoryInAlpha, function (serviceList) {
	
	                            var service = _.findWhere($scope.selectedServiceList, {
	                                id: serviceList.id
	                            });
	                            if (service) {
	                                serviceList.isChecked = true;
	                            }
	                            if (serviceList.isChecked) {
	                                $scope.saveSelectServiceArray.push(serviceList.id)
	                            }
	                        });
	
	                    }, true);
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
	                var status = json["status"];
	                if (status == Constants.status.success) {
	                    console.log("success-----:");
	                    $state.go('tab.home.expert-setting',{userId: userId});
	                }
	                else {
	                    alert("Get person home data fail:" + json["reason"]);
	                }
	            }
	            //监听选过,已选
	
	
	        }
	        catch(error){
	            alert("error" + error);
	        }
	    });
	    $scope.selectedServiceList= JSCache.get(Constants.YHCache.ServeListData);
	
	
	    JSCommand.ccdp.queryFilterList(Constants.filterType.service);
	
	    Array.prototype.indexOf = function (value) {
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] == value) return i;
	        }
	        return -1;
	    };
	
	    Array.prototype.remove = function (value) {
	        var index = this.indexOf(value);
	        if (index > -1) {
	            this.splice(index, 1);
	        }
	    };
	    // 多选
	
	    $scope.saveSelectServiceArray = []; //记录已经选取的品牌id
	
	    $scope.isSelectService = function (event, serviceObj) {
	
	        var isChecked = event.target.checked;
	        var serviceObjId = serviceObj.id;
	
	        if (isChecked) {
	            $scope.saveSelectServiceArray.push(serviceObj.id);
	        }
	        if (!isChecked) {
	            $scope.saveSelectServiceArray.remove(serviceObj.id);
	        }
	    };
	
	    $scope.sureModifyService = function () {
	        var Value = {
	            serviceProject: $scope.saveSelectServiceArray
	        };
	
	        var JsonStr = JSON.stringify(Value);
	        var key = Constants.modifyTechnicianSetup.userServiceProject;
	        console.log("最后的数据:",JsonStr);
	        JSCommand.ccdp.modifyUser(key, JsonStr,"");
	    };
	};
	
	HomeChooseServiceProjectCtrl.$inject = [
	    '$scope',
	    '$stateParams',
	    '$state',
	    'JSCommand',
	    'Constants',
	    'JSCache',
	    'JSUtils'
	];
	
	module.exports = HomeChooseServiceProjectCtrl;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/10.
	 */
	module.exports = {
	    template: __webpack_require__(159),
	    controller: __webpack_require__(160)
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"协助记录\" class=\"scroll-no\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <a class=\"button button-icon icon \" ng-click=\"deleteAssistRecord()\">清空</a>\r\n    </ion-nav-buttons>\r\n    <div class=\"scroll\" style=\"-webkit-transform: translate3d(0px, 0px, 0px) scale(1);\">\r\n        <div class=\"item item-divider item-bg scroll-content-fixed\">\r\n            <div class=\"assi-bnt-height\">\r\n                <span ng-click=\"helpMeClick()\" ng-class=\"{'assi-span-text-style':helpMeSwitchNavigation}\">协助我的</span>\r\n                <span ng-click=\"MyAssistanceClick()\" ng-class=\"{'assi-span-text-style':MyAssistanceSwitchNavigation}\">我的协助</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--<ion-content class=\"scroll-content-height\"  assi-scroll-height=\"loadMore()\" >-->\r\n    <ion-content class=\"scroll-content-height\">\r\n        <ion-slide-box on-slide-changed=\"changePage(index)\" show-pager=false>\r\n            <ion-slide >\r\n                <div class=\"list assist-record-list\">\r\n                    <a class=\"item assist-icon-left\" href=\"#\" ng-repeat=\"assist in userList\">\r\n                        来自<span class=\"assi-list-name-style\">{{assist.user.nickName}}</span>专家的协助\r\n\r\n                        <span class=\"item-note\">\r\n                            <p class=\"assi-is-evaluation\">\r\n                                <evaluation-state state=\"1\"></evaluation-state>\r\n                            </p>\r\n                         {{assist.updatetime|date:'yyyy-MM-dd'}}\r\n                        </span>\r\n                    </a>\r\n                </div>\r\n            </ion-slide>\r\n            <ion-slide>\r\n                <div class=\"list assist-record-list\">\r\n                    <a class=\"item assist-icon-left\" href=\"#\" ng-repeat=\"toAssist in toAassistList\">\r\n                        我协助了<font class=\"assi-list-name-style\">{{toAssist.user.nickName}}</font>\r\n                        <span class=\"item-note\">\r\n                         {{toAssist.updatetime|date:'yyyy-MM-dd'}}\r\n                        </span>\r\n                    </a>\r\n                </div>\r\n            </ion-slide  >\r\n        </ion-slide-box>\r\n        <ion-infinite-scroll\r\n                ng-if=\"moreDataCanBeLoaded\"\r\n                distance=\"1%\"\r\n                on-infinite=\"loadMoreData()\">\r\n        </ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>"

/***/ },
/* 160 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/10.
	 */
	
	var assistRecordCtrl = function ($scope,
	                                 $state,
	                                 JSCache,
	                                 $ionicSlideBoxDelegate,
	                                 JSCommand,
	                                 Constants,
	                                 $timeout,
	                                 $ionicScrollDelegate) {
	
	    console.log('enter the assist record controller...');
	
	    $scope.$on('YHJSReceiver', function (event, json) {
	        try {
	            var what = json["what"];
	            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTTOME) {
	                var status = json["status"];
	                if (status === Constants.status.success) {
	                    $scope.$apply(function () {
	                        $scope.assistList=json.data.assistList;
	                        console.log("协助我的~~~", $scope.assistList);
	
	                    });
	
	                }else{
	                    console.log("Login fail:" + json["reason"]);
	                    $scope.moreDataCanBeLoaded = false;
	                }
	            }
	             else if(what === Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTMETO) {
	                var status = json["status"];
	                if (status === Constants.status.success) {
	                    $scope.toAassistList=json.data.assistList;
	                    console.log("我协助的~~~", $scope.toAassistList)
	                }else{
	                    console.log("Login fail:" + json["reason"]);
	                }
	            }
	
	        } catch (error) {
	
	        }
	    });
	
	
	    /*
	        获取我协助列表
	     */
	    JSCommand.ccdp.queryAssistFromMe(1);
	
	
	
	    $scope.helpMeSwitchNavigation = true;
	    $scope.changePage = function (index){
	
	        if(index === 0){
	            $scope.helpMeSwitchNavigation = true;
	            $scope.MyAssistanceSwitchNavigation = false;
	        }
	        if(index === 1){
	            $scope.helpMeSwitchNavigation = false;
	            $scope.MyAssistanceSwitchNavigation = true;
	        }
	    };
	
	    //跳回上一页
	    $scope.helpMeClick = function () {
	        $ionicSlideBoxDelegate.previous();
	    };
	
	    //跳入下一页
	    $scope.MyAssistanceClick = function (){
	        $ionicSlideBoxDelegate.next();
	    };
	/****************************************
	    华丽分割,测试
	****************************************/
	
	    $scope.userList = [];
	    $scope.pageNum = 0;
	
	    $scope.moreDataCanBeLoaded = true;
	
	    $scope.loadMoreData = function () {
	        $scope.pageNum += 1;
	        console.log($scope.pageNum);
	        JSCommand.ccdp.queryAssistToMe($scope.pageNum);
	        $timeout(function(){
	            if (!angular.isDefined($scope.assistList) || $scope.assistList.length === 0) {
	                return;
	            } else {
	                $scope.$broadcast('scroll.infiniteScrollComplete');
	                $scope.userList = $scope.userList.concat($scope.assistList);
	
	            }
	        },3000);
	
	    };
	
	
	
	
	
	};
	
	assistRecordCtrl.$inject = [
	    '$scope',
	    '$state',
	    'JSCache',
	    '$ionicSlideBoxDelegate',
	    'JSCommand',
	    'Constants',
	    '$timeout',
	    '$ionicScrollDelegate'
	];
	
	module.exports = assistRecordCtrl;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Weidongjian on 2015/12/10.
	 */
	module.exports = {
	    template: __webpack_require__(162),
	    controller: __webpack_require__(163)
	};

/***/ },
/* 162 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"最近咨询\">\r\n    <ion-nav-buttons side=\"right\">\r\n        <button class=\"button button-clear\" ng-click=\"deleteConsultation()\">清空</button>\r\n    </ion-nav-buttons>\r\n\r\n    <ion-content class=\"has-tabs item-bg\">\r\n\r\n        <ion-refresher\r\n                pulling-text=\"努力加载中...\"\r\n                on-refresh=\"doRefresh()\">\r\n        </ion-refresher>\r\n\r\n        <div class=\"list\">\r\n            <div class=\"item-engineer-box\" ng-repeat=\"user in userList\">\r\n                <a class=\"item-engineer item-thumbnail-left item-engineer-has-right\"\r\n                   ui-sref=\"tab.assistance-expert-detail({ contactId: user.id })\">\r\n                    <!--<img src=\"{{item.icon}}\">-->\r\n                    <img src=\"img/engineer-Zhao.png\">\r\n\r\n                    <p class=\"item-engineer-skill\">擅长：\r\n                        <!--<img ng-repeat=\" brand in item.branList\" src=\"{{brand.icon_ur}}\">-->\r\n                        <img src=\"img/nissan_png.png\">\r\n                        <img src=\"img/Rolls_Royce.png\">\r\n                    </p>\r\n\r\n                    <p class=\"item-engineer-rate\">\r\n                        解决率：\r\n                        <span>{{ user.popularity }}</span>\r\n                    </p>\r\n\r\n                    <p class=\"item-engineer-introduce\">\r\n                        介绍：\r\n                        <span ng-repeat=\"userSkill in user.userSkilledList\">{{ userSkill.description }}</span>\r\n                    </p>\r\n\r\n                    <p class=\"item-engineer-name\">{{ user.username }}</p>\r\n                </a>\r\n                <a ng-class={'chatbox-a':user.state===1,'chatbox':user.state===0}\r\n                   ng-click=\"chat(user.state,user.id,user.username)\">\r\n                    <i class=\"iconfont icon-duihua \" ng-class={'chatBoxIcon-a':user.state===1,'chatBoxIcon':user.state===0}></i>\r\n\r\n                    <p>咨询</p></a>\r\n\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n\r\n</ion-view>"

/***/ },
/* 163 */
/***/ function(module, exports) {

	/**
	 * Created by Weidongjian on 2015/12/10.
	 */
	var ConsultationCtrl = function ($scope,
	                                 $stateParams,
	                                 $state){
	
	    console.log('enter the recent-consultation controller...');
	
	    var userId =$stateParams.userId;
	    console.log(userId);
	    var pageNum =1;
	    getRecentConsultationData(pageNum);
	    function getRecentConsultationData(pageNum){
	
	    }
	
	    $scope.chat =function(state,userId,username){
	        if(state===0) {
	            $state.go('tab.assistance-chat',{ minorId: userId, minorUsername: username });
	        }
	    };
	
	    $scope.deleteConsultation =function(){
	
	    }
	};
	
	ConsultationCtrl.$inject =[
	    '$scope',
	    '$stateParams',
	    '$state'
	];
	
	module.exports = ConsultationCtrl;

/***/ }
/******/ ]);