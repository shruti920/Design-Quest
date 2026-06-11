const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
 const { data, error } =
  await supabase
   .from("users")
   .select("*");

 if (error) {
  return res.status(500).json(error);
 }

 res.json(data);
});

module.exports = router;