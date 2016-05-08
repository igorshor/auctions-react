///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface IHeaderProps {

    }

    interface IHeaderState {

    }

    export class Header extends React.Component<IHeaderProps, IHeaderState> {
        render():JSX.Element {
            return <header>
                <img src="styles/images/logo.png"/>
                <div className="user-info">
                    <button className="btn btn-base btn-base-small btn-base-small-color"
                            data-toggle="modal"
                            data-target="#saleModal">
                        SELL
                    </button>
                    <SellForm/>
                    <span>{'Igor Shor'}</span>
                </div>
            </header>
        }

    }
}