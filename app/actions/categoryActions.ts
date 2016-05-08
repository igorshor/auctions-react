module NgAuctions.Actions {
    interface ICategoryActions{
        CategorySelect(category:number):void
    }
    
    class CategoryActionsStatic{
        public CategorySelect(category:number):void {
            AppDispatcher.dispatch({
                actionType: CategoryActionID[CategoryActionID.Change],
                category
            })
        }
    }

    export var CategoryActions = new CategoryActionsStatic();
}