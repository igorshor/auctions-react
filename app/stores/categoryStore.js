var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgAuctions;
(function (NgAuctions) {
    var Stores;
    (function (Stores) {
        var CategoryActionID = NgAuctions.Actions.CategoryActionID;
        var CategoriesStoreStatic = (function (_super) {
            __extends(CategoriesStoreStatic, _super);
            function CategoriesStoreStatic() {
                var _this = this;
                _super.call(this);
                this.categoriesNames = ['Electronics', 'Fashion', 'Home', 'Books', 'Children', 'Misc.'];
                this.defaultCategory = 'All Auctions';
                this.handelActions = function (action) {
                    switch (action.actionType) {
                        case CategoryActionID[CategoryActionID.Change]:
                            _this.selectCategory(action.category);
                            break;
                    }
                };
                this.initCategories();
            }
            CategoriesStoreStatic.prototype.getCategoryId = function (name) {
                return this.categoriesNames.indexOf(name) + 1;
            };
            CategoriesStoreStatic.prototype.getCategoryName = function (id) {
                return this.categoriesNames[id - 1];
            };
            CategoriesStoreStatic.prototype.initCategories = function () {
                this.categories = [
                    { Id: 0, Name: 'All Auctions' },
                    { Id: 1, Name: 'Electronics' },
                    { Id: 2, Name: 'Fashion' },
                    { Id: 3, Name: 'Home' },
                    { Id: 4, Name: 'Books' },
                    { Id: 5, Name: 'Children' },
                    { Id: 6, Name: 'Misc.' }];
                this.selectedCategory = this.categories[0];
            };
            CategoriesStoreStatic.prototype.selectCategory = function (categoryID) {
                this.selectedCategory = this.categories[categoryID];
                this.emit(Stores.CategoryEventID[Stores.CategoryEventID.Changed]);
            };
            return CategoriesStoreStatic;
        }(NgAuctions.Utiles.EventEmitter));
        Stores.CategoriesStoreStatic = CategoriesStoreStatic;
        Stores.CategoryStore = new CategoriesStoreStatic();
        NgAuctions.AppDispatcher.register(Stores.CategoryStore.handelActions);
    })(Stores = NgAuctions.Stores || (NgAuctions.Stores = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=categoryStore.js.map