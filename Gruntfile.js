
module.exports = function(grunt){

	var cmp, options;

	cmp = grunt.file.readJSON("component.json");
	options = {
		splitBanners : true,
		banner : grunt.file.read("src/banner.js").replace("{{version}}", cmp.version)
	};

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.initConfig({
		concat : {
			dist : {
				options : options,
				files : {
					"dist/jqvalid.js" : [
						"src/extend.js", 
						"src/valid.js", 
						"src/validation.js"
					]
				}
			}
		},
		uglify : {
			dist : {
				options : options,
				files : {
					"dist/jqvalid.min.js" : [
						"src/extend.js", 
						"src/valid.js", 
						"src/validation.js"
					]
				}
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};