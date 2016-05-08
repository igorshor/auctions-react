///<reference path="../_references.ts"/>

module NgAuctions {
    import Layout = Components.Layout;
    import Router = ReactRouter.Router;
    import Route = ReactRouter.Route;
    import hashHistory = ReactRouter.hashHistory;
    import browserHistory = ReactRouter.browserHistory;
    
    const app = document.getElementById('app');
    ReactDOM.render(<Layout/>, app)
}