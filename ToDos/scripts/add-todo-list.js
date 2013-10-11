var app = app || {};

app.addTodoList = (function(a) {    
    var viewModel = kendo.observable({
        name: "",
        status: ""
    })
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        viewModel.set("name", "Enter Name");        
    }
    
    function handleAddList() {
        var name = viewModel.get("name");
        
        var todoList = {
            name: name,
        };
        
        app.dataAccess.addList(todoList).then(function(data){
            viewModel.set("status", "Todo added");        
        }, function(error){
            viewModel.set("status", error);        
        });
    }
    
    return {
        init : init, 
        handleAddList: handleAddList
    }
})(app) 