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
        var Auction = (function (_super) {
            __extends(Auction, _super);
            function Auction() {
                var _this = this;
                _super.apply(this, arguments);
                this.openBidModal = function () {
                    NgAuctions.Actions.AuctionActions.AuctionSelectToBid(_this.props.auction.Id);
                };
                this.deleteAuctionBtn = function () {
                    NgAuctions.Actions.AuctionActions.AuctionDelete(_this.props.auction.Id);
                };
            }
            Auction.prototype.render = function () {
                var highestBid = this.props.auction.HighestBid ? this.props.auction.HighestBid.Bid : this.props.auction.StartBid;
                var bidCount = this.props.auction.BidCount > 0 ? (this.props.auction.BidCount + ' bids') : 'Be the first bidder';
                var timeLeft = NgAuctions.Utiles.DateUtiles.getFormattedCountDown(this.props.auction.EndTime);
                var isUserAuction = this.props.auction.User.Name === NgAuctions.Stores.UserStore.userName;
                var category = this.props.auction.Category.Name.toLowerCase().replace(' ', '-').replace('.', '');
                var mailTo = "mailto:" + this.props.auction.User.Email + "?Subject=SELL";
                var removeAuction = isUserAuction ?
                    React.createElement("div", {className: "product-remove-box", onClick: this.deleteAuctionBtn}, "X") : null;
                return React.createElement("div", null, removeAuction, React.createElement("div", {"data-role": "button", "data-toggle": "modal", "data-target": "#bidModal", onClick: this.openBidModal}, React.createElement("div", {className: "product-price-box"}, React.createElement("div", {className: "price"}, "ILS ", highestBid), React.createElement("div", {className: "price-description"}, bidCount)), React.createElement("div", {className: "product-top-block"}, React.createElement("img", {src: this.props.auction.Picture1})), React.createElement("div", {className: "product-bottom-block"}, React.createElement("div", {className: "product-info"}, React.createElement("div", {className: "product-description", "smart-ellipsis": true}, this.props.auction.Description), React.createElement("div", {className: "seller-info"}, "Seller:", React.createElement("a", {href: mailTo, target: "_blank"}, this.props.auction.User.Name, React.createElement("img", {src: "styles/images/email.png"})), React.createElement("div", {className: "date"}, timeLeft, " left"))), React.createElement("div", {className: "color-block color-" + category}))));
            };
            return Auction;
        }(React.Component));
        Components.Auction = Auction;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auction.js.map