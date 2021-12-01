const express = require("express");
const router = express.Router();
const getByPagination = require("../controllers/apps.js");

router.get("/", getByPagination);

module.exports = router;
