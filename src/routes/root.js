"use strict";

var debug = require("debug")("hawthorn:api:root");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    debug("Logged in user:", req.user);
    res.success({ message: "Hawthorn API" });
});

module.exports = router;
