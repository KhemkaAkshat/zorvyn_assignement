const TransactionModel = require("../models/transaction.model")

const getDashboardRevenue = async(req, res)=>{
    try {
        const txn = await TransactionModel.find();
        let totalIncome = 0;
        let totalExpense = 0;
        txn.forEach(element => {
            if(element.type === "income") totalIncome += element.amount;
            else if(element.type === "expense") totalExpense +=element.amount;

        });
        const netBalance = totalIncome - totalExpense;
        return res.status(200).json({message:"Dashbaord data fetched",  data: {totalIncome, totalExpense, netBalance}})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


const getDashboardDataByCategory = async (req, res)=>{
    try {
        const txn = await TransactionModel.find();
        const categoryTotal = {}
        txn.forEach(element => {
            const category = element.category || "others"
           if(categoryTotal[category]) categoryTotal[category]+= element.amount;
           else categoryTotal[category] = element.amount 
        });
        return res.status(200).json({message:"Category total fetched", data :categoryTotal})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


const getMonthlyTrends = async (req, res)=>{
    try {
        const txn = await TransactionModel.find();
        const monthlyTotal = {}
        txn.forEach(element => {
            const month = new Date(element.date).getMonth()
            if(monthlyTotal[month]) monthlyTotal[month]+= element.amount;
            else monthlyTotal[month] = element.amount;
        });
        return res.status(200).json({message:"Monthly Trends Fetched", data:monthlyTotal})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {getDashboardRevenue, getDashboardDataByCategory, getMonthlyTrends}