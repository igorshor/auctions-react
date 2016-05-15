///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IAuctionsProps {

    }

    interface IAuctionsState {
        selectedCategory?:Models.ICategoryData;
        auctions?:Models.IAuctionData[];
        selectedAuction?:Models.IAuctionData;
    }

    export class Auctions extends React.Component<IAuctionsProps, IAuctionsState> {
        constructor(props) {
            super(props);
        }

        public componentWillMount() {
            Stores.AuctionStore.on(Stores.AuctionEventID[Stores.AuctionEventID.Updated], ()=> {
                this.setState({
                    auctions: Stores.AuctionStore.auctions,
                    selectedCategory: Stores.CategoryStore.selectedCategory
                });
            });

            Stores.AuctionStore.on(Stores.AuctionEventID[Stores.AuctionEventID.Deleted], ()=> {
                this.setState({auctions: Stores.AuctionStore.auctions});
            });

            Stores.CategoryStore.on(Stores.CategoryEventID[Stores.CategoryEventID.Changed], ()=> {
                this.setState({selectedCategory: Stores.CategoryStore.selectedCategory})
            });

            Actions.AuctionActions.AuctionsUpdate();
        }

        public componentWillUnmount() {

        }

        public shouldComponentUpdate(nextProps:IAuctionsProps, nextState:IAuctionsState, nextContext:any):boolean {
            return Stores.AuctionStore.auctions ? true : false;
        }

        public render():JSX.Element {
            var auctions:JSX.Element[] = this.getAuctions();

            return <div>
                <ol className="products">
                    {auctions}
                </ol>
            </div>
        }

        private getAuctions():JSX.Element[] {
            if (!Stores.AuctionStore.auctions) {
                return null;
            }

            return Stores.AuctionStore.auctions
                .filter((auction:Models.IAuctionData)=> {
                    if (!Stores.CategoryStore || this.state.selectedCategory.Id == 0) {
                        return true;
                    }
                    return this.state.selectedCategory.Id === auction.Category.Id
                })
                .map((auction:Models.IAuctionData)=>
                    <li key={auction.Id} className="product">
                        <Auction auction={auction}/>
                    </li>
                );
        }
    }
}