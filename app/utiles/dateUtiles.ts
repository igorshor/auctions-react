module NgAuctions.Utiles{
    interface IDateUtiles{
        getFormattedCountDown(endTime:Date):string;
    }
    
    class DateUtilesStatic {
        public getFormattedCountDown(endTime:Date):string {
            var diffTime:number = moment.utc(endTime).diff(moment());
            var duration:moment.Duration = moment.duration(diffTime);
            return `${Math.floor(duration.asHours())}h ${Math.floor(duration.asMinutes()) % 60}m `
        }
    }
    
    export var DateUtiles:IDateUtiles = new DateUtilesStatic();
}