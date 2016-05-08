///<reference path="../../_references.ts"/>

module NgAuctions.Components {
    interface ILayoutProps {

    }

    interface ILayoutState {

    }

    export class Layout extends React.Component<ILayoutProps, ILayoutState> {
        public render():JSX.Element {
            return <div className="app-wrapper">
                <Header/>
                <Nav/>
                <Content/>
                <Footer/>
            </div>
        }

    }
}