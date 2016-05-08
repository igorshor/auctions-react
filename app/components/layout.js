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
        var Layout = (function (_super) {
            __extends(Layout, _super);
            function Layout() {
                _super.apply(this, arguments);
            }
            Layout.prototype.render = function () {
                return React.createElement("div", {className: "app-wrapper"}, React.createElement(Components.Header, null), React.createElement(Components.Nav, null), React.createElement(Components.Content, null), React.createElement(Components.Footer, null));
            };
            return Layout;
        }(React.Component));
        Components.Layout = Layout;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=layout.js.map