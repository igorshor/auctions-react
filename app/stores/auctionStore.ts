///<reference path="../../_references.ts"/>

module NgAuctions.Stores {
    import AuctionActionID = NgAuctions.Actions.AuctionActionID;
    export interface IAuctionsStore {
        auctions:Models.IAuctionData[];
    }

    export class AuctionStoreStatic extends Utiles.EventEmitter implements IAuctionsStore {
        public auctions:Models.IAuctionData[];

        constructor() {
            super();
            var intervalToken:number = setInterval(()=> this.updateAuctions(), 1000 * 60);
        }

        private selectAuctionToBid(auctionId:string) {
            var auctions:Models.IAuctionData[] = $
                .grep(this.auctions, (auction:Models.IAuctionData) => auction.Id === auctionId);

            if (auctions) {
                this.emit(AuctionEventID[AuctionEventID.Bid], {auction: auctions[0]})
            }
        }

        private updateAuctions() {
            Services.NetService.getAuctions()
                .then((updatedAuctions:Models.IAuctionData[])=> {
                    this.auctions = updatedAuctions;
                    this.emit(AuctionEventID[AuctionEventID.Updated]);
                })
        }

        private deleteActionFromAuctions(auctionId:string) {
            Services.NetService.deleteAuction(auctionId)
                .then(()=> this.emit(AuctionEventID[AuctionEventID.Deleted]))
        }

        private addNewAction(product:NgAuctions.Models.IProductData) {
            Services.NetService.createAuction(product)
                .then(()=> this.emit(AuctionEventID[AuctionEventID.Created]))
        }

        private makeBid(auctionId:string, bid:Models.IBidData) {
            Services.NetService.addBid(auctionId, bid)
                .then(()=> this.emit(AuctionEventID[AuctionEventID.BidWasMade]))
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