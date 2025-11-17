import express from 'express'
import mongoose from 'mongoose'

const pass = "#Hotgadget1";
const encodedpass = encodeURIComponent(pass);
const app = express();

const port = 3000;
try{
    mongoose.connect(`mongodb+srv://hotgadget:${encodedpass}@cluster0.ygrlvpl.mongodb.net/UserData`);
    console.log("connected successfully");
}catch(error){
    console.log("mongodb connection failed:", error.message)
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const user = mongoose.model("user", userSchema);

// ( async () => {
//     await user.create({
//         name:"Hotgadget",
//         age:2
//     });
// })();

app.get('/',async (req,res)  => {
    const userData = await user.find();
    res.json(userData);
});

app.listen(port,() => {
    console.log(`server is running on port ${port}`)
});