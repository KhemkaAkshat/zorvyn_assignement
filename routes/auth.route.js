const express = require('express')
const { createUser, loginUser, updateUser, getUsers } = require('../controller/User.controller')
const { protect, authorize } = require('../middleware/auth')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/update', protect, authorize("admin"), updateUser)
router.get('/', protect, authorize("admin"), getUsers)

module.exports = router