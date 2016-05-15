///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IContentProps {

    }

    interface IContentState {

    }

    export class Content extends React.Component<IContentProps, IContentState> {
        public componentWillMount() {
            Stores.AuctionStore.on(Stores.AuctionEventID[Stores.AuctionEventID.Bid], ()=> {
                $(ReactDOM.findDOMNode(this.refs['bid'])).modal('show');
            });
        }

        render():JSX.Element {
            var selectedCategoryName = Stores.CategoryStore.selectedCategory.Name;
            return <div className="content">
                <div className="category-label">
                    <span>
                        {selectedCategoryName}
                    </span>
                </div>
                <Auctions/>
                <BidForm ref="bid"/>
            </div>
        }
    }
}