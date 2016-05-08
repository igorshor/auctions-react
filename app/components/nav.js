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
        var CategoriesStore = NgAuctions.Stores.CategoryStore;
        var Nav = (function (_super) {
            __extends(Nav, _super);
            function Nav(props) {
                _super.call(this, props);
            }
            Nav.prototype.render = function () {
                var categories = CategoriesStore.categories.map(function (category) {
                    return React.createElement("li", {key: category.Id, className: "category"}, React.createElement(Components.Category, {categoryId: category.Id, categoryName: category.Name}));
                });
                return React.createElement("nav", null, React.createElement("ol", {className: "categories"}, categories));
            };
            return Nav;
        }(React.Component));
        Components.Nav = Nav;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=nav.js.map