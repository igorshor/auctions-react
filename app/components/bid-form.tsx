///<reference path="../../_references.ts"/>

module NgAuctions.Components {

    import Store = FluxUtils.Store;
    interface IBidFormProps {

    }

    interface IBidFormState {

    }

    export class BidForm extends React.Component<IBidFormProps, Models.IAuctionData> {
        constructor(props) {
            super(props);

            this.state = Stores.AuctionStore.auctions[0];
        }

        private placeBidClick = ()=> {

        };

        public componentWillMount() {
            Stores.AuctionStore.on(Stores.AuctionEventID[Stores.AuctionEventID.Bid], (data:any)=> {
                this.setState(data.auction);
            });
        }

        private handleBidInputChange = (event)=> {
            var newBid = parseFloat(event.target.value).toFixed(2);
            if (!newBid) {
                return;
            }

            this.setState({HighestBid: {Bid: parseFloat(newBid)} as Models.IBidData} as Models.IAuctionData);
        };

        public render():JSX.Element {
            if (!this.state) {
                return null;
            }

            var minBidValue = this.state.HighestBid ?
                    this.state.HighestBid.Bid : (this.state.StartBid + 0.01);
            var highestBid:number = parseFloat((minBidValue).toFixed(2));
            var timeLeft = Utiles.DateUtiles.getFormattedCountDown(this.state.EndTime);
            var mailTo = "mailto:" + this.state.User.Email + "?Subject=SELL";

            var pictures = [];

            for (var i = 1; i <= 4; i++) {
                if (this.state['Picture' + i]) {
                    var picUrl:string = this.state['Picture' + i];
                    if (picUrl !== "") {
                        pictures.push(picUrl);
                    }
                }
            }

            return <Modal size="md" modalId="bidModal" wrapperClass="bid-info" modalHeader="Place Bid">
                <div className="modal-body">
                    <div className="row bid-notification" hidden={true}>
                        <span>Thank you</span>
                    </div>
                    <div className="row" hidden={false}>
                        <div className="col-sm-5">
                            <div className="carousel-pictures-container transformed-background"></div>
                            <PicturesCarousel pictures={pictures}/>
                        </div>
                        <div className="col-sm-7">
                            <form className="form">
                                <div className="row bid-title">
                                    {this.state.Title}
                                </div>
                                <div className="row bid-description txt-black">
                                    {this.state.Description}
                                </div>
                                <div className="txt-small">
                                    <div className="row row-standard-margin">
                                        <img src="styles/images/hour_glass.png"/>
                                        Time Left: <span className="txt-black txt-bold">{timeLeft}</span>
                                    </div>
                                    <div className="row row-standard-margin">
                                        Start auction bidding at: <span
                                        className="txt-black txt-bold">{this.state.StartBid}</span>
                                    </div>
                                    <div className="row biding-row">
                                        <div className="col-sm-5">
                                            <input type="number" className="form-control" id="bid" value={highestBid}
                                                   min={highestBid} step="0.01"
                                                   onChange={this.handleBidInputChange} required={true}/>
                                        </div>
                                        <div className="col-sm-1">
                                            <span className="nis-label">NIS</span>
                                        </div>
                                        <div className="col-sm-5">
                                            <button type="submit" disabled="!bidForm.form.valid"
                                                    className="btn btn-base btn-base-small-color"
                                                    onClick={this.placeBidClick}>
                                                Place Bid
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="seller-info">
                                            Seller:
                                            <a href={mailTo} target="_blank">
                                                {this.state.User.Name}
                                                <img src="styles/images/email.png"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className={"modal-footer bid-footer color-block color-" + this.state.Category.Name.toLowerCase()}></div>
            </Modal>
        }
    }
}