///<reference path="../../_references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgAuctions;
(function (NgAuctions) {
    var Components;
    (function (Components) {
        var Header = (function (_super) {
            __extends(Header, _super);
            function Header() {
                _super.apply(this, arguments);
            }
            Header.prototype.render = function () {
                return React.createElement("header", null, React.createElement("img", {src: "styles/images/logo.png"}), React.createElement("div", {className: "user-info"}, React.createElement("button", {className: "btn btn-base btn-base-small btn-base-small-color", "data-toggle": "modal", "data-target": "#saleModal"}, "SELL"), React.createElement(Components.SellForm, null), React.createElement("span", null, 'Igor Shor')));
            };
            return Header;
        }(React.Component));
        Components.Header = Header;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=header.js.map