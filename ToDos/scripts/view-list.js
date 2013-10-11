var app = app || {};

app.viewList = (function(a) {
    var currentItems;
    var previousSelectedItem = "";
    
    var viewModel = kendo.observable({
        title: "",
        items: [],
        currentName: ""
    });
   
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var listName = e.view.params.listName;
        viewModel.set("title", listName); 
        updateLists(listName);
    }
    
    function updateLists(name) {
        return a.dataAccess.getAllToDoesForList(name).then(function(data) {
            currentItems = data;
            viewModel.set("items", data.items);        
        });
    }
    
    function handleState(e) {
        var name = this.element[0].id;
        
        for (var i = 0; i < currentItems.items.length; i++) {
            if (currentItems.items[i].name == name) {
                currentItems.items[i].isCompleted = !(currentItems.items[i].isCompleted);
                console.log(currentItems.items[i].isCompleted);
                viewModel.set("items", currentItems.items);  
                a.dataAccess.addOrUpdateTodoes(currentItems.title, currentItems.items);
                break;
            }
        }
    }

    function selectCurrentElement(e) {
        var name = this.element[0].id;
        viewModel.set("currentName", name); 
        previousSelectedItem = name;
    }
    
    function handleAddOrUpdate(e) {
        var name = viewModel.currentName;
        
        for (var i = 0; i < currentItems.items.length; i++) {
            if (currentItems.items[i].name == previousSelectedItem) {
                currentItems.items[i].name = name;
                viewModel.set("items", currentItems.items);  
                a.dataAccess.addOrUpdateTodoes(currentItems.title, currentItems.items);
                previousSelectedItem = "";
                return;
            }
        }
        
        currentItems.items.unshift({
            name: name,
            isCompleted: false
        });
        previousSelectedItem = "";
        viewModel.set("items", currentItems.items);  
        a.dataAccess.addOrUpdateTodoes(currentItems.title, currentItems.items);
    }
    
    return {
        init : init,
        handleState: handleState,
        selectCurrentElement: selectCurrentElement,
        handleAddOrUpdate: handleAddOrUpdate
    }
})(app) 