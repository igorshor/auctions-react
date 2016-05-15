///<reference path="../../_references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgAuctions;
(function (NgAuctions) {
    var Stores;
    (function (Stores) {
        var AuctionActionID = NgAuctions.Actions.AuctionActionID;
        var AuctionStoreStatic = (function (_super) {
            __extends(AuctionStoreStatic, _super);
            function AuctionStoreStatic() {
                var _this = this;
                _super.call(this);
                this.handelActions = function (action) {
                    switch (action.actionType) {
                        case AuctionActionID[AuctionActionID.Update]:
                            _this.updateAuctions();
                            break;
                        case AuctionActionID[AuctionActionID.SelectToBid]:
                            _this.selectAuctionToBid(action.auctionId);
                            break;
                        case AuctionActionID[AuctionActionID.Delete]:
                            _this.deleteActionFromAuctions(action.auctionId);
                            break;
                        case AuctionActionID[AuctionActionID.Add]:
                            _this.addNewAction(action.product);
                            break;
                        case AuctionActionID[AuctionActionID.Bid]:
                            _this.makeBid(action.auctionId, action.bid);
                            break;
                    }
                };
                var intervalToken = setInterval(function () { return _this.updateAuctions(); }, 1000 * 60);
            }
            AuctionStoreStatic.prototype.selectAuctionToBid = function (auctionId) {
                var auctions = $
                    .grep(this.auctions, function (auction) { return auction.Id === auctionId; });
                if (auctions) {
                    this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Bid], { auction: auctions[0] });
                }
            };
            AuctionStoreStatic.prototype.updateAuctions = function () {
                var _this = this;
                NgAuctions.Services.NetService.getAuctions()
                    .then(function (updatedAuctions) {
                    _this.auctions = updatedAuctions;
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Updated]);
                });
            };
            AuctionStoreStatic.prototype.deleteActionFromAuctions = function (auctionId) {
                var _this = this;
                NgAuctions.Services.NetService.deleteAuction(auctionId)
                    .then(function () { return _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Deleted]); });
            };
            AuctionStoreStatic.prototype.addNewAction = function (product) {
                var _this = this;
                NgAuctions.Services.NetService.createAuction(product)
                    .then(function () { return _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Created]); });
            };
            AuctionStoreStatic.prototype.makeBid = function (auctionId, bid) {
                var _this = this;
                NgAuctions.Services.NetService.addBid(auctionId, bid)
                    .then(function () { return _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.BidWasMade]); });
            };
            return AuctionStoreStatic;
        }(NgAuctions.Utiles.EventEmitter));
        Stores.AuctionStoreStatic = AuctionStoreStatic;
        Stores.AuctionStore = new AuctionStoreStatic();
        NgAuctions.AppDispatcher.register(Stores.AuctionStore.handelActions);
    })(Stores = NgAuctions.Stores || (NgAuctions.Stores = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctionStore.js.map