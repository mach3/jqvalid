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
		},

		/**
		 * Count object's member
		 */
		_count : function(obj, filter){
			var i, n;
			n = 0;
			filter = $.isFunction(filter) ? filter : function(){ return true; };
			for(i in obj){
				if(obj.hasOwnProperty(i) && filter(obj[i])){
					n += 1;
				}
			}
			return n;
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