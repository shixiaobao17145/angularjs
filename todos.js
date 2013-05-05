var todoApp = angular.module("todoApp", []);
todoApp.factory("copyScope",function(){
    return function(scope){
        var cloneObj = {};
        console.log("origin Obj:");
        console.log(scope);
        for(var key in scope){
            if(key.charAt(0)!='$'){
                console.log("copy:"+key);
                cloneObj[key] = scope[key];
            }else{
                console.log("not copy "+key);
            }
        }
        return cloneObj;

    }
}).filter("task", function () {
    return function (todos, mode) {
        mode = mode || 'all';
        console.log(todos);
        console.log("mode:" + mode);
        var rtn = [];
        var check = function (todo) {
            var ok = false;
            if (mode == 'all') {
                ok = true;
            }
            if (mode == 'done' && todo.done) {
                ok = true;
            } else if (mode == 'undone' && !todo.done) {
                ok = true;
            }
            console.log("ok:" + ok);
            return ok;
        }

        for (var j = 0; j < todos.length; j++) {
            var todo = todos[j];
            if (check(todo)) {
                rtn.push(todo);
            }
        }

        console.log("rtn=>" + rtn);
        return rtn;
    }
});

function todoCtrl($scope,$injector,copyScope) {
    console.log("inject=>");
    console.log($injector.get('copyScope'));
    console.log('copyScope=>');
    console.log(copyScope);
    $scope.init = function () {
        $scope.todos = [];
        $scope.filterMode = 'all';
        $scope.search = '';
    }

    $scope.init();

    $scope.copyScope = function(){

    }

    $scope.getClassByFilter = function (filter) {
        return ($scope.filterMode == filter) ? "active" : "";
    }
    $scope.setFilterMode = function (filter) {
        $scope.filterMode = filter;
    }
    $scope.addNew = function () {
        if (!$scope.new_content) {
            return;
        }
        todos = $scope.todos;
        todos.unshift({
            content: $scope.new_content,
            done: false,
            created: new Date()
        });
        $scope.new_content = '';
        if ($scope.filterMode == 'done') {
            $scope.filterMode = 'all';
        }
    }
    $scope.getDoneOrderClass = function () {
        console.log('getDoneOrderClas filterMode:' + $scope.filterMode);
        var cls = ($scope.filterMode != 'all') ? 'disabled' : '';
        console.log(cls);
        return cls;
    }
}
