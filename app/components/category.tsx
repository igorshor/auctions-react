///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    import CategoryActionID = NgAuctions.Actions.CategoryActionID;
    interface ICategoryProps {
        categoryId:number;
        categoryName:string;
    }

    interface ICategoryState {
        categorySelected?:boolean;
        categoryHaveImage?:boolean;
    }

    export class Category extends React.Component<ICategoryProps, ICategoryState> {
        constructor(props) {
            super(props);
            this.state = {
                categoryHaveImage: this.props.categoryId > 0,
                categorySelected: false
            }
        }

        componentWillMount() {
            Stores.CategoryStore.on(Stores.CategoryEventID[Stores.CategoryEventID.Changed], ()=> {
                this.setState({categorySelected: Stores.CategoryStore.selectedCategory.Id === this.props.categoryId})
            })
        }

        private onCategoryClick = ()=> Actions.CategoryActions.CategorySelect(this.props.categoryId);

        render():JSX.Element {
            var lowerCaseName:string = this.props.categoryName.toLowerCase().replace(' ', '-').replace('.', '');
            var upperCaseName:string = this.props.categoryName.toUpperCase();

            var categoryImage = this.state.categoryHaveImage ?
                <img src={"styles/images/" + lowerCaseName +".png"}/> : null;
            var categoryHoverImage = this.state.categoryHaveImage ?
                <img src={"styles/images/" + lowerCaseName +"_w.png"}/> : null;

            return <div className={this.state.categorySelected ? 'selected':''} onClick={this.onCategoryClick}>
                <div className={"color-block color-" + lowerCaseName}></div>
                <div className="category-details">
                    {categoryImage}
                    {upperCaseName}
                </div>
                <div className={"category-hover color-" + lowerCaseName}>
                    {categoryHoverImage}
                </div>
            </div>
        }
    }
}