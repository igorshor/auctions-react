///<reference path="../../_references.ts"/>

module NgAuctions.Services {

    import Base64 = NgAuctions.Utiles.Base64;
    export interface INetService {
        authorization(user:string, password:string):void
        getAuctions():JQueryXHR;
        getAuction(id:string):JQueryXHR;
        deleteAuction(id:string):JQueryXHR;
        createAuction(product:Models.IProductData):JQueryXHR;
        addBid(auctionId:string, bid:Models.IBidData):JQueryXHR;
    }

    class NetServiceStatic implements INetService {
        private baseUrl:string;
        private headers:{[header:string]:string};

        constructor() {
            this.baseUrl = '//auctions-igorshor.c9users.io/';
        }

        public authorization(user:string, password:string) {
            var encoded:string = Utiles.Base64
                .encode(user + ':' + password);
            var token:string = 'Basic ' + encoded;
            this.headers = {'Authorization': token}
        }

        public getAuctions():JQueryXHR {
            return $.ajax({
                url: `${this.baseUrl}api/auctions`,
                type: 'GET',
                headers: this.headers
            });
        }

        public getAuction(id:string):JQueryXHR {
            return $.ajax({
                url: `${this.baseUrl}api/auctions/${id}`,
                type: 'GET',
                headers: this.headers
            });
        }

        public deleteAuction(id:string):JQueryXHR {
            return $.ajax({
                url: `${this.baseUrl}api/auctions/${id}`,
                type: 'DELETE',
                headers: this.headers
            });
        }

        public createAuction(product:Models.IProductData):JQueryXHR {
            return $.ajax({
                url: `${this.baseUrl}api/auctions`,
                type: 'POST',
                headers: this.headers,
                data: JSON.stringify(product)
            });
        }

        public addBid(auctionId:string, bid:Models.IBidData):JQueryXHR {
            return $.ajax({
                url: `${this.baseUrl}api/bids/${auctionId}`,
                type: 'POST',
                headers: this.headers,
                data: JSON.stringify(bid)
            });
        }
    }
    
    export var NetService:INetService = new NetServiceStatic();
}