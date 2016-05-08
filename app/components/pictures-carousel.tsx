///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IPicturesCarouselProps {
        pictures:string[]
    }

    interface IPicturesCarouselState {

    }

    export class PicturesCarousel extends React.Component<IPicturesCarouselProps, IPicturesCarouselState> {
        private mainPicture:string;
        private otherPictures:string[];

        constructor(props) {
            super(props);
            this.init(); 
        }

        private componentDidMount(): void{
            this.init();
        }

        private componentWillUpdate(nextProps:IPicturesCarouselProps, nextState:IPicturesCarouselState, nextContext:any):void {
            if (this.props !== nextProps) {
                this.init();
            }
        }

        private componentDidUpdate(prevProps:IPicturesCarouselProps, prevState:IPicturesCarouselState, prevContext:any):void {
            $(ReactDOM.findDOMNode(this.refs['elementRef'])).carousel(0);
        }

        private shouldComponentUpdate(nextProps:IPicturesCarouselProps, nextState:IPicturesCarouselState, nextContext:any):boolean {
            if (!nextProps) {
                return false;
            }

            if (this.props !== nextProps) {
                return true;
            }

            return false;
        }

        private init() {
            this.otherPictures = [];
            this.mainPicture = '';

            if (this.props.pictures && this.props.pictures.length > 0) {
                this.mainPicture = this.props.pictures[0];

                if (this.props.pictures.length === 1) {
                    this.otherPictures.push(this.props.pictures[0])
                }
                else {
                    this.otherPictures = this.props.pictures.slice(1, this.props.pictures.length)
                }
            }
        }

        public render():JSX.Element {
            var items = this.otherPictures.map((picUrl:string)=><img key={picUrl} src={picUrl}/>);

            return <div id="carouselPictures" ref="elementRef"
                        className="carousel slide carousel-pictures-container"
                        data-ride="carousel"
                        data-interval="false">
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <img hidden="!vm.mainPicture" src={this.mainPicture}/>
                    </div>

                    <div className="item">
                        {items}
                    </div>
                </div>
                <a className="left carousel-control carousel-button" data-target="#carouselPictures" role="button"
                   data-slide="prev">
                    <span aria-hidden="true">{'<'}</span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control carousel-button" data-target="#carouselPictures" role="button"
                   data-slide="next">
                    <span aria-hidden="true">{'>'}</span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        }
    }
}