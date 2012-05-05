/*
 * tmlib.js
 */


(function() { "use strict"; })();

/*
 * tm namespace
 */
var tm = tm || {};


(function() {
    
    /**
     * バージョン
     */
    tm.VERSION = "0.0.0";
    
    
    /**
     * tmlib.js のルートパス
     */
    tm.LIB_ROOT = (function(){
        if (!window.document) return ;
        
        var scripts = document.getElementsByTagName("script");
        for (var i=0, len=scripts.length; i<len; ++i) {
            
        }
    })();
    
    /**
     * ブラウザ
     */
    tm.BROWSER = (function() {
        if (!window.navigator) return ;
        
        if      (/chrome/i.test(navigator.userAgent))   { return "Chrome";  }
        else if (/safari/i.test(navigator.userAgent))   { return "Safari";  }
        else if (/firefox/i.test(navigator.userAgent))  { return "Firefox"; }
        else if (/opera/i.test(navigator.userAgent))    { return "Opera";   }
        else if (/getcko/i.test(navigator.userAgent))   { return "Getcko";  }
        else if (/msie/i.test(navigator.userAgent))     { return "IE";      }
        else { return null; }
    })();
    
    /**
     * モバイルかどうかの判定フラグ
     */
    tm.isMobile = (function() {
        if (!window.navigator) return ;
        
        return (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("Android") > 0);
    })();
    
    
    /**
     * クラス定義
     */
    tm.createClass = function(prop) {
        // デフォルト値
        prop.init = prop.init || function() {};
        prop.superClass = prop.superClass || null;
        
        // クラス作成
        var tm_class = function() {
            var temp = new tm_class.prototype.creator();
            tm_class.prototype.init.apply(temp, arguments);
            return temp
        };
        
        // 継承
        if (prop.superClass) {
            tm_class.prototype = Object.create(prop.superClass.prototype);
            tm_class.prototype.superInit = function() {
                // 一時的に superClass として扱われるようにする
                var temp_proto = this.__proto__;
                this.__proto__ = prop.superClass.prototype;
                // 親の初期化を呼び出す
                prop.superClass.prototype.init.apply(this, arguments);
                // 元に戻す
                this.__proto__ = temp_proto;
            };
        }
        
        // プロパティを追加
        for (var key in prop) {
            tm_class.prototype[key] = prop[key];
        }
        
        // クリエイタの生成
        tm_class.prototype.creator = function() { return this; };
        // クリエイタの継承
        tm_class.prototype.creator.prototype = tm_class.prototype;
        
        return tm_class;
    };
    
    
    /**
     * 使用する
     */
    tm.using = function() {
        for (var key in tm) {
            window[key] = tm[key];
        }
    };
    
    /**
     * ループ
     */
    tm.setLoop = function(fn, delay) {
        var temp = function() {
            fn();
            setTimeout(arguments.callee, delay);
        };
        setTimeout(temp, delay);
    };
    
    /**
     * キーコード
     */
    tm.keyCode = {
        "backspace" : 8,
        "tab"       : 9,
        "enter"     : 13, "return"    : 13,
        "shift"     : 16,
        "ctrl"      : 17,
        "alt"       : 18,
        "pause"     : 19,
        "capslock"  : 20,
        "escape"    : 27,
        "pageup"    : 33,
        "pagedown"  : 34,
        "end"       : 35,
        "home"      : 36,
        "left"      : 37,
        "up"        : 38,
        "right"     : 39,
        "down"      : 40,
        "insert"    : 45,
        "delete"    : 46,
        
        "0" : 48,
        "1" : 49,
        "2" : 50,
        "3" : 51,
        "4" : 52,
        "5" : 53,
        "6" : 54,
        "7" : 55,
        "8" : 56,
        "9" : 57,
        
        "a" : 65, "A" : 65,
        "b" : 66, "B" : 66,
        "c" : 67, "C" : 67,
        "d" : 68, "D" : 68,
        "e" : 69, "E" : 69,
        "f" : 70, "F" : 70,
        "g" : 71, "G" : 71,
        "h" : 72, "H" : 72,
        "i" : 73, "I" : 73,
        "j" : 74, "J" : 74,
        "k" : 75, "K" : 75,
        "l" : 76, "L" : 76,
        "m" : 77, "M" : 77,
        "n" : 78, "N" : 78,
        "o" : 79, "O" : 79,
        "p" : 80, "P" : 80,
        "q" : 81, "Q" : 81,
        "r" : 82, "R" : 82,
        "s" : 83, "S" : 83,
        "t" : 84, "T" : 84,
        "u" : 85, "U" : 85,
        "v" : 86, "V" : 86,
        "w" : 87, "W" : 87,
        "x" : 88, "X" : 88,
        "y" : 89, "Y" : 89,
        "z" : 90, "Z" : 90,
        
        "numpad0" : 96,
        "numpad1" : 97,
        "numpad2" : 98,
        "numpad3" : 99,
        "numpad4" : 100,
        "numpad5" : 101,
        "numpad6" : 102,
        "numpad7" : 103,
        "numpad8" : 104,
        "numpad9" : 105,
        "multiply"      : 106,
        "add"           : 107,
        "subtract"      : 109,
        "decimalpoint"  : 110,
        "divide"        : 111,
        
        "f1"    : 112,
        "f2"    : 113,
        "f3"    : 114,
        "f4"    : 115,
        "f5"    : 116,
        "f6"    : 117,
        "f7"    : 118,
        "f8"    : 119,
        "f9"    : 120,
        "f10"   : 121,
        "f11"   : 122,
        "f12"   : 123,
        
        "numlock"   : 144,
        "scrolllock": 145,
        "semicolon" : 186,
        "equalsign" : 187,
        "comma"     : 188,
        "dash"      : 189,
        "period"    : 190,
        "forward slash" : 191,  "/": 191,
        "grave accent"  : 192,
        "open bracket"  : 219,
        "back slash"    : 220,
        "close braket"  : 221,
        "single quote"  : 222,
        
        
        
        "space"         : 32
    };
    
    
})();

(function() {
    if (!window.document) return ;
    
    _loadCheckList = [];
    tm.addLoadCheckList = function(obj) {
        console.assert(obj.isLoaded !== undefined, "isLoaded が定義されていません!!");
        
        _loadCheckList.push(obj);
    };
    
    _preloadListners = [];
    _mainListners = [];
    
    tm.preload = function(fn) { _preloadListners.push(fn); };
    tm.main    = function(fn) { _mainListners.push(fn); };
    
    var _preload = function() {
        
        for (var i=0,len=_preloadListners.length; i<len; ++i) {
            _preloadListners[i]();
        }
        _preloadListners = [];
    };
    
    var _main = function() {
        for (var i=0,len=_loadCheckList.length; i<len; ++i) {
            var c = _loadCheckList[i];
            if (c.isLoaded() == false) {
                setTimeout(arguments.callee, 0);
                return ;
            }
        }
        
        for (var i=0,len=_mainListners.length; i<len; ++i) {
            _mainListners[i]();
        }
        
        _mainListners = [];
    };
    
    window.addEventListener("load", function() {
        
        _preload();
        
        _main();
        
    }, false);

})();






/*
 * object.js
 */

(function() {
    
    /**
     * @class Object
     * オブジェクト
     */
    
    /**
     * @method defineVariable
     * 変数を追加
     * @param   {String} key name
     * @param   {Object} param
     */
    Object.defineProperty(Object.prototype, "defineVariable", {
        value: function(name, val) {
            Object.defineProperty(this, name, {
                value: val,
                enumerable: true
            });
        }
    });
    
    /**
     * @method defineFunction
     * 関数を追加
     * @param   {String} key name
     * @param   {Function} function
     */
    Object.defineProperty(Object.prototype, "defineFunction", {
        value: function(name, fn) {
            Object.defineProperty(this, name, {
                value: fn,
                enumerable: false
            });
        }
    });
    
    
    Object.prototype.defineFunction("defineInstanceVariable", function(name, val){
        Object.defineProperty(this.prototype, name, {
            value: val,
            enumerable: true
        });
    });
    
    Object.prototype.defineFunction("defineInstanceMethod", function(name, fn){
        Object.defineProperty(this.prototype, name, {
            value: fn,
            enumerable: false
        });
    });
    
    Object.defineInstanceMethod("setter", function(name, fn){
        Object.defineProperty(this, name, {
            set: fn,
            enumerable: false
        });
        // this.__defineSetter__(name, fn);
    });
    
    Object.defineInstanceMethod("getter", function(name, fn){
        Object.defineProperty(this, name, {
            get: fn,
            enumerable: false
        });
        // this.__defineGetter__(name, fn);
    });
    
    Object.defineInstanceMethod("accessor", function(name, param)
    {
        Object.defineProperty(this, name, {
            set: param["set"],
            get: param["get"],
            enumerable: false
        });
        // (param["get"]) && this.getter(name, param["get"]);
        // (param["set"]) && this.setter(name, param["set"]);
    });
    
    Object.defineInstanceMethod("extend", function() {
        for (var i=0,len=arguments.length; i<len; ++i) {
            var source = arguments[i];
            for (var property in source) {
                this[property] = source[property];
            }
        }
        return this;
    });
    
})();



/*
 * array.js
 */


(function() {
    
    /**
     * @class   Array
     * 配列
     */
    
    /**
     * @property    first
     * 最初の要素
     */
    Array.prototype.accessor("first", {
        "get": function()   { return this[0]; },
        "set": function(v)  { this[0] = v; }
    });
    
    /**
     * @property    last
     * 最後の要素
     */
    Array.prototype.accessor("last", {
        "get": function()   { return this[this.length-1]; },
        "set": function(v)  { this[this.length-1] = v; }
    });
    
    
    /**
     * @method  equals
     * 渡された配列と等しいかどうかをチェック
     */
    Array.defineInstanceMethod("equals", function(arr) {
        // // 長さもチェックするかを検討
        // if (this.length !== arr.length) return false;
        
        for (var i=0,len=this.length; i<len; ++i) {
            if (this[i] !== arr[i]) {
                return false;
            }
        }
        return true;
    });
    
    /**
     * @method  deepEquals
     * ネストされている配列含め渡された配列と等しいかどうかをチェック
     * equalsDeep にするか検討. (Java では deepEquals なのでとりあえず合わせとく)
     */
    Array.defineInstanceMethod("deepEquals", function(arr) {
        for (var i=0,len=this.length; i<len; ++i) {
            var result = (this[i].deepEquals) ? this[i].deepEquals(arr[i]) : (this[i] === arr[i]);
            if (result === false) {
                return false;
            }
        }
        return true;
    });
    
    /**
     * @method  at
     * ループ添字アクセス(Ruby っぽいやつ)
     */
    Array.defineInstanceMethod("at", function(i) {
        i%=this.length;
        i+=this.length;
        i%=this.length;
        return this[i];
    });
    
    
    /**
     * @method  swap
     * a番目 と b番目 を入れ替える
     */
    Array.defineInstanceMethod("swap", function(a, b) {
        var temp = this[a];
        this[a] = this[b];
        this[b] = temp;
        return this;
    });
    
    
    /**
     * @method  erase
     * elm と一致する要素を削除
     */
    Array.defineInstanceMethod("erase", function(elm) {
        var index  = this.indexOf(elm);
        this.splice(index, 1);
        return this;
    });
    
    /**
     * @method  eraseAll
     * elm と一致する要素を全て削除
     */
    Array.defineInstanceMethod("eraseAll", function(elm) {
        for (var i=0,len=this.length; i<len; ++i) {
            if (this[i] == elm) {
                this.splice(i--, 1);
            }
        }
        return this;
    });
    
    /**
     * @method  eraseIf
     * 条件にマッチした要素を削除
     */
    Array.defineInstanceMethod("eraseIf", function(fn) {
        for (var i=0,len=this.length; i<len; ++i) {
            if ( fn(this[i], i, this) ) {
                this.splice(i, 1);
                break;
            }
            // if ( fn(this[i], i, this) ) { this.splice(i--, 1); }
        }
        return this;
    });
    
    /**
     * @method  random
     * 要素の中からランダムで取り出す
     */
    Array.defineInstanceMethod("random", function(min, max) {
        min = min || 0;
        max = max || this.length-1;
        return this[ Math.rand(min, max) ];
    });
    
    
    /**
     * @method  uniq
     * 重複削除
     */
    Array.defineInstanceMethod("uniq", function(deep) {
        var arr = [];
        for (var i=0,len=this.length; i<len; ++i) {
            var value = this[i];
            if (value in arr == false) {
                arr.push(value);
            }
        }
        return arr;
    });
    
    /**
     * @method  flatten
     * フラット.
     * Ruby のやつ.
     */
    Array.defineInstanceMethod("flatten", function(deep) {
        var arr = [];
        for (var i=0,len=this.length; i<len; ++i) {
            var value = this[i];
            if (value instanceof Array) {
                arr = arr.concat(value.flatten());
            }
            else {
                arr.push(value);
            }
        }
        return arr;
    });
    
    /**
     * @method  clone
     * 配列をクローン
     */
    Array.defineInstanceMethod("clone", function(deep) {
        if (deep == true) {
            var a = Array(this.length);
            for (var i=0,len=this.length; i<len; ++i) {
                a[i] = (this[i].clone) ? this[i].clone(deep) : this[i];
            }
            return a;
        };
        
        return Array.prototype.slice.apply(this);
    });
    
    /**
     * @method  clear
     * クリア
     */
    Array.defineInstanceMethod("clear", function() {
        this.length = 0;
        return this;
    });
    
    /**
     * @method  fill
     * 特定の値で満たす
     */
    Array.defineInstanceMethod("fill", function(value, start, end) {
        start = start || 0;
        end   = end   || (this.length-1);
        
        for (var i=start; i<end; ++i) {
            this[i] = value;
        }
        
        return this;
    });
    
    /**
     * @method  shuffle
     * シャッフル
     */
    Array.defineInstanceMethod("shuffle", function() {
        for (var i=0,len=this.length; i<len; ++i) {
            this.swap(i, Math.rand(0, len));
        }
        
        return this;
    });
    
    /**
     * @method  toULElement
     * ULElement に変換
     */
    Array.defineInstanceMethod("toULElement", function(){
        // TODO: 
    });

    /**
     * @method  toOLElement
     * OLElement に変換
     */
    Array.defineInstanceMethod("toOLElement", function(){
        // TODO:
    });
    
})();



/*
 * date.js
 */


(function() {
    
    /**
     * @class   Date
     * Date クラス
     */
    
    var MONTH = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    
    var WEEK = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    
    /**
     * @method  round
     * 四捨五入
     * 桁数指定版
     */
    Date.prototype.format = function(pattern)
    {
        /*
        var str = "{y}/{m}/{d}".format({
            y: this.getYear()+1900,
            m: this.getMonth()+1,
            d: this.getDate(),
        });
        
        return str;
        */
        
        var year    = this.getFullYear();
        var month   = this.getMonth();
        var date    = this.getDate();
        var day     = this.getDay();
        var hours   = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var str = "";
        
        for (var i=0,len=pattern.length; i<len; ++i) {
            var ch = pattern.charAt(i);
            var temp = "";
            switch(ch) {
                // 日
                case "d": temp = date.padding(2, '0'); break;
                case "D": temp = WEEK[day].substr(0, 3); break;
                case "j": temp = date; break;
                case "l": temp = WEEK[day]; break;
                // case "N": temp = ; break;
                // case "S": temp = ; break;
                // case "w": temp = ; break;
                // case "z": temp = ; break;
                
                // 月
                case "F": temp = MONTH[month]; break;
                case "m": temp = (month+1).padding(2, '0'); break;
                case "M": temp = MONTH[month].substr(0, 3); break;
                case "n": temp = (month+1); break;
                // case "t": temp = (month+1); break;
                
                // 年
                // case "L": temp = ; break;
                // case "o": temp = ; break;
                case "Y": temp = year; break;
                case "y": temp = year.toString().substr(2, 2); break;
                
                
                // 時間
                // case "a": temp = ; break;
                // case "A": temp = ; break;
                // case "B": temp = ; break;
                // case "g": temp = ; break;
                case "G": temp = hours; break;
                // case "h": temp = ; break;
                case "H": temp = hours.padding(2, '0'); break;
                case "i": temp = minutes.padding(2, '0'); break;
                case "s": temp = seconds.padding(2, '0'); break;
                
                default : temp = ch; break;
            }
            str += temp;
        }
        return str;
    };
    
})();



/*
 * function.js
 */


(function() {
    
    /**
     * @class   Function
     * 関数
     */
    
    /**
     * @method  toArrayFunction
     * 関数を配列対応関数に変換.
     * forEach の逆アプローチ的な感じ.
     * 配列を継承したクラスなどに使用する.
     * ## Example
     *      var hoge = function(n) { console.log(this*n); return this*n; };
     *      var arr = [5, 10, 15];
     *      arr.hogeArray = hoge.toArrayFunction();
     *      var result = arr.hogeArray(100);
     *      console.log(result);
     */
    Function.defineInstanceMethod("toArrayFunction", function() {
        var self = this;
        return function() {
            var resultList = [];
            for (var i=0,len=this.length; i<len; ++i) {
                resultList.push( self.apply(this[i], arguments) );
            }
            return resultList;
        }
    });
    
    // forEach や map はもう標準化されてきてるので実装しないよん♪
    
});



/*
 * math.js
 */


(function() {
    
    /**
     * @class Math
     * 数学
     */
    
    /**
     * @property    DEG_TO_RAD
     * Degree to Radian.
     */
    Math.DEG_TO_RAD = Math.PI/180;
    
    
    /**
     * @property    RAD_TO_DEG
     * Radian to Degree.
     */
    Math.RAD_TO_DEG = 180/Math.PI;
    
    /**
     * @method
     * Degree を Radian に変換
     */
    Math.degToRad = function(deg) {
        return deg * DEG_TO_RAD;
    };
    
    /**
     * @method
     * Radian を Degree に変換
     */
    Math.radToDeg = function(rad) {
        return rad * RAD_TO_DEG;
    };
    
    
    
    /**
     * @method
     * ランダムな値を指定された範囲内で生成
     */
    Math.rand = function(min, max) {
        return window.Math.floor( Math.random()*(max-min+1) ) + min;
    };
    
    /**
     * @method
     * ランダムな値を指定された範囲内で生成
     */
    Math.randf= function(min, max) {
        return window.Math.random()*(max-min)+min;
    };

    /**
     * @method
     * 長さを取得
     */
    Math.magnitude = function() {
        return Math.sqrt(Math.magnitudeSq.apply(null, arguments));
    };
    
    
    /**
     * @method
     * 長さの２乗を取得
     */
    Math.magnitudeSq = function() {
        var n = 0;
        
        for (var i=0,len=arguments.length; i<len; ++i) {
            n += arguments[i]*arguments[i];
        }
        
        return n;
    };
    
    /**
     * @method
     * Dummy
     */
    Math.linear = function(t, b, c, d) {
        return c*t/d + b;
    };
    
    Math.easeInQuad = function(t, b, c, d) {
        return c*(t/=d)*t + b;
    };
    
    /*
    tm.anim.bounceEaseOut = function(t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }
     */
    
})();



/*
 * number.js
 */


(function() {
    
    /**
     * @class   Number
     * 数値
     */
    
    /**
     * @method  round
     * 四捨五入
     * 桁数指定版
     */
    Number.defineInstanceMethod("round", function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.round(temp);
        return temp/base;
    });
    
    /**
     * @method  ceil
     * 切り上げ.
     * 桁数指定版
     */
    Number.defineInstanceMethod("ceil",  function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.ceil(temp);
        return temp/base;
    });
    /**
     * @method  floor
     * 切り捨て
     * 桁数指定版
     */
    Number.defineInstanceMethod("floor",  function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.floor(temp);
        
        // ~~this
        // this|0
        
        return temp/base;
    });
    
    /**
     * @method  toInt
     * integer 型に変換する
     */
    Number.defineInstanceMethod("toInt",  function() {
        return (this | 0);
    });
    
    /**
     * @method  toUnsigned
     * unsigned 型に変換する
     */
    Number.defineInstanceMethod("toUnsigned",  function() {
        return this >>> 0;
    });
    
    /**
     * @method  toHex
     * 16進数化
     */
    Number.defineInstanceMethod("toHex",  function() {
        return this.toString(16);
    });
    
    /**
     * @method  toBin
     * 2進数化
     */
    Number.defineInstanceMethod("toBin",  function() {
        return this.toString(2);
    });
    
    
    /**
     * @method  padding
     * 文字埋め
     */
    Number.defineInstanceMethod("padding",  function(n, ch) {
        var str = this+'';
        n  = n-str.length;
        ch = ch || '0';
        
        while(n-- > 0) { str = ch + str; }
        
        return str;
    });
    
})();



/*
 * string.js
 */


(function() {
    /**
     * @class String
     *
     * `String` is a global object that may be used to construct String instances.
     */
    
    
    /**
     * @method
     * 
     * フォーマット
     * 
     * ## example
     * 
     *      document.write("{0} + {1} = {2}".format(5, 10, 5+10));   // "5 + 10 = 15"
     *      document.write("rgb({r}, {g}, {b})".format({             // "rgb(128, 0, 255)"
     *          r: 128,
     *          g: 0,
     *          b: 255
     *      }));
     */
    String.prototype.format = function(arg)
    {
        // 置換ファンク
        var rep_fn = undefined;
        
        // オブジェクトの場合
        if (typeof arg == "object") {
            /** @ignore */
            rep_fn = function(m, k) { return arg[k]; }
        }
        // 複数引数だった場合
        else {
            var args = arguments;
            /** @ignore */
            rep_fn = function(m, k) { return args[ parseInt(k) ]; }
        }
        
        return this.replace( /\{(\w+)\}/g, rep_fn );
    };
    
    /**
     * @method
     * トリム
     * 
     * <a href="http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/">Reference</a>
     * 
     */
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    };
    
    /**
     * @method
     * キャピタライズ
     * 
     * ## Reference
     * 
     * - [キャピタライズ(単語の先頭の大文字化)を行う - oct inaodu](http://d.hatena.ne.jp/brazil/20051212/1134369083)
     * - [デザインとプログラムの狭間で: javascriptでキャピタライズ（一文字目を大文字にする）](http://design-program.blogspot.com/2011/02/javascript.html)
     * 
     */
    String.prototype.capitalize = function() {
        return this.replace(/\w+/g, function(word){
            return word.capitalizeFirstLetter();
        });
    };
    
    /**
     * @method
     * 先頭文字のみキャピタライズ
     */
    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
    };
    
    /**
     * @method
     * ダッシュ
     */
    String.prototype.toDash = function() {
        return this.replace(/([A-Z])/g, function(m){ return '-'+m.toLowerCase(); });
    }
    
    
    /**
     * @method
     * ハッシュ値に変換
     */
    String.prototype.toHash= function() {
        return TM.crc32(this);
    };
    
    /**
     * @method
     * 左側に指定された文字を詰めて右寄せにする
     */
    String.prototype.padding = function(n, ch) {
        var str = this.toString();
        n  = n-str.length;
        ch = ch || ' ';
        
        while(n-- > 0) { str = ch + str; }
        
        return str;
    };
    
    /**
     * @method
     * 左側に指定された文字を詰めて右寄せにする
     */
    String.prototype.paddingLeft = String.prototype.padding;
    
    /**
     * @method
     * 右側に指定された文字を詰めて左寄せにする
     */
    String.prototype.paddingRight = function(n, ch) {
        var str = this.toString();
        n  = n-str.length;
        ch = ch || ' ';
        
        while(n-- > 0) { str = str + ch; }
        
        return str;
    };
    
    /**
     * @method
     * リピート
     */
    String.prototype.repeat = function(n) {
        // TODO: 確認する
        var arr = Array(n);
        for (var i=0; i<n; ++i) arr[i] = this;
        return arr.join('');
    };
    
    
    
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');
    
    /**
     * @method
     * CRC32 変換
     */
    String.prototype.toCRC32 = function() {
        var crc = 0, x=0, y=0;
        
        crc = crc ^ (-1);
        for (var i=0, iTop=this.length; i<iTop; ++i) {
            y = (crc ^ this.charCodeAt(i)) & 0xff;
            x = "0x" + table[y];
            crc = (crc >>> 8) ^ x;
        }
        
        return (crc ^ (-1)) >>> 0;
    };
    
    
})();


/*
 * list.js
 */


(function(){
    
    /**
     * @class
     * Item クラス
     */
    tm.Item = tm.createClass({
        
        prev: null,
        next: null,
        data: null,
        
        /**
         * 初期化
         */
        init: function() {
        }
    });
    
    /**
     * @class
     * List クラス
     * ### Reference
     * - <http://java.sun.com/javase/ja/6/docs/ja/api/java/util/LinkedList.html>
     * - <http://www.javadrive.jp/start/linkedlist/>
     * - <http://www5c.biglobe.ne.jp/~ecb/cpp/07_08.html>
     * - <http://hextomino.tsukuba.ch/e30895.html>
     * - <http://www.nczonline.net/blog/2009/04/21/computer-science-in-javascript-doubly-linked-lists/>
     * - <http://www.nczonline.net/blog/2009/04/13/computer-science-in-javascript-linked-list/>
     */
    tm.List = tm.createClass({
        
        /**
         * 初期化
         */
        init: function() {
            this._length = 0;
            this._head = tm.Item();
            this._tail = tm.Item();
            
            this._head.next = this._tail;
            this._tail.prev = this._head;
        },
        
        /**
         * 追加
         */
        add: function(data) {
            var item = tm.Item();
            item.data = data;
            
            item.prev = this._tail.prev;
            item.next = this._tail;
            
            this._tail.prev.next = item;
            this._tail.prev = item;
            
            ++this._length;
            
            return this;
        },
        
        /**
         * 削除
         */
        remove: function(index)
        {
            var current = this.getItem(index);
            
            current.prev.next = current.next;
            current.next.prev = current.prev;
            
            --this._length;
            
            return current;
        },
        
        /**
         * 取得
         */
        get: function(index)
        {
            return this.getItem(index).data;
        },
        
        /**
         * アイテムを取得
         */
        getItem: function(index)
        {
            var current = this._head.next;
            var i=0;
            
            while (i++ < index) {
                current = current.next;
            }
            
            return current;
        },
        
        /**
         * 繰り返し
         */
        forEach: function(fn) {
            // TODO:
        },
        
        /**
         * クリア
         */
        clear: function() {
            // TODO:
        },
        
        /**
         * クローン
         */
        clone: function() {
            // TODO:
        },
        
        /**
         * 最初の要素を取得
         */
        getFirst: function() {
            // TODO:
        },
        
        /**
         * 最後の要素を取得
         */
        getLast: function() {
            // TODO:
        },
        
        /**
         * 最初に一致した位置のインデックスを取得
         */
        indexOf: function(obj) {
            // TODO:
        },
        
        /**
         * 最後に一致した位置のインデックスを取得
         */
        lastIndexOf: function(obj) {
            // TODO:
        },
        
        /**
         * 配列に変換
         */
        toArray: function() {
            if (this._length <= 0) return [];
            
            var current = this._head.next;
            var arr = [];
            
            while (current.data != null) {
                arr.push(current.data);
                current = current.next;
            }
            
            return arr;
        },
        
        /**
         * 文字列に変換
         */
        toString: function() {
            var arr = this.toArray();
            for (var i=0,len=arr.length; i<len; ++i) {
                arr[i] = arr[i].toString();
            }
            
            return arr.join(',');
        },
    });
    
})();



/*
 * vector2.js
 */

/*
 * 幾何学
 */
tm.geom = tm.geom || {};


(function() {
    
    /**
     * 2次元ベクトル
     */
    tm.geom.Vector2 = tm.createClass({
        /**
         * x 座標
         */
        x: 0,
        /**
         * y 座標
         */
        y: 0,
        
        /**
         * @constructor
         * 初期化
         */
        init: function(x, y) {
            this.set(x, y);
        },
        
        /**
         * セッター
         */
        set: function(x, y) {
            this.x = x;
            this.y = y;
        },
        
        
        /**
         * 数値からセット
         */
        setFromNumber: function(x, y) {
            this.x = x;
            this.y = y;
            
            return this;
        },
        
        /**
         * 配列からセット
         */
        setFromArray: function(arr) {
            this.x = arr[0];
            this.y = arr[1];
            
            return this;
        },
        
        /**
         * オブジェクトからセット
         */
        setFromObject: function(obj) {
            this.x = obj.x;
            this.y = obj.y;
            
            return this;
        },
        
        /**
         * 文字列からセット
         */
        setFromString: function(str) {
            var m = str.match(/(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?)/);
            this.x = parseFloat(m[1]);
            this.y = parseFloat(m[3]);
            
            return this;
        },
        

        /**
         * 角度(radian)と長さでベクトルをセット
         */
        setFromAngle: function(radian, len) {
            len = len || 1;
            this.x = Math.cos(radian)*len;
            this.y = Math.sin(radian)*len;
            return this;
        },
        
        /**
         * 角度(radian)と長さでベクトルをセット
         */
        setFromRadian: function(radian, len) {
            len = len || 1;
            this.x = Math.cos(radian)*len;
            this.y = Math.sin(radian)*len;
            return this;
        },
        
        /**
         * 角度(degree)と長さでベクトルをセット
         */
        setFromDegree: function(degree, len) {
            len = len || 1;
            radian = degree * Math.PI/180;
            this.x = Math.cos(radian)*len;
            this.y = Math.sin(radian)*len;
            return this;
        },
                
        /**
         * 賢いセット
         */
        setSmart: function(x, y, z) {
            var v = arguments[0];
            // xyz
            if (arguments.length === 2) {
                this.x = x;
                this.y = y;
            }
            // Array
            else if (v instanceof Array) {
                this.x = v[0];
                this.y = v[1];
            }
            // Object
            else if (v instanceof Object) {
                this.x = v.x;
                this.y = v.y;
            }
            // String
            else if (typeof(v) == "string") {
                var m = str.match(/(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?)/);
                this.x = parseFloat(m[1]);
                this.y = parseFloat(m[3]);
            }
            
            return this;
        },
        
        /**
         * 加算
         */
        add: function(v) {
            this.x += v.x;
            this.y += v.y;
            
            return this;
        },
        
        /**
         * 減算
         */
        sub: function(v) {
            this.x -= v.x;
            this.y -= v.y;
            
            return this;
        },
        
        /**
         * 乗算
         */
        mul: function(n) {
            this.x *= n;
            this.y *= n;
            
            return this;
        },
        
        /**
         * 除算
         */
        div: function(n) {
            console.assert(n != 0, "0 division!!");
            this.x /= n;
            this.y /= n;
            
            return this;
        },
        
        /**
         * 反転
         */
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            
            return this;
        },
        
        /**
         * 長さを取得
         * or magnitude
         */
        length: function() {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        },
        
        /**
         * 2乗された長さを取得
         * C# の名前を引用
         * or lengthSquare or lengthSqrt
         */
        lengthSquared: function() {
            return this.x*this.x + this.y*this.y;
        },
        
        /**
         * 正規化
         */
        normalize: function() {
            var length = this.length();
            this.div(length);
            
            return this;
        },
        
        random: function(min, max, len) {
            min = min || 0;
            max = max || 360;
            len = len || 1;
            this.setFromDegree(Math.randf(min, max), len);
        },
        
        /**
         * 角度(radian)に変換
         */
        toAngle: function() {
            return Math.atan2(this.y, this.x);
        },
        
        toStyleString: function() {
            return "{x:{x}, y:{y}}".format(this);
        },
        
        toString: function() {
            return "{x:{x}, y:{y}}".format(this);
        },
        
        /**
         * X値をセット
         * チェーンメソッド用セッター
         */
        setX: function(x) {
            this.x = x;
            return this;
        },
        
        /**
         * Y値をセット
         * チェーンメソッド用セッター
         */
        setY: function(y) {
            this.y = y;
            return this;
        }
    });
    
    
    /**
     * @method
     * @static
     * min
     */
    tm.geom.Vector2.min = function(lhs, rhs) {
        return tm.geom.Vector2(
            (lhs.x < rhs.x) ? lhs.x : rhs.x,
            (lhs.y < rhs.y) ? lhs.y : rhs.y
        );
    };
    
    /**
     * @method
     * @static
     * max
     */
    tm.geom.Vector2.max = function(lhs, rhs) {
        return tm.geom.Vector2(
            (lhs.x > rhs.x) ? lhs.x : rhs.x,
            (lhs.y > rhs.y) ? lhs.y : rhs.y
        );
    };
    
    /**
     * @method
     * @static
     * 加算
     */
    tm.geom.Vector2.add = function(lhs, rhs) {
        return tm.geom.Vector2(lhs.x+rhs.x, lhs.y+rhs.y);
    };
    
    /**
     * @method
     * @static
     * 減算
     */
    tm.geom.Vector2.sub = function(lhs, rhs) {
        return tm.geom.Vector2(lhs.x-rhs.x, lhs.y-rhs.y);
    };
    
    /**
     * @method
     * @static
     * 乗算
     */
    tm.geom.Vector2.mul = function(v, n) {
        return tm.geom.Vector2(v.x*n, v.y*n);
    };
    
    /**
     * @method
     * @static
     * 割算
     */
    tm.geom.Vector2.div = function(v, n) {
        return tm.geom.Vector2(v.x/n, v.y/n);
    };
    
    /**
     * @method
     * @static
     * 内積.
     * 投影ベクトルを求めたり, 類似度に使ったり.
     */
    tm.geom.Vector2.dot = function(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    };
    

    /**
     * @method
     * @static
     * 外積
     */
    tm.geom.Vector2.cross = function(lhs, rhs) {
        // TODO: 
    };
    
    /**
     * @method
     * @static
     * 反転
     */
    tm.geom.Vector2.negate = function(v) {
        return tm.geom.Vector2(-v.x, -v.y);
    };
    
    /**
     * @method
     * @static
     * ２点間の距離を返す
     */
    tm.geom.Vector2.distance = function(lhs, rhs) {
        return Math.sqrt( Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2) );
    };
    
    /**
     * @method
     * @static
     * ２点間の距離を返す
     */
    tm.geom.Vector2.distanceSquared = function(lhs, rhs) {
        return Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2);
    };

    /**
     * @method
     * @static
     * マンハッタン距離
     */
    tm.geom.Vector2.manhattanDistance = function(lhs, rhs) {
        return Math.abs(lhs.x-rhs.x) + Math.abs(lhs.y-rhs.y);
    };
    
    /**
     * @method
     * @static
     * 反射ベクトル
     */
    tm.geom.Vector2.reflect = function(v, normal) {
        var len = Vector2.dot(v, normal);
        var temp= Vector2.mul(normal, 2*len);
        
        return tm.geom.Vector2.sub(v, temp);
    };

    /**
     * @method
     * @static
     * 補間.
     * 0.5 で lhs と rhs の中間ベクトルを求めることができます.
     */
    tm.geom.Vector2.lerp = function(lhs, rhs, t) {
        // TODO: 
        return tm.geom.Vector2(
            lhs.x + (rhs.x-lhs.x)*t,
            lhs.y + (rhs.y-lhs.y)*t
        );
    };
    
    
    /**
     * @method
     * @static
     * 補間
     */
    tm.geom.Vector2.slerp = function(lhs, rhs, t) {
        // TODO:
        // cos...
    };
    

    /**
     * @method
     * @static
     * min ~ max の間でランダムな方向のベクトルを生成する. len で長さ指定.
     */
    tm.geom.Vector2.random = function(min, max, len) {
        min = min || 0;
        max = max || 360;
        len = len || 1;
        return tm.geom.Vector2().setFromDegree(Math.randf(min, max), len);
    };
    
    
    /**
     * @property
     * @static
     * zero
     */
    tm.geom.Vector2.ZERO    = tm.geom.Vector2( 0, 0);
    
    /**
     * @property
     * @static
     * left
     */
    tm.geom.Vector2.LEFT    = tm.geom.Vector2(-1, 0);
    
    
    /**
     * @property
     * @static
     * right
     */
    tm.geom.Vector2.RIGHT   = tm.geom.Vector2( 1, 0);
    
    /**
     * @property
     * @static
     * up
     */
    tm.geom.Vector2.UP      = tm.geom.Vector2( 0, 1);
    
    /**
     * @property
     * @static
     * down
     */
    tm.geom.Vector2.DOWN    = tm.geom.Vector2( 0,-1);
    
})();



/*
 * vector3.js
 */

/*
 * 幾何学
 */
tm.geom = tm.geom || {};


(function() {
    
    /**
     * 3次元ベクトル
     */
    tm.geom.Vector3 = tm.createClass({
        /**
         * x 座標
         */
        x: 0,
        /**
         * y 座標
         */
        y: 0,
        /**
         * z 座標
         */
        z: 0,
        

        /**
         * @constructor
         * ３次元ベクトル
         * 
         * - [Test Program](http://tmlib-js.googlecode.com/svn/trunk/test/geom/vector-test.html)
         */
        init: function(x, y, z) {
            this.set(x, y, z);
        },
        
        /**
         * セット
         */
        set: function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            
            return this;
        },
        
        /**
         * 数値からセット
         */
        setFromNumber: function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            
            return this;
        },
        
        /**
         * 配列からセット
         */
        setFromArray: function(arr) {
            this.x = arr[0];
            this.y = arr[1];
            this.z = arr[2];
            
            return this;
        },
        
        /**
         * オブジェクトからセット
         */
        setFromObject: function(obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.z = obj.z;
            
            return this;
        },
        
        /**
         * 文字列からセット
         */
        setFromString: function(str) {
            var m = str.match(/(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?)/);
            this.x = parseFloat(m[1]);
            this.y = parseFloat(m[3]);
            this.z = parseFloat(m[5]);
            
            return this;
        },
        
        /**
         * 角度(radian)と長さでベクトルをセット
         */
        setFromAngle: function(thetaRad, phiRad, len) {
            len = len || 1;
            
            this.x = len * Math.cos(thetaRad) * Math.sin(phiRad);
            this.y = len * Math.sin(thetaRad);
            this.z = len * Math.cos(thetaRad) * Math.cos(phiRad);
            
            return this;
        },
        
        /**
         * 角度(radian)と長さでベクトルをセット
         */
        setFromRadian: function(thetaRad, phiRad, len) {
            return this.setFromAngle(thetaRad, phiRad, len);
        },
        
        /**
         * 角度(degree)と長さでベクトルをセット
         */
        setFromDegree: function(thetaDegree, phiDegree, len) {
            return this.setFromAngle(thetaDegree*Math.PI/180, phiDegree*Math.PI/180, len);
        },
        
        /**
         * 賢いセット
         */
        setSmart: function(x, y, z) {
            var v = arguments[0];
            // xyz
            if (arguments.length === 3) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            // Array
            else if (v instanceof Array) {
                this.x = v[0];
                this.y = v[1];
                this.z = v[2];
            }
            // Object
            else if (v instanceof Object) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            }
            // String
            else if (typeof(v) == "string") {
                var m = v.match(/(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?),\s*(-?\d+(\.{1}\d+)?)/);
                this.x = parseFloat(m[1]);
                this.y = parseFloat(m[3]);
                this.z = parseFloat(m[5]);
            }
            
            return this;
        },
        
        /**
         * 加算
         */
        add: function(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            
            return this;
        },
        
        /**
         * 減算
         */
        sub: function(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            
            return this;
        },
        
        /**
         * 乗算
         */
        mul: function(n) {
            this.x *= n;
            this.y *= n;
            this.z *= n;
            
            return this;
        },
        
        /**
         * 除算
         */
        div: function(n) {
            console.assert(n != 0, "0 division!!");
            this.x /= n;
            this.y /= n;
            this.z /= n;
            
            return this;
        },
        
        /**
         * 反転
         */
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            
            return this;
        },
        
        /**
         * 長さを取得
         * or magnitude
         */
        length: function() {
            return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        },
        
        /**
         * 2乗された長さを取得
         * C# の名前を引用
         * or lengthSquare or lengthSqrt
         */
        lengthSquared: function() {
            return this.x*this.x + this.y*this.y + this.z*this.z;
        },
        
        /**
         * 正規化
         */
        normalize: function() {
            var length = this.length();
            this.div(length);
            
            return this;
        },
        

        toVector2: function() {
            // TODO:
        },
        

        /**
         * 角度(radian)に変換
         */
        toAngleXY: function() {
            return Math.atan2(this.y, this.x);
        },
        
        
        /**
         * 3D化する
         */
        to3D: function() {
            // TODO: 3d化する
        },
        
        /**
         * 等しいか
         */
        equals: function(x, y, z) {
            return ( (this.x === x) && (this.y === y) && (this.z === z) );
        },
        // equals: function(obj) {
            // return this.equals(obj.x, obj.y, obj.z);
        // },
        
        /**
         * 配列と等しいか
         */
        equalsArray: function(arr) {
            return this.equals(arr[0], arr[1], arr[2]);
        },
        
        /**
         * オブジェクトと等しいか
         */
        equalsObject: function(obj) {
            return this.equals(obj.x, obj.y, obj.z);
        },
        
        /**
         * 賢い比較
         */
        equalsSmart: function() {
            // TODO: 
        },
        
        toStyleString: function() {
            return "{x:{x}, y:{y}, z:{z}}".format(this);
        },
        
        toString: function() {
            return "{x:{x}, y:{y}, z:{z}}".format(this);
        },
        
        
        /**
         * X値をセット
         * チェーンメソッド用セッター
         */
        setX: function(x) {
            this.x = x;
            return this;
        },
        
        /**
         * Y値をセット
         * チェーンメソッド用セッター
         */
        setY: function(y) {
            this.y = y;
            return this;
        },
        
        /**
         * Z値をセット
         * チェーンメソッド用セッター
         */
        setZ: function(z) {
            this.z = z;
            return this;
        }
    });
    
    
    
    /**
     * @method
     * @static
     * min
     */
    tm.geom.Vector3.min = function(lhs, rhs) {
        return Vector3(
            (lhs.x < rhs.x) ? lhs.x : rhs.x,
            (lhs.y < rhs.y) ? lhs.y : rhs.y,
            (lhs.z < rhs.z) ? lhs.z : rhs.z
        );
    };
    
    /**
     * @method
     * @static
     * max
     */
    tm.geom.Vector3.max = function(lhs, rhs) {
        return Vector3(
            (lhs.x > rhs.x) ? lhs.x : rhs.x,
            (lhs.y > rhs.y) ? lhs.y : rhs.y,
            (lhs.z > rhs.z) ? lhs.z : rhs.z
        );
    };
    
    /**
     * @method
     * @static
     * 加算
     */
    tm.geom.Vector3.add = function(lhs, rhs) {
        return tm.geom.Vector3(lhs.x+rhs.x, lhs.y+rhs.y, lhs.z+rhs.z);
    };
    
    /**
     * @method
     * @static
     * 減算
     */
    tm.geom.Vector3.sub = function(lhs, rhs) {
        return tm.geom.Vector3(lhs.x-rhs.x, lhs.y-rhs.y, lhs.z-rhs.z);
    };
    
    /**
     * @method
     * @static
     * 乗算
     */
    tm.geom.Vector3.mul = function(v, n) {
        return tm.geom.Vector3(v.x*n, v.y*n, v.z*n);
    };
    
    /**
     * @method
     * @static
     * 割算
     */
    tm.geom.Vector3.div = function(v, n) {
        return tm.geom.Vector3(v.x/n, v.y/n, v.z/n);
    };
    
    /**
     * @method
     * @static
     * 内積.
     * 投影ベクトルを求めたり, 類似度に使ったり.
     */
    tm.geom.Vector3.dot = function(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
    };
    

    /**
     * @method
     * @static
     * 外積
     */
    tm.geom.Vector3.cross = function(lhs, rhs) {
        // TODO: 
    };
    
    /**
     * @method
     * @static
     * 反転
     */
    tm.geom.Vector3.negate = function(v) {
        return tm.geom.Vector3(-v.x, -v.y, -v.z);
    };
    
    /**
     * @method
     * @static
     * ２点間の距離を返す
     */
    tm.geom.Vector3.distance = function(lhs, rhs) {
        return Math.sqrt( Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2) + Math.pow(lhs.z-rhs.z, 2) );
    };
    
    /**
     * @method
     * @static
     * ２点間の距離を返す
     */
    tm.geom.Vector3.distanceSquared = function(lhs, rhs) {
        return Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2) + Math.pow(lhs.z-rhs.z, 2);
    };

    /**
     * @method
     * @static
     * マンハッタン距離
     */
    tm.geom.Vector3.manhattanDistance = function(lhs, rhs) {
        return Math.abs(lhs.x-rhs.x) + Math.abs(lhs.y-rhs.y) + Math.abs(lhs.z-rhs.z);
    };
    
    /**
     * @method
     * @static
     * 反射ベクトル
     */
    tm.geom.Vector3.reflect = function(v, normal) {
        var len = Vector3.dot(v, normal);
        var temp= Vector3.mul(normal, 2*len);
        
        return Vector3.sub(v, temp);
    };

    /**
     * @method
     * @static
     * 補間.
     * 0.5 で lhs と rhs の中間ベクトルを求めることができます.
     */
    tm.geom.Vector3.lerp = function(lhs, rhs, t) {
        // TODO: 
        return tm.geom.Vector3(
            lhs.x + (rhs.x-lhs.x)*t,
            lhs.y + (rhs.y-lhs.y)*t,
            lhs.z + (rhs.z-lhs.z)*t
        );
    };
    
    
    /**
     * @method
     * @static
     * 補間
     */
    tm.geom.Vector3.slerp = function(lhs, rhs, t) {
        // TODO:
        // cos...
    };
    
    /**
     * @method
     * @static
     * min ~ max の間でランダムな方向のベクトルを生成する. len で長さ指定.
     */
    tm.geom.Vector3.random = function(thetaMin, thetaMax, phiMin, phiMax, len)
    {
        thetaMin= thetaMin || 0;
        thetaMax= thetaMax || 360;
        phiMin  = phiMin || 0;
        phiMax  = phiMax || 360;
        len = len || 1;
        return TM.Geom.Vector3().setFromDegree(TM.randomf(thetaMin, thetaMax), TM.randomf(phiMin, phiMax), len);
    };
    
    
    
    /*
    Vector3.prototype.accessor("length", {
        "get": function()    { return this.length(); },
        "set": function(len) { this.normalize().mul(len); }
    });
    */
    
    
    /**
     * @property
     * @static
     * zero
     */
    tm.geom.Vector3.ZERO    = tm.geom.Vector3( 0, 0, 0);
    
    /**
     * @property
     * @static
     * left
     */
    tm.geom.Vector3.LEFT    = tm.geom.Vector3(-1, 0, 0);
    
    /**
     * @property
     * @static
     * right
     */
    tm.geom.Vector3.RIGHT   = tm.geom.Vector3( 1, 0, 0);
    
    /**
     * @property
     * @static
     * up
     */
    tm.geom.Vector3.UP      = tm.geom.Vector3( 0, 1, 0);
    
    /**
     * @property
     * @static
     * down
     */
    tm.geom.Vector3.DOWN    = tm.geom.Vector3( 0,-1, 0);
    
    /**
     * @property
     * @static
     * forward
     */
    tm.geom.Vector3.FORWARD = tm.geom.Vector3( 0, 0,-1);
    
    /**
     * @property
     * @static
     * backward
     */
    tm.geom.Vector3.BACKWARD= tm.geom.Vector3( 0, 0, 1);
    
})();



/*
 * matrix33.js
 */

tm.geom = tm.geom || {};

(function() {
    
    /**
     * @class
     * 3*3 マトリックスクラス
     */
    tm.geom.Matrix33 = tm.createClass({
        /**
         * 要素
         */
        m: null,
        
        /**
         * 初期化
         */
        init: function() {
            this.m = [];
            if (arguments.length >= 9) {
                this.set.apply(this, arguments);
            }
            else {
                this.identity();
            }
        },
        

        /**
         * セッター
         */
        set: function(m00, m01, m02, m10, m11, m12, m20, m21, m22)
        {
            console.assert(arguments.length>=9, "");
            
            // |m00, m01, m02|
            // |m10, m11, m12|
            // |m20, m21, m22|
            
            this.m00 = m00; this.m01 = m01; this.m02 = m02;
            this.m10 = m10; this.m11 = m11; this.m12 = m12;
            this.m20 = m20; this.m21 = m21; this.m22 = m22;
            
            return this;
        },
        
        /**
         * 配列からセット
         */
        setArray: function(arr)
        {
            this.set(
                arr[0], arr[3], arr[6],
                arr[1], arr[4], arr[7],
                arr[2], arr[5], arr[8]
            );
            
            return this;
        },
        
        /**
         * オブジェクトからセット
         */
        setObject: function(obj)
        {
            this.set(
                obj.m00, obj.m01, obj.m02,
                obj.m10, obj.m11, obj.m12,
                obj.m20, obj.m21, obj.m22
            );
            
            return this;
        },
        
        /**
         * 単位行列
         */
        identity: function() {
            this.set(
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            );
            return this;
        },
        
        /**
         * 転地
         */
        transpose: function() {
            this.m.swap(1, 3);
            this.m.swap(2, 6);
            this.m.swap(5, 7);
            
            return this;
        },
        
        /**
         * ゼロクリア
         */
        zero: function() {
            this.set(
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            );
            
            return this;
        },
        
        /**
         * 移動
         */
        translate: function(x, y) {
            return this.multiply( tm.geom.Matrix33.translate(x, y) );
        },
        
        /**
         * X軸回転
         */
        rotateX: function(rad) {
            return this.multiply( tm.geom.Matrix33.rotateX(rad) );
        },
        
        /**
         * Y軸回転
         */
        rotateY: function(rad) {
            return this.multiply( tm.geom.Matrix33.rotateY(rad) );
        },
        
        /**
         * Z軸回転
         */
        rotateZ: function(rad) {
            return this.multiply( tm.geom.Matrix33.rotateZ(rad) );
        },
        
        /**
         * スケーリング
         */
        scale: function(x, y) {
            return this.multiply( tm.geom.Matrix33.scale(x, y) );
        },
        
        /**
         * 掛け算
         */
        multiply: function(mat)
        {
            var m00 = this.m00*mat.m00 + this.m01*mat.m10 + this.m02*mat.m20;
            var m01 = this.m00*mat.m01 + this.m01*mat.m11 + this.m02*mat.m21;
            var m02 = this.m00*mat.m02 + this.m01*mat.m12 + this.m02*mat.m22;
            
            var m10 = this.m10*mat.m00 + this.m11*mat.m10 + this.m12*mat.m20;
            var m11 = this.m10*mat.m01 + this.m11*mat.m11 + this.m12*mat.m21;
            var m12 = this.m10*mat.m02 + this.m11*mat.m12 + this.m12*mat.m22;
            
            var m20 = this.m20*mat.m00 + this.m21*mat.m10 + this.m22*mat.m20;
            var m21 = this.m20*mat.m01 + this.m21*mat.m11 + this.m22*mat.m21;
            var m22 = this.m20*mat.m02 + this.m21*mat.m12 + this.m22*mat.m22;
            
            return this.set(
                m00, m01, m02,
                m10, m11, m12,
                m20, m21, m22
            );
        },
        
        /**
         * ベクトルとの掛け算
         */
        multiplyVector2: function(v)
        {
            var vx = this.m00*v.x + this.m01*v.y + this.m02;
            var vy = this.m10*v.x + this.m11*v.y + this.m12;
            
            return v.set(vx, vy);
        },
        
        /**
         * ベクトルとの掛け算
         */
        multiplyVector3: function(v)
        {
            var vx = this.m00*v.x + this.m01*v.y + this.m02*v.z;
            var vy = this.m10*v.x + this.m11*v.y + this.m12*v.z;
            var vz = this.m20*v.x + this.m21*v.y + this.m22*v.z;
            
            return v.set(vx, vy, vz);
        },
        
        /**
         * 配列に変換
         */
        toArray: function() {
            return this.m.slice();
        },
        
        /**
         * 文字列化
         */
        toString: function() {
            return "|{m00}, {m01}, {m02}|\n|{m10}, {m11}, {m12}|\n|{m20}, {m21}, {m22}|".format(this);
        },
        
    });
    
    
    
    /**
     * @property    m00
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m00", {
        "get": function()   { return this.m[0]; },
        "set": function(v)  { this.m[0] = v;    }
    });
    /**
     * @property    m10
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m10", {
        "get": function()   { return this.m[1]; },
        "set": function(v)  { this.m[1] = v;    }
    });
    /**
     * @property    m20
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m20", {
        "get": function()   { return this.m[2]; },
        "set": function(v)  { this.m[2] = v;    }
    });
    
    /**
     * @property    m01
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m01", {
        "get": function()   { return this.m[3]; },
        "set": function(v)  { this.m[3] = v;    }
    });
    /**
     * @property    m11
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m11", {
        "get": function()   { return this.m[4]; },
        "set": function(v)  { this.m[4] = v;    }
    });
    /**
     * @property    m21
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m21", {
        "get": function()   { return this.m[5]; },
        "set": function(v)  { this.m[5] = v;    }
    });
    
    /**
     * @property    m02
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m02", {
        "get": function()   { return this.m[6]; },
        "set": function(v)  { this.m[6] = v;    }
    });
    /**
     * @property    m12
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m12", {
        "get": function()   { return this.m[7]; },
        "set": function(v)  { this.m[7] = v;    }
    });
    /**
     * @property    m22
     * 要素
     */
    tm.geom.Matrix33.prototype.accessor("m22", {
        "get": function()   { return this.m[8]; },
        "set": function(v)  { this.m[8] = v;    }
    });
    

    /**
     * @static
     * @method
     * 移動
     */
    tm.geom.Matrix33.translate = function(x, y) {
        return tm.geom.Matrix33(
            1, 0, x,
            0, 1, y,
            0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * X軸回転
     */
    tm.geom.Matrix33.rotateX = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
            1, 0, 0,
            0, c,-s,
            0, s, c
        );
    };
    
    /**
     * @static
     * @method
     * Y軸回転
     */
    tm.geom.Matrix33.rotateY = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
             c, 0, s,
             0, 1, 0,
            -s, 0, c
        );
    };
    
    /**
     * @static
     * @method
     * Z軸回転
     */
    tm.geom.Matrix33.rotateZ = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix33(
            c,-s, 0,
            s, c, 0,
            0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * スケーリング
     */
    tm.geom.Matrix33.scale = function(x, y) {
        var mat = tm.geom.Matrix33();
        
        if (y == undefined) y = x;
        
        mat.set(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
        
        return mat;
    };
    
})();











/*
 * matrix44.js
 */

tm.geom = tm.geom || {};

(function() {
    
    /**
     * @class
     * 4*4 マトリックスクラス
     */
    tm.geom.Matrix44 = tm.createClass({
        /**
         * 要素
         */
        m: null,
        

        /**
         * 初期化
         */
        init: function() {
            this.m = [];
            if (arguments.length >= 16) {
                this.set.apply(this, arguments);
            }
            else {
                this.identity();
            }
        },
        
        /**
         * セット
         */
        set: function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
        {
            console.assert(arguments.length>=16, "");
            
            // |m00, m01, m02, m03|
            // |m10, m11, m12, m13|
            // |m20, m21, m22, m23|
            // |m30, m31, m32, m33|
            
            this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
            this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
            this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
            this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;
            
            return this;
        },
        
        /**
         * 配列からセット
         */
        setArray: function(arr)
        {
            this.set(
                arr[0], arr[4],  arr[8], arr[12],
                arr[1], arr[5],  arr[9], arr[13],
                arr[2], arr[6], arr[10], arr[14],
                arr[3], arr[7], arr[11], arr[15]
            );
            
            return this;
        },
        
        /**
         * オブジェクトからセット.
         * Matrix44 もこいつでいける!!
         */
        setObject: function(obj)
        {
            this.set(
                obj.m00, obj.m01, obj.m02, obj.m03,
                obj.m10, obj.m11, obj.m12, obj.m13,
                obj.m20, obj.m21, obj.m22, obj.m23,
                obj.m30, obj.m31, obj.m32, obj.m33
            );
            
            return this;
        },
        
        
        /**
         * 単位行列
         */
        identity: function() {
            this.set(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            return this;
        },
        
        /**
         * 移動
         */
        translate: function(x, y, z) {
            return this.multiply( tm.geom.Matrix44.translate(x, y, z) );
        },
        
        /**
         * 回転
         */
        rotate: function(angle) {
            // TODO: いつか実装する
            console.error("Unimplemented");
        },
        
        /**
         * X軸を基軸に回転する
         */
        rotateX: function(rad) {
            return this.multiply( tm.geom.Matrix44.rotateX(rad) );
        },
        
        /**
         * Y軸を基軸に回転する
         */
        rotateY: function(rad) {
            return this.multiply( tm.geom.Matrix44.rotateY(rad) );
        },
        
        /**
         * Z軸を基軸に回転する
         */
        rotateZ: function(rad) {
            return this.multiply( tm.geom.Matrix44.rotateZ(rad) );
        },
        
        /**
         * スケーリング
         */
        scale: function(x, y, z) {
            return this.multiply( tm.geom.Matrix44.scale(x, y, z) );
        },
        
        /**
         * ゼロ
         */
        zero: function() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            return this;
        },
        
        /**
         * 乗算
         * this * mat
         */
        multiply: function(mat)
        {
            var m00 = this.m00*mat.m00 + this.m01*mat.m10 + this.m02*mat.m20 + this.m03*mat.m30;
            var m01 = this.m00*mat.m01 + this.m01*mat.m11 + this.m02*mat.m21 + this.m03*mat.m31;
            var m02 = this.m00*mat.m02 + this.m01*mat.m12 + this.m02*mat.m22 + this.m03*mat.m32;
            var m03 = this.m00*mat.m03 + this.m01*mat.m13 + this.m02*mat.m23 + this.m03*mat.m33;
            
            var m10 = this.m10*mat.m00 + this.m11*mat.m10 + this.m12*mat.m20 + this.m13*mat.m30;
            var m11 = this.m10*mat.m01 + this.m11*mat.m11 + this.m12*mat.m21 + this.m13*mat.m31;
            var m12 = this.m10*mat.m02 + this.m11*mat.m12 + this.m12*mat.m22 + this.m13*mat.m32;
            var m13 = this.m10*mat.m03 + this.m11*mat.m13 + this.m12*mat.m23 + this.m13*mat.m33;
            
            var m20 = this.m20*mat.m00 + this.m21*mat.m10 + this.m22*mat.m20 + this.m23*mat.m30;
            var m21 = this.m20*mat.m01 + this.m21*mat.m11 + this.m22*mat.m21 + this.m23*mat.m31;
            var m22 = this.m20*mat.m02 + this.m21*mat.m12 + this.m22*mat.m22 + this.m23*mat.m32;
            var m23 = this.m20*mat.m03 + this.m21*mat.m13 + this.m22*mat.m23 + this.m23*mat.m33;
            
            var m30 = this.m30*mat.m00 + this.m31*mat.m10 + this.m32*mat.m20 + this.m33*mat.m30;
            var m31 = this.m30*mat.m01 + this.m31*mat.m11 + this.m32*mat.m21 + this.m33*mat.m31;
            var m32 = this.m30*mat.m02 + this.m31*mat.m12 + this.m32*mat.m22 + this.m33*mat.m32;
            var m33 = this.m30*mat.m03 + this.m31*mat.m13 + this.m32*mat.m23 + this.m33*mat.m33;
            
            return this.set(
                m00, m01, m02, m03,
                m10, m11, m12, m13,
                m20, m21, m22, m23,
                m30, m31, m32, m33
            );
        },
        
        /*
        getAxisX: function() { return TM.Geom.Vector3(this.m00, this.m10, this.m20); },
        getAxisY: function() { return TM.Geom.Vector3(this.m01, this.m11, this.m21); },
        getAxisZ: function() { return TM.Geom.Vector3(this.m02, this.m12, this.m22); },
        */
        
        getAxisX: function() { return TM.Geom.Vector3(this.m00, this.m01, this.m02); },
        getAxisY: function() { return TM.Geom.Vector3(this.m10, this.m11, this.m12); },
        getAxisZ: function() { return TM.Geom.Vector3(this.m20, this.m21, this.m22); },
        
        setAxisX: function(v) { this.m00=v.x, this.m01=v.y, this.m02=v.z; },
        setAxisY: function(v) { this.m10=v.x, this.m11=v.y, this.m12=v.z; },
        setAxisZ: function(v) { this.m20=v.x, this.m21=v.y, this.m22=v.z; },
        
        /**
         * Matrix33 に変換
         */
        toMatrix33: function() {
            // TODO:
        },
        
        /**
         * 配列に変換
         */
        toArray: function() {
            return this.m.slice();
        },
        
        /**
         * 文字列化
         */
        toString: function() {
            return "|{m00}, {m01}, {m02}, {m03}|\n|{m10}, {m11}, {m12}, {m13}|\n|{m20}, {m21}, {m22}, {m23}|\n|{m30}, {m31}, {m32}, {m33}|".format(this);
        }
        
    });
    
    
    /**
     * @property    m00
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m00", {
        "get": function()   { return this.m[0]; },
        "set": function(v)  { this.m[0] = v;    }
    });
    /**
     * @property    m01
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m10", {
        "get": function()   { return this.m[1]; },
        "set": function(v)  { this.m[1] = v;    }
    });
    /**
     * @property    m02
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m20", {
        "get": function()   { return this.m[2]; },
        "set": function(v)  { this.m[2] = v;    }
    });
    /**
     * @property    m03
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m30", {
        "get": function()   { return this.m[3]; },
        "set": function(v)  { this.m[3] = v;    }
    });
    
    /**
     * @property    m10
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m01", {
        "get": function()   { return this.m[4]; },
        "set": function(v)  { this.m[4] = v;    }
    });
    /**
     * @property    m11
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m11", {
        "get": function()   { return this.m[5]; },
        "set": function(v)  { this.m[5] = v;    }
    });
    /**
     * @property    m12
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m21", {
        "get": function()   { return this.m[6]; },
        "set": function(v)  { this.m[6] = v;    }
    });
    /**
     * @property    m13
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m31", {
        "get": function()   { return this.m[7]; },
        "set": function(v)  { this.m[7] = v;    }
    });
    
    /**
     * @property    m20
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m02", {
        "get": function()   { return this.m[8]; },
        "set": function(v)  { this.m[8] = v;    }
    });
    /**
     * @property    m21
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m12", {
        "get": function()   { return this.m[9]; },
        "set": function(v)  { this.m[9] = v;    }
    });
    /**
     * @property    m22
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m22", {
        "get": function()   { return this.m[10]; },
        "set": function(v)  { this.m[10] = v;    }
    });
    /**
     * @property    m23
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m32", {
        "get": function()   { return this.m[11]; },
        "set": function(v)  { this.m[11] = v;    }
    });
        
    /**
     * @property    m30
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m03", {
        "get": function()   { return this.m[12]; },
        "set": function(v)  { this.m[12] = v;    }
    });
    /**
     * @property    m31
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m13", {
        "get": function()   { return this.m[13]; },
        "set": function(v)  { this.m[13] = v;    }
    });
    /**
     * @property    m32
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m23", {
        "get": function()   { return this.m[14]; },
        "set": function(v)  { this.m[14] = v;    }
    });
    /**
     * @property    m33
     * 要素
     */
    tm.geom.Matrix44.prototype.accessor("m33", {
        "get": function()   { return this.m[15]; },
        "set": function(v)  { this.m[15] = v;    }
    });
    
    
    
    

    /**
     * @static
     * @method
     * 移動
     */
    tm.geom.Matrix44.translate = function(x, y, z) {
        return tm.geom.Matrix44(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * X軸回転
     */
    tm.geom.Matrix44.rotateX = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix44(
            1, 0, 0, 0,
            0, c,-s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * Y軸回転
     */
    tm.geom.Matrix44.rotateY = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix44(
             c, 0, s, 0,
             0, 1, 0, 0,
            -s, 0, c, 0,
             0, 0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * Z軸回転
     */
    tm.geom.Matrix44.rotateZ = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        
        return tm.geom.Matrix44(
            c,-s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    };
    
    /**
     * @static
     * @method
     * スケーリング
     */
    tm.geom.Matrix44.scale = function(x, y, z) {
        var mat = tm.geom.Matrix44();
        
        if (y == undefined) y = x;
        if (z == undefined) z = x;
        
        mat.set(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        );
        
        return mat;
    };
        
    
})();



























/*
 * rect.js
 */

tm.geom = tm.geom || {};

(function() {
    
    /**
     * @class
     * 四角形クラス
     */
    tm.geom.Rect = tm.createClass({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        
        /**
         * 初期化
         */
        init: function(x, y, width, height)
        {
            this.set(x, y, width, height);
        },
        
        /**
         * セッター
         */
        set: function(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            
            return this;
        },
        

        /**
         * 移動
         */
        move: function(x, y)
        {
            this.x = x;
            this.y = y;
            return this;
        },
        
        /**
         * 現在位置を基準に移動
         */
        moveBy: function(x, y)
        {
            this.x += x;
            this.y += y;
            return this;
        },
        
        /**
         * リサイズ
         */
        resize: function(w, h)
        {
            this.width = w;
            this.height= h;
            return this;
        },
        
        /**
         * 現在のサイズを基準にリサイズ
         */
        resizeBy: function(w, h)
        {
            this.width += w;
            this.height+= h;
            return this;
        },
        
        /**
         * パディング.
         * 縮めたりなど. 画面ハミ出しチェック時などに便利
         * @example
         * var circle = TM.$Circle(10, 10, 10);
         * var windowRect = TM.$Rect(0, 0, window.innerWidth, window.innerHiehgt);
         * windowRect.padding(circle.radius);
         * if (circle.x < windowRect.left) {
         *     // 左にはみ出した時の処理
         * }
         */
        padding: function(top, right, bottom, left)
        {
            // css の padding に合わせて時計回りにパラメータ調整
            switch (arguments.length) {
                case 1:
                    top = right = bottom = left = arguments[0];
                    break;
                case 2:
                    top     = bottom= arguments[0];
                    right   = left  = arguments[1];
                    break;
                case 3:
                    top     = arguments[0];
                    right   = left = arguments[1];
                    bottom  = arguments[2];
                    break;
            }
            
            this.x += left;
            this.y += top;
            this.width -= left+right;
            this.height-= top +bottom;
            
            return this;
        },
        
        clone: function()
        {
            
        },
        
        toCircle: function()
        {
            return tm.geom.Circle(
                this.centerX,
                this.centerY,
                (this.width < this.height) ? this.width : this.height
                );
        },
        
        toArray: function()
        {
            return [this.x, this.y, this.width, this.height];
        },
        
    });
    
    
    /**
     * @property    left
     * left
     */
    tm.geom.Rect.prototype.accessor("left", {
        "get": function()   { return this.x; },
        "set": function(v)  { this.width -= v-this.x; this.x = v; }
    });
    
    /**
     * @property    top
     * top
     */
    tm.geom.Rect.prototype.accessor("top", {
        "get": function()   { return this.y; },
        "set": function(v)  { this.height -= v-this.y; this.y = v; }
    });
    
    /**
     * @property    right
     * right
     */
    tm.geom.Rect.prototype.accessor("right", {
        "get": function()   { return this.x + this.width; },
        "set": function(v)  { this.width += v-this.right; }
    });
    
    /**
     * @property    bottom
     * bottom
     */
    tm.geom.Rect.prototype.accessor("bottom", {
        "get": function()   { return this.y + this.height; },
        "set": function(v)  { this.height += v-this.bottom; }
    });
    
    /**
     * @property    centerX
     * centerX
     */
    tm.geom.Rect.prototype.accessor("centerX", {
        "get": function()   { return this.x + this.width/2; },
        "set": function(v)  {
            // TODO: どうしようかな??
        }
    });
    
    /**
     * @property    centerY
     * centerY
     */
    tm.geom.Rect.prototype.accessor("centerY", {
        "get": function()   { return this.y + this.height/2; },
        "set": function(v)  {
            // TODO: どうしようかな??
        }
    });
    
})();



/*
 * circle.js
 */

tm.geom = tm.geom || {};

(function() {
    
    /**
     * @class
     * 円クラス
     */
    tm.geom.Circle = tm.createClass({
        x: 0,
        y: 0,
        radius: 0,
        
        /**
         * 初期化
         */
        init: function(x, y, radius)
        {
            this.set(x, y, radius);
        },
        
        /**
         * セッター
         */
        set: function(x, y, radius)
        {
            this.x = x;
            this.y = y;
            this.radius = radius;
            
            return this;
        },
        
        /**
         * 移動
         */
        move: function(x, y)
        {
            this.x = x;
            this.y = y;
            return this;
        },
        
        /**
         * 現在位置を基準に移動
         */
        moveBy: function(x, y)
        {
            this.x += x;
            this.y += y;
            return this;
        },
        
        /**
         * リサイズ
         */
        resize: function(size)
        {
            this.radius = size;
            return this;
        },
        
        /**
         * 現在のサイズを基準にリサイズ
         */
        resizeBy: function(size)
        {
            this.radius += size;
            return this;
        },
        
        clone: function()
        {
            
        },
        
        /**
         * 四角形に変換
         */
        toRectangle: function()
        {
            return tm.geom.Rectangle(this.x, this.y, this.radius*2, this.radius*2);
        },
        
        /**
         * 配列に変換
         */
        toArray: function()
        {
            return [this.x, this.y, this.radius];
        }
    });
    
    /**
     * @property    left
     * left
     */
    tm.geom.Circle.prototype.getter("left", function() {
        return this.x - this.radius;
    });
    
    /**
     * @property    top
     * top
     */
    tm.geom.Circle.prototype.getter("top", function() {
        return this.y - this.radius;
    });
    
    /**
     * @property    right
     * right
     */
    tm.geom.Circle.prototype.getter("right", function() {
        return this.x + this.radius;
    });
    
    /**
     * @property    bottom
     * bottom
     */
    tm.geom.Circle.prototype.getter("bottom", function() {
        return this.y + this.radius;
    });
    
})();



/*
 * element.js
 */


(function() {
    
    // innerText 対応 ( moz では textContent なので innerText に統一 )
    var temp = document.createElement("div");
    if (temp.innerText === undefined) {
        HTMLElement.prototype.accessor("innerText", {
            "get": function()   { return this.textContent; },
            "set": function(d)  { this.textContent = d; }
        });
    }
    
})();

tm.dom = tm.dom || {};

(function() {
    
    /**
     * @class
     * Element クラス
     */
    tm.dom.Element = tm.createClass({
        
        element: null,
        
        /**
         * 初期化
         */
        init: function() {
            this.set.apply(this, arguments);
        },
        
        /**
         * セッター
         */
        set: function(q) {
            if (typeof q === "string") {
                this.element = document.querySelector(q);
            }
            else if (q != undefined) {
                this.element = q;
            }
            else {
                // デフォルトはドキュメント
                this.element = document;
            }
        },
        

        /**
         * 子供の最後尾に追加
         */
        append: function(child) {
            this.element.appendChild(child.element);
            return this;
        },
        
        /**
         * 子供の先頭に追加
         */
        prepend: function(child) {
            this.element.insertBefore(child.element, this.element.firstChild);
            return this;
        },
        
        /**
         * 自分の後に追加
         */
        after: function(child) {
            this.element.parentNode.insertBefore(child.element, this.element.nextSibling);
            return this;
        },
        
        /**
         * 自分の前に追加
         */
        before: function(child) {
            this.element.parentNode.insertBefore(child.element, this.element);
            return this;
        },
        
        /**
         * 引数に渡された要素に自分を append
         */
        appendTo: function(parent) {
            parent.append(this);
            return this;
        },
        
        /**
         * 引数に渡された要素に自分を prepend
         */
        prependTo: function(parent) {
            parent.prepend(this);
            return this;
        },
        
        clone: function() {
            return tm.dom.Element(this.element.cloneNode(true));
        },
        
        /**
         * 親から自分を引っぺがす
         */
        remove: function() {
            this.element.parentNode.removeChild(this.element);
            return this;
        },
        
        /**
         * 要素生成
         */
        create: function(tag, addFuncName) {
            // 要素を生成
            var element = tm.dom.Element(document.createElement(tag));
            // デフォルトの追加方法は append
            if (!addFuncName) { addFuncName="append"; }
            // 自分の子供として追加
            this[addFuncName](element);
            
            return element;
        },
        
        /**
         * query
         */
        query: function(query, index) {
            var elm = (index) ?
                this.element.querySelectorAll(query)[index] : 
                this.element.querySelector(query);
            
            return tm.dom.Element(elm);
        },
        
        /**
         * queryAll
         */
        queryAll: function(query) {
            return tm.dom.ElementList(query);
        },
        
        /**
         * 固定化
         */
        fixed: function(x, y, width, height) {
            this.style.set("position", "fixed");
            if (x) this.x = x;
            if (y) this.y = y;
            if (width) this.width = width;
            if (height) this.height = height;
            return this;
        },
        
        /**
         * absolute 化
         */
        absolute: function(x, y, width, height) {
            this.style.set("position", "absolute");
            if (x) this.x = x;
            if (y) this.y = y;
            if (width) this.width = width;
            if (height) this.height = height;
            return this;
        },
        
        /**
         * フルスクリーン化
         */
        fullScreen: function() {
            this.element.webkitRequestFullScreen();
        },
        
        /**
         * 文字列化
         */
        toString: function() {
            return "tm.dom.element";
        },
        
    });
    
    
    
    /**
     * @property    html
     * html の値
     */
    tm.dom.Element.prototype.accessor("html", {
        "get": function()       { return this.element.innerHTML; },
        "set": function(html)   { this.element.innerHTML = html; }
    });
    
    
    /**
     * @property    value
     * value の値
     */
    tm.dom.Element.prototype.accessor("value", {
        "get": function()       { return this.element.value; },
        "set": function(value)   { this.element.value = value; }
    });
    
    
    /**
     * @property    x
     * x値
     */
    tm.dom.Element.prototype.accessor("x", {
        "get": function()   { return Number( this.element.style.left.replace("px", '') ); },
        "set": function(x)  { this.element.style.left = x+"px"; }
    });
    
    /**
     * @property    y
     * y値
     */
    tm.dom.Element.prototype.accessor("y", {
        "get": function()   { return Number( this.element.style.top.replace("px", '') ); },
        "set": function(y)  { this.element.style.top = y+"px"; }
    });
    
    
    /**
     * @property    width
     * 幅
     */
    tm.dom.Element.prototype.accessor("width", {
        "get": function()   { return Number( this.element.style.width.replace("px", '') ); },
        "set": function(w)  { this.element.style.width = w+"px"; }
    });
    
    
    /**
     * @property    height
     * 高さ
     */
    tm.dom.Element.prototype.accessor("height", {
        "get": function()   { return Number( this.element.style.height.replace("px", '') ); },
        "set": function(h)  { this.element.style.height = h+"px"; }
    });
    
    
    /**
     * @property    color
     * 色
     */
    tm.dom.Element.prototype.accessor("color", {
        "get": function()       { return this.element.style.color; },
        "set": function(color)  { this.element.style.color = color; }
    });
    
    
    /**
     * @property    backgroundColor
     * 背景色
     */
    tm.dom.Element.prototype.accessor("backgroundColor", {
        "get": function()       { return this.element.style.backgroundColor; },
        "set": function(color)  { this.element.style.backgroundColor = color; }
    });
    
    /**
     * @property    visible
     * 表示/非表示
     */
    tm.dom.Element.prototype.accessor("visible", {
        "get": function()   { return this.element.style.visibility != "hidden"; },
        "set": function(v)  { this.element.style.visibility = (v==true) ? "visible" : "hidden"; }
    });
    
    /**
     * @property    text
     * テキスト
     */
    tm.dom.Element.prototype.accessor("text", {
        "get": function()   { return this.element.innerText; },
        "set": function(v)  { this.element.innerText = v; }
    });
    
    
    tm.dom.Element.prototype.getter("parent", function(){
        return (this.element.parent != undefined) ? tm.dom.Element(this.element.parent) : null;
    });
    tm.dom.Element.prototype.getter("prev", function(){
        return (this.element.previousSibling != undefined) ? tm.dom.Element(this.element.previousSibling) : null;
    });
    tm.dom.Element.prototype.getter("next", function(){
        return (this.element.nextSibling != undefined) ? tm.dom.Element(this.element.nextSibling) : null;
    });
    tm.dom.Element.prototype.getter("children", function(){
        return tm.dom.ElementList(this.element.children);
    });
    
    
})();





(function(){
    
    /**
     * @class
     * エレメントリスト
     */
    tm.dom.ElementList = tm.createClass({
        superClass: Array,
        
        /**
         * TM.DOM.Element 用配列
         * @constructs
         */
        init: function(arr) {
            if (typeof arguments[0] == "string") {
                var query = arguments[0];
                arr = document.querySelectorAll(query);
            }
            else if (arr == undefined) {
                return ;
            }
            
            for (var i=0,len=arr.length; i<len; ++i) {
                this.push( tm.dom.Element(arr[i]) );
            }
        },
        
        toString: function() {
            return "";
        }
    });
    
})();



/*
 * evnet.js
 */

tm.dom = tm.dom || {};

(function() {
    
    /**
     * @class Event
     * 
     * Event クラス
     */
    
    // 仕方なしの IE 対応(これ引っかかったら他のもダメだから必要ないかも)
    if (!Event.prototype.stopPropagation) {
        Event.prototype.stopPropagation = function() {
            this.cancelBubble = true;
        };
    }
    if (!Event.prototype.preventDefault) {
        Event.prototype.preventDefault = function() {
            this.returnValue = false;
        };
    }
    
    /**
     * @method
     * イベントのデフォルト処理 & 伝達を止める
     */
    Event.prototype.stop = function() {
        // イベントキャンセル
        this.preventDefault();
        // イベント伝達を止める
        this.stopPropagation();
    };
    
})();


(function() {
    
    /**
     * @class KeyboardEvent
     * 
     * KeyboardEvent クラス
     */
    
    /**
     * @property    character
     * 押したキーの文字を取得
     */
    KeyboardEvent.prototype.getter("character", function(){
        return String.fromCharCode(this.keyCode);
    });
    
})();


(function() {
    
    /**
     * @class MouseEvent
     * 
     * MouseEvent クラス
     */
    
    /**
     * @property    pointX
     * マウスのX座標.
     */
    MouseEvent.prototype.getter("pointX", function() {
        return this.pageX - this.target.getBoundingClientRect().left;
    });
    
    /**
     * @property    pointY
     * マウスのY座標.
     */
    MouseEvent.prototype.getter("pointY", function() {
        return this.pageY - this.target.getBoundingClientRect().top;
    });
    
})();




(function() {
    
    if (window.TouchEvent === undefined) { return ; }
    
    
    /**
     * @class TouchEvent
     * 
     * TouchEvent クラス
     */
    
    /**
     * @property    pointX
     * タッチイベント.
     */
    TouchEvent.prototype.getter("pointX", function() {
        return this.touches[0].pageX;
    });
    
    /**
     * @property    pointY
     * タッチイベント.
     */
    TouchEvent.prototype.getter("pointY", function() {
        return this.touches[0].pageY;
    });
    
    
})();



(function() {
    
    /**
     * @class
     * Event クラス
     */
    tm.dom.Event = tm.createClass({
        element     : null,
        funcList    : null,
        funcIndex   : 0,
        
        
        /**
         * 初期化
         */
        init: function(element) {
            this.element = element;
            this.funcList = {};
        },
        
        /**
         * イベントを追加
         */
        add: function(type, fn, id) {
            var self = this;
            var elm  = tm.dom.Element(this.element);
            
            var temp_fn = function(e) {
                // return fn.apply(self, arguments);
                var result = fn.apply(elm, arguments);
                
                if (result === false) {
                    // デフォルトイベントをキャンセル
                    e.preventDefault();
                    e.returnValue = false;  // IE
                    // イベント伝達をキャンセル
                    e.stopPropagation();
                }
                
                return result;
            }
            
            this._funcIndex = this._funcIndex || 0;
            id = id || this._funcIndex++;
            this.funcList[type] = this.funcList[type] || {};
            this.funcList[type][id] = temp_fn;
            fn._id = id;    // しれっと記録
            
            this.element.addEventListener(type, temp_fn, false);
            return this;
        },
        
        /**
         * イベントを解除
         */
        remove: function(type, fn_or_id) {
            var id = (typeof(fn_or_id) === "function") ? fn_or_id._id : fn_or_id;
            var fn = this.getFunc(type, id);
            
            this.element.removeEventListener(type, fn, false);
            delete this.funcList[type][id];
        },
        
        /**
         * クリックイベント
         */
        click: function(fn, id) {
            this.add("click", fn, id);
            return this;
        },
        
        mdlclick: function(fn, id) {
            var temp_fn = function(e) {
                if (e.button == 1) {
                    fn(e);
                }
            }
            this.add("click", temp_fn, id);
        },
        
        /**
         * ポインティング
         */
        pointstart: function(fn, id) {
            this.add(tm.dom.Event.POINT_START, fn, id);
        },
        pointmove: function(fn, id) {
            this.add(tm.dom.Event.POINT_MOVE, fn, id);
        },
        pointend: function(fn, id) {
            this.add(tm.dom.Event.POINT_END, fn, id);
        },
        
        /**
         * ホバーイベント
         */
        hover: function(fn, id) {
            this.add("mouseover", fn, id);
            return this;
        },
        
        /**
         * 一度だけ呼ばれるイベントを登録
         */
        one: function(type, fn, id) {
            var self = this;
            var elm  = TM.$DOMElement(this.element);
            
            var temp_fn = function() {
                var result = fn.apply(elm, arguments);
                self.remove(type, temp_fn);
                return result;
            };
            
            this.add(type, temp_fn, id);
            
            return this;
        },
        
        /**
         * トグルイベント登録
         */
        toggle: function(type, fn_list) {
            var self = this;
            var elm  = TM.$DOMElement(this.element);
            var temp_list = [];
            
            for (var i=0; i<fn_list.length; ++i) {
                var temp_fn = (function(i){
                    return function(){
                        var result = fn_list[i].apply(elm, arguments);
                        
                        if (result !== false) {
                            var index = (i+1)%fn_list.length;
                            self.one(type, temp_list[index]);
                        }
                    }
                })(i);
                temp_list.push(temp_fn);
            }
            
            this.one(type, temp_list[0]);
            
            return this;
        },
        
        /**
         * 指定したイベントタイプ & id の関数を取得
         */
        getFunc: function(type, id) {
            return this.funcList[type][id];
        },
        
    });
    
    tm.dom.Event.POINT_START    = (tm.isMobile) ? "touchstart" : "mousedown";
    tm.dom.Event.POINT_MOVE     = (tm.isMobile) ? "touchmove" : "mousemove";
    tm.dom.Event.POINT_END      = (tm.isMobile) ? "touchend" : "mouseup";
    
    
    /**
     * @property    event
     * スタイルクラス
     */
    tm.dom.Element.prototype.getter("event", function(){
        return this._event || ( this._event = tm.dom.Event(this.element) );
    });
    
})();





/*
 * anim.js
 */

tm.dom = tm.dom || {};

(function() {
    
    /**
     * @class
     * アニメーションクラス
     */
    tm.dom.Anim = tm.createClass({
        
        /**
         * 初期化
         */
        init: function(element) {
            this.element = element;
            
            // アニメーションが終了したらステートを "paused" にする(何度も再生できるようにする為)
            var self = this;
            this.element.addEventListener("webkitAnimationEnd", function() {
                self.stop();
            }, false);
        },
        
        
        /**
         * アニメーション開始
         */
        start: function() {
            this.element.style["webkitAnimationPlayState"] = "running";
            return this;
        },
        
        /**
         * アニメーション終了
         */
        stop: function() {
            this.element.style["webkitAnimationPlayState"] = "paused";
            return this;
        },
        
        /**
         * プロパティをセット
         */
        setProperty: function(prop) {
            if (typeof prop == "string") {
                this.element.style["webkitAnimation"] = prop;
            }
            else {
                for (var key in prop) {
                    var fn = ANIM_SETTER_FUNC_NAME_MAP[key];
                    var value = prop[key];
                    fn.call(this, value);
                }
            }
            return this;
        },
        
        /**
         * 名前をセット
         */
        setName: function(name) {
            this.element.style["webkitAnimationName"] = name;
            return this;
        },
        
        /**
         * アニメーション時間の長さをセット
         */
        setDuration: function(s) {
            this.element.style["webkitAnimationDuration"] = s;
            return this;
        },
        
        /**
         * 補間関数をセット
         */
        setTimingFunction: function(func) {
            this.element.style["webkitAnimationTimingFunction"] = func;
            return this;
        },
        
        /**
         * イテレータカウントをセット
         */
        setIterationCount: function(n) {
            this.element.style["webkitAnimationIterationCount"] = n;
            return this;
        },
        
        /**
         * アニメーション開始待ち時間をセット
         */
        setDelay: function(s) {
            this.element.style["webkitAnimationDelay"] = s;
            return this;
        },
        
        /**
         * 判定再生させるかどうかを指定
         * "normal" or "alternate"
         */
        setDirection: function(t) {
            this.element.style["webkitAnimationDirection"] = t;
            return this;
        },
    });
    
    var ANIM_SETTER_FUNC_NAME_MAP = {
        // 小文字対応
        "name"          : tm.dom.Anim.prototype.setName,
        "duration"      : tm.dom.Anim.prototype.setDuration,
        "timingFunction": tm.dom.Anim.prototype.setTimingFunction,
        "iterationCount": tm.dom.Anim.prototype.setIterationCount,
        "delay"         : tm.dom.Anim.prototype.setDelay,
        
        // 大文字対応
        "Name"          : tm.dom.Anim.prototype.setName,
        "Duration"      : tm.dom.Anim.prototype.setDuration,
        "TimingFunction": tm.dom.Anim.prototype.setTimingFunction,
        "IterationCount": tm.dom.Anim.prototype.setIterationCount,
        "Delay"         : tm.dom.Anim.prototype.setDelay,
    };
    
    /**
     * @property    anim
     * アニメーション
     */
    tm.dom.Element.prototype.getter("anim", function() {
        return this._anim || (this._anim = tm.dom.Anim(this.element));
    });
    
})();



/*
 * phi
 */


tm.input = tm.input || {};


(function() {
    
    /**
     * @class
     * キーボードクラス
     */
    tm.input.Keyboard = tm.createClass({
        
        
        /**
         * target element
         */
        element: null,
        
        key: null,
        
        press   : null, // 押しているキー
        down    : null, // 押したキー
        up      : null, // 離したキー
        last    : null, // 押していたキー
        
        /**
         * @constructs
         * @see         <a href="http://tmlib-js.googlecode.com/svn/trunk/test/input/keyboard-test.html">Test Program</a>.
         * @example
         * TM.loadScript("input", "keyboard");
         *  
         * TM.main(function() {
         *     var k = TM.$Key(document);
         *     k.run();
         *     TM.setLoop(function(){
         *         if (k.getKey('a')) { console.log("press 'a'!!"); }
         *     });
         * });
         */
        init: function(element) {
            this.element = element || document;
            
            this.key = {};
            
            this.press  = {};
            this.down   = {};
            this.up     = {};
            this.last   = {};
            
            var self = this;
            this.element.addEventListener("keydown", function(e){
                self.key[e.keyCode] = true;
            });
            this.element.addEventListener("keyup", function(e){
                // delete self.key[e.keyCode];
                self.key[e.keyCode] = false;
                // self.button |= 1<<e.button;
            });
            this.element.addEventListener("keypress", function(e){
                // self.button &= ~(1<<e.button);
            });
        },
        
        /**
         * run.
         * 自動でマウス情報を更新したい際に使用する
         */
        run: function(fps) {
            var self = this;
            fps = fps || 30;
            tm.setLoop(function(){
                self.update();
            },　1000/fps);
        },
        
        /**
         * 情報更新処理
         * マイフレーム呼んで下さい.
         */
        update: function() {
            // TODO: 一括ビット演算で行うよう修正する
            for (var k in this.key) {
                this.last[k]    = this.press[k];
                this.press[k]   = this.key[k];
                
                this.down[k] = (this.press[k] ^ this.last[k]) & this.press[k];
                this.up[k] = (this.press[k] ^ this.last[k]) & this.last[k];
            }
            
            return this;
        },
        
        /**
         * キーを押しているかをチェック
         * @param   {Number/String} key keyCode or keyName
         * @returns {Boolean}   チェック結果
         */
        getKey: function(key) {
            if (typeof(key) == "string") {
                key = tm.keyCode[key];
            }
            return this.press[key] == true;
        },
        
        /**
         * キーを押したかをチェック
         * @param   {Number/String} key keyCode or keyName
         * @returns {Boolean}   チェック結果
         */
        getKeyDown: function(key) {
            if (typeof(key) == "string") {
                key = tm.keyCode[key];
            }
            return this.down[key] == true;
        },
        
        /**
         * キーを離したかをチェック
         * @param   {Number/String} key keyCode or keyName
         * @returns {Boolean}   チェック結果
         */
        getKeyUp: function(key) {
            if (typeof(key) == "string") {
                key = tm.keyCode[key];
            }
            return this.up[key] == true;
        },
        
        /**
         * キーの方向を Angle(Degree) で取得
         * @returns {Boolean}   角度(Degree)
         */
        getKeyAngle: function() {
            var angle = null;
            var arrowBit =
                (this.getKey("left")   << 3) | // 1000
                (this.getKey("up")     << 2) | // 0100
                (this.getKey("right")  << 1) | // 0010
                (this.getKey("down"));         // 0001
            
            if (arrowBit != 0 && ARROW_BIT_TO_ANGLE_TABLE.hasOwnProperty(arrowBit)) {
                angle = ARROW_BIT_TO_ANGLE_TABLE[arrowBit];
            }
            
            return angle;
        }
        
    });
    
    var ARROW_BIT_TO_ANGLE_TABLE = {
        // 上下左右
        0x01: 270,      // 下
        0x02:   0,      // 右
        0x04:  90,      // 上
        0x08: 180,      // 左
        // 斜め
        0x06:  45,      // 右上
        0x03: 315,      // 右下
        0x0c: 135,      // 左上
        0x09: 225,      // 左下
        // 三方向同時押し対応
        // 想定外の操作だが対応しといたほうが無難
        0x0e:  90,      // 右上左
        0x0d: 180,      // 上左下
        0x0b: 270,      // 左下右
        0x07:   0,      // 下右上
    };
    
    
})();



/*
 * phi
 */


tm.input = tm.input || {};


(function() {
    
    /**
     * @class
     * マウスクラス
     */
    tm.input.Mouse = tm.createClass({
        
        
        element: null,
        
        x   : 0,
        y   : 0,
        pX  : 0,
        pY  : 0,
        dX  : 0,
        dY  : 0,
        
        /**
         * 初期化
         */
        init: function(element) {
            this.element = element || window.document;
            
            var self = this;
            this.element.addEventListener("mousemove", function(e){
                // 座標更新
                self._mousemove(e);
            });
            this.element.addEventListener("mousedown", function(e){
                self.button |= 1<<e.button;
            });
            this.element.addEventListener("mouseup", function(e){
                self.button &= ~(1<<e.button);
            });
        },
        
        /**
         * run.
         * 自動でマウス情報を更新したい際に使用する
         */
        run: function(fps) {
            var self = this;
            fps = fps || 30;
            TM.setLoop(function(){
                self.update();
            },　1000/fps);
        },
        
        /**
         * 情報更新処理
         * マイフレーム呼んで下さい.
         */
        update: function() {
            this.last = this.press;
            
            this.press = this.button;
            
            this.down = (this.press ^ this.last) & this.press;
            this.up   = (this.press ^ this.last) & this.last;
            
            this.dX = this.x - this.pX;
            this.dY = this.y - this.pY;
            
            this.pX = this.x;
            this.pY = this.y;
        },
        
        /**
         * ボタン取得
         */
        getButton: function(button) {
            if (typeof(button) == "string") {
                button = BUTTON_MAP[button];
            }
            
            return (this.press & button) != 0;
        },
        
        /**
         * ボタンダウン取得
         */
        getButtonDown: function(button) {
            if (typeof(button) == "string") {
                button = BUTTON_MAP[button];
            }
            
            return (this.down & button) != 0;
        },
        
        /**
         * ボタンアップ取得
         */
        getButtonUp: function(button) {
            if (typeof(button) == "string") {
                button = BUTTON_MAP[button];
            }
            
            return (this.up & button) != 0;
        },
        
        _mousemove: function(e) {
            var rect = e.target.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        },
        
        _mousemoveNormal: function(e) {
            var rect = e.target.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        },
        
        _mousemoveScale: function(e) {
            var rect = e.target.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
            
            //if (e.target instanceof HTMLCanvasElement) {
                // スケールを考慮した拡縮
                if (e.target.style.width) {
                    this.x *= e.target.width / parseInt(e.target.style.width);
                }
                if (e.target.style.height) {
                    this.y *= e.target.height / parseInt(e.target.style.height);
                }
            //}
        },
        
    });
    
    
    tm.input.Mouse.BUTTON_LEFT      = 0x1;
    tm.input.Mouse.BUTTON_MIDDLE    = 0x2;
    tm.input.Mouse.BUTTON_RIGHT     = 0x4;
    
    var BUTTON_MAP = {
        "left"  : tm.input.Mouse.BUTTON_LEFT,
        "middle": tm.input.Mouse.BUTTON_MIDDLE,
        "right" : tm.input.Mouse.BUTTON_RIGHT
    };
    
    
    /**
     * @method
     * ポインティング状態取得(touch との差異対策)
     */
    tm.input.Mouse.prototype.getPointing        = function() { return this.getButton("left"); };
    /**
     * @method
     * ポインティングを開始したかを取得(touch との差異対策)
     */
    tm.input.Mouse.prototype.getPointingStart   = function() { return this.getButtonDown("left"); };
    /**
     * @method
     * ポインティングを終了したかを取得(touch との差異対策)
     */
    tm.input.Mouse.prototype.getPointingEnd     = function() { return this.getButtonUp("left"); };
    
    
})();



/*
 * phi
 */


tm.input = tm.input || {};


(function() {
    
    /**
     * @class
     * タッチクラス
     */
    tm.input.Touch = tm.createClass({
        
        element: null,
        touched: false,
        
        x   : 0,
        y   : 0,
        pX  : 0,
        pY  : 0,
        dX  : 0,
        dY  : 0,
        
        /**
         * @constructs
         * @see         <a href="http://tmlib-js.googlecode.com/svn/trunk/test/input/touch-test.html">Test Program</a>.
         */
        init: function(element) {
            this.element = element || window.document;
            
            var self = this;
            this.element.addEventListener("touchstart", function(e){
                self._touchmove(e);
                self.touched = true;
            });
            this.element.addEventListener("touchend", function(e){
                self.touched = false;
            });
            this.element.addEventListener("touchmove", function(e){
                self._touchmove(e);
                // 画面移動を止める
                e.stop();
            });
        },
        
        /**
         * run.
         * 自動でマウス情報を更新したい際に使用する
         */
        run: function(fps) {
            var self = this;
            fps = fps || 30;
            TM.setLoop(function(){
                self.update();
            },　1000/fps);
        },
        
        /**
         * 情報更新処理
         * マイフレーム呼んで下さい.
         */
        update: function() {
            this.last   = this.now;
            this.now    = this.touched;
            
            this.start  = (this.now ^ this.last) & this.now;
            this.end    = (this.now ^ this.last) & this.last;
            
            this.dX = this.x - this.pX;
            this.dY = this.y - this.pY;
            
            this.pX = this.x;
            this.pY = this.y;
        },
        
        /**
         * タッチしているかを判定
         */
        getTouch: function() {
            return this.touched;
        },
        
        /**
         * タッチ開始時に true
         */
        getTouchStart: function() {
            return this.start;
        },
        
        /**
         * タッチ終了時に true
         */
        getTouchEnd: function() {
            return this.end;
        },
        
        _touchmove: function(e) {
            var t = e.touches[0];
            this.x = t.pageX;
            this.y = t.pageY;
        },
        
        _touchmoveScale: function(e) {
            var t = e.touches[0];
            this.x = t.pageX;
            this.y = t.pageY;
            
            if (e.target.style.width) {
                this.x *= e.target.width / parseInt(e.target.style.width);
            }
            if (e.target.style.height) {
                this.y *= e.target.height / parseInt(e.target.style.height);
            }
        },
        
    });
    
    
    /**
     * @method
     * ポインティング状態取得(mouse との差異対策)
     */
    tm.input.Touch.prototype.getPointing        = tm.input.Touch.prototype.getTouch;
    /**
     * @method
     * ポインティングを開始したかを取得(mouse との差異対策)
     */
    tm.input.Touch.prototype.getPointingStart   = tm.input.Touch.prototype.getTouchStart;
    /**
     * @method
     * ポインティングを終了したかを取得(mouse との差異対策)
     */
    tm.input.Touch.prototype.getPointingEnd     = tm.input.Touch.prototype.getTouchEnd;
    
})();



/*
 * color.js
 */

/*
 * 
 */
tm.graphics = tm.graphics || {};

(function() {
    
    /**
     * @class   カラークラス
     */
    tm.graphics.Color = tm.createClass({
        
        /**
         * R値
         */
        r: 255,
        
        /**
         * G値
         */
        g: 255,
        
        /**
         * B値
         */
        b: 255,
        
        /**
         * A値
         */
        a: 1.0,
        
        /**
         * @constructor
         * 初期化
         */
        init: function(r, g, b, a) {
            
            this.canvas             = canvas || document.createElement("canvas");
            this.context            = this.canvas.getContext("2d");
            this.context.lineCap    = "round";
            this.context.lineJoin   = "round";
        },
        
        /**
         * CSS 用 RGBA 文字列に変換
         */
        toCSSValue: function() {
            return "rgba({r},{g},{b},{a})".format(this);
        },
        
    });
    
})();


/*
 * canvas.js
 */

/*
 * 
 */
tm.graphics = tm.graphics || {};

(function() {
    
    /**
     * キャンバス
     */
    tm.graphics.Canvas = tm.createClass({
        
        /**
         * 要素
         */
        element: null,
        
        /**
         * キャンバス
         */
        canvas: null,
        
        /**
         * コンテキスト
         */
        context: null,
        
        /**
         * @constructor
         * 初期化
         */
        init: function(canvas) {
            this.canvas = null;
            if (typeof canvas == "string") {
                this.canvas = document.querySelector(canvas);
            }
            else {
                this.canvas = canvas || document.createElement("canvas");
            }
            this.element            = this.canvas;
            this.context            = this.canvas.getContext("2d");
            this.context.lineCap    = "round";
            this.context.lineJoin   = "round";
        },
        
        /**
         * リサイズする
         */
        resize: function(width, height) {
            this.canvas.width   = width;
            this.canvas.height  = height;
            return this;
        },
        
        /**
         * リサイズウィンドウ
         */
        resizeWindow: function() {
            this.canvas.style.position  = "fixed";
            this.canvas.style.margin    = "0px";
            this.canvas.style.padding   = "0px";
            this.canvas.style.left      = "0px";
            this.canvas.style.top       = "0px";
            return this.resize(window.innerWidth, window.innerHeight);
        },
        
        /**
         * フィット
         */
        resizeToFitScreen: function() {
            this.canvas.style.position  = "fixed";
            this.canvas.style.margin    = "0px";
            this.canvas.style.padding   = "0px";
            this.canvas.style.left      = "0px";
            this.canvas.style.top       = "0px";
            return this.resize(window.innerWidth, window.innerHeight);
        },
        
        /**
         *  クリア
         */
        clear: function(x, y, width, height)
        {
            x = x || 0;
            y = y || 0;
            width = width || this.width;
            height= height|| this.height;
            this.context.clearRect(x, y, width, height);
            return this;
        },
        
        
        /**
         * 色指定クリア
         * @param {String}  fillStyle
         * @param {Number}  [x=0]
         * @param {Number}  [y=0]
         * @param {Number}  [width=this.width]
         * @param {Number}  [height=this.height]
         */
        clearColor: function(fillStyle, x, y, width, height)
        {
            x = x || 0;
            y = y || 0;
            width = width || this.width;
            height= height|| this.height;
            
            this.save();
            this.resetTransform();          // 行列初期化
            this.fillStyle = fillStyle;     // 塗りつぶしスタイルセット
            this.context.fillRect(x, y, width, height);
            this.restore();
            
            return this;
        },
                
        /**
         *  パスを開始(リセット)
         */
        beginPath: function()
        {
            this.context.beginPath();
            return this;
        },
                
        /**
         *  パスを閉じる
         */
        closePath: function()
        {
            this.context.closePath();
            return this;
        },
        

        /**
         *  新規パス生成
         */
        moveTo: function(x, y)
        {
            this.context.moveTo(x, y);
            return this;
        },
        
        /**
         * パスに追加
         */
        lineTo: function(x, y)
        {
            this.context.lineTo(x, y);
            return this;
        },
        
        /**
         * パス内を塗りつぶす
         */
        fill: function()
        {
            this.context.fill();
            return this;
        },
        
        /**
         * パス上にラインを引く
         */
        stroke: function()
        {
            this.context.stroke();
            return this;
        },
        
        /**
         * 点描画
         */
        drawPoint: function(x, y)
        {
            return this.strokeRect(x, y, 1, 1);
            // return this.beginPath().moveTo(x-0.5, y-0.5).lineTo(x+0.5, y+0.5).stroke();
        },

        /**
         * ラインパスを作成
         */
        line: function(x0, y0, x1, y1)
        {
            return this.moveTo(x0, y0).lineTo(x1, y1);
        },
        
        /**
         * ラインを描画
         */
        drawLine: function(x0, y0, x1, y1)
        {
            return this.beginPath().line(x0, y0, x1, y1).stroke();
        },
        
        /**
         * ダッシュラインを描画
         */
        drawDashLine: function(x0, y0, x1, y1, pattern)
        {
            var patternTable = null;
            if (typeof(pattern) == "string") {
                patternTable = pattern;
            }
            else {
                pattern = pattern || 0xf0f0;
                patternTable = pattern.toString(2);
            }
            patternTable = patternTable.padding(16, '1');
            
            var vx = x1-x0;
            var vy = y1-y0;
            var len = Math.sqrt(vx*vx + vy*vy);
            vx/=len; vy/=len;
            
            var x = x0;
            var y = y0;
            for (var i=0; i<len; ++i) {
                if (patternTable[i%16] == '1') {
                    this.drawPoint(x, y);
                    // this.fillRect(x, y, this.context.lineWidth, this.context.lineWidth);
                }
                x += vx;
                y += vy;
            }
            
            return this;
        },
        
        /**
         * v0(x0, y0), v1(x1, y1) から角度を求めて矢印を描画
         * http://hakuhin.jp/as/rotation.html
         */
        drawArrow: function(x0, y0, x1, y1, arrowRadius)
        {
            var vx = x1-x0;
            var vy = y1-y0;
            var angle = Math.atan2(vy, vx)*180/Math.PI;
            
            this.drawLine(x0, y0, x1, y1);
            this.fillPolygon(x1, y1, arrowRadius || 5, 3, angle);
            
            return this;
        },
        
        
        /**
         * lines
         */
        lines: function()
        {
            this.moveTo(arguments[0], arguments[1]);
            for (var i=1,len=arguments.length/2; i<len; ++i) {
                this.lineTo(arguments[i*2], arguments[i*2+1]);
            }
            return this;
        },
        
        strokeLines: function()
        {
            this.beginPath();
            this.lines.apply(this, arguments);
            this.stroke();
            return this;
        },
        
        fillLines: function()
        {
            this.beginPath();
            this.lines.apply(this, arguments);
            this.fill();
            return this;
        },
        
        /**
         * 四角形パスを作成する
         */
        rect: function(x, y, width, height)
        {
            this.context.rect.apply(this.context, arguments);
            return this;
        },
        
        /**
         * 四角形塗りつぶし描画
         */
        fillRect: function()
        {
            this.context.fillRect.apply(this.context, arguments);
            return this;
        },
        
        /**
         * 四角形ライン描画
         */
        strokeRect: function()
        {
            this.context.strokeRect.apply(this.context, arguments);
            return this;
        },
        
        /**
         * 角丸四角形パス
         */
        roundRect: function(x, y, width, height, radius) {
            var l = x + radius;
            var r = x + width - radius;
            var t = y + radius;
            var b = y + height - radius;
            
            /*
            var ctx = this.context;
            ctx.moveTo(l, y);
            ctx.lineTo(r, y);
            ctx.quadraticCurveTo(x+width, y, x+width, t);
            ctx.lineTo(x+width, b);
            ctx.quadraticCurveTo(x+width, y+height, r, y+height);
            ctx.lineTo(l, y+height);
            ctx.quadraticCurveTo(x, y+height, x, b);
            ctx.lineTo(x, t);
            ctx.quadraticCurveTo(x, y, l, y);
            /**/
            
            this.context.arc(l, t, radius,     -Math.PI, -Math.PI*0.5, false);  // 左上
            this.context.arc(r, t, radius, -Math.PI*0.5,            0, false);  // 右上
            this.context.arc(r, b, radius,            0,  Math.PI*0.5, false);  // 右下
            this.context.arc(l, b, radius,  Math.PI*0.5,      Math.PI, false);  // 左下
            this.closePath();
            /**/
            
            return this;
        },
        /**
         * 角丸四角形塗りつぶし
         */
        fillRoundRect: function(x, y, width, height, radius) {
            return this.beginPath().roundRect(x, y, width, height, radius).fill();
        },
        /**
         * 角丸四角形ストローク描画
         */
        strokeRoundRect: function(x, y, width, height, radius) {
            return this.beginPath().roundRect(x, y, width, height, radius).stroke();
        },
        
        /**
         * ポリゴンパス
         */
        polygon: function(x, y, size, sides, offsetAngle) {
            var radDiv = (Math.PI*2)/sides;
            var radOffset = (offsetAngle!=undefined) ? offsetAngle*Math.PI/180 : -Math.PI/2;
            
            this.moveTo(x + Math.cos(radOffset)*size, y + Math.sin(radOffset)*size);
            for (var i=1; i<sides; ++i) {
                var rad = radDiv*i+radOffset;
                this.lineTo(
                    x + Math.cos(rad)*size,
                    y + Math.sin(rad)*size
                );
            }
            this.closePath();
            return this;
        },
        /**
         * ポリゴン塗りつぶし
         */
        fillPolygon: function(x, y, radius, sides, offsetAngle) {
            return this.beginPath().polygon(x, y, radius, sides, offsetAngle).fill();
        },
        /**
         * ポリゴンストローク描画
         */
        strokePolygon: function(x, y, radius, sides, offsetAngle) {
            return this.beginPath().polygon(x, y, radius, sides, offsetAngle).stroke();
        },
        
        /**
         * star
         */
        star: function(x, y, radius, sides, sideIndent, offsetAngle) {
            var sideIndentRadius = radius * (sideIndent || 0.38);
            var radOffset = (offsetAngle) ? offsetAngle*Math.PI/180 : -Math.PI/2;
            var radDiv = (Math.PI*2)/sides/2;
            
            this.moveTo(
                x + Math.cos(radOffset)*radius,
                y + Math.sin(radOffset)*radius
            );
            for (var i=1; i<sides*2; ++i) {
                var rad = radDiv*i + radOffset;
                var len = (i%2) ? sideIndentRadius : radius;
                this.lineTo(
                    x + Math.cos(rad)*len,
                    y + Math.sin(rad)*len
                );
            }
            this.closePath();
            return this;
        },
        
        fillStar: function(x, y, radius, sides, sideIndent, offsetAngle) {
            return this.beginPath().star(x, y, radius, sides, sideIndent, offsetAngle).fill();
        },
        strokeStar: function(x, y, radius, sides, sideIndent, offsetAngle) {
            return this.beginPath().star(x, y, radius, sides, sideIndent, offsetAngle).stroke();
        },
        
        
        /**
         * 円のパスを設定
         */
        circle: function(x, y, radius)
        {
            this.context.arc(x, y, radius, 0, Math.PI*2, false);
            return this;
        },
        
        /**
         * 塗りつぶし円を描画
         */
        fillCircle: function(x, y, radius)
        {
            return this.beginPath().circle(x, y, radius).fill();
        },
        
        /**
         * ストローク円を描画
         */
        strokeCircle: function(x, y, radius)
        {
            return this.beginPath().circle(x, y, radius).stroke();
        },
        
        /**
         * 三角形パスを設定
         */
        triangle: function(x0, y0, x1, y1, x2, y2)
        {
            this.moveTo(x0, y0).lineTo(x1, y1).lineTo(x2, y2);
            this.closePath();
            return this;
        },
        
        /**
         * 塗りつぶし三角形を描画
         */
        fillTriangle: function(x0, y0, x1, y1, x2, y2)
        {
            return this.beginPath().triangle(x0, y0, x1, y1, x2, y2).fill();
        },
        
        /**
         * ストローク三角形を描画
         */
        strokeTriangle: function(x0, y0, x1, y1, x2, y2)
        {
            return this.beginPath().triangle(x0, y0, x1, y1, x2, y2).stroke();
        },
        

        /**
         * 塗りつぶしテキストを描画
         */
        fillText: function(text, x, y)
        {
            return this.context.fillText.apply(this.context, arguments);
        },
        
        /**
         * ストロークテキスト
         */
        strokeText: function(text, x, y)
        {
            return this.context.strokeText.apply(this.context, arguments);
        },
        
        /**
         * 塗りつぶしテキスト
         */
        fillTextList: function(text_list, x, y, offsetX, offsetY)
        {
            offsetX = offsetX || 0;
            offsetY = offsetY || 20;
            
            for (var i=0,len=text_list.length; i<len; ++i) {
                this.fillText(text_list[i], x+offsetX*i, y+offsetY*i);
            }
            
            return this;
        },
        
        /**
         * ストロークテキストリスト
         */
        strokeTextList: function(text_list, x, y, offsetX, offsetY)
        {
            offsetX = offsetX || 0;
            offsetY = offsetY || 20;
            
            for (var i=0,len=text_list.length; i<len; ++i) {
                this.strokeText(x+offsetX*i, y+offsetY*i, text_list[i]);
            }
            
            return this;
        },
                
        /**
         * 画像描画
         */
        drawImage: function(image, x, y)
        {
            this.context.drawImage.apply(this.context, arguments);
            return ;
            
            x = x || 0;
            y = y || 0;
            this.context.drawImage(image, x, y);
            return this;
            // ctx.drawImage(this.image.canvas,
                // 0, 0, this.width, this.height,
                // -this.width/2, -this.height/2, this.width, this.height);
        },
        
        /**
         * 行列をセット
         */
        setTransform: function(m11, m12, m21, m22, dx, dy)
        {
            this.context.setTransform(m11, m12, m21, m22, dx, dy);
            return this;
        },
        
        
        /**
         * 行列をリセット
         */
        resetTransform: function()
        {
            this.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
            return this;
        },
        
        
        /**
         * 中心に移動
         */
        setTransformCenter: function()
        {
            this.context.setTransform(1, 0, 0, 1, this.width/2, this.height/2);
            return this;
        },
        
        /**
         * 保存
         */
        save: function()
        {
            this.context.save();
            return this;
        },
        
        /**
         * 復元
         */
        restore: function()
        {
            this.context.restore();
            return this;
        },
        
        /**
         * 移動
         */
        translate: function(x, y)
        {
            this.context.translate(x, y);
            return this;
        },
        
        /**
         * 回転
         */
        rotate: function(rotation)
        {
            this.context.rotate(rotation);
            return this;
        },
        
        /**
         * スケール
         */
        scale: function(scaleX, scaleY)
        {
            this.context.scale(scaleX, scaleY);
            return this;
        },
        
        /**
         * 画像として保存
         */
        saveAsImage: function(mime_type) {
            mime_type = mime_type || tm.graphics.Canvas.MIME_TYPE_PNG;
            var data_url = this.canvas.toDataURL(mime_type);
            // data_url = data_url.replace(mime_type, "image/octet-stream");
            window.open(data_url, "save");
            
            // toDataURL を使えば下記のようなツールが作れるかも!!
            // TODO: プログラムで絵をかいて保存できるツール
        },
        
        setCompositing: function(alpha, compositeOperation)
        {
            // TODO
        },
        
        /**
         * 
         * @see <a href="http://www.w3.org/TR/2010/WD-2dcontext-20100624/#colors-and-styles">http://www.w3.org/TR/2010/WD-2dcontext-20100624/#colors-and-styles</a>
         */
        setColorStyle: function(stroke, fill)
        {
            fill = fill || stroke;
            
            this.context.strokeStyle    = stroke;
            this.context.fillStyle      = fill;
            return this;
        },
        
        /**
         * テキストをセット
         */
        setText: function(font, align, baseline)
        {
            var c = this.context;
            c.font          = font;
            c.textAlign     = align;
            c.textBaseline  = baseline;
        },
        
        /**
         * ラインスタイルを一括セット
         * @see <a href="http://www.w3.org/TR/2010/WD-2dcontext-20100624/#line-styles">http://www.w3.org/TR/2010/WD-2dcontext-20100624/#line-styles</a>
         */
        setLineStyle: function(width, cap, join, miter) {
            with(this.context) {
                lineWidth   = width || 1;
                lineCap     = cap   || "round";
                lineJoin    = join  || "round";
                miterLimit  = miter || 10.0;
            }
            return this;
        },
        
        /**
         * 影をセット
         * - <http://www.html5.jp/canvas/ref/property/shadowColor.html>
         * - <http://www.w3.org/TR/2010/WD-2dcontext-20100624/#shadows>
         */
        setShadows: function(color, offsetX, offsetY, blur) {
            with(this.context) {
                shadowColor     = color     || "black";
                shadowOffsetX   = offsetX   || 0;
                shadowOffsetY   = offsetY   || 0;
                shadowBlur      = blur      || 0;
            }
            return this;
        },
        
    });
    
    tm.graphics.Canvas.MIME_TYPE_PNG = "image/png";
    tm.graphics.Canvas.MIME_TYPE_JPG = "image/jpeg";
    tm.graphics.Canvas.MIME_TYPE_SVG = "image/svg+xml";
    
    /**
     * @property    width
     * 幅
     */
    tm.graphics.Canvas.prototype.accessor("width", {
        "get": function()   { return this.canvas.width; },
        "set": function(v)  { this.canvas.width = v; }
    });
    
    /**
     * @property    height
     * 高さ
     */
    tm.graphics.Canvas.prototype.accessor("height", {
        "get": function()   { return this.canvas.height; },
        "set": function(v)  { this.canvas.height = v;   }
    });
    
    /**
     * @property    fillStyle
     * 塗りつぶしスタイル
     */
    tm.graphics.Canvas.prototype.accessor("fillStyle", {
        "get": function()   { return this.context.fillStyle; },
        "set": function(v)  { this.context.fillStyle = v;   }
    });
    
    
    /**
     * @property    strokeStyle
     * ストロークスタイル
     */
    tm.graphics.Canvas.prototype.accessor("strokeStyle", {
        "get": function()   { return this.context.strokeStyle; },
        "set": function(v)  { this.context.strokeStyle = v;   }
    });
    
    
    /**
     * @property    globalAlpha
     * アルファ指定
     */
    tm.graphics.Canvas.prototype.accessor("globalAlpha", {
        "get": function()   { return this.context.globalAlpha; },
        "set": function(v)  { this.context.globalAlpha = v;   }
    });
    
    
    /**
     * @property    globalCompositeOperation
     * ブレンド指定
     */
    tm.graphics.Canvas.prototype.accessor("globalCompositeOperation", {
        "get": function()   { return this.context.globalCompositeOperation; },
        "set": function(v)  { this.context.globalCompositeOperation = v;   }
    });

    /**
     * @property    shadowBlur
     * シャドウブラー
     */
    tm.graphics.Canvas.prototype.accessor("shadowBlur", {
        "get": function()   { return this.context.shadowBlur; },
        "set": function(v)  { this.context.shadowBlur = v;   }
    });
    

    /**
     * @property    shadowColor
     * シャドウブラーカラー
     */
    tm.graphics.Canvas.prototype.accessor("shadowColor", {
        "get": function()   { return this.context.shadowColor; },
        "set": function(v)  { this.context.shadowColor = v;   }
    });
    
    /**
     * @property    lineCap
     * ライン終端の描画方法
     */
    tm.graphics.Canvas.prototype.accessor("lineCap", {
        "get": function()   { return this.context.lineCap; },
        "set": function(v)  { this.context.lineCap = v;   }
    });
    
    /**
     * @property    lineJoin
     * ラインつなぎ目の描画方法
     */
    tm.graphics.Canvas.prototype.accessor("lineJoin", {
        "get": function()   { return this.context.lineJoin; },
        "set": function(v)  { this.context.lineJoin = v;   }
    });
    
    /**
     * @property    lineWidth
     * ライン幅設定
     */
    tm.graphics.Canvas.prototype.accessor("lineWidth", {
        "get": function()   { return this.context.lineWidth; },
        "set": function(v)  { this.context.lineWidth = v;   }
    });
    
    /**
     * @property    font
     * フォント
     */
    tm.graphics.Canvas.prototype.accessor("font", {
        "get": function()   { return this.context.font; },
        "set": function(v)  { this.context.font = v;   }
    });
    
    
    /**
     * @property    centerX
     * センターX
     */
    tm.graphics.Canvas.prototype.getter("centerX", function() {
        return this.canvas.width/2;
    });
    
    /**
     * @property    centerY
     * センターY
     */
    tm.graphics.Canvas.prototype.getter("centerY", function(){
        return this.canvas.height/2;
    });
    
})();



















/*
 * texture.js
 */

tm.graphics = tm.graphics || {};

(function() {
    
    /**
     * @class
     * テクスチャクラス
     */
    tm.graphics.Texture = tm.createClass({
        
        element: null,
        loaded: false,
        
        /**
         * 初期化
         */
        init: function(src) {
            this.element = new Image();
            this.element.src = src;
            
            var self = this;
            this.element.onload = function() {
                self.loaded = true;
            };
        }
        
    });
    
})();

(function(){
    
    /**
     * @class
     * テクスチャマネージャクラス
     */
    tm.graphics.TextureManager = {
        textures: {},
        loaded: true,
    };
    
    /**
     * @static
     * @method
     * 追加
     */
    tm.graphics.TextureManager.add = function(name, src)
    {
        if (src === undefined) { src = name; }
        
        this.textures[name] = tm.graphics.Texture(src);
        this.loaded = false;
    };
    
    /**
     * @static
     * @method
     * 取得
     */
    tm.graphics.TextureManager.get = function(name)
    {
        return this.textures[name];
    };
    
    /**
     * ロードチェック
     */
    tm.graphics.TextureManager.isLoaded = function()
    {
        for (var key in this.textures) {
            if (this.textures[key].loaded == false) {
                return false;
            }
        }
        return true;
    };
    
    tm.addLoadCheckList(tm.graphics.TextureManager);
    
})();




/*
 * tween.js
 */

tm.anim = tm.anim || {};

(function() {
    
    var bind = function(fn, self) {
        return function() { return fn.apply(self, arguments); };
    };
    
    /**
     * @class
     * Tween クラス
     */
    tm.anim.Tween = tm.createClass({
        
        target      : null,
        prop        : null,
        now         : null,
        finish      : null,
        duration    : null,
        timerID     : null,
        isLooping   : null,
        isPlaying   : null,
        func        : Math.linear,
        
        /**
         * frame rate
         */
        fps     : 30,
        
        init: function(target, prop, begin, finish, duration, func) {
            if (arguments.length == 1) {
                this.setObject(target);
            }
            else {
                this.set.apply(this, arguments);
            }
            
            this.time = 0;
            this.isPlaying = false;
        },
        
        set: function(target, prop, begin, finish, duration, func)
        {
            this.target = target;
            this.prop   = prop;
            this.begin  = begin;
            this.finish = finish;
            this.change = this.finish-this.begin;
            this.duration = duration;
            this.func = func || Math.linear;
        },
        
        setObject: function(obj)
        {
            for (var key in obj) {
                this[key] = obj[key];
            }
            this.change = this.finish-this.begin;
            
            //this.set(obj.target, obj.prop, obj.begin, obj.finish, obj.duration, obj.func);
        },
        
        /**
         * 再開
         */
        resume: function() {
            this.isPlaying = true;
            this._resumeTime();
            this._updateTime();
            this.dispatchEvent("resume");
        },
        
        /**
         * 開始
         */
        start: function() {
            this.isPlaying = true;
            this._startTime();
            this._updateTime();
            this.dispatchEvent("start");
        },
        
        /**
         * ストップ
         */
        stop: function() {
            this.isPlaying = false;
            this.dispatchEvent("stop");
        },
        
        /**
         * 開始位置まで戻る
         */
        rewind: function() {
            this.time = 0;
            this.update();
        },
        
        /**
         * 最後位置まで早送り
         */
        fforward: function() {
            this.time = this.duration;
            this.update();
        },
        
        /**
         * ヨーヨー
         */
        yoyo: function() {
            var temp = this.finish;
            this.finish = this.begin;
            this.begin  = temp;
            this.change = this.finish-this.begin;
            this.start();
        },
        
        /**
         * 更新
         */
        update: function() {
            this.target[this.prop] = this.func(this.time, this.begin, this.change, this.duration);
            this.dispatchEvent("change");
            //this.target[this.prop] = this.begin + (this.finish - this.begin) * (this.time/this.duration);
        },
        
        /**
         * ディスパッチイベント
         */
        dispatchEvent: function(type) {
            var fnName = 'on'+type;
            if (this[fnName]) this[fnName](type);
        },
        
        _resumeTime: function() {
            this.startTime = (new Date()).getTime() - this.time;
        },
        
        _startTime: function() {
            this.startTime = (new Date()).getTime();
        },
        
        _updateTime: function() {
            if (this.isPlaying) {
                this._nextTime();
                setTimeout(bind(arguments.callee, this), 1000/this.fps);
            }
        },
        
        _nextTime: function() {
            var time = (new Date()).getTime() - this.startTime;
            // モーション終了
            if (time > this.duration) {
                // ループ
                if (this.isLooping) {
                    this.rewind();
                    // 座標を更新
                    this.update();
                    // イベント開始
                    this.dispatchEvent("loop");
                }
                // 終了
                else {
                    this.time = this.duration;
                    // 座標を更新
                    this.update();
                    // 停止
                    this.stop();
                    // イベント
                    this.dispatchEvent("finish");
                }
            }
            // 更新
            else {
                this.time = time;
                // 座標を更新
                this.update();
            }
        }
    });
    
    
})();



/*
 * 
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * アプリケーション用オブジェクトの基底となるクラス
     */
    tm.app.Element = tm.createClass({
        
        parent: null,
        children: null,
        
        /**
         * 初期化
         */
        init: function() {
            this.children = [];
            this._listeners = {};
        },
        
        /**
         * 親から離れる
         */
        remove: function()
        {
            console.assert(this.parent);
            this.parent.removeChild(this);
            
            return this;
        },
        
        /**
         * 子供を追加
         */
        addChild: function(child) {
            if (child.parent) child.remove();
            child.parent = this;
            this.children.push(child);
            
            return child;
        },
        
        /**
         * まとめて追加
         * scene 遷移時に子供をごっそり移譲するときなどに使用
         * まだ動作確認していない
         */
        addChildren: function(children)
        {
            var tempChildren = children.slice();
            for (var i=beginIndex,len=tempChildren.length; i<len; ++i) {
                this.addChild(tempChildren[i]);
            }
        },
        
        /**
         * index 指定で子供を取得
         */
        getChildAt: function() {
            // TODO: 
        },
        
        /**
         * child に一致するエレメントを離す
         */
        removeChild: function(child)
        {
            var index = this.children.indexOf(child);
            if (index != -1) this.children.splice(index, 1);
        },
        
        /**
         * すべての child を離す
         */
        removeChildren: function(beginIndex)
        {
            beginIndex = beginIndex || 0;
            var tempChildren = this.children.slice();
            for (var i=beginIndex,len=tempChildren.length; i<len; ++i) {
                tempChildren[i].remove();
            }
            this.children = [];
        },
        
        /**
         * 名前の一致する child を取得
         */
        getChildByName: function(name)
        {
            for (var i=0,len=this.children.length; i<len; ++i)
                if (this.children[i].name == name) return this.children[i];
            
            return null;
        },
        
        /**
         * 関数実行
         */
        execChildren: function(func, args)
        {
            args = (args && args.length) ? args : [args];
            // 関数内で remove される可能性があるので配列をコピーする
            var tempChildren = this.children.slice();
            for (var i=0,len=tempChildren.length; i<len; ++i) {
                func.apply(tempChildren[i], args);
            }
        },
        
        /**
         * 親を取得
         */
        getParent: function() { return this.parent; },
        
        /**
         * ルートを取得
         */
        getRoot: function() {
            if (!this.parent) return null;
            // TODO: 親をたどって NULL だったらそのエレメントを返す
            var elm = null;
            for (elm=this.parent; elm.parent != null; elm = elm.parent) {}
            return elm;
        },
        
        /**
         * イベントリスナー追加
         */
        addEventListener: function(type, listener) {
            if (this._listeners[type] === undefined) {
                this._listeners[type] = [];
            }
            
            this._listeners[type].push(listener);
        },
        
        /**
         * イベント起動
         */
        dispatchEvent: function(e) {
            var oldEventName = 'on' + e.type;
            if (this[oldEventName]) this[oldEventName](e);
            
            var listeners = this._listeners[e.type];
            if (listeners) {
                for (var i=0,len=listeners.length; i<len; ++i) {
                    listeners[i].call(this, e);
                }
            }
        },
    });
    
})();


/*
 * 
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * キャンバスエレメント
     */
    tm.app.CanvasElement = tm.createClass({
        
        superClass: tm.app.Element,
        
        /**
         * 位置
         */
        position: null,
        /**
         * 回転
         */
        rotation: 0,
        /**
         * スケール
         */
        scale: null,
        
        /**
         * 幅
         */
        width:  64,
        /**
         * 高さ
         */
        height: 64,
        /**
         * 表示フラグ
         */
        visible: true,
        
        /**
         * fillStyle
         */
        fillStyle: "white",
        
        /**
         * strokeStyle
         */
        strokeStyle: "white",
        
        /**
         * アルファ
         */
        alpha: 1.0,
        
        /**
         * ブレンドモード
         */
        blendMode: "source-over",
        
        _matrix: null,
        
        /**
         * ゲーム用エレメントクラス
         */
        init: function() {
            this.superInit();
            this.position = tm.geom.Vector2(0, 0);
            this.scale    = tm.geom.Vector2(1, 1);
            this._matrix  = tm.geom.Matrix33();
            this.eventFlags = {};
        },
        
        /**
         * 更新処理
         */
        update: function() {},
        /**
         * 描画処理
         */
        draw: function(ctx) {},
        
        /**
         * 点と衝突しているかを判定
         */
        isHitPoint: function(x, y) {
            // 円判定
            if (((this.x-x)*(this.x-x)+(this.y-y)*(this.y-y)) < (this.radius*this.radius)) {
                return true;
            }
            return false;
            
            
            // ここから下のバージョンは四角形
            var globalPos = (this.parent) ? this.parent.localToGlobal(this) : this;
            // var globalPos = this;
            if (
                globalPos.x < x && x < (globalPos.x+this.width) &&
                globalPos.y < y && y < (globalPos.y+this.height))
            {
                return true;
            }
            return false;
        },
        
        isHitPointRect: function(x, y) {
            // ここから下のバージョンは四角形
            var globalPos = (this.parent) ? this.parent.localToGlobal(this) : this;
            // var globalPos = this;
            if (
                globalPos.x < x && x < (globalPos.x+this.width) &&
                globalPos.y < y && y < (globalPos.y+this.height))
            {
                return true;
            }
            return false;
        },
        
        /**
         * 要素と衝突しているかを判定
         */
        isHitElement: function(elm) {
            var selfGlobalPos  = this.parent.localToGlobal(this);
            if (((this.x-elm.x)*(this.x-elm.x)+(this.y-elm.y)*(this.y-elm.y)) < (this.radius+elm.radius)*(this.radius+elm.radius)) {
                return true;
            }
            return false;
        },
        
        /**
         * ローカル座標をグローバル座標にする
         */
        localToGlobal: function(p) {
            // TODO: まだ未実装
            return { x: this.x + p.x, y: this.y + p.y };
        },
        
        drawFillRect: function(ctx) {
            ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            return this;
        },
        drawStrokeRect: function(ctx) {
            ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
            return this;
        },
        
        drawFillArc: function(ctx) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
            ctx.fill();
            ctx.closePath();
            return this;
        },
        drawStrokeArc: function(ctx) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
            ctx.stroke();
            ctx.closePath();
            return this;
        },
        
        _update: function(app) {
            this.update(app);
            
            var e = tm.app.Event("enterframe");
            e.app = app;
            this.dispatchEvent(e);
            
            // 子供達も実行
            if (this.children.length > 0) {
                var tempChildren = this.children.slice();
                for (var i=0,len=tempChildren.length; i<len; ++i) {
                    tempChildren[i]._update(app);
                }
                //this.execChildren(arguments.callee, app);
            }
        },
        
        _draw: function(graphics) {
            
            if (this.visible === false) return ;
            
            graphics.save();
            
            graphics.fillStyle      = this.fillStyle;
            graphics.strokeStyle    = this.strokeStyle;
            graphics.globalAlpha    = this.alpha;
            graphics.globalCompositeOperation = this.blendMode;
            
            // 座標計算
            /*
            this._matrix.identity();
            this._matrix.translate(this.x, this.y);
            this._matrix.rotateZ(this.rotation*Math.DEG_TO_RAD);
            this._matrix.scale(this.scaleX, this.scaleY);
            
            graphics.setTransform(
                this._matrix.m00, this._matrix.m10,
                this._matrix.m01, this._matrix.m11,
                this._matrix.m02, this._matrix.m12
            );
            /**/
            
            graphics.translate(this.x, this.y);
            graphics.rotate(this.rotation*Math.PI/180);
            graphics.scale(this.scaleX, this.scaleY);
            /**/
            
            this.draw(graphics);
            
            // 子供達も実行
            if (this.children.length > 0) {
                var tempChildren = this.children.slice();
                for (var i=0,len=tempChildren.length; i<len; ++i) {
                    tempChildren[i]._draw(graphics);
                }
                // this.execChildren(arguments.callee, graphics);
            }
            
            graphics.restore();
        },
        
        
        _checkEvent: function(check_func, event_name) {
            
            if (check_func(this) === true) {
                this.eventFlags[event_name] = true;
                if (this[event_name]) this[event_name]();
            }
            else {
                this.eventFlags[event_name] = false;
            }
            
            for (var i=0; i<this.children.length; ++i) {
                this.children[i]._checkEvent(check_func, event_name);
            }
        }
        
        
    });
    
    
    /**
     * @property    x
     * x座標値
     */
    tm.app.CanvasElement.prototype.accessor("x", {
        "get": function()   { return this.position.x; },
        "set": function(v)  { this.position.x = v; }
    });
    
    /**
     * @property    y
     * y座標値
     */
    tm.app.CanvasElement.prototype.accessor("y", {
        "get": function()   { return this.position.y; },
        "set": function(v)  { this.position.y = v; }
    });
    
    /**
     * @property    rotate
     * 回転値(削除予定)
     */
    tm.app.CanvasElement.prototype.accessor("rotate", {
        "get": function()   { return this.rotation; },
        "set": function(v)  { this.rotation = v; }
    });
    
    /**
     * @property    scaleX
     * スケールX値
     */
    tm.app.CanvasElement.prototype.accessor("scaleX", {
        "get": function()   { return this.scale.x; },
        "set": function(v)  { this.scale.x = v; }
    });
    
    /**
     * @property    scaleY
     * スケールY値
     */
    tm.app.CanvasElement.prototype.accessor("scaleY", {
        "get": function()   { return this.scale.y; },
        "set": function(v)  { this.scale.y = v; }
    });
    
    
    /**
     * @property    radius
     * 半径
     */
    tm.app.CanvasElement.prototype.accessor("radius", {
        "get": function()   { return this._radius || (this.width+this.height)/4; },
        "set": function(v)  { this._radius = v; }
    });
    
    
    
    
})();


/*
 * sprite.js
 */


tm.app = tm.app || {};


(function() {
    
    /**
     * @class
     * Sprite
     */
    tm.app.Sprite = tm.createClass({
        
        superClass: tm.app.CanvasElement,
        
        originX: 0.5,
        originY: 0.5,
        
        /**
         * 初期化
         */
        init: function(width, height, texture)
        {
            this.superInit();
            
            this.width  = width;
            this.height = height;
            
            this.canvas = tm.graphics.Canvas();
            this.canvas.width = width;
            this.canvas.height= height;
            if (texture) { this.setImage(texture); }
            
            this.srcRect = {
                x: 0,
                y: 0,
                width: width,
                height: height,
            };
        },
        
        /**
         * 描画
         */
        draw: function(canvas) {
            var srcRect = this.srcRect;
            canvas.drawImage(this.canvas.canvas,
                srcRect.x, srcRect.y, srcRect.width, srcRect.height,
                -this.width*this.originX, -this.height*this.originY, this.width, this.height);
            return ;
            canvas.drawImage(this.canvas.canvas, 0, 0, this.width, this.height);
            return ;
        },
        
        setImage: function(texture) {
            this.canvas.drawImage(texture.element, 0, 0, this.width, this.height);
        },
    });
    
})();


/*
 * label.js
 */

tm.app = tm.app || {};


(function() {
    
    /**
     * @class
     * Label
     */
    tm.app.Label = tm.createClass({
        
        superClass: tm.app.CanvasElement,
        
        /**
         * 塗りつぶしフラグ
         */
        fill: true,
        /**
         * ストロークフラグ
         */
        stroke: false,
        debugBox: false,
        
        /**
         * 初期化
         */
        init: function(text, size) {
            this.superInit();
            
            this.text       = text || "HOGE";
            this.size       = size || 24;
            this.font       = "'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            this.align      = "start";
            this.baseline   = "alphabetic";
        },
        
        /**
         * 描画
         */
        draw: function(canvas) {
            canvas.setText(this.fontStyle, this.align, this.baseline);
            if (this.fill) {
                canvas.fillText(this.text, 0, 0, this.width);
            }
            if (this.stroke) {
                canvas.strokeText(this.text, 0, 0, this.width);
            }
            
            if (this.debugBox) {
                canvas.strokeRect(0, 0, this.width, -this.size);
            }
        },
        
        _updateFont: function() {
            this.fontStyle = "{size}px {font}".format(this);
        }
        
    });
    
    
        
    /**
     * @property    size
     * サイズ
     */
    tm.app.Label.prototype.accessor("size", {
        "get": function() { return this._size; },
        "set": function(v){ this._size = v; this._updateFont(); }
    });
    
        
    /**
     * @property    font
     * フォント
     */
    tm.app.Label.prototype.accessor("font", {
        "get": function() { return this._font; },
        "set": function(v){ this._font = v; this._updateFont(); }
    });
    
})();



/*
 * scene.js
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * シーンとして使用するゲームエレメントクラス
     */
    tm.app.Scene = tm.createClass({
        
        superClass: tm.app.CanvasElement,
        
        /**
         * 初期化
         */
        init: function() {
            this.superInit();
            
            // タッチに反応させる
            this.interaction;
        },
        
        isHitPoint: function() { return true; },
    });
    
    tm.app.StartScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function() {
            this.superInit();
            
        },
        
        onenter: function(e) {
            var label = tm.app.Label("Start");
            label.x = e.app.canvas.width/2;
            label.y = e.app.canvas.height/2;
            label.width = e.app.canvas.width;
            label.align     = "center";
            label.baseline  = "middle";
            this.addChild(label);
            
            // 幅高さをセット
            this.width  = e.app.canvas.width;
            this.height = e.app.canvas.height;
            
            this.app = e.app;
        },
    });
    
    
    tm.app.EndScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function() {
            this.superInit();
        },
        
        onenter: function(e) {
            var label = tm.app.Label("end");
            label.x = e.app.canvas.width/2;
            label.y = e.app.canvas.height/2;
            label.width = e.app.canvas.width;
            label.align     = "center";
            label.baseline  = "middle";
            this.addChild(label);
            
            // 幅高さをセット
            this.width  = e.app.canvas.width;
            this.height = e.app.canvas.height;
            
            this.app = e.app;
        },
    });
    
})();


/*
 * 
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * キャンバスアプリケーション
     */
    tm.app.CanvasApp = tm.createClass({
        
        element     : null,
        canvas      : null,
        mouse       : null,
        touch       : null,
        pointing    : null,
        keyboard    : null,
        stats       : null,
        frame       : 0,
        fps         : 30,
        background  : null,

        _scenes      : null,
        _sceneIndex  : 0,
        
        /**
         * 初期化
         */
        init: function(canvas)
        {
            if (canvas instanceof HTMLCanvasElement) {
                this.element = canvas;
            }
            else if (typeof canvas == "string") {
                this.element = document.querySelector(canvas);
            }
            else {
                this.element = document.createElement("canvas");
                document.body.appendChild(this.element);
            }
            // グラフィックスを生成
            this.canvas = tm.graphics.Canvas(this.element);
            
            // マウスを生成
            this.mouse      = tm.input.Mouse(this.element);
            // タッチを生成
            this.touch      = tm.input.Touch(this.element);
            // キーボードを生成
            this.keyboard   = tm.input.Keyboard();
            
            // ポインティングをセット(PC では Mouse, Mobile では Touch)
            this.pointing   = (tm.isMobile) ? this.touch : this.mouse;
            
            // カラー
            this.background = "black";
            
            // シーン周り
            this._scenes = [ tm.app.Scene() ];
            this._sceneIndex = 0;
        },
        
        resize: function(width, height) {
            this.width = width;
            this.height= height;
            
            return this;
        },
        
        resizeWindow: function() {
            this.width = innerWidth;
            this.height= innerHeight;
            
            return this;
        },
        
        /**
         * 画面にフィットさせる
         */
        fitWindow: function(everFlag) {
            
            if (everFlag === undefined) {
                everFlag = true;
            }
            
            var self = this;
            var _fitFunc = function() {
                var element = self.element;
                var style   = element.style;
                style.position = "absolute";
                style.left = "0px";
                style.top  = "0px";
                
                var rateWidth = element.width/window.innerWidth;
                var rateHeight= element.height/window.innerHeight;
                var rate = element.height/element.width;
                
                if (rateWidth > rateHeight) {
                    style.width  = innerWidth+"px";
                    style.height = innerWidth*rate+"px";
                }
                else {
                    style.width  = innerHeight/rate+"px";
                    style.height = innerHeight+"px";
                }
            }
            
            // 一度実行しておく
            _fitFunc();
            // リサイズ時のリスナとして登録しておく
            if (everFlag) {
                window.addEventListener("resize", _fitFunc, false);
            }
            
            // マウスとタッチの座標更新関数をパワーアップ
            this.mouse._mousemove = this.mouse._mousemoveScale;
            this.touch._touchmove = this.touch._touchmoveScale;
        },
        
        /**
         * 実行
         */
        run: function()
        {
            var self = this;
            tm.setLoop(function(){ self._loop(); }, 1000/self.fps);
        },
        
        _loop: function()
        {
            // update
            if (this.update) this.update();
            this._update();
            ++this.frame;
            
            // draw
            if (this.draw) this.draw();
            this._draw();
            
            // stats update
            if (this.stats) this.stats.update();
        },
        
        /**
         * シーンを切り替える
         * ## Reference
         * - <http://ameblo.jp/hash-r-1234/entry-10967942550.html>
         */
        replaceScene: function(scene)
        {
            var e = null;
            if (this.currentScene) {
                e = tm.app.Event("exit");
                e.app = this;
                this.currentScene.dispatchEvent(e);
            }
            e = tm.app.Event("enter");
            e.app = this;
            this.currentScene = scene;
            this.currentScene.dispatchEvent(e);
        },
        
        /**
         * シーンをプッシュする
         * ポーズやオブション画面などで使用する
         */
        pushScene: function(scene)
        {
            e = tm.app.Event("exit");
            e.app = this;
            this.currentScene.dispatchEvent(e);
            
            this._scenes.push(scene);
            ++this._sceneIndex;
            
            e = tm.app.Event("enter");
            e.app = this;
            scene.dispatchEvent(e);
        },
        
        /**
         * シーンをポップする
         * ポーズやオブション画面などで使用する
         */
        popScene: function()
        {
            var scene = this._scenes.pop(scene);
            --this._sceneIndex;
            
            e = tm.app.Event("exit");
            e.app = this;
            scene.dispatchEvent(e);
            
            // 
            e = tm.app.Event("enter");
            e.app = this;
            this.currentScene.dispatchEvent(e);
            
            return scene;
        },
        
        enableStats: function() {
            if (window.Stats) {
                // Stats
                this.stats = new Stats();
                // 右上に設定
                this.stats.getDomElement().style.position = "fixed";
                this.stats.getDomElement().style.left     = "5px";
                this.stats.getDomElement().style.top      = "5px";
                document.body.appendChild(this.stats.getDomElement());
            }
            else {
                console.error("not defined stats.");
            }
        },
        
        enableDatGUI: function() {
            if (window.dat) {
                var gui = new dat.GUI();
                
                return gui;
            }
        },
        
        _update: function()
        {
            // デバイス系 Update
            this.mouse.update();
            this.keyboard.update();
            this.touch.update();
            
            this.currentScene._update(this);
        },
        
        _draw: function()
        {
            this.canvas.clearColor(this.background, 0, 0);
            
            this.canvas.fillStyle   = "white";
            this.canvas.strokeStyle = "white";
            this.currentScene._draw(this.canvas);
        },
        
    });
    
    
    /**
     * @property    width
     * 幅
     */
    tm.app.CanvasApp.prototype.accessor("width", {
        "get": function()   { return this.canvas.width; },
        "set": function(v)  { this.canvas.width = v; }
    });
    
    /**
     * @property    height
     * 高さ
     */
    tm.app.CanvasApp.prototype.accessor("height", {
        "get": function()   { return this.canvas.height; },
        "set": function(v)  { this.canvas.height = v; }
    });
    
    /**
     * @property    currentScene
     * カレントシーン
     */
    tm.app.CanvasApp.prototype.accessor("currentScene", {
        "get": function() { return this._scenes[this._sceneIndex]; },
        "set": function(v){ this._scenes[this._sceneIndex] = v; }
    });
    
})();


/*
 * scene.js
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * イベントクラス
     */
    tm.app.Event = tm.createClass({
        
        /**
         * タイプ
         */
        type: null,
        
        /**
         * 初期化
         */
        init: function(type) {
            this.type = type;
        },
        
    });
    
})();


/*
 * interactive.js
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * インタラクティブクラス
     */
    tm.app.Interaction = tm.createClass({
        
        hitFlag: false,
        downFlag: false,
        
        init: function(element) {
            this.element = element;
        },
        
        update: function(app) {
            var elm = this.element;
            var p   = app.pointing;
            
            var prevHitFlag = this.hitFlag;
            
            this.hitFlag   = elm.isHitPoint(p.x, p.y);
            
            if (!prevHitFlag && this.hitFlag) {
                elm.dispatchEvent(tm.app.Event("mouseover"));
            }
            
            if (prevHitFlag && !this.hitFlag) {
                elm.dispatchEvent(tm.app.Event("mouseout"));
            }
            
            if (this.hitFlag) {
                if (p.getPointingStart()) {
                    elm.dispatchEvent(tm.app.Event("mousedown"));
                    this.downFlag = true;
                }
                
                elm.dispatchEvent(tm.app.Event("mousemove"));
            }
            
            if (this.downFlag==true && p.getPointingEnd()) {
                elm.dispatchEvent(tm.app.Event("mouseup"));
                this.downFlag = false;
            }
        },
        
    });
    
    
    /**
     * @member      tm.app.Element
     * @property    interaction
     * インタラクション
     */
    tm.app.Element.prototype.getter("interaction", function() {
        if (!this._interaction) {
            this._interaction = tm.app.Interaction(this);
            this.addEventListener("enterframe", function(e){
                this._interaction.update(e.app);
            });
        }
        
        return this._interaction;
    });
    
})();








/*
 * collision.js
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * 衝突管理クラス
     */
    tm.app.Collision = tm.createClass({
        
        collideList: null,
        
        /**
         * 初期化
         */
        init: function(elm) {
            this.element = elm;
            this.collideList = [];
        },
        
        /**
         * @method
         * 更新
         */
        update: function(app) {
            var cl  = this.collideList.clone();
            var elm = this.element;
            
            for (var i=0,len=cl.length; i<len; ++i) {
                var c = cl[i];
                if (elm.isHitElement(c.element)) {
                    // 最初の衝突だった場合は collisionenter を呼ぶ
                    if (c.collide === false) {
                        var e = tm.app.Event("collisionenter");
                        e.other = c.element;
                        elm.dispatchEvent(e);
                    }
                    // 通常の衝突イベント
                    var e = tm.app.Event("collisionstay");
                    e.other = c.element;
                    elm.dispatchEvent(e);
                    
                    c.collide = true;
                }
                else {
                    if (c.collide == true) {
                        var e = tm.app.Event("collisionexit");
                        e.other = c.element;
                        elm.dispatchEvent(e);
                    }
                    c.collide = false;
                }
            }
        },
        
        /**
         * 追加
         */
        add: function(elm) {
            this.collideList.push({
                element: elm,
                collide: false,
            });
        },
        
        /**
         * 削除
         */
        remove: function(elm) {
            this.collideList.eraseIf(function(v) {
                return v.element == elm;
            });
        },
        
    });
    
    
    /**
     * @member      tm.app.Element
     * @property    collision
     * コリジョン
     */
    tm.app.Element.prototype.getter("collision", function() {
        if (!this._collision) {
            this._collision = tm.app.Collision(this);
            this.addEventListener("enterframe", function(e){
                this._collision.update(e.app);
            });
        }
        
        return this._collision;
    });
    
    
})();

/*
 * anim.js
 */

tm.app = tm.app || {};



(function() {
    
    /**
     * @class
     * インタラクティブキャンバスクラス
     */
    tm.app.Anim = tm.createClass({
        
        isAnimation: false,
        
        /**
         * 初期化
         */
        init: function(elm) {
            this.element    = elm;
            this.tweens     = [];
        },
        
        /**
         * @method
         * 更新
         */
        update: function(app) {
            var tweens = this.tweens.clone();
            for (var i=0,len=tweens.length; i<len; ++i) {
                var tween = tweens[i];
                tween.time += 1000/app.fps;
                
                if (tween.time > tween.duration) {
                    tween.time = tween.duration;
                    tween.update();
                    tween.dispatchEvent("finish");
                    this.tweens.erase(tween);
                    
                    // 全てのアニメーション終了チェック
                    if (this.tweens.length <= 0) {
                        this.isAnimation = false;
                        var e = tm.app.Event("animationend");
                        this.element.dispatchEvent(e);
                    }
                }
                else {
                    tween.update();
                }
            }
        },
        
        addTween: function(param) {
            if (!param.target) param.target = this.element;
            
            var tween = tm.anim.Tween(param);
            this.tweens.push(tween);
            
            if (this.isAnimation == false) {
                this.isAnimation = true;
                var e = tm.app.Event("animationstart");
                this.element.dispatchEvent(e);
            }
            
            return tween;
        },
        
    });
    
    
    /**
     * @property    anim
     * アニメーション
     */
    tm.app.Element.prototype.getter("anim", function() {
        if (!this._anim) {
            this._anim = tm.app.Anim(this);
            this.addEventListener("enterframe", function(e){
                this._anim.update(e.app);
            });
        }
        
        return this._anim
    });
    
})();

/*
 * sound.js
 */

tm.sound = tm.sound || {};


(function() {
    
    tm.sound.globalVolume = 1.0;
    
})();


(function() {
    
    /**
     * @class
     * サウンドクラス
     */
    tm.sound.Sound = tm.createClass({
        
        element     : null,
        loaded      : false,
        isPlay      : false,
        
        /**
         * 初期化
         */
        init: function(src) {
            this.element = new Audio();
            this.element.src = src;
            this.element.load();
            this.element.setAttribute("preload", "auto");
            
            var self = this;
            this.element.addEventListener("canplaythrough", function(){
                self.loaded = true;
            });
            this.element.addEventListener("ended", function(){
                self.isPlay = false;
            });
            this.element.addEventListener("error", function(){
                console.warn(this.src + "の読み込みに失敗しました");
            });
            
            this.element.volume = 1.0;
            
            //? モバイル系は音が不安定なので一時対応
            if (tm.isMobile) {
                this.loaded = true;
            }
        },
        
        /**
         * 再生
         */
        play: function() {
            this.element.play();
            this.isPlay = true;
            return this;
        },
        
        /**
         * 停止
         */
        stop: function() {
            this.element.stop();
            this.isPlay = false;
            return this;
        },
        
        /**
         * クローン
         */
        clone: function() {
            return TM.App.Sound( this.element.src );
        },
        
    });
    
    
    
    /**
     * @property    volume
     * ボリューム
     */
    tm.sound.Sound.prototype.accessor("volume", {
        "get": function() { return this.element.volume; },
        "set": function(v){ this.element.volume = v; }
    });
    
    
    if ((new Audio()).loop !== undefined) {
    
        /**
         * @property    loop
         * ループフラグ
         */
        tm.sound.Sound.prototype.accessor("loop", {
            "get": function() { return this.element.loop; },
            "set": function(v){ this.element.loop = v; }
        });
    }
    // firefox 対応
    else {
        var onLoopFunc = function() {
            this.play();
        }
        tm.sound.Sound.prototype.accessor("loop", {
            "get": function() { return this.element.loop; },
            "set": function(v){
                // ループが false の状態で ture が来た場合ループ用関数を登録する
                if (this.element.loop != true && v == true) {
                    this.element.addEventListener("ended", onLoopFunc, false);
                }
                // 関数が登録されていて false が設定された場合ループ用関数を解除する
                else if (this.element.loop == true && v == false) {
                    this.element.removeEventListener("ended", onLoopFunc, false);
                }
                this.element.loop = v;
            }
        });
    }
    
    
    /**
     * @static
     * @property    SUPPORT_EXT
     * サポートしている拡張子
     */
    tm.sound.Sound.SUPPORT_EXT = (function(){
        var ext     = "";
        var audio   = new Audio();
        
        if      (audio.canPlayType("audio/ogg") == 'maybe') { ext="ogg"; }
        else if (audio.canPlayType("audio/mp3") == 'maybe') { ext="mp3"; }
        else if (audio.canPlayType("audio/wav") == 'maybe') { ext="wav"; }
        
        return ext;
    })();
    
})();


(function(){
    
    //? モバイル系ブラウザ対応
    var DEFAULT_CACHE_NUM = (tm.isMobile) ? 1 : 4;
    
    /**
     * @class   サウンドマネージャクラス
     * サウンドを管理するクラス
     */
    tm.sound.SoundManager = {
        sounds: {}
    };
    
    /**
     * @static
     * @method
     * サウンドを追加
     */
    tm.sound.SoundManager.add = function(name, src, cache) {
        cache = cache || DEFAULT_CACHE_NUM;
        
        // 拡張子チェック
        if (src.split('/').at(-1).indexOf('.') == -1) {
            src += "." + tm.sound.Sound.SUPPORT_EXT;
        }
        
        var cacheList = this.sounds[name] = [];
        for (var i=0; i<cache; ++i) {
            var sound = tm.sound.Sound(src);
            cacheList.push( sound );
        }
        
        return this;
    };
    

    
    /**
     * @static
     * @method
     * サウンドを取得
     */
    tm.sound.SoundManager.get = function(name) {
        var cacheList = this.sounds[name];
        for (var i=0,len=cacheList.length; i<len; ++i) {
            if (cacheList[i].isPlay == false) {
                return cacheList[i];
            }
        }
        // 仕方なく0番目を返す
        return cacheList[0];
    };
    
    
    /**
     * @static
     * @method
     * サウンドを取得(index 指定版)
     */
    tm.sound.SoundManager.getByIndex = function(name, index) {
        return this.sounds[name][index];
    };
    
    /**
     * @static
     * @method
     * サウンドを削除
     */
    tm.sound.SoundManager.remove = function(name) {
        // TODO:
        
        return this;
    };
    
    /**
     * @static
     * @method
     * ボリュームをセット
     */
    tm.sound.SoundManager.setVolume = function(name, volume) {
        // TODO:
        
        return this;
    };
    
    
    
    /**
     * ロードチェック
     */
    tm.sound.SoundManager.isLoaded = function()
    {
        for (var key in this.sounds) {
            var soundList = this.sounds[key];
            
            for (var i=0,len=soundList.length; i<len; ++i) {
                if (soundList[i].loaded == false) {
                    return false;
                }
            }
        }
        return true;
    };
    
    tm.addLoadCheckList(tm.sound.SoundManager);
    
})();

