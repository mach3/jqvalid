

describe("extend.js : utility functions to extend jQuery", function(){

	it("_isString() : get if value is string", function(){
		var a = [
			$._isString("foo"),
			$._isString(new String("foo")),
			$._isString(String("foo")),
			$._isString({}.toString())
		];
		expect(a).toEqual([true, true, true, true]);
	});

	it("_toString() : cast type to String", function(){
		var a = [
			$._toString("foo"),
			$._toString(0),
			$._toString(123),
			$._toString(true),
			$._toString(false),
			$._toString([1,2,3]),
			$._toString({foo:"bar"})
		];
		var b = [
			"foo", "0", "123", "true", "false", "1,2,3", "[object Object]"
		];
		expect(a).toEqual(b);
	});

	it("_sprintf() : get formatted string", function(){
		expect($._sprintf("%s/%s/%s", "foo", "bar", "baz"))
		.toBe("foo/bar/baz");

		expect($._sprintf("%s/%s", "foo", "bar", "baz"))
		.toBe("foo/bar");

		expect($._sprintf("%s%%s", "foo", "bar"))
		.toBe("foo%bar");

		expect($._sprintf("%s/%s/%s", "foo", "bar"))
		.toBe("foo/bar/%s");

		expect($._sprintf("%s/%s/%s", "%s", "foo", "bar"))
		.toBe("foo/bar/%s");
	});

	it("_count() : count object's member", function(){
		var o, a, f;

		o = { a : true, c : false, d : true };
		a = [1,2,3];
		f = { a:"foo", b:"bar", c:"baz" };
		
		expect($._count(o)).toBe(3);
		expect($._count(a)).toBe(3);
		expect($._count(f, function(value){ return /^b/.test(value); })).toBe(2);
	});


});
