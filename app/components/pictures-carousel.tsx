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

        private componentDidMount():void {
            this.init();
        }

        private componentDidUpdate(prevProps:IPicturesCarouselProps, prevState:IPicturesCarouselState, prevContext:any):void {
            $(ReactDOM.findDOMNode(this.refs['elementRef'])).carousel(0);
        }

        private init() {
            this.otherPictures = [];
            this.mainPicture = '';

            if (this.props.pictures && this.props.pictures.length > 0) {
                this.mainPicture = this.props.pictures[0];

                this.otherPictures = this.props.pictures.length === 1 ?
                    [this.props.pictures[0]] : this.props.pictures.slice(1, this.props.pictures.length);
            }
        }

        public render():JSX.Element {
            this.init();
            
            var items = this.otherPictures.map((picUrl:string)=>
                <div key={picUrl} className="item">
                    <img src={picUrl}/>
                </div>);

            return <div id="carouselPictures" ref="elementRef"
                        className="carousel slide carousel-pictures-container"
                        data-ride="carousel"
                        data-interval="false">
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <img hidden="!vm.mainPicture" src={this.mainPicture}/>
                    </div>
                    {items}
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