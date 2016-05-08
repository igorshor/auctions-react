///<reference path="../../_references.ts"/>

module NgAuctions.Stores {
    import AuctionActionID = NgAuctions.Actions.AuctionActionID;
    export interface IAuctionsStore {
        auctions:Models.IAuctionData[];
        getAuctions():Rx.Observable<Models.IAuctionData[]>;
        getAuction(id:string):Rx.Observable<Models.IAuctionData>;
        deleteAuction(id:string):Rx.Observable<any>;
        createAuction(product:Models.IProductData):Rx.Observable<any>;
        addBid(auctionId:string, bid:Models.IBidData):Rx.Observable<any>;
    }

    export class AuctionStoreStatic extends Utiles.EventEmitter implements IAuctionsStore {
        public auctions:Models.IAuctionData[];
        private user:Models.IUserData;

        constructor() {
            super();
            this.createFakeAuctions();
        }

        public getAuctions():Rx.Observable<Models.IAuctionData[]> {
            return (<any>Rx.Observable).fromArray(this.auctions);
        }

        public getAuction(id:string):Rx.Observable<Models.IAuctionData> {
            return (<any>Rx.Observable).fromArray(this.auctions).filter((auction:Models.IAuctionData)=> {
                return auction.Id === id
            }).take(1);
        }

        public deleteAuction(id:string):Rx.Observable<any> {
            return Rx.Observable.create((observer:Rx.IObserver<any>)=> {
                var auction:Models.IAuctionData = (<any>this.auctions).find((auction:Models.IAuctionData)=> auction.Id === id);
                var index:number = this.auctions.indexOf(auction);
                if (index >= 0) {
                    this.auctions.splice(index, 1);
                    observer.onNext({});
                    observer.onCompleted();
                }
                else {
                    observer.onError({})
                }
            });
        }

        public createAuction(product:Models.IProductData):Rx.Observable<any> {
            return Rx.Observable.create((observer:Rx.IObserver<any>)=> {
                var auction:Models.IAuctionData = <any>product;

                auction.Id = Date.now().toString();
                auction.IsItemNew = product.IsItemConditionNew === '1';
                auction.User = this.user;
                auction.HighestBid = null;
                auction.BidCount = 0;
                auction.Category = CategoryStore.categories[product.CategoryId];
                this.auctions.push(auction);

                observer.onCompleted();
            });
        }

        public addBid(auctionId:string, bid:Models.IBidData):Rx.Observable<any> {
            var observable:Rx.Observable<any> = Rx.Observable.create((observer:Rx.Observer<any>)=> {
                this.getAuction(auctionId).subscribe((auction:Models.IAuctionData)=> {
                    auction.HighestBid = bid;
                    auction.BidCount++;
                    observer.onNext(auction.BidCount);
                    observer.onCompleted();
                }, observer.onError);
            });

            observable.subscribe((bidCount:number)=> this.emit('BID_ADDED'));

            return observable;
        }

        private createFakeAuctions() {
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
                Category: CategoryStore.categories[4],
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
                Category: CategoryStore.categories[1],
                HighestBid: {
                    Bid: 3234,
                    BidTime: moment().toDate(),
                },
                BidCount: 2
            },]
        }

        private selectAuctionToBid(auctionId:string) {
            this.getAuction(auctionId).subscribe((auction:Models.IAuctionData)=> {
                this.emit(AuctionEventID[AuctionEventID.Bid], {auction})
            })
        }

        private updateAuctions() {
            this.getAuctions().subscribe((updatedAuctions:Models.IAuctionData[])=> {
                this.auctions = updatedAuctions;
                this.emit(AuctionEventID[AuctionEventID.Updated]);
            })
        }

        private deleteActionFromAuctions(auctionId:string) {
            this.deleteAuction(auctionId).subscribe(()=> {
                this.emit(AuctionEventID[AuctionEventID.Deleted]);
            })
        }

        private addNewAction(product:NgAuctions.Models.IProductData) {
            this.createAuction(product).subscribe(()=>{
                this.emit(AuctionEventID[AuctionEventID.Created])
            })
        }

        private makeBid(auctionId:string, bid:Models.IBidData) {
            this.addBid(auctionId, bid).subscribe(()=> {
                this.emit(AuctionEventID[AuctionEventID.BidWasMade]);
            })
        }

        public handelActions = (action) => {
            switch (action.actionType) {
                case AuctionActionID[AuctionActionID.Update]:
                    this.updateAuctions();
                    break;
                case AuctionActionID[AuctionActionID.SelectToBid]:
                    this.selectAuctionToBid(action.auctionId);
                    break;
                case AuctionActionID[AuctionActionID.Delete]:
                    this.deleteActionFromAuctions(action.auctionId);
                    break;
                case AuctionActionID[AuctionActionID.Add]:
                    this.addNewAction(action.product);
                    break;
                case AuctionActionID[AuctionActionID.Bid]:
                    this.makeBid(action.auctionId, action.bid);
                    break;
            }
        };
    }

    export var AuctionStore = new AuctionStoreStatic();
    AppDispatcher.register(AuctionStore.handelActions);
}