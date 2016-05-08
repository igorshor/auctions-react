var NgAuctions;
(function (NgAuctions) {
    var Actions;
    (function (Actions) {
        var CategoryActionsStatic = (function () {
            function CategoryActionsStatic() {
            }
            CategoryActionsStatic.prototype.CategorySelect = function (category) {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.CategoryActionID[Actions.CategoryActionID.Change],
                    category: category
                });
            };
            return CategoryActionsStatic;
        }());
        Actions.CategoryActions = new CategoryActionsStatic();
    })(Actions = NgAuctions.Actions || (NgAuctions.Actions = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=categoryActions.js.map