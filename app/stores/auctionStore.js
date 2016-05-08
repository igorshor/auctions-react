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
                this.createFakeAuctions();
            }
            AuctionStoreStatic.prototype.getAuctions = function () {
                return Rx.Observable.fromArray(this.auctions);
            };
            AuctionStoreStatic.prototype.getAuction = function (id) {
                return Rx.Observable.fromArray(this.auctions).filter(function (auction) {
                    return auction.Id === id;
                }).take(1);
            };
            AuctionStoreStatic.prototype.deleteAuction = function (id) {
                var _this = this;
                return Rx.Observable.create(function (observer) {
                    var auction = _this.auctions.find(function (auction) { return auction.Id === id; });
                    var index = _this.auctions.indexOf(auction);
                    if (index >= 0) {
                        _this.auctions.splice(index, 1);
                        observer.onNext({});
                        observer.onCompleted();
                    }
                    else {
                        observer.onError({});
                    }
                });
            };
            AuctionStoreStatic.prototype.createAuction = function (product) {
                var _this = this;
                return Rx.Observable.create(function (observer) {
                    var auction = product;
                    auction.Id = Date.now().toString();
                    auction.IsItemNew = product.IsItemConditionNew === '1';
                    auction.User = _this.user;
                    auction.HighestBid = null;
                    auction.BidCount = 0;
                    auction.Category = Stores.CategoryStore.categories[product.CategoryId];
                    _this.auctions.push(auction);
                    observer.onCompleted();
                });
            };
            AuctionStoreStatic.prototype.addBid = function (auctionId, bid) {
                var _this = this;
                var observable = Rx.Observable.create(function (observer) {
                    _this.getAuction(auctionId).subscribe(function (auction) {
                        auction.HighestBid = bid;
                        auction.BidCount++;
                        observer.onNext(auction.BidCount);
                        observer.onCompleted();
                    }, observer.onError);
                });
                observable.subscribe(function (bidCount) { return _this.emit('BID_ADDED'); });
                return observable;
            };
            AuctionStoreStatic.prototype.createFakeAuctions = function () {
                this.user = {
                    Id: 1,
                    Name: 'Igor S',
                    Email: 'igors@codevalue.net',
                    LastLoginTime: moment().toDate(),
                    CreatedOn: moment().toDate(),
                };
                this.auctions = [{
                        Title: '',
                        Description: '',
                        StartTime: moment().toDate(),
                        EndTime: moment().toDate(),
                        StartBid: 1,
                        Picture1: 'http://placehold.it/120x120&text=image1',
                        Picture2: 'http://placehold.it/120x120&text=image2',
                        Picture3: 'http://placehold.it/120x120&text=image3',
                        Picture4: 'http://placehold.it/120x120&text=image4',
                        Id: '1',
                        IsItemNew: false,
                        User: {
                            Id: 1,
                            Name: 'Igor S',
                            Email: 'igors@codevalue.net',
                            LastLoginTime: moment().toDate(),
                            CreatedOn: moment().toDate(),
                        },
                        Category: Stores.CategoryStore.categories[4],
                        HighestBid: {
                            Bid: 3234,
                            BidTime: moment().toDate(),
                        },
                        BidCount: 2
                    }, {
                        Title: '',
                        Description: '',
                        StartTime: moment().toDate(),
                        EndTime: moment().toDate(),
                        StartBid: 1,
                        Picture1: 'http://placehold.it/120x120&text=image1',
                        Picture2: 'http://placehold.it/120x120&text=image2',
                        Picture3: 'http://placehold.it/120x120&text=image3',
                        Picture4: 'http://placehold.it/120x120&text=image4',
                        Id: '2',
                        IsItemNew: false,
                        User: {
                            Id: 1,
                            Name: 'Igor S',
                            Email: 'igors@codevalue.net',
                            LastLoginTime: moment().toDate(),
                            CreatedOn: moment().toDate(),
                        },
                        Category: Stores.CategoryStore.categories[1],
                        HighestBid: {
                            Bid: 3234,
                            BidTime: moment().toDate(),
                        },
                        BidCount: 2
                    },];
            };
            AuctionStoreStatic.prototype.selectAuctionToBid = function (auctionId) {
                var _this = this;
                this.getAuction(auctionId).subscribe(function (auction) {
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Bid], { auction: auction });
                });
            };
            AuctionStoreStatic.prototype.updateAuctions = function () {
                var _this = this;
                this.getAuctions().subscribe(function (updatedAuctions) {
                    _this.auctions = updatedAuctions;
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Updated]);
                });
            };
            AuctionStoreStatic.prototype.deleteActionFromAuctions = function (auctionId) {
                var _this = this;
                this.deleteAuction(auctionId).subscribe(function () {
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Deleted]);
                });
            };
            AuctionStoreStatic.prototype.addNewAction = function (product) {
                var _this = this;
                this.createAuction(product).subscribe(function () {
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.Created]);
                });
            };
            AuctionStoreStatic.prototype.makeBid = function (auctionId, bid) {
                var _this = this;
                this.addBid(auctionId, bid).subscribe(function () {
                    _this.emit(Stores.AuctionEventID[Stores.AuctionEventID.BidWasMade]);
                });
            };
            return AuctionStoreStatic;
        }(NgAuctions.Utiles.EventEmitter));
        Stores.AuctionStoreStatic = AuctionStoreStatic;
        Stores.AuctionStore = new AuctionStoreStatic();
        NgAuctions.AppDispatcher.register(Stores.AuctionStore.handelActions);
    })(Stores = NgAuctions.Stores || (NgAuctions.Stores = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctionStore.js.map