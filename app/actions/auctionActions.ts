module NgAuctions.Actions {
    class AuctionActionsStatic {
        public AuctionSelectToBid(auctionId:string):void {
            AppDispatcher.dispatch({
                actionType: AuctionActionID[AuctionActionID.SelectToBid],
                auctionId
            })
        }

        public AuctionsUpdate():void {
            AppDispatcher.dispatch({
                actionType: AuctionActionID[AuctionActionID.Update],
            })
        }

        public AuctionAdd(product:Models.IProductData):void {
            AppDispatcher.dispatch({
                actionType: AuctionActionID[AuctionActionID.Add],
                product
            })
        }

        public AuctionBid(product:Models.IProductData):void {
            AppDispatcher.dispatch({
                actionType: AuctionActionID[AuctionActionID.Add],
                product
            })
        }

        public AuctionDelete(auctionId:string):void {
            AppDispatcher.dispatch({
                actionType: AuctionActionID[AuctionActionID.Delete],
                auctionId
            })
        }
    }

    export var AuctionActions = new AuctionActionsStatic();
}