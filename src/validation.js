(function($, undefined){

	/**
	 * Validation 
	 * @class Validation class
	 * @constructor
	 */
	var Validation = function(){

		var my = this;

		this.MESSAGE_INVALID = "Invalid";

		this.options = {
			debug : false
		};

		this.data = {};
		this.rules = {};
		this.required = [];
		this.errors = {};

		/**
		 * Initialize 
		 * @param Object rules
		 */
		this.init = function(rules){
			this.rules = rules || {};
			this.initRequired();
			return this;
		};

		/**
		 * add rules for validation
		 * addRules({ 
		 *   <filedName> : [ 
		 *     { method : <methodName>, args : <args>, message : <errorMessage> } 
		 *   ] 
		 * })
		 * @param Object rules
		 */
		this.addRules = function(rules){
			$.extend(this.rules, rules);
			this.initRequired();
			return this;
		};

		/**
		 * Clean errors and cached data
		 */
		this.clean = function(){
			this.errors = {};
			this.data = {};
			return this;
		};

		/**
		 * Set data
		 * setData(name, value) or setData({name : value})
		 * @param String|Object
		 * @param Mixed (optional)
		 */
		this.setData = function(){
			var data, args;

			args = arguments;
			data = args[0];
			if(args[1] !== undefined && $._isString(args[0])){
				this.data[args[0]] = args[1];
			} else {
				$.extend(this.data, data);
			}
			return this;
		};

		/**
		 * Get data
		 * @return Object
		 */
		this.getData = function(){
			return this.data;
		};

		/**
		 * Update list of "notEmpty" fields
		 */
		this.initRequired = function(){
			this.required = [];
			$.each(this.rules, function(name, rules){
				$.each(rules, function(index, rule){
					if(rule.method === "notEmpty"){
						my.required.push(name);
						return false;
					}
				});
			});
			return this;
		};

		/**
		 * Get if the field is required (notEmpty)
		 * @param String name
		 */
		this.isRequired = function(name){
			return $.inArray(name, this.required) >= 0;
		};

		/**
		 * Validate a single value
		 * @param String name
		 * @param String value
		 * @param Function callback (optional)
		 * @return $.Deferred
		 */
		this.check = function(name, value, callback){
			var dfd, message;

			dfd = $.Deferred();
			message = null;
			this.setData(name, value);

			switch(true){
				case ! $.valid.notEmpty(value) && ! this.isRequired(name) :
					break;
				case this.rules.hasOwnProperty(name) :
					$.each(this.rules[name], function(index, rule){
						var valid, args;

						args = rule.args ? [].concat(rule.args) : [];
						if(rule.method === "matches"){
							args.push(my.data);
						}
						valid = $.valid._call(rule.method, value, args);
						if(! valid){
							message = rule.message || my.MESSAGE_INVALID;
							return false;
						}
					});
					break;
				default : break;
			}
			if($.isFunction(callback)){
				callback(! message, message);
			}
			dfd.resolve(! message, message);
			return dfd;
		};

		/**
		 * Validate data
		 * @param Object data
		 * @param Function callback (optional)
		 * @return $.Deferred
		 */
		this.validate = function(data, callback){
			var dfd, valid;

			dfd = $.Deferred();
			this.clean();
			this.setData(data);

			$.each(this.rules, function(name, rules){
				var value = data[name] || "";

				my.check(name, value)
				.done(function(valid, message){
					if(! valid){
						my.errors[name] = message;
					}
				});
			});

			valid = $._count(this.errors) === 0;

			if($.isFunction(callback)){
				callback(valid, this.errors, data);
			}
			dfd.resolve(valid, this.errors, data);
			return dfd;
		};

		/**
		 * Validate form element
		 * @param String|jQueryObject form
		 * @param Function callback
		 */
		this.validateForm = function(form, callback){
			var node = form;
			if(! (node instanceof jQuery)){
				node = $(node);
			}
			return this.validate(node.serializeObject(), callback);
		};

		/**
		 * Get errors
		 * @return Object
		 */
		this.getErrors = function(){
			return this.errors;
		};

		/**
		 * Get the latest result
		 * @return Object
		 */
		this.getResult = function(){
			return {
				valid : $._count(this.errors) === 0,
				errors : this.errors
			};
		};

		this.init.apply(this, arguments);
	};

	$.extend($, {
		Validation : Validation
	});

}(jQuery)); 