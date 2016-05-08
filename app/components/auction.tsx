///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IAuctionProps {
        auction:Models.IAuctionData;
    }

    interface IAuctionState {

    }

    export class Auction extends React.Component<IAuctionProps, IAuctionState> {
        private openBidModal = () => {
            Actions.AuctionActions.AuctionSelectToBid(this.props.auction.Id)
        };

        private deleteAuctionBtn = () => {
            Actions.AuctionActions.AuctionDelete(this.props.auction.Id)
        };

        public render():JSX.Element {
            var highestBid = this.props.auction.HighestBid ? this.props.auction.HighestBid.Bid : this.props.auction.StartBid;
            var bidCount = this.props.auction.BidCount > 0 ? (this.props.auction.BidCount + ' bids') : 'Be the first bidder';
            var timeLeft = Utiles.DateUtiles.getFormattedCountDown(this.props.auction.EndTime);
            var isUserAuction = this.props.auction.User.Name === Stores.UserStore.userName;
            var category = this.props.auction.Category.Name.toLowerCase().replace(' ', '-').replace('.', '');
            var mailTo = "mailto:" + this.props.auction.User.Email + "?Subject=SELL";

            var removeAuction = isUserAuction ?
                <div className="product-remove-box" onClick={this.deleteAuctionBtn}>X</div> : null;

            return <div>
                {removeAuction}
                <div data-role="button" data-toggle="modal" data-target="#bidModal" onClick={this.openBidModal}>
                    <div className="product-price-box">
                        <div className="price">
                            ILS {highestBid}
                        </div>
                        <div className="price-description">
                            {bidCount}
                        </div>
                    </div>
                    <div className="product-top-block">
                        <img src={this.props.auction.Picture1}/>
                    </div>
                    <div className="product-bottom-block">
                        <div className="product-info">
                            <div className="product-description" smart-ellipsis>
                                {this.props.auction.Description}
                            </div>
                            <div className="seller-info">
                                Seller:
                                <a href={mailTo} target="_blank">
                                    {this.props.auction.User.Name}
                                    <img src="styles/images/email.png"/>
                                </a>

                                <div className="date">
                                    {timeLeft} left
                                </div>
                            </div>
                        </div>
                        <div className={"color-block color-" + category}></div>
                    </div>
                </div>
            </div>
        }

    }
}