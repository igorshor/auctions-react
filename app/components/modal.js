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
        var Modal = (function (_super) {
            __extends(Modal, _super);
            function Modal(props) {
                _super.call(this, props);
            }
            Modal.prototype.render = function () {
                return React.createElement("div", {className: "modal fade", id: this.props.modalId, tabindex: "-1", role: "dialog", "aria-labelledby": "saleModalLabel"}, React.createElement("div", {className: "modal-dialog modal-" + this.props.size, role: "document"}, React.createElement("div", {className: "modal-content"}, React.createElement("div", {className: "modal-header"}, React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), this.props.modalHeader), React.createElement("div", {className: "modal-body " + this.props.wrapperClass}, this.props.children))));
            };
            return Modal;
        }(React.Component));
        Components.Modal = Modal;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=modal.js.map