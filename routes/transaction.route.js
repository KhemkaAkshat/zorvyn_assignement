const express = require("express")
const { protect, authorize } = require("../middleware/auth")
const { createTransaction, getTransaction, updateTransaction, deleteTransaction } = require("../controller/transaction.controller")
const router = express.Router()


router.post("/create",protect , authorize("admin"), createTransaction)
router.get("/", protect,authorize("analyst", "admin"), getTransaction)
router.put("/update/:id", protect, authorize("admin"), updateTransaction)
router.delete("/delete/:id", protect, authorize("admin"), deleteTransaction)


module.exports = router