module NgAuctions.Stores{
    import CategoryActions = NgAuctions.Actions.CategoryActions;
    import CategoryActionID = NgAuctions.Actions.CategoryActionID;
    
    export interface ICategoriesStore {
        categoriesNames:string[];
        defaultCategory:string;
        categories:Models.ICategoryData[];
        selectedCategory:Models.ICategoryData
        getCategoryId(name:string):number;
        getCategoryName(id:number):string;
    }

    export class CategoriesStoreStatic extends Utiles.EventEmitter implements ICategoriesStore{
        public categoriesNames:string[] = ['Electronics', 'Fashion', 'Home', 'Books', 'Children', 'Misc.'];
        public defaultCategory = 'All Auctions';
        public categories:Models.ICategoryData[];
        public selectedCategory:Models.ICategoryData;

        constructor(){
            super();
            this.initCategories()
        }

        public getCategoryId(name:string):number {
            return this.categoriesNames.indexOf(name) + 1;
        }

        public getCategoryName(id:number):string {
            return this.categoriesNames[id - 1];
        }

        private initCategories() {
            this.categories = [
                {Id: 0, Name: 'All Auctions'},
                {Id: 1, Name: 'Electronics'},
                {Id: 2, Name: 'Fashion'},
                {Id: 3, Name: 'Home'},
                {Id: 4, Name: 'Books'},
                {Id: 5, Name: 'Children'},
                {Id: 6, Name: 'Misc.'}];

            this.selectedCategory = this.categories[0];
        }

        private selectCategory(categoryID:number){
            this.selectedCategory =  this.categories[categoryID];
            this.emit(CategoryEventID[CategoryEventID.Changed]);
        }
        
        public handelActions = (action) => {
            switch (action.actionType){
                case CategoryActionID[CategoryActionID.Change]:
                    this.selectCategory(action.category);
                    break;
                
            }
        }
    }
    
    export var CategoryStore = new CategoriesStoreStatic();
    AppDispatcher.register(CategoryStore.handelActions);
}