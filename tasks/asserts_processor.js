var utils = require('../lib/utils'),
    filename = utils.filename;

module.exports = function(grunt) {

    grunt.registerMultiTask('asserts_processor', 'Compile .asserts files.', function() {
        var options = this.options(),
            url_map = {},
            header = options.header ? options.header : '',
            footer = options.footer ? options.footer : '',
            asserts_wraper = options.asserts_wraper ? options.asserts_wraper : null;

        for (var key in grunt.filerev.summary) {
            var reversioned_path = utils.filepath_2_url(grunt.filerev.summary[key], options.webroot);
            key = utils.filepath_2_url(key, options.webroot);
            url_map[key] = {
                origin: filename(key),
                rev: filename(reversioned_path)
            };
        }

        this.files[0].src.forEach(function(filepath) {
            var js_loc = filepath.replace(/asserts$/g, 'js'),
                js_url = utils.filepath_2_url(js_loc, options.webroot),
                item = url_map[js_url],
                js_loc_rev = js_loc.replace(item.origin, item.rev);
            //console.log(filepath_rev);
            var asserts = JSON.parse(grunt.file.read(filepath));
            for (var name in asserts) {
                var assert_url = asserts[name];
                if (url_map[assert_url]) {
                    asserts[name] = assert_url.replace(url_map[assert_url].origin, url_map[assert_url].rev);
                }
            }
            var js_content = grunt.file.read(js_loc_rev);
            grunt.file.write(js_loc_rev, header + asserts_wraper(asserts) + js_content + footer);
        });
    });

};
