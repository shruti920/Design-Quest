const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");



router.get("/", async (req,res)=>{

try{

const {
data,
error
}
=
await supabase

.from(
"leaderboard"
)

.select("*");



if(error)
throw error;



res.json(data);

}

catch(err){

res.status(500)

.json({

message:
err.message

});

}

});



module.exports =
router;