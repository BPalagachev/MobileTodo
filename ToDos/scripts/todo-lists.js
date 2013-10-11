var app = app || {};

app.todoLists = (function(a) {
    var viewModel = kendo.observable({
        lists : []
    })
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        updateLists();
    }
    
    function updateLists() {
        return a.dataAccess.getAllLists().then(function(data) {
            viewModel.set("lists", data);        
        });
    }
    
    function navigateTo(e){
        var target = this.element[0].id;
        
        app.application.navigate("views/view-list.html#view-list?listName="+target);
    }
    
    return {
        init : init, 
        navigateTo: navigateTo
    }
})(app) 