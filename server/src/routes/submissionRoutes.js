const express = require("express");

const router = express.Router();

const supabase =
require("../config/supabase");



// CREATE SUBMISSION

router.post("/", async (req,res)=>{

try{

const {
userId,
questId,
answer
}
=
req.body;



if(
!userId||
!questId||
!answer?.trim()
){

return res
.status(400)
.json({

message:
"Missing fields"

});

}



//
// Prevent duplicate submit
//

const {
data:existing,
error:existingError
}
=
await supabase

.from(
"submissions"
)

.select(
"id"
)

.eq(
"user_id",
userId
)

.eq(
"quest_id",
questId
)

.limit(1);



if(
existingError
)
throw existingError;



if(
existing?.length
){

return res

.status(400)

.json({

message:
"already submitted"

});

}



//
// Create submission
//

const {

data:submission,

error:submissionError

}
=
await supabase

.from(
"submissions"
)

.insert([

{

user_id:
userId,

quest_id:
questId,

answer,

status:
"reviewed"

}

])

.select()

.single();



if(
submissionError
)
throw submissionError;



//
// Get XP reward
//

const {

data:quest,

error:questError

}
=
await supabase

.from(
"quests"
)

.select(
"xp_reward"
)

.eq(
"id",
questId
)

.single();



if(
questError
)
throw questError;



//
// Add XP
//

const {

error:xpError

}
=
await supabase

.from(
"xp_transactions"
)

.insert([

{

user_id:
userId,

submission_id:
submission.id,

amount:
quest.xp_reward,

reason:
"Quest Submission"

}

]);



if(
xpError
)
throw xpError;



return res

.status(201)

.json({

message:
"XP Added",

xp:
quest.xp_reward,

submission

});

}

catch(err){

console.log(err);



return res

.status(500)

.json({

message:
err.message

});

}

});



// GET ALL SUBMISSIONS

router.get(
"/",

async(
req,
res
)=>{

try{

const {

data,

error

}
=
await supabase

.from(
"submissions"
)

.select(`

*,

users(*),

quests(*)

`);



if(
error
)
throw error;



res.json(
data
);

}

catch(err){

res

.status(500)

.json({

message:
err.message

});

}

}

);



module.exports =
router;