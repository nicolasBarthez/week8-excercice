const express = require("express");
const watchItemsController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");
const moment = require("moment");

// **********************************************************
// Send stock info  ======================================
// **********************************************************

module.exports = watchItemsController;
