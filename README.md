# lite-promise
Lightest implementation of promise library in JavaScript, Minified version is only 1.5 KB still supporting quote unique features. It execute all promises as fast as possible, and it directly call success or error function when all the promise resolves or rejects without using timers, which make this library superfast.

## Features Supported by this library
* when: run more then once function
* params: holds parameters for functions inside "when" function call.
* success: called when all promises are resolved
* error: called when any of the promise rejects
* cancel: abort the function call and dont call the success or error functions
* progress: called multiple times when promises are resolved. 
* dynamicPromise: will wrap exiting normal javascript function in promise enabled function and return value from your function will be passed in success call and exception will treated as promise rejected.


### Create defered function
```javascript
function method1(val){
	var deferred = new Deferred();
	setTimeout(function(){
	    deferred.resolve(val);
	  },10000)
	return deferred.promise;
}

function method2(){
	var deferred = new Deferred();
	setTimeout(function(){
	    deferred.resolve("method2");
	  },10000)
	return deferred.promise;
}
```

### calling deferred methods
```javascript
lp.when(method1, method2)
.success(function(method1Response, method2Response){
}).error(function(errorMessage1, errorMessage2){
});
```

### Getting status of task completed
```javascript
lp.when(task1, task2)
.progress(function(taskIndex, taskResponse){})
.success(function(status1, status2){})
.error(function(error1, error2){});
```

### configure the individual task parameters
```javascript
lp.when(task1, task2)
.params([parameter list for task1], [parameter list for task 2])
.progress(function(index, response){console.log(index,response);})
.success(function(status1, status2){})
.error(function(error1, error2){});
```
### dynamic promise
```javascript
lp.when(dynamic(task1), task2)
.params([parameter list for task1], [parameter list for task 2])
.progress(function(index, response){console.log(index,response);})
.success(function(status1, status2){})
.error(function(error1, error2){});
```
### jQuery ajax promise support
```javascript
lp.when($.ajax(url:"todo.txt"), task2)
.success(function(status1, status2){})
.error(function(error1, error2){});

```

### cancel all promise
```javascript
var allRunningTask = lp.when($.ajax(url:"todo.txt"), task2)
.success(function(status1, status2){})
.error(function(error1, error2){});

allRunningTask.cancel();
```

#### I am working to improve this library, so your suggestion are much appreciated.

My Email Id: VijayTamar@live.in
