module NgAuctions.Stores{
    interface IUserStore{
        userLoginName:string;
        userLoginPassword:string;
        userName:string;
    }
    class UserStoreStatic implements IUserStore{
        public userLoginName:string = 'superUser';
        public userLoginPassword:string = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
        public userName:string = 'Super User';

        constructor(){
            Services.NetService.authorization(this.userLoginName, this.userLoginPassword);
        }
    }
    
    export var UserStore = new UserStoreStatic();
}