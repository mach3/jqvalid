
describe("validation.js : Validation controller library", function(){

	it("init() : construct and configure", function(){
		var v = new $.Validation({
			"email" : [ { "method" : "email" }]
		});
		expect(v.rules).toEqual({"email" : [{"method" : "email"}]});
	});

	it("addRules() : add rule", function(){
		var v = new $.Validation();
		v.addRules({
			"email" : [{ method : "email" }]
		});
		v.addRules({
			"name" : [{ method : "notEmpty" }]
		});
		expect(v.rules).toEqual({
			"name" : [{ method : "notEmpty" }],
			"email" : [{ method : "email" }]
		});
	});

	it("check() : check single data", function(){
		var v = new $.Validation({
			"email" : [{method:"email", message:"invalid email"}]
		});

		v.check("email", "foo@example.com")
		.done(function(valid, message){
			expect(valid).toBe(true);
		});

		v.check("email", "foobar")
		.done(function(valid, message){
			expect(valid).toBe(false);
			expect(message).toBe("invalid email");
		});
	});

	it("validate() : check fields", function(){
		var v = new $.Validation();

		v.addRules({
			"name" : [
				{ method : "notEmpty", message : "empty" },
				{ method : "maxLength", args : [8], message : "too long" }
			],
			"email" : [
				{ method : "notEmpty", message : "empty" },
				{ method : "email", message : "invalid email" }
			]
		});

		v.validate({
			"name" : "",
			"email" : ""
		})
		.done(function(valid, messages){
			expect(valid).toBe(false);
			expect(messages).toEqual({name:"empty", email:"empty"});
		});

		v.validate({
			"name" : "foobarbaz",
			"email" : "this is not email"
		})
		.done(function(valid, messages){
			expect(valid).toBe(false);
			expect(messages).toEqual({name:"too long", email:"invalid email"});
		});

		v.validate({
			"name" : "foobar",
			"email" : "foo@example.com"
		})
		.done(function(valid, messages, data){
			expect(valid).toBe(true);
		});
	});

	it("getData() / getErrors() / getResult() : get cached data and errors", function(){
		var v = new $.Validation({
			"name" : [ { method : "notEmpty" , message : "name is empty" } ],
			"email" : [ { method : "email", message : "invalid email"} ]
		});

		v.validate({
			"name" : "",
			"email" : "foobar"
		});

		expect(v.getErrors()).toEqual({name:"name is empty", email:"invalid email"});
		expect(v.getData()).toEqual({name:"", "email":"foobar"});
		expect(v.getResult()).toEqual({
			valid : false,
			errors : {
				name : "name is empty",
				email : "invalid email"
			}
		});
	});


});