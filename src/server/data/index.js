var data = require("./data.json");

module.exports = {

    middleware: function (req, res, next) {
        req.data = (data || {});
        next();
    }

};
