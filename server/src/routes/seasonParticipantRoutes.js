const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");



router.post("/", async (req, res) => {

try {

const {
userId,
seasonId
}
=
req.body;



const { data, error } =
await supabase
.from("season_participants")
.insert([
{
user_id:userId,
season_id:seasonId
}
])
.select();



if(error)
throw error;

res.status(201)
.json(data);

}

catch(err){

res.status(500)
.json({
message:
err.message
});

}

});



router.get("/", async (req,res)=>{

try{

const { data,error }=
await supabase
.from("season_participants")
.select(`
*,
users(*),
seasons(*)
`);

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