const express = require("express");
const router = express.Router();

const results = require("../data")

router.get('/', (req,res)=>{
    res.send(results);
});


module.exports = router;