import express from 'express'
import mongoose from 'mongoose'

const pass = process.env.MONGO_PASS;
const encodedpass = encodeURIComponent(pass);
const app = express();

const port = process.env.PORT || 8000;
try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully");
}catch(error){
    console.log("mongodb connection failed:", error.message)
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const user = mongoose.model("user", userSchema);

( async () => {
    await user.create({
        name:"Surya",
        age:21
    });
})();

app.get('/',async (req,res)  => {
    const userData = await user.find();
    res.json(userData);
});

app.listen(port,() => {
    console.log(`server is running on port ${port}`)
});