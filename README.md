
# jqValid

Validation utility for jQuery

## Features

- Class $.Validation to validate values in an object or form elements
- Just return the messages when something invalid
- Define validation rules as object
- Validate single value with $.valid
- And some functions to support validation


## Basic Usage

### Define rules

Define rules for validation as below

```
var rules = {
	name : [
		{ method : "notEmpty", message : "Please input your name." },
		{ method : "maxLength", args : [100], message : "Please input within 100 characters" }
	],
	email : [
		{ method : "email", message : "Please input correct email address." }
	]
};
```

- "method" must be method in $.valid.
- "args" may be required in some method (optional).
- "message" will be returned when value is invalid.



### Initialize $.Validation

Initialize $.Validation instance with passing the rule.

```
var myValidation = new $.Validation(rules);
```

### Validation form and get result (validateForm)

Pass HTMLFormElement or selector string to $.Validation.validateForm(), then get result for validation in callback.
This returns $.Deferred object.

```
myValidation.validateForm("form#my-form")
.then(function(valid, messages, data){
	// valid : Boolean (values are all valid or not)
	// messages : Object (error messages)
	// data : Object (values passed to validate)
});
```

You can also pass a callback function as second argument as below.

```
myValidation.validateForm("form#my-form", function(){ ... });
```

Or you can get result without callback. 
$.Validation.getErrors() returns all error messages in the latest validation.

```
myValidation.validateForm({...});
var errors = myValidation.getErrors(); // Get messages as object
```

### Validate object (validate)

You can pass an object to $.validate()


```
myValidation.validateForm({
	name : "foo",
	email : "foo@example.com"
});
```

### Check single value (check)

```
myValidation.check("email", "foo@example.com")
.then(function(valid, message){
	// valid : Boolean (valid or not)
	// message : String (error message when invalid)
});
```

### Then, what ?

That's all jqValid does.

You want to show an error message besides the input element ?  
Sorry, but write by yourself using the result returnd by jqValid...


## Todo

- write README (ja)
- write API Docs 

## Author

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)

