var fabric;
(function (fabric) {
    var SCROLL_FRAME_RATE = 33;
    var Animate = (function () {
        function Animate() {
        }
        Animate.transition = function (element, props) {
            var obj = { element: element, props: props, transformations: {} };
            Animate._animationObjects.push(obj);
            Animate._parseProperties(obj);
            Animate._createTransition(obj);
            setTimeout(Animate._setProperties, 0, obj);
            Animate._setCallback(obj);
        };
        Animate.animation = function (element, keyframes, props) {
            var obj = { element: element, keyframes: keyframes, props: props };
            Animate._animationObjects.push(obj);
            Animate._parseProperties(obj);
            Animate._createAnimation(obj);
            Animate._setCallback(obj);
        };
        Animate.scrollTo = function (element, props) {
            var obj = { element: element, props: props, step: 0 };
            Animate._setScrollProperties(obj);
            if (obj.props.delay) {
                setTimeout(Animate._animationObjects, obj.props.delay * 1000, obj);
            }
            else {
                Animate._animateScroll(obj);
            }
            Animate._animationObjects.push(obj);
        };
        Animate._setScrollProperties = function (obj) {
            obj.beginTop = obj.element.scrollTop;
            obj.change = obj.props.top - obj.beginTop;
            obj.props.duration = obj.props.duration * 1000;
        };
        Animate._parseProperties = function (obj) {
            var nonTweenProps = Animate._timeProps.concat(Animate._callbackProps);
            obj.tweenObj = {};
            for (var key in obj.props) {
                if (Animate._contains(nonTweenProps, key)) {
                    obj[key] = obj.props[key];
                }
                else {
                    obj.tweenObj[key] = obj.props[key];
                }
            }
        };
        Animate._animateScroll = function (obj) {
            var totalSteps = obj.props.duration / SCROLL_FRAME_RATE;
            var top = Animate._easeOutExpo(obj.step++, obj.beginTop, obj.change, totalSteps);
            obj.element.scrollTop = top;
            if (obj.step >= totalSteps) {
                obj.element.scrollTop = obj.props.top;
                Animate._executeCallback(obj.props);
                Animate._removeAnimationObject(obj);
            }
            else {
                setTimeout(function () {
                    requestAnimationFrame(function () {
                        Animate._animateScroll(obj);
                    });
                }, SCROLL_FRAME_RATE);
            }
        };
        Animate._createTransition = function (obj) {
            var duration = obj.duration || 0;
            var delay = obj.delay || 0;
            obj.element.style.transitionProperty = Animate._getTransitionProperties(obj.tweenObj);
            obj.element.style.transitionDuration = duration.toString() + "s";
            obj.element.style.transitionTimingFunction = obj.ease || "linear";
            obj.element.style.transitionDelay = delay.toString() + "s";
        };
        Animate._createAnimation = function (obj) {
            var duration = obj.duration || 0;
            var delay = obj.delay || 0;
            obj.element.style.animationName = obj.keyframes;
            obj.element.style.animationDuration = duration.toString() + "s";
            obj.element.style.animationTimingFunction = obj.ease || "linear";
            obj.element.style.animationDelay = delay.toString() + "s";
            obj.element.style.animationFillMode = "both";
        };
        Animate._getTransitionProperties = function (obj) {
            var hasTransform = false;
            var hasFilter = false;
            var properties = [];
            for (var key in obj) {
                if (Animate._contains(Animate._transformProps, key)) {
                    hasTransform = true;
                }
                else if (Animate._contains(Animate._filters, key)) {
                    hasFilter = true;
                }
                else {
                    properties.push(Animate._camelCaseToDash(key));
                }
            }
            if (hasTransform) {
                properties.push("transform");
            }
            if (hasFilter) {
                properties.push("-webkit-filter");
                properties.push("filter");
            }
            return properties.join(", ");
        };
        Animate._setProperties = function (obj) {
            for (var key in obj.tweenObj) {
                if (Animate._contains(Animate._transformProps, key)) {
                    Animate._setTransformValues(obj, key);
                }
                else if (Animate._contains(Animate._filters, key)) {
                    Animate._setFilterValues(obj, key);
                }
                else {
                    Animate._setRegularValues(obj, key);
                }
            }
            if (obj.transformations) {
                Animate._setTransformations(obj);
            }
        };
        Animate._setRegularValues = function (obj, key) {
            var value = obj.tweenObj[key];
            if (value.toString().indexOf("%") === -1) {
                value += (key !== "opacity") && (key !== "backgroundColor") && (key !== "boxShadow") ? "px" : "";
            }
            obj.element.style[key] = value;
        };
        Animate._setFilterValues = function (obj, key) {
            var value = obj.tweenObj[key];
            if (key === "hueRotate") {
                value = "(" + value + "deg)";
            }
            else {
                value = key === "blur" ? "(" + value + "px)" : "(" + value + "%)";
            }
            key = Animate._camelCaseToDash(key);
            obj.element.style.webkitFilter = key + value;
            obj.element.style.filter = key + value;
        };
        Animate._setTransformValues = function (obj, key) {
            if (/x|y|z|scaleX|scaleY|scaleZ|rotate|rotateX|rotateY|rotateZ|skewX|skewY/.test(key)) {
                obj.transformations[key] = obj.tweenObj[key];
            }
        };
        Animate._setTransformations = function (obj) {
            var rotate = "", scale = "", skew = "", translate = "";
            var trans = obj.transformations;
            translate += trans.x !== undefined && trans.x ? "translateX(" + trans.x + "px) " : "";
            translate += trans.y !== undefined && trans.y ? "translateY(" + trans.y + "px) " : "";
            translate += trans.z !== undefined && trans.z ? "translateZ(" + trans.z + "px) " : "";
            rotate += trans.rotate !== undefined && trans.rotate ? "rotate(" + trans.rotate + "deg) " : "";
            rotate += trans.rotateX !== undefined && trans.rotateX ? "rotateX(" + trans.rotateX + "deg) " : "";
            rotate += trans.rotateY !== undefined && trans.rotateY ? "rotate(" + trans.rotateY + "deg) " : "";
            rotate += trans.rotateZ !== undefined && trans.rotateZ ? "rotate(" + trans.rotateZ + "deg) " : "";
            scale += trans.scaleX !== undefined && trans.scaleX ? "scaleX(" + trans.scaleX + ") " : "";
            scale += trans.scaleY !== undefined && trans.scaleY ? "scaleY(" + trans.scaleY + ") " : "";
            scale += trans.scaleZ !== undefined && trans.scaleZ ? "scaleZ(" + trans.scaleZ + ") " : "";
            skew += trans.skewX !== undefined && trans.skewX ? "skewX(" + trans.skewX + "deg) " : "";
            skew += trans.skewY !== undefined && trans.skewY ? "skewY(" + trans.skewY + "deg) " : "";
            obj.element.style.transform = translate + rotate + scale + skew;
        };
        Animate._setCallback = function (obj) {
            obj.element.addEventListener("webkitTransitionEnd", Animate._complete, false);
            obj.element.addEventListener("transitionend", Animate._complete, false);
            obj.element.addEventListener("webkitAnimationEnd", Animate._complete, false);
            obj.element.addEventListener("animationend", Animate._complete, false);
        };
        Animate._complete = function (event) {
            event.target.removeEventListener("webkitTransitionEnd", Animate._complete);
            event.target.removeEventListener("transitionend", Animate._complete);
            event.target.removeEventListener("webkitAnimationEnd", Animate._complete);
            event.target.removeEventListener("animationend", Animate._complete);
            var obj = Animate._getAnimationObjByElement(event.target);
            Animate._executeCallback(obj);
            Animate._removeAnimationObject(obj);
        };
        Animate._getAnimationObjByElement = function (element) {
            var i = Animate._animationObjects.length;
            while (i--) {
                if (Animate._animationObjects[i].element === element) {
                    return Animate._animationObjects[i];
                }
            }
            return null;
        };
        Animate._removeAnimationObject = function (obj) {
            var i = Animate._animationObjects.length;
            while (i--) {
                if (Animate._animationObjects[i] === obj) {
                    Animate._animationObjects.splice(i, 1);
                }
            }
        };
        Animate._executeCallback = function (obj) {
            if (obj.onEnd) {
                var endArgs = obj.onEndArgs || [];
                obj.onEnd.apply(null, endArgs);
            }
        };
        Animate._contains = function (array, value) {
            var i = array.length;
            while (i--) {
                if (value === array[i]) {
                    return true;
                }
            }
            return false;
        };
        Animate._camelCaseToDash = function (value) {
            return value.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
        };
        Animate._easeOutExpo = function (time, begin, change, duration) {
            return (time === duration) ? begin + change : change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
        };
        Animate._transformProps = [
            "x",
            "y",
            "z",
            "scaleX",
            "scaleY",
            "scaleZ",
            "rotate",
            "rotateX",
            "rotateY",
            "rotateZ",
            "skewX",
            "skewY"
        ];
        Animate._filters = [
            "blur",
            "brightness",
            "contrast",
            "dropShadow",
            "grayscale",
            "hueRotate",
            "invert",
            "saturate",
            "sepia"
        ];
        Animate._timeProps = ["duration", "ease", "delay"];
        Animate._callbackProps = ["onEnd", "onEndArgs"];
        Animate._animationObjects = [];
        return Animate;
    }());
    fabric.Animate = Animate;
})(fabric || (fabric = {}));
