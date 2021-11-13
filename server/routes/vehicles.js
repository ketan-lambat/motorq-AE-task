const express = require("express");

const router = express.Router();
const { Vehicle } = require("../models/vehicle");

router.get("/", async (req, res) => {
  const queryCount = parseInt(req.query.count || "0");
  const queryVin = req.query.vin || "";
  const queryDriver = req.query.driver || "";
  const queryLicensePlate = req.query.licensePlate || "";

  // upperlimit of count in query is 500
  if (queryCount > 500) queryCount = 500;
  console.log(req.query);

  let vehicles = [];

  // vin present in query, we only use that, discard other filters
  if (queryVin != "") {
    vehicles = Vehicle.find({ Vin: queryVin });
  }
  // else if vin is not present in query, we use licensePlate, discarding other filters
  else if (queryLicensePlate != "") {
    vehicles = Vehicle.find({ LicensePlate: queryLicensePlate });
  }
  // else if licensePlace is not present in query, we use driver, discarding other filters
  else if (queryDriver != "") {
    vehicles = Vehicle.find({ Driver: queryDriver });
  } else {
    vehicles = Vehicle.find();
  }

  if (queryCount > 0) {
    vehicles = vehicles.limit(queryCount);
  }

  vehicles = await vehicles;

  res.send(vehicles);
  console.log(vehicles);
});

router.patch("/:id", async (req, res) => {
  if (req.body.Vin || req.body.MMY || req.body.Status) {
    return res.send("You have passed an uneditable paramenter. Please check.");
  }
  console.log(req.body);
  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      CustomerName: req.body.customerName,
      Driver: req.body.driver,
      Office: req.body.office,
      LicensePlate: req.body.licensePlate,
    },
    { new: true }
  );

  if (!vehicle)
    return res.status(404).send("The vehicle with the given ID was not found.");
  console.log(vehicle);
  res.send(vehicle);
});


module.exports = router;
