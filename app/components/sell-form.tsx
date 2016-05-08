///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    import CategoryStore = NgAuctions.Stores.CategoryStore;
    import ICategoryData = NgAuctions.Models.ICategoryData;

    interface ISellFormProps {

    }

    interface ISellFormState {

    }

    export class SellForm extends React.Component<ISellFormProps, Models.IProductData> {
        public futureDates:Models.IFutureDate[];
        public categories:Models.ICategoryData[];

        constructor(props) {
            super(props);
            this.initData();
        }

        public componentWillMount() {
            Stores.AuctionStore.on(Stores.AuctionEventID[Stores.AuctionEventID.Created], this.resetForm);
        }

        private initData() {
            this.categories = CategoryStore.categories;

            this.futureDates = [
                {futureDateString: '1 Day', futureDate: moment().add(1, 'days').toDate()},
                {futureDateString: '2 Days', futureDate: moment().add(2, 'days').toDate()},
                {futureDateString: '3 Days', futureDate: moment().add(3, 'days').toDate()},
                {futureDateString: '4 Days', futureDate: moment().add(4, 'days').toDate()},
                {futureDateString: '5 Days', futureDate: moment().add(5, 'days').toDate()},
                {futureDateString: '6 Days', futureDate: moment().add(5, 'days').toDate()},
                {futureDateString: '1 Week', futureDate: moment().add(1, 'weeks').toDate()},
                {futureDateString: '2 Weeks', futureDate: moment().add(2, 'weeks').toDate()},
                {futureDateString: '3 Weeks', futureDate: moment().add(3, 'weeks').toDate()},
                {futureDateString: '1 Month', futureDate: moment().add(1, 'months').toDate()},
                {futureDateString: '2 Months', futureDate: moment().add(2, 'months').toDate()},
                {futureDateString: '3 Months', futureDate: moment().add(3, 'months').toDate()},
                {futureDateString: '4 Months', futureDate: moment().add(4, 'months').toDate()}];

            this.resetForm();
        }

        private addAndSaveBtn = ()=> {
            Actions.AuctionActions.AuctionAdd(this.state);
        };

        private handleInputChange = (name, event)=> {
            var obj:Models.IProductData = {} as Models.IProductData;
            obj[name] = event.target.value;
            this.setState(obj);
        };

        private handleConditionInputChange = (event)=> {
            this.setState({Description: event.target.value} as Models.IProductData);
        };

        private handleBidInputChange = (event)=> {
            var newBid = parseFloat(event.target.value).toFixed(2);
            if (!newBid) {
                return;
            }

            this.setState({StartBid: parseFloat(newBid)} as Models.IProductData);
        };

        private resetForm() {
            var date:Date = moment().toDate();
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
            }
        }

        render():JSX.Element {
            var categoryOptions = CategoryStore.categories.map((category:ICategoryData) =>
                <option key={category.Id} value={category.Id}>{category.Name}</option>);

            var dateOptions = this.futureDates.map((date:Models.IFutureDate, index:number) =>
                <option key={index} value={date.futureDate}>{date.futureDateString}</option>);

            return <Modal size="lg" modalId="saleModal" wrapperClass="sale-form" modalHeader="Add Items For Sale">
                <form className="form">

                    <div className="row">
                        <div className="col-sm-7 col-xs-12">
                            <div className="col-md-2 col-sm-12 col-xs-12">
                                <label className="control-label" for="item">
                                    Item:
                                </label>
                            </div>
                            <div className="col-md-10 col-sm-12 col-xs-12">
                                <div>
                                    <input type="text" className="form-control" id="item" required={true}
                                           value={this.state.Title}
                                           onChange={this.handleInputChange.bind(this, "Title")}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="col-md-3 col-sm-12 col-xs-12">
                                <label className="control-label" for="category">
                                    Category:
                                </label>
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <div>
                                    <select className="form-control" id="category" value={this.state.CategoryId}
                                            onChange={this.handleInputChange.bind(this, "CategoryId")}>
                                        {categoryOptions}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7 col-xs-12">
                            <div className="col-md-2 col-sm-12 col-xs-12">
                                <label className="control-label" for="description">
                                    Description:
                                </label>
                            </div>
                            <div className="col-md-10 col-sm-12 col-xs-12">
                                <div>
                                    <textarea className="form-control" id="description"
                                              value={this.state.Description}
                                              onChange={this.handleInputChange.bind(this, "Description")}
                                              required={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="col-md-3 col-sm-5 col-xs-12">
                                <label className="control-label">
                                    Condition:
                                </label>
                            </div>
                            <div className="col-md-9 col-sm-12 col-xs-12">
                                <div className="radio row">
                                    <label>
                                        <input type="radio" name="condition"
                                               defaultChecked={true} defaultValue="1"
                                               onChange={this.handleInputChange.bind(this, "IsItemConditionNew")}/>
                                        New
                                    </label>
                                </div>
                                <div className="radio row">
                                    <label>
                                        <input type="radio" name="condition" defaultValue="0"
                                               onChange={this.handleInputChange.bind(this, "IsItemConditionNew")}/>
                                        Used
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7 col-xs-12">
                            <div className="col-md-2 col-sm-12 col-xs-12">
                                <label className="control-label" for="photo1">
                                    Photos:
                                </label>
                            </div>
                            <div className="col-md-10 col-sm-12 col-xs-12">
                                <div className="photos-input-container">
                                    <input type="text" className="form-control" id="photo1" value={this.state.Picture1}
                                           onChange={this.handleInputChange.bind(this, "Picture1")} required={true}/>
                                    <input type="text" className="form-control" value={this.state.Picture2}
                                           onChange={this.handleInputChange.bind(this, "Picture2")}/>
                                    <input type="text" className="form-control" value={this.state.Picture3}
                                           onChange={this.handleInputChange.bind(this, "Picture3")}/>
                                    <input type="text" className="form-control" value={this.state.Picture4}
                                           onChange={this.handleInputChange.bind(this, "Picture4")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 col-xs-12">
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <label className="control-label" for="bid">
                                    Start Action bidding at:
                                </label>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-11">
                                <div>
                                    <input type="number" className="form-control" id="bid" value={this.state.StartBid}
                                           onChange={this.handleBidInputChange} step="0.01" min="0.01" required={true}/>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-6 col-xs-1">
                                <label>
                                    NIS
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label className="control-label" for="last">
                                    Lasting for:
                                </label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <select className="form-control" id="last" value={this.state.EndTime}
                                        onChange={this.handleInputChange.bind(this, "EndTime")} required={true}>
                                    {dateOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    {JSON.stringify(this.state)}
                    <div className="row modal-footer sale-footer">
                        <button type="submit" className="btn btn-lg btn-base btn-base-small-color"
                                data-dismiss="modal" aria-label="Close"
                                onClick={this.addAndSaveBtn}
                                disabled="!sellForm.form.valid">
                            save and Preview
                        </button>
                    </div >
                </form >
            </Modal>
        }
    }
}