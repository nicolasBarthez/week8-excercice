// set up ======================================================================
// get all the tools we need
const express = require("express");
const httpsRedirect = require("express-https-redirect");
const port = process.env.PORT || 3000;
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const history = require("express-history-api-fallback");
require("dotenv").config();
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

const passport = require("passport");
const User = require("./models/user");
const config = require("./config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const authController = require("./routes/authController.js");
const dashboardsController = require("./routes/dashboardsController.js");
const babblesController = require("./routes/babblesController.js");
const stocksController = require("./routes/stocksController.js");
const watchItemsController = require("./routes/watchItemsController.js");
const followerController = require("./routes/followerController.js");
const usersController = require("./routes/usersController.js");
const trendingController = require("./routes/trendingController.js");
const leaderboardController = require("./routes/leaderboardController.js");
const chartController = require("./routes/chartController.js");
const adminController = require("./routes/adminController.js");

// configuration ===============================================================
// mongodb://localhost/insidersDB-dev
mongoose
  .connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then(() => {
    console.info("The magic happens on port " + port);
  });

const app = express();

app.use("/", httpsRedirect());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get("env") === "development") {
  app.use(
    cors({
      origin: "http://localhost:8080"
    })
  );
}

app.use(passport.initialize());
// Create the strategy for JWT
const strategy = new Strategy(
  {
    // this is a config we pass to the strategy
    // it needs to secret to decrypt the payload of the
    // token.
    secretOrKey: config.jwtSecret,
    // This options tells the strategy to extract the token
    // from the header of the request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    // payload is the object we encrypted at the route /api/token
    // We get the user id, make sure the user exist by looking it up
    User.findById(payload.id).then(user => {
      if (user) {
        // make the user accessible in req.user
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    });
  }
);
// tell pasport to use it
passport.use(strategy);

// routes ======================================================================
app.use("/api", authController);
app.use("/api/stocks", stocksController);
app.use("/api/babbles", babblesController);
app.use("/api/watchitems", watchItemsController);
app.use("/api/follow", followerController);
app.use("/api/users", usersController);
app.use("/api/trending", trendingController);
app.use("/api/dashboards", dashboardsController);
app.use("/api/leaderboard", leaderboardController);
app.use("/api/chart", chartController);
app.use("/api/admin", adminController);

// This is an example of protected route
app.get(
  "/api/secret",
  // this is protecting the route and giving us access to
  // req.user
  passport.authenticate("jwt", config.jwtSession),
  (req, res) => {
    // send the user his own information
    res.json(req.user);
  }
);

const clientRoot = path.join(__dirname, "../client/dist");
app.use("/", express.static(clientRoot));
app.use(history("index.html", { root: clientRoot }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  // return the error message only in development mode
  res.json({
    error: req.app.get("env") === "development" ? err : {}
  });
});

// launch ======================================================================

module.exports = app;
