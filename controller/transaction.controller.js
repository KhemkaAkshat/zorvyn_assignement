const TransactionModel = require("../models/transaction.model")

const createTransaction = async(req, res)=>{
    try {
        const {amount, type, category, note} = req.body
        if(amount === undefined || !type) return res.status(400).json({message:"Amount and type are required"})
        if(amount<=0 || !["income", "expense"].includes(type)) return res.status(400).json({message:"Invalid amount or type"})
        const txn = await TransactionModel.create(
            {
                amount, type, category, note
                
            }
    
        )
        return res.status(201).json({message:"Transaction created", data: txn})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
} 


const getTransaction = async(req, res)=>{
    try {
        const {type, category, search, page=1, limit=10} = req.query
        const filter = {}
        if(type) filter.type = type;
        if(category) filter.category = category

        if(search) filter.note = {$regex: search, $option:'i'}
        const pagenum = Number(page) || 1
        const limitNum = Number(limit) || 10
        const skip = ( page-1 ) * limitNum;
        const txn = await TransactionModel.find(filter).skip(skip).limit(limitNum)
        const total = await TransactionModel.countDocuments(filter)
        return res.status(200).json({message:"Trancations fetched ", page: pagenum, totalTransaction: total, data: txn})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
        
    }
}

const updateTransaction = async(req, res)=>{
    try {
        const {id} = req.params
        const txn = await TransactionModel.findById(id)
        if(!txn) return res.status(404).json({message:"Transaction not found"})
        const {amount, type, category, note} = req.body
        if(amount !== undefined && amount<=0 ) return res.status(400).json({message:"Amount must be greater than 0"})
        if(type && !["income", "expense"].includes(type)) return res.status(400).json({message:"Invalid Type"})
        if(amount !== undefined) txn.amount = amount;
        if(type) txn.type = type
        if(category) txn.category = category
        if(note) txn.note = note;
        await txn.save()

        return res.status(200).json({message:"Transaction Updated", data: txn})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


const deleteTransaction = async(req, res)=>{
    try {
        const {id} = req.params
        const txn = await TransactionModel.findById(id);
        if(!txn) return res.status(404).json({message:"Transaction does not exists"})
        await TransactionModel.findByIdAndDelete(id)
        return res.status(201).json({message:"Transacation deleted"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {createTransaction, getTransaction, updateTransaction, deleteTransaction}