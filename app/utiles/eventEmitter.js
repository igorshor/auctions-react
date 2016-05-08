var NgAuctions;
(function (NgAuctions) {
    var Utiles;
    (function (Utiles) {
        var EventEmitter = (function () {
            function EventEmitter() {
                this.events = {};
            }
            EventEmitter.prototype.emit = function (name, args) {
                if (!this.events[name]) {
                    return;
                }
                var functions = this.events[name];
                functions.forEach(function (fn) { return fn(args); });
            };
            EventEmitter.prototype.on = function (name, fn) {
                if (this.events[name]) {
                    this.events[name].push(fn);
                    return;
                }
                this.events[name] = [fn];
            };
            EventEmitter.prototype.off = function (name, fn) {
                if (!this.events[name]) {
                    return;
                }
                if (!fn && this.events[name].length > 0) {
                    var index = this.events[name].indexOf(fn);
                    if (index > 0) {
                        this.events[name].splice(index, 1);
                    }
                    return;
                }
                this.events[name] = [];
            };
            return EventEmitter;
        }());
        Utiles.EventEmitter = EventEmitter;
    })(Utiles = NgAuctions.Utiles || (NgAuctions.Utiles = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=eventEmitter.js.map