const express = require("express");
const router = express.Router();



router.get('/', (req,res) => {
  res.send('INSIDE /API/OWNERS')
})
// basic router with one standard route

module.exports = router // only export of the file
