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
        var BidForm = (function (_super) {
            __extends(BidForm, _super);
            function BidForm(props) {
                var _this = this;
                _super.call(this, props);
                this.placeBidClick = function () {
                };
                this.handleBidInputChange = function (event) {
                    var newBid = parseFloat(event.target.value).toFixed(2);
                    if (!newBid) {
                        return;
                    }
                    _this.setState({ HighestBid: { Bid: parseFloat(newBid) } });
                };
                this.state = NgAuctions.Stores.AuctionStore.auctions[0];
            }
            BidForm.prototype.componentWillMount = function () {
                var _this = this;
                NgAuctions.Stores.AuctionStore.on(NgAuctions.Stores.AuctionEventID[NgAuctions.Stores.AuctionEventID.Bid], function (data) {
                    _this.setState(data.auction);
                });
            };
            BidForm.prototype.render = function () {
                if (!this.state) {
                    return null;
                }
                var minBidValue = this.state.HighestBid ?
                    this.state.HighestBid.Bid : (this.state.StartBid + 0.01);
                var highestBid = parseFloat((minBidValue).toFixed(2));
                var timeLeft = NgAuctions.Utiles.DateUtiles.getFormattedCountDown(this.state.EndTime);
                var mailTo = "mailto:" + this.state.User.Email + "?Subject=SELL";
                var pictures = [];
                for (var i = 1; i <= 4; i++) {
                    if (this.state['Picture' + i]) {
                        var picUrl = this.state['Picture' + i];
                        if (picUrl !== "") {
                            pictures.push(picUrl);
                        }
                    }
                }
                return React.createElement(Components.Modal, {size: "md", modalId: "bidModal", wrapperClass: "bid-info", modalHeader: "Place Bid"}, React.createElement("div", {className: "modal-body"}, React.createElement("div", {className: "row bid-notification", hidden: true}, React.createElement("span", null, "Thank you")), React.createElement("div", {className: "row", hidden: false}, React.createElement("div", {className: "col-sm-5"}, React.createElement("div", {className: "carousel-pictures-container transformed-background"}), React.createElement(Components.PicturesCarousel, {pictures: pictures})), React.createElement("div", {className: "col-sm-7"}, React.createElement("form", {className: "form"}, React.createElement("div", {className: "row bid-title"}, this.state.Title), React.createElement("div", {className: "row bid-description txt-black"}, this.state.Description), React.createElement("div", {className: "txt-small"}, React.createElement("div", {className: "row row-standard-margin"}, React.createElement("img", {src: "styles/images/hour_glass.png"}), "Time Left: ", React.createElement("span", {className: "txt-black txt-bold"}, timeLeft)), React.createElement("div", {className: "row row-standard-margin"}, "Start auction bidding at: ", React.createElement("span", {className: "txt-black txt-bold"}, this.state.StartBid)), React.createElement("div", {className: "row biding-row"}, React.createElement("div", {className: "col-sm-5"}, React.createElement("input", {type: "number", className: "form-control", id: "bid", value: highestBid, min: highestBid, step: "0.01", onChange: this.handleBidInputChange, required: true})), React.createElement("div", {className: "col-sm-1"}, React.createElement("span", {className: "nis-label"}, "NIS")), React.createElement("div", {className: "col-sm-5"}, React.createElement("button", {type: "submit", disabled: "!bidForm.form.valid", className: "btn btn-base btn-base-small-color", onClick: this.placeBidClick}, "Place Bid"))), React.createElement("div", {className: "row"}, React.createElement("div", {className: "seller-info"}, "Seller:", React.createElement("a", {href: mailTo, target: "_blank"}, this.state.User.Name, React.createElement("img", {src: "styles/images/email.png"}))))))))), React.createElement("div", {className: "modal-footer bid-footer color-block color-" + this.state.Category.Name.toLowerCase()}));
            };
            return BidForm;
        }(React.Component));
        Components.BidForm = BidForm;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=bid-form.js.map