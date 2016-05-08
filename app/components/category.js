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
        var Category = (function (_super) {
            __extends(Category, _super);
            function Category(props) {
                var _this = this;
                _super.call(this, props);
                this.onCategoryClick = function () { return NgAuctions.Actions.CategoryActions.CategorySelect(_this.props.categoryId); };
                this.state = {
                    categoryHaveImage: this.props.categoryId > 0,
                    categorySelected: false
                };
            }
            Category.prototype.componentWillMount = function () {
                var _this = this;
                NgAuctions.Stores.CategoryStore.on(NgAuctions.Stores.CategoryEventID[NgAuctions.Stores.CategoryEventID.Changed], function () {
                    _this.setState({ categorySelected: NgAuctions.Stores.CategoryStore.selectedCategory.Id === _this.props.categoryId });
                });
            };
            Category.prototype.render = function () {
                var lowerCaseName = this.props.categoryName.toLowerCase().replace(' ', '-').replace('.', '');
                var upperCaseName = this.props.categoryName.toUpperCase();
                var categoryImage = this.state.categoryHaveImage ?
                    React.createElement("img", {src: "styles/images/" + lowerCaseName + ".png"}) : null;
                var categoryHoverImage = this.state.categoryHaveImage ?
                    React.createElement("img", {src: "styles/images/" + lowerCaseName + "_w.png"}) : null;
                return React.createElement("div", {className: this.state.categorySelected ? 'selected' : '', onClick: this.onCategoryClick}, React.createElement("div", {className: "color-block color-" + lowerCaseName}), React.createElement("div", {className: "category-details"}, categoryImage, upperCaseName), React.createElement("div", {className: "category-hover color-" + lowerCaseName}, categoryHoverImage));
            };
            return Category;
        }(React.Component));
        Components.Category = Category;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=category.js.map