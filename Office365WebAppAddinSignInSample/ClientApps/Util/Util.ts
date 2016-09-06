export class Util {
    public static IsNullUndefinedOrEmpty(input: string): boolean {
        if (typeof input !== "string") {
            return true;
        }
        return input === '';
    }

    public static EmptyIfNull(input: string): string {
        if (typeof input !== "string") {
            return '';
        }
        return input;
    }

    public static startsWith(myString: string, prefix: string) {
        return myString.slice(0, prefix.length) === prefix;
    }

    public static compareCaseInsensitive(str1: string, str2: string): boolean {
        if (typeof str1 !== "string" || typeof str2 != "string") {
            return false;
        } else {
            return str1.toUpperCase() === str2.toUpperCase();
        }
    }

    public static NullOrUndefined(obj: any): boolean {
        if (obj === null) {
            return true;
        }
        if (typeof obj === "undefined") {
            return true;
        }
        return false;
    }

    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

  
    //Id genereated client side. Do not use it for server side purpose!
    //Not cryptographically secured!
    public static Guid(): string {
        return Util.s4() + Util.s4() + '-' + Util.s4() + '-' + Util.s4() + '-' +
            Util.s4() + '-' + Util.s4() + Util.s4() + Util.s4();
    }

    public static Format(input: string, replace: string[]): string {
        return input.replace(/{(\d+)}/g, (match, number) => {
            return typeof replace[number] != 'undefined' ? replace[number] : match;
        });
    }

    private static pad(n: number): string {
        return (n < 10) ? ("0" + n.toString()) : n.toString();
    }

    public static FormatDate(input: string): string {
        var date = new Date(input);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + Util.pad(month) + "-" + Util.pad(day) + " " + Util.pad(hour) + ":" + Util.pad(minute);
    }

   
    public static Modulo(n: number, k: number): number {
        return ((n % k) + k) % k;
    }

    private static shift(arr: string[], k: number): void {
        k = k % arr.length;
        while (k-- > 0) {
            var tmp = arr[0];
            for (var i = 1; i < arr.length; i++)
                arr[i - 1] = arr[i];
            arr[arr.length - 1] = tmp;
        }
    }

    public static arrayUnique<T>(a: T[]): T[] {
        return a.reduce(function (p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    }

    public static endsWith(input: string, suffix: string) {
        return input.indexOf(suffix, input.length - suffix.length) !== -1;
    }

    public static arrayMin(array: any[]): number {
        return Math.min.apply(Math, array);
    }

    public static arrayMinAndIndex(array: number[]): { minIndex: number, minValue: number } {
        var minValue = Number.MAX_VALUE;
        var minIndex = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i] < minValue) {
                minValue = array[i];
                minIndex = i;
            }
        }
        return { minIndex: minIndex, minValue: minValue };
    }

    public static arrayMax(array: any[]): number {
        return Math.max.apply(Math, array);
    }

    public static extend(array1: any[], array2: any[]): void {
        array2.forEach((v) => { array1.push(v) });
    }

    public static extendBeg(array1: any[], array2: any[]): void {
        array2.slice().reverse().forEach((v) => { array1.unshift(v) });
    }

    public static clone(item: any): any {
        if (!item) { return item; } // null, undefined values check

        var types = [Number, String, Boolean],
            result;

        // normalizing primitives if someone did new String('aaa'), or new Number('444');
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
            } else if (typeof item == "object") {
                // testing that this is DOM
                if (item.nodeType && typeof item.cloneNode == "function") {
                    var result = item.cloneNode(true);
                } else if (!item.prototype) { // check that this is a literal
                    if (item instanceof Date) {
                        result = new Date(item);
                    } else {
                        // it is an object literal
                        result = {};
                        for (var i in item) {
                            result[i] = Util.clone(item[i]);
                        }
                    }
                } else {
                    // depending what you would like here,
                    // just keep the reference, or create new object
                    if (false && item.constructor) {
                        // would not advice to do that, reason? Read below
                        result = new item.constructor();
                    } else {
                        result = item;
                    }
                }
            } else {
                result = item;
            }
        }

        return result;
    }
}