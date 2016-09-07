System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Util;
    return {
        setters:[],
        execute: function() {
            Util = (function () {
                function Util() {
                }
                Util.IsNullUndefinedOrEmpty = function (input) {
                    if (typeof input !== "string") {
                        return true;
                    }
                    return input === '';
                };
                Util.EmptyIfNull = function (input) {
                    if (typeof input !== "string") {
                        return '';
                    }
                    return input;
                };
                Util.startsWith = function (myString, prefix) {
                    return myString.slice(0, prefix.length) === prefix;
                };
                Util.compareCaseInsensitive = function (str1, str2) {
                    if (typeof str1 !== "string" || typeof str2 != "string") {
                        return false;
                    }
                    else {
                        return str1.toUpperCase() === str2.toUpperCase();
                    }
                };
                Util.NullOrUndefined = function (obj) {
                    if (obj === null) {
                        return true;
                    }
                    if (typeof obj === "undefined") {
                        return true;
                    }
                    return false;
                };
                Util.s4 = function () {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                };
                Util.Guid = function () {
                    return Util.s4() + Util.s4() + '-' + Util.s4() + '-' + Util.s4() + '-' +
                        Util.s4() + '-' + Util.s4() + Util.s4() + Util.s4();
                };
                Util.Format = function (input, replace) {
                    return input.replace(/{(\d+)}/g, function (match, number) {
                        return typeof replace[number] != 'undefined' ? replace[number] : match;
                    });
                };
                Util.pad = function (n) {
                    return (n < 10) ? ("0" + n.toString()) : n.toString();
                };
                Util.FormatDate = function (input) {
                    var date = new Date(input);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    return year + "-" + Util.pad(month) + "-" + Util.pad(day) + " " + Util.pad(hour) + ":" + Util.pad(minute);
                };
                Util.Modulo = function (n, k) {
                    return ((n % k) + k) % k;
                };
                Util.shift = function (arr, k) {
                    k = k % arr.length;
                    while (k-- > 0) {
                        var tmp = arr[0];
                        for (var i = 1; i < arr.length; i++)
                            arr[i - 1] = arr[i];
                        arr[arr.length - 1] = tmp;
                    }
                };
                Util.arrayUnique = function (a) {
                    return a.reduce(function (p, c) {
                        if (p.indexOf(c) < 0)
                            p.push(c);
                        return p;
                    }, []);
                };
                Util.endsWith = function (input, suffix) {
                    return input.indexOf(suffix, input.length - suffix.length) !== -1;
                };
                Util.arrayMin = function (array) {
                    return Math.min.apply(Math, array);
                };
                Util.arrayMinAndIndex = function (array) {
                    var minValue = Number.MAX_VALUE;
                    var minIndex = -1;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] < minValue) {
                            minValue = array[i];
                            minIndex = i;
                        }
                    }
                    return { minIndex: minIndex, minValue: minValue };
                };
                Util.arrayMax = function (array) {
                    return Math.max.apply(Math, array);
                };
                Util.extend = function (array1, array2) {
                    array2.forEach(function (v) { array1.push(v); });
                };
                Util.extendBeg = function (array1, array2) {
                    array2.slice().reverse().forEach(function (v) { array1.unshift(v); });
                };
                Util.clone = function (item) {
                    if (!item) {
                        return item;
                    }
                    var types = [Number, String, Boolean], result;
                    types.forEach(function (type) {
                        if (item instanceof type) {
                            result = type(item);
                        }
                    });
                    if (typeof result == "undefined") {
                        if (Object.prototype.toString.call(item) === "[object Array]") {
                            result = [];
                            item.forEach(function (child, index, array) {
                                result[index] = Util.clone(child);
                            });
                        }
                        else if (typeof item == "object") {
                            if (item.nodeType && typeof item.cloneNode == "function") {
                                var result = item.cloneNode(true);
                            }
                            else if (!item.prototype) {
                                if (item instanceof Date) {
                                    result = new Date(item);
                                }
                                else {
                                    result = {};
                                    for (var i in item) {
                                        result[i] = Util.clone(item[i]);
                                    }
                                }
                            }
                            else {
                                if (false && item.constructor) {
                                    result = new item.constructor();
                                }
                                else {
                                    result = item;
                                }
                            }
                        }
                        else {
                            result = item;
                        }
                    }
                    return result;
                };
                return Util;
            }());
            exports_1("Util", Util);
        }
    }
});
//# sourceMappingURL=../../../ClientApps/Util/Util.js.map