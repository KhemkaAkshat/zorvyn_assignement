const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const authRoute = require("./routes/auth.route")

dotenv.config();

app.use(cors());
app.use(express.json());

connectDb();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT)
})



