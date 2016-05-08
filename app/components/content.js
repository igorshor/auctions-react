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
        var CategoryStore = NgAuctions.Stores.CategoryStore;
        var Content = (function (_super) {
            __extends(Content, _super);
            function Content() {
                _super.apply(this, arguments);
            }
            Content.prototype.render = function () {
                var selectedCategoryName = CategoryStore.selectedCategory.Name;
                return React.createElement("div", {className: "content"}, React.createElement("div", {className: "category-label"}, React.createElement("span", null, selectedCategoryName)), React.createElement(Components.Auctions, null));
            };
            return Content;
        }(React.Component));
        Components.Content = Content;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=content.js.map