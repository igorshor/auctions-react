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
        var CategoryStore = NgAuctions.Stores.CategoryStore;
        var SellForm = (function (_super) {
            __extends(SellForm, _super);
            function SellForm(props) {
                var _this = this;
                _super.call(this, props);
                this.addAndSaveBtn = function () {
                    NgAuctions.Actions.AuctionActions.AuctionAdd(_this.state);
                };
                this.handleInputChange = function (name, event) {
                    var obj = {};
                    obj[name] = event.target.value;
                    _this.setState(obj);
                };
                this.handleConditionInputChange = function (event) {
                    _this.setState({ Description: event.target.value });
                };
                this.handleBidInputChange = function (event) {
                    var newBid = parseFloat(event.target.value).toFixed(2);
                    if (!newBid) {
                        return;
                    }
                    _this.setState({ StartBid: parseFloat(newBid) });
                };
                this.initData();
            }
            SellForm.prototype.componentWillMount = function () {
                NgAuctions.Stores.AuctionStore.on(NgAuctions.Stores.AuctionEventID[NgAuctions.Stores.AuctionEventID.Created], this.resetForm);
            };
            SellForm.prototype.initData = function () {
                this.categories = CategoryStore.categories;
                this.futureDates = [
                    { futureDateString: '1 Day', futureDate: moment().add(1, 'days').toDate() },
                    { futureDateString: '2 Days', futureDate: moment().add(2, 'days').toDate() },
                    { futureDateString: '3 Days', futureDate: moment().add(3, 'days').toDate() },
                    { futureDateString: '4 Days', futureDate: moment().add(4, 'days').toDate() },
                    { futureDateString: '5 Days', futureDate: moment().add(5, 'days').toDate() },
                    { futureDateString: '6 Days', futureDate: moment().add(5, 'days').toDate() },
                    { futureDateString: '1 Week', futureDate: moment().add(1, 'weeks').toDate() },
                    { futureDateString: '2 Weeks', futureDate: moment().add(2, 'weeks').toDate() },
                    { futureDateString: '3 Weeks', futureDate: moment().add(3, 'weeks').toDate() },
                    { futureDateString: '1 Month', futureDate: moment().add(1, 'months').toDate() },
                    { futureDateString: '2 Months', futureDate: moment().add(2, 'months').toDate() },
                    { futureDateString: '3 Months', futureDate: moment().add(3, 'months').toDate() },
                    { futureDateString: '4 Months', futureDate: moment().add(4, 'months').toDate() }];
                this.resetForm();
            };
            SellForm.prototype.resetForm = function () {
                var date = moment().toDate();
                var futureDate = this.state && this.state.EndTime ? this.state.EndTime : date;
                this.state = {
                    Title: '',
                    Description: '',
                    StartTime: date,
                    EndTime: this.futureDates[6].futureDate,
                    StartBid: 0.01,
                    Picture1: '',
                    Picture2: '',
                    Picture3: '',
                    Picture4: '',
                    IsItemConditionNew: '1',
                    CategoryId: this.categories[1].Id,
                };
            };
            SellForm.prototype.render = function () {
                var categoryOptions = CategoryStore.categories.map(function (category) {
                    return React.createElement("option", {key: category.Id, value: category.Id}, category.Name);
                });
                var dateOptions = this.futureDates.map(function (date, index) {
                    return React.createElement("option", {key: index, value: date.futureDate}, date.futureDateString);
                });
                return React.createElement(Components.Modal, {size: "lg", modalId: "saleModal", wrapperClass: "sale-form", modalHeader: "Add Items For Sale"}, React.createElement("form", {className: "form"}, React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-sm-7 col-xs-12"}, React.createElement("div", {className: "col-md-2 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "item"}, "Item:")), React.createElement("div", {className: "col-md-10 col-sm-12 col-xs-12"}, React.createElement("div", null, React.createElement("input", {type: "text", className: "form-control", id: "item", required: true, value: this.state.Title, onChange: this.handleInputChange.bind(this, "Title")})))), React.createElement("div", {className: "col-md-4 col-sm-4 col-xs-12"}, React.createElement("div", {className: "col-md-3 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "category"}, "Category:")), React.createElement("div", {className: "col-md-9 col-sm-12 col-xs-12"}, React.createElement("div", null, React.createElement("select", {className: "form-control", id: "category", value: this.state.CategoryId, onChange: this.handleInputChange.bind(this, "CategoryId")}, categoryOptions))))), React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-sm-7 col-xs-12"}, React.createElement("div", {className: "col-md-2 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "description"}, "Description:")), React.createElement("div", {className: "col-md-10 col-sm-12 col-xs-12"}, React.createElement("div", null, React.createElement("textarea", {className: "form-control", id: "description", value: this.state.Description, onChange: this.handleInputChange.bind(this, "Description"), required: true})))), React.createElement("div", {className: "col-sm-4 col-xs-12"}, React.createElement("div", {className: "col-md-3 col-sm-5 col-xs-12"}, React.createElement("label", {className: "control-label"}, "Condition:")), React.createElement("div", {className: "col-md-9 col-sm-12 col-xs-12"}, React.createElement("div", {className: "radio row"}, React.createElement("label", null, React.createElement("input", {type: "radio", name: "condition", defaultChecked: true, defaultValue: "1", onChange: this.handleInputChange.bind(this, "IsItemConditionNew")}), "New")), React.createElement("div", {className: "radio row"}, React.createElement("label", null, React.createElement("input", {type: "radio", name: "condition", defaultValue: "0", onChange: this.handleInputChange.bind(this, "IsItemConditionNew")}), "Used"))))), React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-sm-7 col-xs-12"}, React.createElement("div", {className: "col-md-2 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "photo1"}, "Photos:")), React.createElement("div", {className: "col-md-10 col-sm-12 col-xs-12"}, React.createElement("div", {className: "photos-input-container"}, React.createElement("input", {type: "text", className: "form-control", id: "photo1", value: this.state.Picture1, onChange: this.handleInputChange.bind(this, "Picture1"), required: true}), React.createElement("input", {type: "text", className: "form-control", value: this.state.Picture2, onChange: this.handleInputChange.bind(this, "Picture2")}), React.createElement("input", {type: "text", className: "form-control", value: this.state.Picture3, onChange: this.handleInputChange.bind(this, "Picture3")}), React.createElement("input", {type: "text", className: "form-control", value: this.state.Picture4, onChange: this.handleInputChange.bind(this, "Picture4")}))))), React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-sm-5 col-xs-12"}, React.createElement("div", {className: "col-md-6 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "bid"}, "Start Action bidding at:")), React.createElement("div", {className: "col-md-4 col-sm-6 col-xs-11"}, React.createElement("div", null, React.createElement("input", {type: "number", className: "form-control", id: "bid", value: this.state.StartBid, onChange: this.handleBidInputChange, step: "0.01", min: "0.01", required: true}))), React.createElement("div", {className: "col-md-2 col-sm-6 col-xs-1"}, React.createElement("label", null, "NIS"))), React.createElement("div", {className: "col-sm-4 col-xs-12"}, React.createElement("div", {className: "col-md-4 col-sm-12 col-xs-12"}, React.createElement("label", {className: "control-label", for: "last"}, "Lasting for:")), React.createElement("div", {className: "col-md-8 col-sm-12 col-xs-12"}, React.createElement("select", {className: "form-control", id: "last", value: this.state.EndTime, onChange: this.handleInputChange.bind(this, "EndTime"), required: true}, dateOptions)))), JSON.stringify(this.state), React.createElement("div", {className: "row modal-footer sale-footer"}, React.createElement("button", {type: "submit", className: "btn btn-lg btn-base btn-base-small-color", "data-dismiss": "modal", "aria-label": "Close", onClick: this.addAndSaveBtn, disabled: "!sellForm.form.valid"}, "save and Preview"))));
            };
            return SellForm;
        }(React.Component));
        Components.SellForm = SellForm;
    })(Components = NgAuctions.Components || (NgAuctions.Components = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=sell-form.js.map