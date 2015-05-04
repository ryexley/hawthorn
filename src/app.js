"use strict";

var debug = require("debug")("hawthorn");
var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

// common response extension functions to facilitate a common response pattern
express.response.success = function (options) {
    options = options || {};

    return this.json({
        success: true,
        statusCode: options.statusCode || 200,
        message: options.message || null,
        data: options.data || null,
        _links: options.links || null
    });
};

express.response.error = function (options) {
    options = options || {};

    return this.status(options.statusCode || 500).json({
        success: false,
        statusCode: options.statusCode || 500,
        message: options.message || options.err.message || null,
        data: options.data || null,
        _links: options.links || null
    });
};

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    name: "hawthorn",
    secret: "GoDucks!",
    resave: false,
    rolling: true,
    saveUninitialized: true
}));

var routes = require("./routes");
app.use("/", routes);

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// development error handler, prints a stack trace
if (app.get("env") === "development" || app.get("env") === "dev") {
    app.use(function (err, req, res) {
        debug("Application error!", err);
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler, no stack trace
app.use(function (err, req, res/*, next */) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

module.exports = app;
