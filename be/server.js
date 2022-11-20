require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./passport");

const api = require("./routes/api");

const app = express();
const PORT = 3100;

const clientP = mongoose
  .connect("mongodb://localhost:27017/webrtc-n-chill", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => m.connection.getClient());

// MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: "webrtc-n-chill",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1,
    }),
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", api);

// START
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
