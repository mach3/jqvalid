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
		},

		/**
		 * Replace multibyte strings in [a-zA-Z0-9] to single one
		 * @param String value
		 */
		_toSingleByte : function(value){
			var map = $._toSingleByteMap;
			return value.replace(/./g, function(c){
				var code = c.charCodeAt(0);
				if(map.hasOwnProperty(code)){
					return map[code];
				}
				return c;
			});
		},

		_toSingleByteMap : {
			"65296":"0","65297":"1","65298":"2","65299":"3","65300":"4",
			"65301":"5","65302":"6","65303":"7","65304":"8","65305":"9",
			"65313":"A","65314":"B","65315":"C","65316":"D","65317":"E","65318":"F","65319":"G",
			"65320":"H","65321":"I","65322":"J","65323":"K","65324":"L","65325":"M","65326":"N",
			"65327":"O","65328":"P","65329":"Q","65330":"R","65331":"S","65332":"T","65333":"U",
			"65334":"V","65335":"W","65336":"X","65337":"Y","65338":"Z",
			"65345":"a","65346":"b","65347":"c","65348":"d","65349":"e","65350":"f","65351":"g",
			"65352":"h","65353":"i","65354":"j","65355":"k","65356":"l","65357":"m","65358":"n",
			"65359":"o","65360":"p","65361":"q","65362":"r","65363":"s","65364":"t","65365":"u",
			"65366":"v","65367":"w","65368":"x","65369":"y","65370":"z"
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