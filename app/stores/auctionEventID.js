var NgAuctions;
(function (NgAuctions) {
    var Stores;
    (function (Stores) {
        (function (AuctionEventID) {
            AuctionEventID[AuctionEventID["Bid"] = 0] = "Bid";
            AuctionEventID[AuctionEventID["BidWasMade"] = 1] = "BidWasMade";
            AuctionEventID[AuctionEventID["Updated"] = 2] = "Updated";
            AuctionEventID[AuctionEventID["Deleted"] = 3] = "Deleted";
            AuctionEventID[AuctionEventID["Created"] = 4] = "Created";
        })(Stores.AuctionEventID || (Stores.AuctionEventID = {}));
        var AuctionEventID = Stores.AuctionEventID;
    })(Stores = NgAuctions.Stores || (NgAuctions.Stores = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctionEventID.js.map