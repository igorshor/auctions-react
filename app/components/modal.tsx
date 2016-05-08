///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IModalProps {
        size:string;
        wrapperClass:string;
        modalId:string;
        modalHeader:string;
    }

    interface IModalState {

    }

    export class Modal extends React.Component<IModalProps, IModalState> {
        constructor(props) {
            super(props);
        }

        public render():JSX.Element {
            return <div className="modal fade" id={this.props.modalId} tabindex="-1" role="dialog"
                        aria-labelledby="saleModalLabel">
                <div className={"modal-dialog modal-" + this.props.size} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                            {this.props.modalHeader}
                        </div>
                        <div className={"modal-body "+this.props.wrapperClass}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}
