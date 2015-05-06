"use strict";

var debug = require("debug")("hawthorn:routes:root");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index", req.data);
});

module.exports = router;
