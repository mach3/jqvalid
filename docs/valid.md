
# $.valid

Collection of functions to validation

## Validation method

### alpha(value:String) : Boolean

Get if value is alphabetical string

```
$.valid.alpha("foobar"); // true
$.valid.alpha("123"); // false
```

### alphaDash(value:String) : Boolean

Get if value consists of alphabet and dash

```
$.valid.alphaDash("foo-bar"); // true
$.valid.alphaDash("foo_bar"); // false;
```

### alphaNumeric(value:String) : Boolean

Get if value consists of alphabet and number string

```
$.valid.alphaNumeric("foo123"); // true
$.valid.alphaNumeric("foo-123"); // false
```

### colorHex(value:String) : Boolean

Get if value is color hex string like "#ffffff", "#fff", "ffffff" or "fff"

```
$.valid.colorHex("#f6f6f6"); // true
$.valid.colorHex("#foobar"); // false
```

### creditCard(value:String) : Boolean

Get if value is valid credit card number string

```
$.valid.creditCard("1234567890123456"); // true
$.valid.creditCard("1234-5678-9012-3456"); // false
$.valid.creditCard("0123456789012345"); // false (no credit card number starting with "0")
```

### date(value:String [, pattern:String]) : Boolean

Get if value is valid date string  
"pattern" is string or regular expression object for date format

```
$.valid.date("2013/05/01"); // true
$.valid.date("2013-05-01"); // false
$.valid.date("2013-05-01", /[\d]{4}\-[\d]{2}\-[\d]{2}/); // true
```

### decimal(value:String [,places:Integer [,digit:Integer]]) : Boolean

Get if value is valid decimal string

```
$.valid.decimal("123"); // true
$.valid.decimal("123.45"); // true
$.valid.decimal("123.456", 2); // false (decimal place must be 2)
$.valid.decimal("123.45", 2, 2); // false (digit must be 2)
```

### digit(value:String) : Boolean

Get if value consists of number string only

```
$.valid.digit("12345"); // true
$.valid.digit("123.45"); // false
```

### email(value:String) : Boolean

Get if value is valid email string

```
$.valid.email("foo@example.com"); // ture
```

### equals(value:String, required:String) : Boolean

Get if two values equal eatch other

```
$.valid.equals("foo", "foo"); // true
$.valid.equals("foo", "bar"); // false
```

### exactLength(value:String, length:Integer) : Boolean

Get if length of value is equal to length

```
$.valid.exactLength("foo", 3); // true
$.valid.exactLength("foobar", 3); // false
```

### matches(value:String, name:String, data:Object) : Boolean

Get if value is equal to object data's value with a name

```
var data = { foo : "bar" };
$.valid.matches("bar", "foo", data); // true
$.valid.matches("baz", "foo", data); // false
```

### maxLength(value:String, length:Integer) : Boolean

Get if length of value is less than or equal to length

```
$.valid.maxLength("foobar", 6); // true
$.valid.maxLength("foobarbaz", 6); // false
```

### minLength(value:String, length:Integer) : Boolean

Get if length of value is more than or equal to length

```
$.valid.minLength("foobar", 6); // true
$.valid.minLength("foo", 6); // false

```

### notEmpty(value:String) : Boolean

Get if value is not empty

```
$.valid.notEmpty("foo"); // true
$.valid.notEmpty(""); // false
```

### numeric(value:String) : Boolean

Get if value is numeric

```
$.valid.numeric("12345"); // true
$.valid.numeric("-123.45"); // true
$.valid.numeric("100%"); // false
```

### phone(value:String [,min:Integer [,max:Integer]]) : Boolean

Get if value is valid phone number string  
(Just count number string)

```
$.valid.phone("00000000000"); // true
$.valid.phone("000-0000-0000"); // true
$.valid.phone("000(0000)0000"); // true
$.valid.phone("000-0000-0000-000"); // falss (too long)
$.valid.phone("000-0000-0000-000", 10, 14); // true
```

### rangeLength(value:String, min:Integer, max:Integer) : Boolean

Get if length of value is in range from min to max

```
$.valid.rangeLength("foobar", 5, 7); // true
$.valid.rangeLength("foobarbaz", 5, 7); // false
$.valid.rangeLength("foo", 5, 7); // false
```

### range(value:String, min:Integer, max:Integer) : Boolean

Get if value (numeric string) is in range from min to max

```
$.valid.range("8", 6, 10); // true
$.valid.range("12", 6, 10); // false
```

### regex(value:String, pattern:String|RegExp) : Boolean

Get if value matches pattern

```
$.valid.matches("foobar", /^f.+r$/); // true
$.valid.matches("foobar", "^f.+?$"); // true
```

### url(value:String) : Boolean

Get if value is valid url string

```
$.valid.url("http://www.example.com"); // true
```


-----

## Extention method

### _call(method:String, value:String, args:Array) : Boolean

Call validation method in member of $.valid and return the result

```
$.valid._call("email", "foo@example.com"); // true
$.valid._call("maxLength", "foobar", [6]); // true
```

### _add(name:String, method:Function [,force:Boolean]) : Boolean

Add new method to $.valid if it doesn't have the same named method  
(If `force = true`, override it)

```
var isFoo = function(value){
	return value === "foo";
};
$.valid._add("isFoo", isFoo);
$.valid.isFoo("foo"); // true
```







