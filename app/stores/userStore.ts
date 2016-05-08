module NgAuctions.Stores{
    interface IUserStore{
        userLoginName:string;
        userLoginPassword:string;
        userName:string;
    }
    class UserStoreStatic implements IUserStore{
        public userLoginName:string = 'igors';
        public userLoginPassword:string = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
        public userName:string = 'Igor S';
    }
    
    export var UserStore = new UserStoreStatic();
}