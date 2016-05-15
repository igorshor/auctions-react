///<reference path="../../_references.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NgAuctions;
(function (NgAuctions) {
    var Components;
    (function (Components) {
        var PicturesCarousel = (function (_super) {
            __extends(PicturesCarousel, _super);
            function PicturesCarousel(props) {
                _super.call(this, props);
                this.init();
            }
            PicturesCarousel.prototype.componentDidMount = function () {
                this.init();
            };
            PicturesCarousel.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
                $(ReactDOM.findDOMNode(this.refs['elementRef'])).carousel(0);
            };
            PicturesCarousel.prototype.init = function () {
                this.otherPictures = [];
                this.mainPicture = '';
                if (this.props.pictures && this.props.pictures.length > 0) {
                    this.mainPicture = this.props.pictures[0];
                    this.otherPictures = this.props.pictures.length === 1 ?
                        [this.props.pictures[0]] : this.props.pictures.slice(1, this.props.pictures.length);
                }
            };
            PicturesCarousel.prototype.render = function () {
                this.init();
                var items = this.otherPictures.map(function (picUrl) {
                    return React.createElement("div", {key: picUrl, className: "item"}, React.createElement("img", {src: picUrl}));
                });
                return React.createElement("div", {id: "carouselPictures", ref: "elementRef", className: "carousel slide carousel-pictures-container", "data-ride": "carousel", "data-interval": "false"}, React.createElement("div", {className: "carousel-inner", role: "listbox"}, React.createElement("div", {className: "item active"}, React.createElement("img", {hidden: "!vm.mainPicture", src: this.mainPicture})), items), React.createElement("a", {className: "left carousel-control carousel-button", "data-target": "#carouselPictures", role: "button", "data-slide": "prev"}, React.createElement("span", {"aria-hidden": "true"}, '<'), React.createElement("span", {className: "sr-only"}, "Previous")), React.createElement("a", {className: "right carousel-control carousel-button", "data-target": "#carouselPictures", role: "button", "data-slide": "next"}, React.createElement("span", {"aria-hidden": "true"}, '>'), React.createElement("span", {className: "sr-only"}, "Next")));
            };
            return PicturesCarousel;
        }(React.Component));
        Components.PicturesCarousel = PicturesCarousel;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=pictures-carousel.js.map