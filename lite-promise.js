/**
 * Lightest Javascript promise library.
 * version 1.0
 * Author{{Vijay Singh}}
 * Email{{VijayTamar@live.in}}
 */

(function (context) {
    function Deferred() {
        this.promise = {};
    }
    Deferred.prototype.resolve = function (data) {
        this.promise.push(data);
    };
    Deferred.prototype.reject = function (data) {
        this.promise.hasError = true;
        this.promise.push(data);
    };

    /**
     * Defer class
     * @param {*} funcs: List of function which promise will call
     */
    function Defer(funcs) {
        var promises = [],
            taskDone = [],
            fullFilled = funcs.length,
            hasError = false,
            self = this;

        function pushPromiseData(i, args) {
            if (self.cancelled) {
                return;
            }
            taskDone[i] = args;
            hasError = this.hasError || hasError;
            fullFilled--;
            if (self.updateProgress) {
                self.updateProgress(i, args);
            }
            if (!fullFilled) {
                if (hasError) {
                    self.errorCall.apply({}, taskDone);
                } else {
                    self.successCall.apply({}, taskDone);
                }
            }
        }
        this.call = function (params) {
            var promise;
            for (var i = 0; i < funcs.length; i++) {
                if (params[i]) {
                    promise = funcs[i].apply(self, params[i]);
                } else {
                    promise = funcs[i]();
                }
                promise.push = pushPromiseData.bind(promise, i);
                promises.push(promise);
            }
        }
    };
    Defer.prototype.success = function (func) {
        this.successCall = func;
        return this;
    };
    Defer.prototype.error = function (func) {
        this.errorCall = func;
        return this;
    };
    Defer.prototype.progress = function (func) {
        this.updateProgress = func;
        return this;
    }
    Defer.prototype.cancel = function () {
        this.cancelled = true;
        return this;
    };
    Defer.prototype.params = function () {
        this.params = arguments;
        return this;
    }

    function when(args) {
        var defer = new Defer(args);
        setTimeout(function () {
            defer.call(defer.params);
        }, 0);
        return defer;
    }
    context.when = function () {
        return when(arguments);
    }
    context.Deferred = Deferred;
}(window));