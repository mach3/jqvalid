/**
 * jqValid
 * -------
 * Validation utility for jQuery
 *
 * @version 0.9.0
 * @require jQuery
 * @author mach3 <http://github.com/mach3>
 * @url http://github.com/mach3/jqvalid
 *
 */
 (function($, undefined){

	$.extend($, {
		/**
		 * Get if value is string
		 * @param Mixed value
		 */
		_isString : function(value){
			return (typeof value === "string" || value instanceof String);
		},

		/**
		 * Cast value's type to string
		 * @param Mixed value
		 */
		_toString : function(value){
			if(value === undefined || value === null){
				value = "";
			}
			return value.toString();
		},

		/**
		 * Get formatted string
		 * @param String str
		 * @example 
		 *   var result = $._sprintf("%s-%s", "foo", "bar"); // => "foo-bar"
		 */
		_sprintf : function(str /* value1, value2, value3 ... */){
			var args = Array.prototype.splice.call(arguments, 1);
			$.each(args, function(index, value){
				str = str.replace("%s", value);
			});
			return str;
		}
	});

	$.fn.extend({
		/**
		 * Serialize form as object
		 */
		serializeObject : function(){
			var data = {};
			$.each(this.serializeArray(), function(i, item){
				if(data.hasOwnProperty(item.name)){
					if(! $.isArray(data[item.name])){
						data[item.name] = [data[item.name]];
					}
					data[item.name].push(item.value);
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		}
	});

}(jQuery));
(function($){

	/**
	 * Valid
	 */
	var Valid = {

		/**
		 * Check if valid alphabetical string
		 * @param String value
		 */
		alpha : function(value){
			return (/^[a-zA-Z]*?$/).test(value);
		},

		/**
		 * Check if consits of alphabet and dash
		 * @param String value
		 */
		alphaDash : function(value){
			return (/^[\w\-]*?$/).test(value);
		},

		/**
		 * Check if consists of alphabet and number
		 * @param String value
		 */
		alphaNumeric : function(value){
			return (/^[a-zA-Z0-9]*?$/).test(value);
		},

		/**
		 * Check if valid color hex string
		 * @param String value
		 */
		colorHex : function(value){
			return (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i).test(value);
		},

		/**
		 * Check if valid credit card number
		 * @param String value
		 */
		creditCard : function(value){
			return (/^[13456][\d]{13,15}$/).test(value);
		},

		/**
		 * Check if valid date
		 * Pass the expression for date format as string
		 * @param String value
		 * @param String pattern
		 */
		date : function(value, pattern){
			pattern = pattern || "^\\d{4}\/\\d{1,2}\/\\d{1,2}$";
			return this.regex(value, pattern);
		},

		/**
		 * Check if valid decimal string
		 * @param String value
		 * @param Integer places
		 * @param Integer digits
		 */
		decimal : function(value, places, digits){
			var p, d, pattern;

			p = places ? "{" + parseInt(places, 10) + "}" : "+";
			d = digits ? "{" + parseInt(digits, 10) + "}" : "+";
			pattern = "^[\\d]" + d + "(\.[\\d]" + p + ")?$";
			return this.regex(value, pattern);
		},

		/**
		 * Check if valid digit string
		 * @param String value
		 */
		digit : function(value){
			return (/^\d+?$/).test(value);
		},

		/**
		 * Check if valid email address
		 * @param String value
		 */
		email : function(value){
			var u, d, a, reg;

			u = "[a-zA-Z0-9!#\\$%&`\\+\\-\\*\\/’\\^\\{\\}_]";
			d = "[a-zA-Z0-9\\-]";
			a = "^%s+(\\.%s+)*?@%s+(\\.%s+)*?$";
			reg = $._sprintf(a, u, u, d, d);
			return this.regex(value, reg);
		},

		/**
		 * Check if the value equals to required
		 * @param String value
		 * @param String required
		 */
		equals : function(value, required){
			return value === required;
		},

		/**
		 * Check if length of string equals to the length
		 * @param String value
		 * @param Integer length
		 */
		exactLength : function(value, length){
			return value.length === length;
		},

		/**
		 * Check if the value equals to the name's one
		 * @param String value
		 * @param String name
		 * @param Object data
		 */
		matches : function(value, name, data){
			return value === data[name];
		},

		/**
		 * Check if value is not too long
		 * @param String value
		 * @param Integer length
		 */
		maxLength : function(value, length){
			return value.length <= length;
		},

		/**
		 * Check if value is long enough
		 * @param String value
		 * @param Integer length
		 */
		minLength : function(value, length){
			return value.length >= length;
		},

		/**
		 * Check if value is not empty
		 * @param String value
		 */
		notEmpty : function(value){
			return !! $._toString(value);
		},

		/**
		 * Check if value is numeric
		 * @param String value
		 */
		numeric : function(value){
			return /^(\-|\+)?\d+(\.\d+)?$/.test(value);
		},

		/**
		 * Check if valid phone number
		 * (only count the digit character)
		 * @param String value
		 * @param Integer min
		 * @param Integer max
		 */
		phone : function(value, min, max){
			value = $._toString(value).replace(/[^\d]/g, "");
			min = min || 10;
			max = max || 11;
			return this.rangeLength(value, min, max);
		},

		/**
		 * Check if value length in range
		 * @param String value
		 * @param Integer min
		 * @param Integer max
		 */
		rangeLength : function(value, min, max){
			return this.minLength(value, min) && this.maxLength(value, max);
		},

		/**
		 * Check if number in range
		 * @param String value
		 * @param Integer min
		 * @param Integer max
		 */
		range : function(value, min, max){
			value = new Number(value);
			return value >= min && value <= max;
		},

		/**
		 * Check if value is valid for expression
		 * @param String value
		 * @param String|Regex pattern
		 */
		regex : function(value, pattern){
			if(typeof pattern === "string" || pattern instanceof String){
				pattern = new RegExp(pattern);
			}
			return pattern.test(value);
		},

		/**
		 * Check if valid url
		 * @param String value
		 */
		url : function(value){
			var scheme, ip, host, port, path

			scheme = "(https|http)\://";
			ip = "(\\d{1,3}(\\.\\d{1,3}){3})";
			host = "([a-z0-9\\-]+(\\.[a-z0-9\\-]+)*?)";
			port = "(:[\\d]{1,5})";
			path = "[^\\\\'\\|`\\^\"<>\\(\\)\\{\\}\\[\\]]+";
			return this.regex(
				value,
				$._sprintf("^%s(%s|%s)(%s)?(%s)?$", scheme, ip, host, port, path)
			);
		},

		/**
		 * call method in member
		 */
		_call : function(method, value, args){
			var _args = args ? [].concat(args) : [];
			_args.unshift(value);
			if($.isFunction(this[method])){
				return this[method].apply(this, _args);
			}
			return null;
		}
	};

	$.extend($, {
		valid : Valid
	});

}(jQuery));
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
			var dfd, count;

			dfd = $.Deferred();
			count = 0;
			this.clean();
			this.setData(data);

			$.each(this.rules, function(name, rules){
				var value = data[name] || "";

				my.check(name, value)
				.done(function(valid, message){
					if(! valid){
						my.errors[name] = message;
						count += 1;
					}
				});
			});

			if($.isFunction(callback)){
				callback(! count, this.errors, data);
			}
			dfd.resolve(! count, this.errors, data);
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

		this.init.apply(this, arguments);
	};

	$.extend($, {
		Validation : Validation
	});

}(jQuery)); 