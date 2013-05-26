
# Extentions

Extentions for jQuery in src/extend.js

## $

### _isString(value:Mixed) : Boolean

Get if a type of value is string

```
$._isString("foobar"); // true
$._isString([1,2,3]); // false
```


### _toString(value:Mixed) : String

Cast type of the value to string

```
$._toString([1,2,3]); // "1,2,3"
$._toString(123); // "123"
```

### _sprintf(str:String /*, arg1, arg2, ... */) : String

Get formatted string

```
var format = "%s-%s-%s";
var result = $._sprintf(format, "foo", "bar", "baz"); // "foo-bar-baz"
```

### _count(obj:Object [, filter:Function]) : Integer

Get how many members are in object

```
var obj = { a: "foo", b: "bar", c: "baz" };
$._count(obj); // 3
$._count(obj, function(value){ /^b/.test(value); }); // 2
```

## $.fn

### serializeObject() : Object

Encode a set of form elements as object

```
$("#my-form").serializeObject();
// this return as below
{
	"name" : "john",
	"age" : "20",
	"checkbox" : ["a", "b", "c"]
};
```



