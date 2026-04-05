const express =require("express")
const { protect } = require("../middleware/auth");
const {getDashboardRevenue , getDashboardDataByCategory, getMonthlyTrends}= require("../controller/dashboard.controller");
const router = express.Router()

router.get("/revenue", protect, getDashboardRevenue )
router.get("/category", protect, getDashboardDataByCategory)
router.get("/monthlyTrends", protect, getMonthlyTrends)

module.exports = router;