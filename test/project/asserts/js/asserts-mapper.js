(function() {
    function AssertsMapper() {
        this.map = {};
    }
    AssertsMapper.prototype = {
        config: function(obj) {
            this.map = obj;
        },
        get: function(name) {
            var that = this;
            if (typeof name === 'string') {
                if (!this.map[name]) {
                    return name;
                }
                return this.map[name];
            } else if (Array.isArray(name)) {
                name.forEach(function(n, i) {
                    name[i] = that.get(n);
                });
            }
        }
    };

    var am = new AssertsMapper();

    //exports AM
    if (!AM) {
        AM = {};
    }
    AM.am = function() {
        if (arguments.length === 1) {
            var o = argumenets[0];
            if (typeof o === 'object') {
                am.config(o);
            } else {
                return am.get(o);
            }
        } else {
            var arr = [];
            for (var i = 0; i < arguments.length; i++) {
                arr.push(arguments[i]);
            }
            return am.get(arr);
        }
    }
})();
