//single dependency
define('test3', [am("module_a")], function(module_a) {

});

//mutiple dependencies
define('test2', am('module_a', "module_b"), function(module_a) {

});

//mutiple dependencies
define('test2', am(['module_a', "module_b", 'module_c']), function(module_a) {
    var bg = am('image.bg');
    console.log(bg);
});

//empty dependency
define([], function() {});
