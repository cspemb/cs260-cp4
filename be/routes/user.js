const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ test: "TEST RESPONSE" });
});

module.exports = router;
