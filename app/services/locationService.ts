///<reference path="../../_references.ts"/>

module NgAuctions.Services {
    export enum LocationServiceEventID{
        Changed,
    }

    export interface ILocationService {
        on(name:string, fn:(args?:any)=>void);
        add(key:string, value:string, trigger:boolean):void
        clear(trigger:boolean):void;
        remove(key:string, trigger:boolean):void;
    }

    class LocationServiceStatic extends Utiles.EventEmitter implements ILocationService {
        private queryParams:{[param:string]:string};
        private initialized:boolean;

        constructor() {
            super();
            this.initialized = false;
            this.queryParams = {};
            $(($)=> {
                var query:{[param:string]:string} = this.parseQuery(document.location.search);
                if (query && Object.keys(query).length > 0) {
                    this.queryParams = query;
                    history.pushState({}, "", window.location.pathname);
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed], query);
                }
            })
        }

        public clear(trigger:boolean):void {
            if (Object.keys(this.queryParams).length !== 0 && JSON.stringify(this.queryParams) !== JSON.stringify({})) {
                this.queryParams = {};
                history.pushState({}, "", window.location.pathname);
                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        public remove(key:string, trigger:boolean):void {
            if (this.queryParams[key]) {
                delete this.queryParams[key];
                this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                history.pushState({}, "", window.location.pathname);
                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        public add(key:string, value:string, trigger:boolean) {
            if (!key || !value) {
                return;
            }

            var beforeValue:string = this.queryParams[key];

            this.queryParams[key] = value;
            history.pushState({}, "", window.location.pathname + '?' + $.param(this.queryParams));

            if (beforeValue !== value) {
                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        private parseQuery(qstr):{[param:string]:string} {
            if (!qstr) {
                return;
            }

            var query:{[param:string]:string} = {};
            var a = qstr.substr(1).split('&');
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }
            return Object.keys(query).length > 0 ? query : undefined;
        }

    }
    export var LocationService:ILocationService = new LocationServiceStatic();
}