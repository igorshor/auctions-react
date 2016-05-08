var NgAuctions;
(function (NgAuctions) {
    var Actions;
    (function (Actions) {
        var AuctionActionsStatic = (function () {
            function AuctionActionsStatic() {
            }
            AuctionActionsStatic.prototype.AuctionSelectToBid = function (auctionId) {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.AuctionActionID[Actions.AuctionActionID.SelectToBid],
                    auctionId: auctionId
                });
            };
            AuctionActionsStatic.prototype.AuctionsUpdate = function () {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.AuctionActionID[Actions.AuctionActionID.Update],
                });
            };
            AuctionActionsStatic.prototype.AuctionAdd = function (product) {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.AuctionActionID[Actions.AuctionActionID.Add],
                    product: product
                });
            };
            AuctionActionsStatic.prototype.AuctionBid = function (product) {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.AuctionActionID[Actions.AuctionActionID.Add],
                    product: product
                });
            };
            AuctionActionsStatic.prototype.AuctionDelete = function (auctionId) {
                NgAuctions.AppDispatcher.dispatch({
                    actionType: Actions.AuctionActionID[Actions.AuctionActionID.Delete],
                    auctionId: auctionId
                });
            };
            return AuctionActionsStatic;
        }());
        Actions.AuctionActions = new AuctionActionsStatic();
    })(Actions = NgAuctions.Actions || (NgAuctions.Actions = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctionActions.js.map