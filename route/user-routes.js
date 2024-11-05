const express= require('express')
const {handleUserSignup, handleLogin} = require('../controller/user-controller')
const router= express.Router()

router.post('/', handleUserSignup)
router.post('/login', handleLogin)
module.exports= router