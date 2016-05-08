var NgAuctions;
(function (NgAuctions) {
    var Utiles;
    (function (Utiles) {
        var DateUtilesStatic = (function () {
            function DateUtilesStatic() {
            }
            DateUtilesStatic.prototype.getFormattedCountDown = function (endTime) {
                var diffTime = moment.utc(endTime).diff(moment());
                var duration = moment.duration(diffTime);
                return Math.floor(duration.asHours()) + "h " + Math.floor(duration.asMinutes()) % 60 + "m ";
            };
            return DateUtilesStatic;
        }());
        Utiles.DateUtiles = new DateUtilesStatic();
    })(Utiles = NgAuctions.Utiles || (NgAuctions.Utiles = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=dateUtiles.js.map