const express = require("express");
const router = express.Router();

const Cuisine = require("../models/cuisine");

//Displaying all the cuisines
router.get("/", async (req, res) => {
  let results = {};
  if (req.query.name != null && req.query.name !== "") {
    results.name = new RegExp(req.query.name, "i");
  }
  try {
    const cuisines = await Cuisine.find(results);
    res.render("cuisines/index", { cuisines: cuisines, results: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Cuisine Route
router.get("/new", (req, res) => {
  res.render("cuisines/new", { cuisine: new Cuisine() });
});

//Create Cuisine Route
router.post("/", async (req, res) => {
  const cuisine = new Cuisine({
    name: req.body.name,
  });
  try {
    const newCuisine = await cuisine.save();
    // res.redirect(`cuisines/${newCuisine.id}`);
    res.redirect("cuisines");
  } catch {
    res.render("cuisines/new", {
      cuisine: cuisine,
      errorMessage: "Error creating Cuisine",
    });
  }
});
module.exports = router;
