///<reference path="../../_references.ts"/>

module NgAuctions.Services {
    export enum LocationServiceEventID{
        Changed,
        Popped
    }

    export interface ILocationService {
        on(name:string, fn:(args?:any)=>void);
        add(key:string, value:string, trigger:boolean):void
        clear(trigger:boolean):void;
        remove(key:string, trigger:boolean):void;
    }

    class LocationServiceStatic extends Utiles.EventEmitter implements ILocationService {

        constructor() {
            super();
            $(window).on('popstate', ()=> {
                var query:{[param:string]:string} = this.parseQuery(document.location.search);
                this.emit(LocationServiceEventID[LocationServiceEventID.Popped], query);
            });
            $(window).load(()=> {
                var query:{[param:string]:string} = this.parseQuery(document.location.search);
                this.emit(LocationServiceEventID[LocationServiceEventID.Changed], query);
            });

        }
        
        public clear(trigger:boolean):void {
            var query:{[param:string]:string} = this.parseQuery(document.location.search);
            if (query && Object.keys(query).length !== 0 && JSON.stringify(query) !== JSON.stringify({})) {
                history.pushState({}, "", window.location.pathname);
                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        public remove(key:string, trigger:boolean):void {
            var query:{[param:string]:string} = this.parseQuery(document.location.search);

            if (query[key]) {
                delete query[key];
                var queryStr:string = Object.keys(query).length > 0 ? $.param(query) : '';
                history.pushState({}, "", window.location.pathname + queryStr);

                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        public add(key:string, value:string, trigger:boolean) {
            if (!key || !value) {
                return;
            }

            var query:{[param:string]:string} = this.parseQuery(document.location.search) || {};

            var beforeValue:string = query[key];
            query[key] = value;
            history.pushState(query, "", window.location.pathname + '?' + $.param(query));

            if (beforeValue !== value) {
                if (trigger) {
                    this.emit(LocationServiceEventID[LocationServiceEventID.Changed]);
                }
            }
        }

        private parseQuery(qstr:string):{[param:string]:string} {
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