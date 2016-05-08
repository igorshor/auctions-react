///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    import CategoryStore = NgAuctions.Stores.CategoryStore;
    interface IContentProps {

    }

    interface IContentState {

    }

    export class Content extends React.Component<IContentProps, IContentState> {
        render():JSX.Element {
            var selectedCategoryName = CategoryStore.selectedCategory.Name;
            return <div className="content">
                <div className="category-label">
                    <span>
                        {selectedCategoryName}
                    </span>
                </div>
                <Auctions/>
            </div>
        }
    }
}