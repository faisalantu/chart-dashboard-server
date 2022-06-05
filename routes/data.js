const express = require("express");
const router = express.Router();
const ChartDataModel = require("../models/ChartData");
const mongoose = require("mongoose");

// @route   GET api/data
// @desc    get all data
// @access  public
// @query   userEmail,club,skip,limit
router.get("/", async (req, res) => {
  try {
    let { end_year, topic, sector, region, source, pestle, country, impact } =
      req.body;

    function matchQuery() {
      return {
        end_year: end_year ? { $nin: [null, ""] } : { $exists: true },
        topic: topic ? { $nin: [null, ""] } : { $exists: true },
        sector: sector ? { $nin: [null, ""] } : { $exists: true },
        region: region ? { $nin: [null, ""] } : { $exists: true },
        pestle: pestle ? { $nin: [null, ""] } : { $exists: true },
        source: source ? { $nin: [null, ""] } : { $exists: true },
        country: country ? { $nin: [null, ""] } : { $exists: true },
        impact: impact ? { $nin: [null, ""] } : { $exists: true },
      };
    }
    const data = await ChartDataModel.aggregate().match(matchQuery());

    console.log(data.length);
    res.status(200).send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, masssage: "no data" });
  }
});

module.exports = router;
