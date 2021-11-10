const { request } = require("express")
const express = require(`express`)
const router = express.Router()
const dbConnection = require('../connection/db');
router.use(express.json())

router.get('/',(req,res)=>{
    res.render('register')
})
module.exports = router