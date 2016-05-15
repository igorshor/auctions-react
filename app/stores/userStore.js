var NgAuctions;
(function (NgAuctions) {
    var Stores;
    (function (Stores) {
        var UserStoreStatic = (function () {
            function UserStoreStatic() {
                this.userLoginName = 'superUser';
                this.userLoginPassword = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
                this.userName = 'Super User';
                NgAuctions.Services.NetService.authorization(this.userLoginName, this.userLoginPassword);
            }
            return UserStoreStatic;
        }());
        Stores.UserStore = new UserStoreStatic();
    })(Stores = NgAuctions.Stores || (NgAuctions.Stores = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=userStore.js.map