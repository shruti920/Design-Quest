const express =
require("express");

const router =
express.Router();

const supabase =
require("../config/supabase");



router.get(
"/:userId",

async(req,res)=>{

try{

const {
userId
}
=
req.params;



const {
data,
error
}
=
await supabase

.from(
"xp_transactions"
)

.select(
"amount"
)

.eq(
"user_id",
userId
);



if(error)
throw error;



const totalXP =
data.reduce(

(sum,item)=>

sum+item.amount,

0

);



const level =
Math.floor(
totalXP/100
)+1;



const current =
totalXP%100;



res.json({

totalXP,

level,

progress:
current

});

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