
describe("valid.js : utility method for validation", function(){

	it("alpha() : get if alphabetical", function(){
		expect($.valid.alpha("foobar")).toBe(true);
		expect($.valid.alpha("FooBar")).toBe(true);
		expect($.valid.alpha("foo%bar")).toBe(false);
	});

	it("alphaDash() : get if alphabet, number, dash and underscore", function(){
		expect($.valid.alphaDash("foo_bar")).toBe(true);
		expect($.valid.alphaDash("foo_bar-baz")).toBe(true);
		expect($.valid.alphaDash("foo0123")).toBe(true);
		expect($.valid.alphaDash("foo%bar")).toBe(false);
	});

	it("alphaNumeric() : get if alphabet, number only", function(){
		expect($.valid.alphaNumeric("foobar2000")).toBe(true);
		expect($.valid.alphaNumeric("foo-bar-2000")).toBe(false);
		expect($.valid.alphaNumeric("foo_bar_2000")).toBe(false);
	});

	it("colorHex() : get if color hex string", function(){
		expect($.valid.colorHex("#fff")).toBe(true);
		expect($.valid.colorHex("#ffffff")).toBe(true);
		expect($.valid.colorHex("fff")).toBe(true);
		expect($.valid.colorHex("ffffff"));
		expect($.valid.colorHex("#f6f6f6")).toBe(true);
		expect($.valid.colorHex("#f6f6f6f")).toBe(false);
	});

	it("creditCard() : get if valid credit card number", function(){
		expect($.valid.creditCard("3012345678901234")).toBe(true);
		expect($.valid.creditCard("301234567890")).toBe(false); // too short
		expect($.valid.creditCard("301234567890123456")).toBe(false); // too long
		expect($.valid.creditCard("0123456789012345")).toBe(false); // prefix wrong
	});

	it("date() : get if valid date string", function(){
		expect($.valid.date("2013/5/1")).toBe(true);
		expect($.valid.date("2013/05/01")).toBe(true);
		expect($.valid.date("2013-05-01")).toBe(false);
		expect($.valid.date("2013-05-01", "^[\\d]{4}\-[\\d]{1,2}\-[\\d]{1,2}$")).toBe(true);
	});

	it("decimal() : get if valid decimal string", function(){
		expect($.valid.decimal("123")).toBe(true);
		expect($.valid.decimal("123.0")).toBe(true);
		expect($.valid.decimal("123.")).toBe(false);
		expect($.valid.decimal("123.45")).toBe(true);
		expect($.valid.decimal("-123.45")).toBe(false);
		expect($.valid.decimal("+123.45")).toBe(false);
		expect($.valid.decimal("123.45", 2, 3)).toBe(true);
		expect($.valid.decimal("12.345", 2, 3)).toBe(false);
	});

	it("digit() : get if valid digit string", function(){
		expect($.valid.digit("123")).toBe(true);
		expect($.valid.digit("123.45")).toBe(false);
	});

	it("email() : get if valid email string", function(){
		expect($.valid.email("foo@example.com")).toBe(true);
		expect($.valid.email("foo-bar.baz@mx.exam-ple.com")).toBe(true);
		expect($.valid.email("foo@bar@example.com")).toBe(false);
		expect($.valid.email("foo_example.com")).toBe(false);
		expect($.valid.email(".foobar@example.com")).toBe(false);
	});

	it("equals() : get if one value equals to second", function(){
		expect($.valid.equals("a", "a")).toBe(true);
		expect($.valid.equals("a", "b")).toBe(false);
		expect($.valid.equals("", "")).toBe(true);
		expect($.valid.equals("foo", String("foo"))).toBe(true);
	});

	it("exactLength() : get if length is exact", function(){
		expect($.valid.exactLength("foobar", 6)).toBe(true);
		expect($.valid.exactLength("foobar", 4)).toBe(false);
		expect($.valid.exactLength("foobar", 7)).toBe(false);
	});

	it("matches() : get if the value equals to one in data", function(){
		var data = { "foo" : "bar", "hoge" : "fuga" };
		expect($.valid.matches("bar", "foo", data)).toBe(true);
		expect($.valid.matches("fuga", "hoge", data)).toBe(true);
		expect($.valid.matches("foobar", "foo", data)).toBe(false);
		expect($.valid.matches("foobar", "baz", data)).toBe(false);
	});

	it("maxLength() : get if string length is shorter than or equal to min", function(){
		expect($.valid.maxLength("foobar", 6)).toBe(true); // equals is ok
		expect($.valid.maxLength("foobar", 7)).toBe(true);
		expect($.valid.maxLength("foobar", 5)).toBe(false);
	});

	it("minLength() : get if string length is longer than or equal to min", function(){
		expect($.valid.minLength("foobar", 6)).toBe(true);
		expect($.valid.minLength("foobar", 5)).toBe(true);
		expect($.valid.minLength("foobar", 7)).toBe(false);
	});

	it("notEmpty() : get if value is not empty", function(){
		expect($.valid.notEmpty("foobar")).toBe(true);
		expect($.valid.notEmpty("")).toBe(false);
		expect($.valid.notEmpty(null)).toBe(false);
		expect($.valid.notEmpty(undefined)).toBe(false);
		expect($.valid.notEmpty([])).toBe(false);
	});

	it("numeric() : get if value is numeric string", function(){
		expect($.valid.numeric("123")).toBe(true);
		expect($.valid.numeric("foobar")).toBe(false);
		expect($.valid.numeric("-123.45")).toBe(true);
		expect($.valid.numeric("+123.45")).toBe(true);
		expect($.valid.numeric("123.")).toBe(false);
	});

	it("phone() : get if valid phone number string (just count the numeric character", function(){
		expect($.valid.phone("123-456-7890")).toBe(true);
		expect($.valid.phone("0123-456-7890")).toBe(true);
		expect($.valid.phone("0-1-2-3-4-5-6-7-8-9-0")).toBe(true);
		expect($.valid.phone("123_456_7890")).toBe(true);
		expect($.valid.phone("123-456-789")).toBe(false);
		expect($.valid.phone("0123-456-78901")).toBe(false);
	});

	it("rangeLength() : get if string length is in range", function(){
		expect($.valid.rangeLength("foobar", 5, 7)).toBe(true);
		expect($.valid.rangeLength("foobar", 6, 6)).toBe(true);
		expect($.valid.rangeLength("foobar", 5, 6)).toBe(true);
		expect($.valid.rangeLength("foobar", 6, 7)).toBe(true);
		expect($.valid.rangeLength("foobar", 7, 8)).toBe(false);
		expect($.valid.rangeLength("foobar", 4, 5)).toBe(false);
	});

	it("range() : get if number is in range", function(){
		expect($.valid.range("5", 4, 6)).toBe(true);
		expect($.valid.range(5, 4, 6)).toBe(true);
		expect($.valid.range(5, 4, 5)).toBe(true);
		expect($.valid.range(5, 5, 5)).toBe(true);
		expect($.valid.range(5, 5, 6)).toBe(true);
		expect($.valid.range(5, 6, 7)).toBe(false);
		expect($.valid.range(5, 3, 4)).toBe(false);
	});

	it("regex() : get if value matches to pattern", function(){
		expect($.valid.regex("foobar", /^foobar$/)).toBe(true);
		expect($.valid.regex("foobar", "^foobar$")).toBe(true);
	});

	it("url() : get if valid url string", function(){
		expect($.valid.url("http://www.example.com")).toBe(true);
		expect($.valid.url("https://www.example.com:80/the/path")).toBe(true);
		expect($.valid.url("http:www.example.com")).toBe(false);
		expect($.valid.url("http://www.example.com/${}")).toBe(false);
		expect($.valid.url("www.example.com")).toBe(false);
	});

	it("_call() : call the method with arguments", function(){
		expect($.valid._call("email", "foo@example.com")).toBe(true);
		expect($.valid._call("exactLength", "foobar", [6])).toBe(true);
	});

	it("_add() : add custom method", function(){
		var method = function(value){
			return value === "foobar";
		};
		expect($.valid._add("isFoobar", method)).toBe(true);
		expect($.valid.isFoobar("foobar")).toBe(true);
		expect($.valid._add("isFoobar", function(){})).toBe(false);
		expect($.valid._add("isFoobar", function(){}, true)).toBe(true);
		expect($.valid._add("isFoobar", "hoge", true)).toBe(false);
		expect($.valid._add("_add", function(){}, true)).toBe(false);
	});

});