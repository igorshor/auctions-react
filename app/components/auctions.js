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
        var Auctions = (function (_super) {
            __extends(Auctions, _super);
            function Auctions(props) {
                _super.call(this, props);
            }
            Auctions.prototype.componentWillMount = function () {
                var _this = this;
                NgAuctions.Stores.AuctionStore.on(NgAuctions.Stores.AuctionEventID[NgAuctions.Stores.AuctionEventID.Updated], function () {
                    _this.setState({
                        auctions: NgAuctions.Stores.AuctionStore.auctions,
                        selectedCategory: NgAuctions.Stores.CategoryStore.selectedCategory
                    });
                });
                NgAuctions.Stores.AuctionStore.on(NgAuctions.Stores.AuctionEventID[NgAuctions.Stores.AuctionEventID.Deleted], function () {
                    _this.setState({ auctions: NgAuctions.Stores.AuctionStore.auctions });
                });
                NgAuctions.Stores.CategoryStore.on(NgAuctions.Stores.CategoryEventID[NgAuctions.Stores.CategoryEventID.Changed], function () {
                    _this.setState({ selectedCategory: NgAuctions.Stores.CategoryStore.selectedCategory });
                });
                NgAuctions.Actions.AuctionActions.AuctionsUpdate();
            };
            Auctions.prototype.componentWillUnmount = function () {
            };
            Auctions.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
                return NgAuctions.Stores.AuctionStore.auctions ? true : false;
            };
            Auctions.prototype.render = function () {
                var auctions = this.getAuctions();
                return React.createElement("div", null, React.createElement("ol", {className: "products"}, auctions));
            };
            Auctions.prototype.getAuctions = function () {
                var _this = this;
                if (!NgAuctions.Stores.AuctionStore.auctions) {
                    return null;
                }
                return NgAuctions.Stores.AuctionStore.auctions
                    .filter(function (auction) {
                    if (!NgAuctions.Stores.CategoryStore || _this.state.selectedCategory.Id == 0) {
                        return true;
                    }
                    return _this.state.selectedCategory.Id === auction.Category.Id;
                })
                    .map(function (auction) {
                    return React.createElement("li", {key: auction.Id, className: "product"}, React.createElement(Components.Auction, {auction: auction}));
                });
            };
            return Auctions;
        }(React.Component));
        Components.Auctions = Auctions;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctions.js.map