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
                this.getLocationState = function (query) {
                    if (query && query['categoryId'] !== undefined) {
                        var categoryId = parseInt(query['categoryId']);
                        if (categoryId) {
                            return categoryId;
                        }
                    }
                    return 0;
                };
                this.handelActions = function (action) {
                    switch (action.actionType) {
                        case CategoryActionID[CategoryActionID.Change]:
                            _this.selectCategory(action.category);
                            break;
                    }
                };
                this.initCategories();
                NgAuctions.Services.LocationService.on(NgAuctions.Services.LocationServiceEventID[NgAuctions.Services.LocationServiceEventID.Changed], function (query) { return _this.selectCategory(_this.getLocationState(query)); });
                NgAuctions.Services.LocationService.on(NgAuctions.Services.LocationServiceEventID[NgAuctions.Services.LocationServiceEventID.Popped], function (query) { return _this.selectCategory(_this.getLocationState(query), false); });
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
                if (!this.selectedCategory) {
                    this.selectCategory(0);
                }
            };
            CategoriesStoreStatic.prototype.selectCategory = function (categoryID, addToHistory) {
                if (addToHistory === void 0) { addToHistory = true; }
                if (this.selectedCategory && this.selectedCategory.Id === categoryID) {
                    return;
                }
                this.selectedCategory = this.categories[categoryID];
                if (addToHistory) {
                    categoryID > 0 && categoryID < this.categories.length ?
                        NgAuctions.Services.LocationService.add('categoryId', categoryID.toString(), false) :
                        NgAuctions.Services.LocationService.clear(false);
                }
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