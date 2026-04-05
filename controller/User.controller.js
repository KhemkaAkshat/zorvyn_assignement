const UserModel = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res
        .status(403)
        .json({ message: "Name, email and password is required" });
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    return res.status(201).json({ message: "User created succesfully", data:{
        id: user._id,
        name: user.name, 
        email: user.email,
        role:user.role
    } });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(403).json({message:"Email and password are required"});
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).json({message:"User does not exists"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"})
        const token = jwt.sign(
        {
                id:user._id,
                role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
        )
        return res.status(200).json({message:"Logged in successfully",token, user:{
            id: user._id,
            email:user.email,
            role: user.role

        }})
       


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

const updateUser = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findById(id);
        if(!user) return res.status(404).json({message:"User does not exists"})
        const {name, email, role, isActive} = req.body;
        if(name) user.name = name;
        if(email) user.email = email;
        if(role && ["viewer", "analyst", "admin"].includes(role)) user.role = role;
        if(isActive !== undefined) user.isActive = isActive
        await user.save()
        return res.status(200).json({message:"User updated", data:{
            id:user._id,
            name:user.name,
            email:user.email,
            role: user.role,
            isActive: user.isActive,
            updatedAt: user.updatedAt
        }})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

const getUsers = async(req, res)=>{
    try {
        
        const filters = {};
        const {role} = req.query;
        if(role) filters.role = role;
        const users = await UserModel.find(filters)
        return res.status(200).json({message:"Users fetched", count: users.length, data:users})
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports = { createUser, loginUser, updateUser, getUsers }
