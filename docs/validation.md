
# $.Validation

Utility class for validation

## Methods

### init([rules:Object]) : $.Validation

Construct instance and initialize rules  
This is called when an instance initialized

```
var myValidation = new $.Validation({
	"name" : [
		{ method : "notEmpty", message : "Please input your name." },
		{ method : "maxLength", args : [100], message : "Too long name." }
	]
	"email" : [
		{ method : "notEmpty", message : "Please input your mail address." },
		{ method : "email", message : "Please input correct email address." }
	]
});
```

### addRules(rules:Object) : $.Validation

Extend rules

```
myValidation.addRules({
	"url" : [
		{ method : "url", message : "Please input correct url" }
	]
});
```

### check(name:String, value:String [,callback:Function]) : $.Deferred

Validate single field with a value  
Pass the result to $.Deferred object by resolve, or callback if set,
with arguments as below

- valid : Boolean (value is valid or not)
- message : String (error message if invalid)

```
myValidation.check("email", "foo@example.com")
.then(function(valid, message){ ... });
```

### validate(data:Object [,callback:Function]) : $.Deferred

Validate data passed as object  
Pass the result to $.Deferred object by resolve, or callback if set, 
with arguments as below

- valid : Boolean (all values are valid or not)
- errors : Object (set of field name and error message)
- data : Object (data passed)

```
myValidation.validate(data)
.then(function(valid, errors, data){ ... });
```

### validateForm(form:Mixed [,callback:Function]) : $.Deferred

Validate form element passed as HTMLFormElement, selector string or jQuery object.  
This pass data and callback to $.Validation.validate() and return the its result.

```
my.Validation.validate("#my-form")
.then(function(valid, errors, data){ ... });
```

### getErrors() : Object

Get errors in the latest validation as object like this

```
{
	"name" : "Too long name.",
	"email" : "Please input correct email address."
}
```

### getResult() : Object

Get result in the latest validation as object like this

```
{
	"valid" : false,
	"errors" : {
		"email" : "Please input correct email address."
	}
}
```

## Optional Methods

Maybe you don't need to call them,
but just in case, these are public.

### clean() : $.Validation

Clean cached errors and data

### setData(data:Object) : $.Validation
### setData(name:String, value:String) : $.Validation

Set data to validate with object or field name and value

### getData() : Object

Get the latest passed data

### initRequired() : $.Validation

Initialize mandatory fields from data

### isRequired(name:String) : Boolean

Get if the field is mandatory or not
