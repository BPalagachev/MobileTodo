var app = app || {};

app.dataAccess = (function(a) {
    var lists = [];
    var todoes = app.localStorage.getObject("userTodoes") || [];
    
    function init() {
        getAllLists();
    }
    
    init();
    
    function getAllLists() {
        var promise = new RSVP.Promise(function(resolve, reject) {
            lists = app.localStorage.getObject("userLists") || [];
            resolve(lists);
        });
        return promise;
    }

    function addList(todoList) {  
        var promise = new RSVP.Promise(function(resolve, reject) {
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].name == todoList.name) {
                    navigator.notification.vibrate(10000)
                    reject("Name is taken");
                    return;
                }
            } 
            lists.unshift(todoList);
            var name = todoList.name; 
            todoes.unshift({ title: name, items:[] });
            app.localStorage.setObject("userLists", lists);
            app.localStorage.setObject("userTodoes", todoes);
            resolve(todoList);
        });
        
        return promise;
    }
    
    function getAllToDoesForList(name) {
        todoes = app.localStorage.getObject("userTodoes") || [];
        var promise = new RSVP.Promise(function(resolve, reject) {
            for (var i = 0 ; i < todoes.length; i++) {
                if (todoes[i].title == name) {
                    var result = todoes[i];
                    resolve(result);
                    return;
                }
            }
            reject("no such list!");
        });
        return promise;
    }
    
    function addOrUpdateTodoes(name, items) {
        todoes = app.localStorage.getObject("userTodoes") || [];
        var promise = new RSVP.Promise(function(resolve, reject) {
            for (var i = 0 ; i < todoes.length; i++) {
                if (todoes[i].title == name) {
                    todoes.unshift({ title: name, items: items});
                    app.localStorage.setObject("userTodoes", todoes);
                    resolve(todoes[name]);
                    return;
                }
            }
            
            reject("no such list!");
        });
        return promise;
    }

    return {
        getAllLists : getAllLists, 
        addList: addList,
        getAllToDoesForList: getAllToDoesForList,
        addOrUpdateTodoes: addOrUpdateTodoes
    }
}
)(app) 