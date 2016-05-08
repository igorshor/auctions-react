///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    import CategoriesStore = NgAuctions.Stores.CategoryStore;
    import ICategoryData = NgAuctions.Models.ICategoryData;

    interface INavProps {

    }

    interface INavState {

    }

    export class Nav extends React.Component<INavProps, INavState> {
        constructor(props) {
            super(props);
        }

        render():JSX.Element {
            var categories:JSX.Element[] = CategoriesStore.categories.map((category:ICategoryData)=>
                <li key={category.Id} className="category">
                    <Category categoryId={category.Id} categoryName={category.Name}/>
                </li>);

            return <nav>
                <ol className="categories">
                    {categories}
                </ol>
            </nav>
        }

    }
}