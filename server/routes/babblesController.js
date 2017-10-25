const express = require("express");
const babblesController = express.Router();
const Stock = require("../models/stock");
const User = require("../models/user");
const Babble = require("../models/babble");
const WatchItem = require("../models/watchitem");

// Moment to format dates
const moment = require("moment");

module.exports = babblesController;
