module NgAuctions.Utiles {
    export class EventEmitter {
        private events:{[key:string]:((args?:any)=>void)[]};

        constructor() {
            this.events = {};
        }

        public emit(name:string, args?:any) {
            if (!this.events[name]) {
                return;
            }
            var functions = this.events[name];
            functions.forEach((fn)=>fn(args));
        }

        public on(name:string, fn:(args?:any)=>void) {
            if (this.events[name]) {
                this.events[name].push(fn);
                return;
            }

            this.events[name] = [fn];
        }

        public off(name:string, fn?:(args?:any)=>void){
            if(!this.events[name]){
                return;
            }
            
            if(!fn && this.events[name].length > 0){
                var index:number = this.events[name].indexOf(fn);
                
                if(index > 0){
                    this.events[name].splice(index, 1);
                }
                
                return;
            }

            this.events[name] = [];
        }
    }
}