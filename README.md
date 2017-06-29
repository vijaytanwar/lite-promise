# lite-promise
Lightest implementation of promise library in JavaScript, Minified version is only 1.5 KB still supporting quote unique features.

##Features Supported by this library##
* when: run more then once function
* params: holds parameters for functions inside "when" function call.
* success: called when all promises are resolved
* error: called when any of the promise rejects
* cancel: abort the function call and dont call the success or error functions
* progress: called multiple times when promises are resolved. 


#Create defered function
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

#calling deferred methods

