var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,h){b!=Array.prototype&&b!=Object.prototype&&(b[d]=h.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(d){return $jscomp.SYMBOL_PREFIX+(d||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var d=0;return $jscomp.iteratorPrototype(function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.makeIterator=function(b){$jscomp.initSymbolIterator();var d=b[Symbol.iterator];return d?d.call(b):$jscomp.arrayIterator(b)};
$jscomp.polyfill=function(b,d,h,g){if(d){h=$jscomp.global;b=b.split(".");for(g=0;g<b.length-1;g++){var e=b[g];e in h||(h[e]={});h=h[e]}b=b[b.length-1];g=h[b];d=d(g);d!=g&&null!=d&&$jscomp.defineProperty(h,b,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function d(){this.batch_=null}function h(a){return a instanceof e?a:new e(function(c,k){c(a)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;d.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};d.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var g=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(a){g(a,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var c=0;c<a.length;++c){var k=a[c];delete a[c];try{k()}catch(m){this.asyncThrow_(m)}}}this.batch_=null};d.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var c=this.createResolveAndReject_();try{a(c.resolve,c.reject)}catch(k){c.reject(k)}};e.prototype.createResolveAndReject_=
function(){function a(a){return function(b){k||(k=!0,a.call(c,b))}}var c=this,k=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var c=null!=a;break a;case "function":c=!0;break a;default:c=!1}c?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var c=
void 0;try{c=a.then}catch(k){this.reject_(k);return}"function"==typeof c?this.settleSameAsThenable_(c,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,c){if(0!=this.state_)throw Error("Cannot settle("+a+", "+c|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=c;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,c=0;c<a.length;++c)a[c].call(),a[c]=null;this.onSettledCallbacks_=null}};var l=new d;e.prototype.settleSameAsPromise_=function(a){var c=this.createResolveAndReject_();a.callWhenSettled_(c.resolve,c.reject)};e.prototype.settleSameAsThenable_=function(a,c){var k=this.createResolveAndReject_();try{a.call(c,k.resolve,k.reject)}catch(m){k.reject(m)}};e.prototype.then=function(a,c){function k(c,a){return"function"==typeof c?function(a){try{b(c(a))}catch(n){d(n)}}:a}var b,d,f=new e(function(c,
a){b=c;d=a});this.callWhenSettled_(k(a,b),k(c,d));return f};e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,c){function b(){switch(m.state_){case 1:a(m.result_);break;case 2:c(m.result_);break;default:throw Error("Unexpected state: "+m.state_);}}var m=this;null==this.onSettledCallbacks_?l.asyncExecute(b):this.onSettledCallbacks_.push(function(){l.asyncExecute(b)})};e.resolve=h;e.reject=function(a){return new e(function(c,b){b(a)})};e.race=function(a){return new e(function(c,
b){for(var k=$jscomp.makeIterator(a),d=k.next();!d.done;d=k.next())h(d.value).callWhenSettled_(c,b)})};e.all=function(a){var c=$jscomp.makeIterator(a),b=c.next();return b.done?h([]):new e(function(a,k){function f(c){return function(b){d[c]=b;r--;0==r&&a(d)}}var d=[],r=0;do d.push(void 0),r++,h(b.value).callWhenSettled_(f(d.length-1),k),b=c.next();while(!b.done)})};return e},"es6","es3");
$jscomp.polyfill("Array.from",function(b){return b?b:function(b,h,g){$jscomp.initSymbolIterator();h=null!=h?h:function(c){return c};var d=[],l=b[Symbol.iterator];if("function"==typeof l)for(b=l.call(b);!(l=b.next()).done;)d.push(h.call(g,l.value));else{l=b.length;for(var a=0;a<l;a++)d.push(h.call(g,b[a]))}return d}},"es6","es3");
$jscomp.iteratorFromArray=function(b,d){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var h=0,g={next:function(){if(h<b.length){var e=h++;return{value:d(e,b[e]),done:!1}}g.next=function(){return{done:!0,value:void 0}};return g.next()}};g[Symbol.iterator]=function(){return g};return g};$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
$jscomp.owns=function(b,d){return Object.prototype.hasOwnProperty.call(b,d)};$jscomp.polyfill("Object.assign",function(b){return b?b:function(b,h){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(e)for(var l in e)$jscomp.owns(e,l)&&(b[l]=e[l])}return b}},"es6","es3");
$jscomp.polyfill("WeakMap",function(b){function d(a){$jscomp.owns(a,g)||$jscomp.defineProperty(a,g,{value:{}})}function h(a){var c=Object[a];c&&(Object[a]=function(a){d(a);return c(a)})}if(function(){if(!b||!Object.seal)return!1;try{var a=Object.seal({}),c=Object.seal({}),k=new b([[a,2],[c,3]]);if(2!=k.get(a)||3!=k.get(c))return!1;k.delete(a);k.set(c,4);return!k.has(a)&&4==k.get(c)}catch(m){return!1}}())return b;var g="$jscomp_hidden_"+Math.random().toString().substring(2);h("freeze");h("preventExtensions");
h("seal");var e=0,l=function(a){this.id_=(e+=Math.random()+1).toString();if(a){$jscomp.initSymbol();$jscomp.initSymbolIterator();a=$jscomp.makeIterator(a);for(var c;!(c=a.next()).done;)c=c.value,this.set(c[0],c[1])}};l.prototype.set=function(a,c){d(a);if(!$jscomp.owns(a,g))throw Error("WeakMap key fail: "+a);a[g][this.id_]=c;return this};l.prototype.get=function(a){return $jscomp.owns(a,g)?a[g][this.id_]:void 0};l.prototype.has=function(a){return $jscomp.owns(a,g)&&$jscomp.owns(a[g],this.id_)};l.prototype.delete=
function(a){return $jscomp.owns(a,g)&&$jscomp.owns(a[g],this.id_)?delete a[g][this.id_]:!1};return l},"es6","es3");$jscomp.MapEntry=function(){};
$jscomp.polyfill("Map",function(b){if(!$jscomp.ASSUME_NO_NATIVE_MAP&&function(){if(!b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),a=new b($jscomp.makeIterator([[c,"s"]]));if("s"!=a.get(c)||1!=a.size||a.get({x:4})||a.set({x:4},"t")!=a||2!=a.size)return!1;var d=a.entries(),e=d.next();if(e.done||e.value[0]!=c||"s"!=e.value[1])return!1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(f){return!1}}())return b;$jscomp.initSymbol();
$jscomp.initSymbolIterator();var d=new WeakMap,h=function(c){this.data_={};this.head_=l();this.size=0;if(c){c=$jscomp.makeIterator(c);for(var a;!(a=c.next()).done;)a=a.value,this.set(a[0],a[1])}};h.prototype.set=function(c,a){var b=g(this,c);b.list||(b.list=this.data_[b.id]=[]);b.entry?b.entry.value=a:(b.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:c,value:a},b.list.push(b.entry),this.head_.previous.next=b.entry,this.head_.previous=b.entry,this.size++);return this};h.prototype.delete=
function(a){a=g(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};h.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=l();this.size=0};h.prototype.has=function(a){return!!g(this,a).entry};h.prototype.get=function(a){return(a=g(this,a).entry)&&a.value};h.prototype.entries=function(){return e(this,function(a){return[a.key,
a.value]})};h.prototype.keys=function(){return e(this,function(a){return a.key})};h.prototype.values=function(){return e(this,function(a){return a.value})};h.prototype.forEach=function(a,b){for(var c=this.entries(),d;!(d=c.next()).done;)d=d.value,a.call(b,d[1],d[0],this)};h.prototype[Symbol.iterator]=h.prototype.entries;var g=function(b,e){var c=e&&typeof e;"object"==c||"function"==c?d.has(e)?c=d.get(e):(c=""+ ++a,d.set(e,c)):c="p_"+e;var h=b.data_[c];if(h&&$jscomp.owns(b.data_,c))for(b=0;b<h.length;b++){var f=
h[b];if(e!==e&&f.key!==f.key||e===f.key)return{id:c,list:h,index:b,entry:f}}return{id:c,list:h,index:-1,entry:void 0}},e=function(a,b){var c=a.head_;return $jscomp.iteratorPrototype(function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null}return{done:!0,value:void 0}})},l=function(){var a={};return a.previous=a.next=a.head=a},a=0;return h},"es6","es3");var module$Input_0={};
(function(b,d){"object"===typeof module$Input_0&&"undefined"!==typeof module?module$Input_0=d():"function"===typeof define&&define.amd?define(d):b.crossed=d()})(this,function(){function b(a,b){var c,f=[];for(k=arguments.length;2<k--;)m.push(arguments[k]);for(;m.length;)if(Array.isArray(c=m.pop()))for(k=c.length;k--;)m.push(c[k]);else null!=c&&!0!==c&&!1!==c&&f.push("number"===typeof c?c+"":c);return"string"===typeof a?{type:a,props:b||{},children:f}:a(b||{},f)}function d(a,c){function f(){a.view&&
!u&&requestAnimationFrame(d,u=!u)}function d(){e(z=v(c,z,D,D=a.view(E,A),u=!u))}function e(a){for(;a=w.pop();)a()}function h(a,c){return a&&b(a.tagName.toLowerCase(),{},c.call(a.childNodes,function(a){return 3===a.nodeType?a.nodeValue:h(a,c)}))}function q(a,b,c){a.init&&w.push(function(){a.init(b,c)});k(b,a.state);g(b,c,a.actions);for(var f in a.modules)q(a.modules[f],b[f]={},c[f]={})}function g(a,b,c){function d(b){return"function"===typeof b?d(b(a)):b&&f(k(a,b)),a}Object.keys(c||{}).map(function(f){"function"===
typeof c[f]?b[f]=function(e){return"function"===typeof(e=c[f](a,b,e))?e(d):d(e)}:g(a[f]||(a[f]={}),b[f]={},c[f])})}function k(a,b){for(var c in b)a[c]=b[c];return a}function l(a,b){return k(k({},a),b)}function B(a,b){if("string"===typeof a)var c=document.createTextNode(a);else{c=(b=b||"svg"===a.type)?document.createElementNS("http://www.w3.org/2000/svg",a.type):document.createElement(a.type);a.props&&a.props.oncreate&&w.push(function(){a.props.oncreate(c)});for(var f=0;f<a.children.length;f++)c.appendChild(B(a.children[f],
b));for(f in a.props)m(c,f,a.props[f])}return c}function m(a,b,c,f){if("key"!==b)if("style"===b)for(b in l(f,c=c||{}))a.style[b]=c[b]||"";else{try{a[b]=c}catch(J){}"function"!==typeof c&&(c?a.setAttribute(b,c):a.removeAttribute(b))}}function I(a,b,c){for(var f in l(b,c)){var d=c[f],e="value"===f||"checked"===f?a[f]:b[f];d!==e&&d!==e&&m(a,f,d,e)}c&&c.onupdate&&w.push(function(){c.onupdate(a,b)})}function C(a,b,c){function f(){a.removeChild(b)}c&&c.onremove&&"function"===typeof(c=c.onremove(b))?c(f):
f()}function y(a){if(a&&a.props)return a.props.key}function v(a,b,c,f,d,e){if(null==c)b=a.insertBefore(B(f,d),b);else if(null!=f.type&&f.type===c.type){I(b,c.props,f.props);d=d||"svg"===f.type;var h=f.children.length,r=c.children.length;a={};var q=[];e={};for(var g=0;g<r;g++){var k=q[g]=b.childNodes[g],p=c.children[g],l=y(p);null!=l&&(a[l]=[k,p])}for(var m=g=0;m<h;){k=q[g];p=c.children[g];var t=f.children[m];l=y(p);if(e[l])g++;else{var x=y(t),n=a[x]||[];null==x?(null==l&&(v(b,k,p,t,d),m++),g++):(l===
x?(v(b,n[0],n[1],t,d),g++):n[0]?(b.insertBefore(n[0],k),v(b,n[0],n[1],t,d)):v(b,k,null,t,d),m++,e[x]=t)}}for(;g<r;)p=c.children[g],l=y(p),null==l&&C(b,q[g],p.props),g++;for(g in a)n=a[g],c=n[1],e[c.props.key]||C(b,n[0],c.props)}else b&&f!==b.nodeValue&&("string"===typeof f&&"string"===typeof c?b.nodeValue=f:(b=a.insertBefore(B(f,d),e=b),C(a,e,c.props)));return b}var z=(c=c||document.body).children[0],D=h(z,[].map),w=[],u,E,A;f(e(q(a,E={},A={})));return A}(function(){function a(a){this.value=a}function b(b){function c(d,
e){try{var g=b[d](e),h=g.value;h instanceof a?Promise.resolve(h.value).then(function(a){c("next",a)},function(a){c("throw",a)}):f(g.done?"return":"normal",g.value)}catch(H){f("throw",H)}}function f(a,b){switch(a){case "return":d.resolve({value:b,done:!0});break;case "throw":d.reject(b);break;default:d.resolve({value:b,done:!1})}(d=d.next)?c(d.key,d.arg):e=null}var d,e;this._invoke=function(a,b){return new Promise(function(f,g){f={key:a,arg:b,resolve:f,reject:g,next:null};e?e=e.next=f:(d=e=f,c(a,b))})};
"function"!==typeof b.return&&(this.return=void 0)}"function"===typeof Symbol&&Symbol.asyncIterator&&(b.prototype[Symbol.asyncIterator]=function(){return this});b.prototype.next=function(a){return this._invoke("next",a)};b.prototype.throw=function(a){return this._invoke("throw",a)};b.prototype.return=function(a){return this._invoke("return",a)};return{wrap:function(a){return function(){return new b(a.apply(this,arguments))}},await:function(b){return new a(b)}}})();var h=function(a,b,c){b in a?Object.defineProperty(a,
b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c;return a},g=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)},e=function(a,b){return Object.keys(a).reduce(function(c,f){return Object.assign(c,h({},f,b(a[f],f)))},{})},l=function(a){var b=a.setState,c=a.getState,f=a.getReducer,d=a.introspectors,h=a.middleware,k=a.callSubscribers,l=0,m={},F=function(a){l++;var e=h.reduce(function(a,b){var f=a[a.length-1];b=f?b(c(),f):
f;return[].concat(g(a),[b])},[a]);if(a=e[e.length-1]){var q=c(),p=f()(c(),a);b(p);var r=m[a.type]?m[a.type](a):void 0;d.forEach(function(a){return a({actions:e,prevState:q,nextState:p,response:r})});1===l--&&k();return r}l--;d.forEach(function(a){return a({actions:e,prevState:c(),nextState:c(),response:void 0})})};m=e(a.responders,function(a){return a(F,c)});return F},a=function(a){var b=0,c=new Map;return{subscribe:function(a){var f=b++;c.set(f,a);return function(){return c.delete(f)}},callSubscribers:function(){c.forEach(function(b){return b(a())})}}},
c={dux:{createStore:function(b){var c=b.reducer,d=b.middleware;d=void 0===d?[]:d;var f=b.responders;f=void 0===f?{}:f;b=b.introspectors;b=void 0===b?[]:b;var e=c,g=c(void 0,{type:"@@DUX:INIT"});c=function(){return g};var h=a(c),k=h.subscribe;d=l({getState:c,setState:function(a){return g=a},getReducer:function(){return e},responders:f,introspectors:b,middleware:d,callSubscribers:h.callSubscribers});return{getState:c,dispatch:d,subscribe:k,replaceReducer:function(a){return e=a}}}},utility:Object.freeze({regexResults:function(a){return function(b){return function n(c){var d=
1<arguments.length&&void 0!==arguments[1]?arguments[1]:[];return null!==c?n(a.exec(b),[].concat(g(d),[c[0]])):d}(a.exec(b))}},isObjectLiteral:function(a){try{return Object.getPrototypeOf(void 0)===Object.prototype}catch(q){return!1}},objMap:e})},k,m=[],G={state:{count:0},view:function(a,c){return b("main",{},[b("h1",{},a.count),b("button",{onclick:c.down,disabled:0>=a.count},"\u2013"),b("button",{onclick:c.up},"+")])},actions:{down:function(a){return{count:a.count-1}},up:function(a){return{count:a.count+
1}}}};(function(a,b){if("undefined"===typeof document)return b;a=a||"";var c=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css";c.appendChild(d);d.styleSheet?d.styleSheet.cssText=a:d.appendChild(document.createTextNode(a));return b})("/*! TACHYONS v4.8.1 | http://tachyons.io */\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */.border-box,a,article,body,code,dd,div,dl,dt,fieldset,footer,form,h1,h2,h3,h4,h5,h6,header,html,input[type\x3demail],input[type\x3dnumber],input[type\x3dpassword],input[type\x3dtel],input[type\x3dtext],input[type\x3durl],legend,li,main,ol,p,pre,section,table,td,textarea,th,tr,ul{box-sizing:border-box}",
void 0);return{lib:c,main:function(a){var b=a&&document.getElementById(a);if(a&&!b)throw Error("\nNo element was found for the given mountID: "+a+"\n");d(G,a&&b)}}});
